// P3 change-impact assessment from metadata and explicit source dependencies.
// Pure functions only: no network, state updates, approvals, file writes or external submit.
import { RegistryError } from "./drive-registry-core.mjs";
import { createHash } from "node:crypto";
import { WORKFLOWS } from "./drive-workflow-bridge.mjs";

const CHANGE_SIGNALS = new Set([
  "MODIFIED_TIME_CHANGED", "NAME_CHANGED", "SOURCE_TRASHED", "SOURCE_ID_MISMATCH"
]);
const UNCERTAIN_SIGNALS = new Set([
  "SOURCE_UNAVAILABLE_OR_NO_ACCESS", "METADATA_CHECK_FAILED",
  "NO_METADATA_BASELINE", "METADATA_INCOMPLETE"
]);
const sorted = values => [...new Set(values)].sort();

export function classifyDriveObservation(record, observation) {
  if (!record?.document_id) throw new RegistryError("INVALID_RECORD");
  const flags = [];
  if (!observation) flags.push("SOURCE_UNAVAILABLE_OR_NO_ACCESS");
  else if (observation.error) flags.push("METADATA_CHECK_FAILED");
  else if (observation.id !== record.drive_file_id) flags.push("SOURCE_ID_MISMATCH");
  else if (observation.trashed === true) flags.push("SOURCE_TRASHED");
  else {
    if (!observation.name || !observation.modifiedTime)
      flags.push("METADATA_INCOMPLETE");
    else {
      if (observation.name !== record.document_name) flags.push("NAME_CHANGED");
      if (!record.observed_modified_time) flags.push("NO_METADATA_BASELINE");
      else if (observation.modifiedTime !== record.observed_modified_time)
        flags.push("MODIFIED_TIME_CHANGED");
    }
  }
  // Signature is metadata-only and contains no original file title/content.
  // A new Drive version/name/time yields a new review fingerprint.
  const metadata_fingerprint = createHash("sha256").update(JSON.stringify([
    record.document_id, record.drive_file_id,
    observation?.id || null, observation?.name || null,
    observation?.modifiedTime || null, observation?.version || null,
    observation?.trashed || false, observation?.error || null, flags
  ])).digest("hex");
  const change_signal = flags.some(flag => CHANGE_SIGNALS.has(flag));
  const uncertain = flags.some(flag => UNCERTAIN_SIGNALS.has(flag));
  return {
    document_id: record.document_id,
    document_type: record.document_type,
    source_role: record.source_role,
    state: change_signal ? "METADATA_CHANGE_SIGNAL" : uncertain
      ? "METADATA_UNVERIFIED" : "METADATA_MATCH_ONLY",
    flags,
    metadata_fingerprint,
    content_checked: false,
    approval_checked: false
  };
}

function sourceMayAffectWorkflow(document, spec) {
  return document.document_type === spec.type &&
    (!spec.roles || spec.roles.includes(document.source_role));
}

