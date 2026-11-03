// P4 controlled review queue. One canonical queue tab in PRIVATE Google Sheets.
// Pure, deterministic logic; no Google/GitHub/portal writes or autonomous approvals.
import { createHash } from "node:crypto";
import { RegistryError } from "./drive-registry-core.mjs";

export const REVIEW_QUEUE_COLUMNS = Object.freeze([
  "review_id", "finding_type", "document_id", "fingerprint",
  "source_ids", "workflow_ids", "status", "owner_skill",
  "first_seen_at", "last_seen_at", "reviewer", "decision_ref", "notes"
]);

const FINDING_TYPES = new Set([
  "SOURCE_METADATA_CHANGE", "SOURCE_METADATA_UNVERIFIED",
  "DERIVED_OUTPUT_REVIEW", "UNINDEXED_FILE"
]);
const REVIEW_STATES = new Set(["OPEN", "IN_REVIEW", "RESOLVED", "DISMISSED"]);
const canonicalList = list => [...new Set(list.filter(Boolean))].sort();
const scalar = value => value == null ? "" : String(value).trim();
const ensure = (condition, code, detail) => {
  if (!condition) throw new RegistryError(code, detail);
};
function hash(parts) {
  return createHash("sha256").update(JSON.stringify(parts)).digest("hex");
}
function identify(kind, docId, fingerprint) {
  return "RQ-" + hash([kind, docId, fingerprint]).slice(0,20).toUpperCase();
}
function isoDate(value) {
  const time = new Date(value);
  ensure(Number.isFinite(time.getTime()) && time.toISOString() === value,
    "INVALID_REVIEW_TIME");
  return value;
}

export function parseReviewQueueRows(matrix) {
  ensure(Array.isArray(matrix) && matrix.length >= 1, "EMPTY_REVIEW_QUEUE");
  const header = matrix[0].map(scalar);
  for (const field of REVIEW_QUEUE_COLUMNS)
    ensure(header.includes(field), "MISSING_REVIEW_HEADER", field);
  ensure(new Set(header).size === header.length, "DUPLICATE_REVIEW_HEADER");
  const rows = [];
  const ids = new Set();
  for (let index = 1; index < matrix.length; index++) {
    const raw = matrix[index] || [];
    if (raw.every(value => scalar(value) === "")) continue;
    const row = Object.fromEntries(REVIEW_QUEUE_COLUMNS.map(key =>
      [key, scalar(raw[header.indexOf(key)])]));
    const label = "row " + (index + 1);
    ensure(/^RQ-[A-F0-9]{20}$/.test(row.review_id), "INVALID_REVIEW_ID", label);
    ensure(FINDING_TYPES.has(row.finding_type), "INVALID_FINDING_TYPE", label);
    ensure(row.document_id.length > 0, "MISSING_REVIEW_DOCUMENT", label);
    ensure(/^[a-f0-9]{64}$/.test(row.fingerprint), "INVALID_FINGERPRINT", label);
    ensure(row.review_id === identify(row.finding_type, row.document_id, row.fingerprint),
      "REVIEW_ID_FINGERPRINT_MISMATCH", label);
    ensure(!ids.has(row.review_id), "DUPLICATE_REVIEW_ID", row.review_id);
    ids.add(row.review_id);
    ensure(REVIEW_STATES.has(row.status), "INVALID_REVIEW_STATE", label);
    ensure(row.first_seen_at.length > 0 && row.last_seen_at.length > 0,
      "MISSING_REVIEW_TIMESTAMPS", label);
    const iso = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})$/;
    ensure(iso.test(row.first_seen_at) && iso.test(row.last_seen_at) &&
      Number.isFinite(Date.parse(row.first_seen_at)) &&
      Number.isFinite(Date.parse(row.last_seen_at)), "INVALID_REVIEW_TIMESTAMP", label);
    ensure(Date.parse(row.first_seen_at) <= Date.parse(row.last_seen_at),
      "REVIEW_TIME_ORDER_INVALID", label);
    if (row.status === "RESOLVED" || row.status === "DISMISSED") {
      ensure(row.reviewer.length > 0 && row.decision_ref.length > 0,
        "REVIEW_CLOSURE_NEEDS_EVIDENCE", label);
    }
    rows.push(row);
  }
  return rows;
}

