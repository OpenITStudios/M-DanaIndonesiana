// P5 report onboarding preview: deterministic and read-only.
// The caller must independently verify Google Drive parent ancestry and metadata.
// No report body is inspected here; no registration or approval is performed.
import {
  RegistryError, REGISTRY_COLUMNS, REGISTRY_OPTIONAL_COLUMNS
} from "./drive-registry-core.mjs";

export const OUTPUT_DOCUMENT_TYPES = Object.freeze([
  "REPORT", "FINANCIAL_REPORT", "PROGRESS_REPORT", "INDICATOR_REPORT",
  "PRODUCTION_REPORT", "PROMOTION_REPORT", "PUBLICATION_REPORT"
]);

const OUTPUT_MIME_TYPES = new Set([
  "application/pdf",
  "application/vnd.google-apps.document",
  "application/vnd.google-apps.spreadsheet",
  "application/vnd.google-apps.presentation",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/msword", "application/vnd.ms-excel"
]);
const VALID_ID = /^[A-Z][A-Z0-9-]{2,90}$/;
const VALID_DRIVE_ID = /^[A-Za-z0-9_-]{15,}$/;
const fail = (code, detail) => { throw new RegistryError(code, detail); };
const check = (ok, code, detail) => { if (!ok) fail(code, detail); };

export function parseOutputSourceIds(raw) {
  if (raw == null || String(raw).trim() === "") return [];
  const ids = String(raw).split(",").map(s => s.trim());
  check(ids.every(id => VALID_ID.test(id)), "INVALID_OUTPUT_SOURCE_ID");
  check(new Set(ids).size === ids.length, "DUPLICATE_OUTPUT_SOURCE_ID");
  return ids;
}
function verifiedLink(remote) {
  check(typeof remote.webViewLink === "string", "CANONICAL_DRIVE_LINK_MISSING");
  let url;
  try { url = new URL(remote.webViewLink); }
  catch { fail("INVALID_REMOTE_LINK"); }
  check(url.protocol === "https:" &&
    ["drive.google.com", "docs.google.com"].includes(url.hostname),
    "UNTRUSTED_REMOTE_LINK_HOST");
  const m = url.pathname.match(/\/d\/([A-Za-z0-9_-]+)/);
  check(m && m[1] === remote.id, "REMOTE_LINK_ID_MISMATCH");
  // Preserve provider-supplied query arguments (notably Drive resource keys)
  // in the PRIVATE registry only; fragments are not needed for file identity.
  url.hash = "";
  return url.toString();
}
function isIso(value) {
  return typeof value === "string" &&
    !Number.isNaN(Date.parse(value)) &&
    /(?:Z|[+-]\d\d:\d\d)$/.test(value);
}

/**
 * @param {Array} records A parsed and validated private Document Registry.
 * @param {object} remote A Drive files.get metadata response for an existing file.
 * @param {object} options includes an ancestry chain verified via Drive files.get,
 *                 ordered from immediate parent toward the root.
 */