export function assessChangeImpact(records, observations) {
  if (!Array.isArray(records) || !observations ||
      typeof observations !== "object" || Array.isArray(observations))
    throw new RegistryError("INVALID_IMPACT_INPUT");
  const ids = new Set(records.map(r => r.document_id));
  if (ids.size !== records.length) throw new RegistryError("DUPLICATE_IMPACT_ID");
  const assessed = records.map(record => {
    const observed = Object.hasOwn(observations, record.document_id)
      ? observations[record.document_id] : { error: "NOT_CHECKED" };
    return classifyDriveObservation(record, observed);
  });
  const byId = new Map(assessed.map(item => [item.document_id, item]));
  const changed = assessed.filter(item => item.state === "METADATA_CHANGE_SIGNAL");
  const unknown = assessed.filter(item => item.state === "METADATA_UNVERIFIED");

  // Only explicit directed 'derived_from_ids' claims may mark an output as dependent.
  // 'related_ids' denotes navigation/context and MUST NOT imply report staleness.
  const rootCauses = new Map();
  const reasons = new Map();
  for (const item of [...changed, ...unknown]) {
    rootCauses.set(item.document_id, new Set([item.document_id]));
    reasons.set(item.document_id, item.state === "METADATA_CHANGE_SIGNAL"
      ? "OWN_METADATA_REVIEW" : "OWN_SOURCE_UNVERIFIED");
  }
  const pending = records.filter(r => r.source_role === "DERIVED_OUTPUT");
  // Registry parser rejects cycles. The bounded fixed-point propagation is an
  // additional limit for library callers that bypass validation.
  for (let i = 0; i <= records.length; i += 1) {
    let modified = false;
    for (const record of pending) {
      const own = rootCauses.get(record.document_id) || new Set();
      const inherited = new Set(own);
      for (const sourceId of record.derived_from || []) {
        for (const rootId of rootCauses.get(sourceId) || []) inherited.add(rootId);
      }
      if (inherited.size > own.size) {
        rootCauses.set(record.document_id, inherited);
        if (!reasons.has(record.document_id))
          reasons.set(record.document_id, "UPSTREAM_SOURCE_REVIEW");
        modified = true;
      }
    }
    if (!modified) break;
    if (i === records.length) throw new RegistryError("IMPACT_GRAPH_NOT_CONVERGED");
  }

  const impacted_outputs = pending
    .filter(record => rootCauses.has(record.document_id))
    .map(record => ({
      document_id: record.document_id,
      review_state: "REVIEW_REQUIRED_NOT_AUTOMATICALLY_STALE",
      reason: reasons.get(record.document_id),
      upstream_ids: sorted([...rootCauses.get(record.document_id)]
        .filter(id => id !== record.document_id)),
      output_metadata_matches_registry_only: byId.get(record.document_id)?.state === "METADATA_MATCH_ONLY",
      automatic_status_update: false
    }))
    .sort((a,b) => a.document_id.localeCompare(b.document_id));

  const affected = [...changed, ...unknown];
  const workflow_impact_candidates = Object.entries(WORKFLOWS)
    .map(([workflow_id, workflow]) => {
      const matched = affected.filter(doc =>
        [...workflow.required, ...workflow.optional].some(spec =>
          sourceMayAffectWorkflow(doc, spec)));
      if (!matched.length) return null;
      return {
        workflow_id, primary_skill: workflow.primary_skill,
        affected_source_ids: sorted(matched.map(x => x.document_id)),
        action: "RECHECK_SOURCE_SELECTION_AND_CONTENT_IF_AUTHORIZED"
      };
    })
    .filter(Boolean)
    .sort((a,b) => a.workflow_id.localeCompare(b.workflow_id));

  const related_document_context = affected.map(item => {
    const related = new Set();
    for (const record of records) {
      if (record.document_id === item.document_id) {
        for (const relatedId of record.related || []) related.add(relatedId);
      }
      if ((record.related || []).includes(item.document_id))
        related.add(record.document_id);
    }
    related.delete(item.document_id);
    return { source_document_id: item.document_id, related_ids_for_context: sorted(related) };
  }).filter(item => item.related_ids_for_context.length);

  return {
    kind: "drive_change_impact_v1",
    check_status: unknown.length ? "INCOMPLETE_METADATA_CHECK" :
      changed.length ? "REVIEW_REQUIRED" : "NO_METADATA_CHANGE_SIGNAL",
    total_indexed: records.length,
    matched_metadata_only: assessed.length - changed.length - unknown.length,
    metadata_change_signals: changed,
    metadata_unverified: unknown,
    impacted_outputs,
    workflow_impact_candidates,
    related_document_context,
    derived_outputs_registered: pending.length,
    derived_mapping_coverage: pending.length ? "REGISTERED_OUTPUTS_ONLY" : "NO_DERIVED_OUTPUTS_INDEXED",
    summary: {
      changed_count: changed.length,
      uncertain_count: unknown.length,
      impacted_output_count: impacted_outputs.length,
      workflows_to_recheck: workflow_impact_candidates.length
    },
    interpretation: "Drive metadata and explicit dependency graph only. A time/name change does not establish modified document content; matching metadata does not establish authenticity. Unregistered reports cannot be evaluated.",
    may_modify_sources: false,
    may_change_external_status: false
  };
}