export function buildReviewCandidates(impact, seenAt) {
  ensure(impact?.kind === "drive_change_impact_v1",
    "INVALID_IMPACT_REPORT");
  isoDate(seenAt);
  ensure(Array.isArray(impact.metadata_change_signals) &&
    Array.isArray(impact.metadata_unverified) &&
    Array.isArray(impact.impacted_outputs) &&
    Array.isArray(impact.workflow_impact_candidates),
    "INCOMPLETE_IMPACT_REPORT");

  const byId = new Map();
  for (const obs of [...impact.metadata_change_signals, ...impact.metadata_unverified]) {
    ensure(obs.document_id && obs.metadata_fingerprint,
      "MISSING_SOURCE_FINGERPRINT", obs.document_id || "?");
    byId.set(obs.document_id, obs);
  }
  const workflowsFor = id => impact.workflow_impact_candidates
    .filter(row => (row.affected_source_ids || []).includes(id));
  const affectedDerived = new Set(impact.impacted_outputs.map(o => o.document_id));
  const candidates = [];
  const add = ({ kind, documentId, fingerprint, sourceIds = [],
    workflowIds = [], owner = "UNASSIGNED", note }) => {
    ensure(typeof fingerprint === "string" && /^[a-f0-9]{64}$/.test(fingerprint),
      "INVALID_CANDIDATE_FINGERPRINT", documentId);
    candidates.push({
      review_id: identify(kind, documentId, fingerprint),
      finding_type: kind, document_id: documentId, fingerprint,
      source_ids: canonicalList(sourceIds).join(";"),
      workflow_ids: canonicalList(workflowIds).join(";"),
      status: "OPEN", owner_skill: owner,
      first_seen_at: seenAt, last_seen_at: seenAt,
      reviewer: "", decision_ref: "", notes: note
    });
  };

  for (const obs of [...impact.metadata_change_signals, ...impact.metadata_unverified]) {
    if (affectedDerived.has(obs.document_id)) continue; // one issue per derived output
    const matches = workflowsFor(obs.document_id);
    add({
      kind: obs.state === "METADATA_CHANGE_SIGNAL"
        ? "SOURCE_METADATA_CHANGE" : "SOURCE_METADATA_UNVERIFIED",
      documentId: obs.document_id,
      fingerprint: obs.metadata_fingerprint,
      sourceIds: [obs.document_id],
      workflowIds: matches.map(x => x.workflow_id),
      owner: matches[0]?.primary_skill || "UNASSIGNED",
      note: obs.state === "METADATA_CHANGE_SIGNAL"
        ? "Periksa sumber aktual. Perubahan metadata bukan bukti isi berubah."
        : "Metadata gagal diverifikasi. Jangan menyimpulkan tidak berubah."
    });
  }

  for (const output of impact.impacted_outputs) {
    const affected = [...(output.upstream_ids || [])];
    if (byId.has(output.document_id)) affected.push(output.document_id);
    const fingerprints = canonicalList(affected)
      .map(id => [id, byId.get(id)?.metadata_fingerprint || "NOT_DIRECTLY_CHECKED"]);
    // Output's metadata alone is not enough to diagnose upstream content.
    add({
      kind: "DERIVED_OUTPUT_REVIEW",
      documentId: output.document_id,
      fingerprint: hash(["DERIVED", output.document_id, fingerprints]),
      sourceIds: affected,
      workflowIds: canonicalList(affected.flatMap(id => workflowsFor(id).map(x => x.workflow_id))),
      owner: "UNASSIGNED",
      note: "Ketergantungan sumber memerlukan pemeriksaan manual; jangan ubah laporan otomatis."
    });
  }

  for (const missing of impact.unindexed_files || []) {
    ensure(missing.drive_file_id, "INVALID_UNINDEXED_FILE");
    const documentId = "UNINDEXED:" + missing.drive_file_id;
    add({
      kind: "UNINDEXED_FILE", documentId,
      fingerprint: hash(["UNINDEXED", missing.drive_file_id, missing.name || ""]),
      owner: "grant-administration",
      note: "Klasifikasikan dan verifikasi relevansi file sebelum registrasi; jangan impor otomatis."
    });
  }
  const seen = new Set();
  for (const item of candidates) {
    ensure(!seen.has(item.review_id), "DUPLICATE_CANDIDATE_ID", item.review_id);
    seen.add(item.review_id);
  }
  return candidates.sort((a,b) => a.review_id.localeCompare(b.review_id));
}