export function prepareOutputIntake(records, remote, options) {
  check(Array.isArray(records) && options && typeof options === "object",
    "INVALID_INTAKE_INPUT");
  check(remote && remote.trashed === false, "OUTPUT_NOT_AVAILABLE");
  const {
    documentId, outputType = "REPORT", sourceIds = [], projectRootId,
    allowedFolderId, ancestorIds
  } = options;
  check(typeof documentId === "string" && VALID_ID.test(documentId),
    "INVALID_DOCUMENT_ID");
  check(OUTPUT_DOCUMENT_TYPES.includes(outputType), "UNSUPPORTED_OUTPUT_TYPE");
  check(VALID_DRIVE_ID.test(projectRootId || "") &&
        VALID_DRIVE_ID.test(allowedFolderId || "") &&
        projectRootId !== allowedFolderId, "INVALID_OUTPUT_SCOPE");
  check(VALID_DRIVE_ID.test(remote.id || ""), "INVALID_REMOTE_FILE_ID");
  check(OUTPUT_MIME_TYPES.has(remote.mimeType), "UNSUPPORTED_OUTPUT_MIME");
  check(typeof remote.name === "string" && remote.name.trim().length > 0,
    "MISSING_OUTPUT_NAME");
  check(isIso(remote.modifiedTime), "MISSING_OUTPUT_MODIFIED_TIME");

  check(Array.isArray(ancestorIds) && ancestorIds.length > 0 &&
    ancestorIds.every(id => VALID_DRIVE_ID.test(id)), "ANCESTRY_NOT_VERIFIED");
  check(Array.isArray(remote.parents) && remote.parents.length === 1 &&
    ancestorIds[0] === remote.parents[0], "OUTPUT_IMMEDIATE_PARENT_MISMATCH");
  check(new Set(ancestorIds).size === ancestorIds.length, "CYCLIC_FOLDER_ANCESTRY");
  const allowedIndex = ancestorIds.indexOf(allowedFolderId);
  const rootIndex = ancestorIds.indexOf(projectRootId);
  check(allowedIndex >= 0 && rootIndex > allowedIndex &&
    rootIndex === ancestorIds.length - 1,
    "OUTPUT_OUTSIDE_APPROVED_PROJECT_REPORT_FOLDER");

  check(!records.some(r => r.document_id === documentId),
    "OUTPUT_ID_ALREADY_REGISTERED", documentId);
  check(!records.some(r => r.drive_file_id === remote.id),
    "DRIVE_FILE_ALREADY_REGISTERED", remote.id);

  check(Array.isArray(sourceIds), "SOURCE_IDS_MUST_BE_ARRAY");
  check(sourceIds.every(id => typeof id === "string" && VALID_ID.test(id)),
    "INVALID_OUTPUT_SOURCE_ID");
  check(new Set(sourceIds).size === sourceIds.length,
    "DUPLICATE_OUTPUT_SOURCE_ID");
  check(!sourceIds.includes(documentId), "SELF_OUTPUT_DERIVATION");
  const registeredIds = new Set(records.map(r => r.document_id));
  for (const id of sourceIds) check(registeredIds.has(id), "SOURCE_NOT_REGISTERED", id);

  const draft = {
    document_id: documentId,
    document_type: outputType,
    document_name: remote.name.trim(),
    drive_file_id: remote.id,
    drive_url: verifiedLink(remote),
    source_role: "DERIVED_OUTPUT",
    internal_status: "UNVERIFIED",
    external_status: "UNKNOWN",
    source_version: "",
    related_ids: "",
    access_class: "INTERNAL_PROJECT",
    usage_policy: "READ_ONLY",
    observed_modified_time: remote.modifiedTime,
    last_reviewed_at: "",
    notes: "",
    derived_from_ids: sourceIds.join(";")
  };
  const columns = [...REGISTRY_COLUMNS, ...REGISTRY_OPTIONAL_COLUMNS];
  return {
    kind: "drive_output_intake_preview_v1",
    status: sourceIds.length
      ? "SOURCE_LINKS_PROPOSED_PENDING_CONTENT_REVIEW"
      : "SOURCE_LINEAGE_NOT_MAPPED",
    proposed_registry_row: draft,
    registry_columns: columns,
    registry_values: columns.map(name => draft[name] || ""),
    source_ids: [...sourceIds],
    checks: {
      file_metadata_fetched: true,
      file_in_allowed_report_folder: true,
      file_in_project_root: true,
      duplicate_registry_id_found: false,
      duplicate_drive_file_found: false,
      sources_exist_in_registry: true,
      report_content_reviewed: false,
      source_lineage_confirmed: false,
      external_approval_verified: false
    },
    may_register_without_human_review: false,
    registry_write_performed: false,
    source_file_modified: false,
    reviewer_next_step: "Check actual report content and source lineage, record evidence and responsible reviewer, then manually authorize a single Registry row. Do not treat a sample or external file as an official project report."
  };
}