export function reconcileReviewQueue(impact, existingQueueRows, seenAt) {
  const existing = parseReviewQueueRows(existingQueueRows);
  const candidates = buildReviewCandidates(impact, seenAt);
  const old = new Map(existing.map(r => [r.review_id, r]));
  const detected = new Set(candidates.map(r => r.review_id));
  const new_candidates = candidates.filter(r => !old.has(r.review_id));
  const pending_existing = candidates.filter(r =>
    old.has(r.review_id) && ["OPEN", "IN_REVIEW"].includes(old.get(r.review_id).status))
    .map(r => ({ review_id:r.review_id, status:old.get(r.review_id).status }));
  const reviewed_existing = candidates.filter(r =>
    old.has(r.review_id) && ["RESOLVED", "DISMISSED"].includes(old.get(r.review_id).status))
    .map(r => ({ review_id:r.review_id, status:old.get(r.review_id).status }));
  // A finding disappearing never auto-closes an open task; a human must review.
  const no_longer_detected = existing.filter(r =>
    !detected.has(r.review_id) && ["OPEN", "IN_REVIEW"].includes(r.status))
    .map(r => ({ review_id:r.review_id, status:r.status }));
  return {
    kind:"drive_review_queue_preview_v1",
    status:impact.check_status === "INCOMPLETE_METADATA_CHECK" ? "INCOMPLETE_SOURCE_CHECK" :
      new_candidates.length ? "NEW_REVIEW_CANDIDATES" :
      pending_existing.length || no_longer_detected.length ? "REVIEW_STILL_PENDING" :
      "NO_NEW_REVIEW_ITEMS",
    run_at:seenAt,
    summary:{
      candidates_detected:candidates.length,
      new_candidates:new_candidates.length,
      existing_open:pending_existing.length,
      previously_reviewed:reviewed_existing.length,
      not_seen_but_open:no_longer_detected.length,
      source_check_incomplete:impact.check_status==="INCOMPLETE_METADATA_CHECK"
    },
    new_candidates, pending_existing, reviewed_existing, no_longer_detected,
    requires_human_review:true, canonical_queue_location:"PRIVATE_GOOGLE_SHEET_REVIEW_QUEUE_TAB",
    coverage:{
      registered_documents:impact.total_indexed,
      metadata_match_only:impact.matched_metadata_only,
      metadata_changed:impact.summary?.changed_count ?? null,
      metadata_unverified:impact.summary?.uncertain_count ?? null,
      registered_derived_outputs:impact.derived_outputs_registered,
      derived_mapping_coverage:impact.derived_mapping_coverage,
      folder_inventory_performed:impact.inventory_performed === true,
      document_bodies_reviewed:false,
      file_content_hashes_checked:false,
      external_approval_checked:false
    },
    auto_written:false, source_documents_modified:false,
    note:"This is a read-only preview. Register and resolve actual findings only after authorized human review; no auto-closure, no implicit e-RISPRO approval."
  };
}
