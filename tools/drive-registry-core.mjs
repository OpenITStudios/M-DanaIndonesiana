// Read-only, deterministic document index. No project data or credentials belong in Git.
export const REGISTRY_COLUMNS = [
  "document_id", "document_type", "document_name", "drive_file_id",
  "drive_url", "source_role", "internal_status", "external_status",
  "source_version", "related_ids", "access_class", "usage_policy",
  "observed_modified_time", "last_reviewed_at", "notes"
];

const ROLES = new Set([
  "PROPOSED", "APPROVED_BASELINE", "CANDIDATE_REFERENCE",
  "COMPARATOR", "HISTORICAL", "INTERNAL_INDEX", "EVIDENCE"
]);
const INTERNAL = new Set([
  "UNVERIFIED", "DRAFT", "IN_REVIEW", "READY_TO_SUBMIT", "SUPERSEDED"
]);
const EXTERNAL = new Set([
  "UNKNOWN", "SUBMITTED", "REVISION_REQUESTED", "EXTERNAL_CONFIRMED"
]);
const ACCESS = new Set(["PUBLIC_SYSTEM", "INTERNAL_PROJECT", "RESTRICTED"]);

export class RegistryError extends Error {
  constructor(code, detail) {
    super(code + (detail ? ": " + detail : ""));
    this.name = "RegistryError";
    this.code = code;
  }
}

function check(predicate, code, detail) {
  if (!predicate) throw new RegistryError(code, detail);
}
function string(value) {
  return value === null || value === undefined ? "" : String(value).trim();
}

export function parseRegistryRows(matrix) {
  check(Array.isArray(matrix) && matrix.length >= 1, "REGISTRY_EMPTY");
  const headers = matrix[0].map(string);
  check(new Set(headers).size === headers.length, "DUPLICATE_HEADER");
  for (const col of REGISTRY_COLUMNS) {
    check(headers.includes(col), "MISSING_HEADER", col);
  }
  const records = [];
  for (let row = 1; row < matrix.length; row += 1) {
    const cells = matrix[row] || [];
    if (cells.every(cell => string(cell) === "")) continue;
    const entry = Object.fromEntries(REGISTRY_COLUMNS.map(col => [
      col, string(cells[headers.indexOf(col)])
    ]));
    const label = "row " + (row + 1);
    check(/^[A-Z][A-Z0-9-]{2,90}$/.test(entry.document_id), "INVALID_ID", label);
    check(/^[A-Z][A-Z0-9_]{2,60}$/.test(entry.document_type), "INVALID_TYPE", label);
    check(entry.document_name.length > 0, "MISSING_NAME", label);
    check(/^[A-Za-z0-9_-]{15,}$/.test(entry.drive_file_id), "INVALID_DRIVE_ID", label);
    let url;
    try { url = new URL(entry.drive_url); }
    catch { throw new RegistryError("INVALID_URL", label); }
    check(url.protocol === "https:" &&
      ["docs.google.com", "drive.google.com"].includes(url.hostname),
      "UNSAFE_URL", label);
    const fileIdInUrl = url.pathname.match(/\/d\/([^/]+)/);
    check(fileIdInUrl && fileIdInUrl[1] === entry.drive_file_id,
      "URL_FILE_ID_MISMATCH", label);
    check(ROLES.has(entry.source_role), "UNKNOWN_ROLE", label);
    check(INTERNAL.has(entry.internal_status), "UNKNOWN_INTERNAL_STATUS", label);
    check(EXTERNAL.has(entry.external_status), "UNKNOWN_EXTERNAL_STATUS", label);
    check(ACCESS.has(entry.access_class), "UNKNOWN_ACCESS_CLASS", label);
    check(entry.usage_policy === "READ_ONLY", "UNAUTHORIZED_USAGE_POLICY", label);
    for (const key of ["observed_modified_time", "last_reviewed_at"]) {
      const val = entry[key];
      check(!val || (!Number.isNaN(Date.parse(val)) && /(?:Z|[+-]\d\d:\d\d)$/.test(val)),
        "INVALID_TIMESTAMP", label + "." + key);
    }
    entry.related = entry.related_ids
      ? entry.related_ids.split(";").map(string).filter(Boolean) : [];
    check(new Set(entry.related).size === entry.related.length,
      "DUPLICATE_RELATION", label);
    records.push(Object.freeze(entry));
  }
  const ids = new Set(), driveIds = new Set();
  for (const record of records) {
    check(!ids.has(record.document_id), "DUPLICATE_DOCUMENT_ID", record.document_id);
    check(!driveIds.has(record.drive_file_id), "DUPLICATE_DRIVE_FILE_ID", record.drive_file_id);
    ids.add(record.document_id);
    driveIds.add(record.drive_file_id);
  }
  for (const record of records) {
    for (const related of record.related) {
      check(related !== record.document_id, "SELF_RELATION", record.document_id);
      check(ids.has(related), "BROKEN_RELATION", record.document_id + " -> " + related);
    }
  }
  return Object.freeze(records);
}

export function resolveRecord(records, { id, type } = {}) {
  check(Boolean(id) !== Boolean(type), "SELECT_BY_EXACTLY_ONE_KEY");
  const matches = id
    ? records.filter(r => r.document_id === id)
    : records.filter(r => r.document_type === type);
  check(matches.length > 0, "DOCUMENT_NOT_REGISTERED", id || type);
  check(matches.length === 1, "AMBIGUOUS_SELECTION", id || type);
  return matches[0];
}

export function compareRemote(record, remote) {
  if (!remote) return "SOURCE_UNAVAILABLE";
  if (remote.trashed) return "SOURCE_TRASHED";
  if (remote.id !== record.drive_file_id) return "SOURCE_ID_MISMATCH";
  if (!record.observed_modified_time) return "NO_METADATA_BASELINE";
  if (remote.modifiedTime !== record.observed_modified_time)
    return "METADATA_CHANGED_REVIEW_REQUIRED";
  if (remote.name !== record.document_name)
    return "NAME_CHANGED_REVIEW_REQUIRED";
  // Same metadata is not a proof of content, legal status or approval.
  return "METADATA_MATCH_ONLY";
}

export function toSourcePointer(record, metadataState) {
  return {
    document_id: record.document_id,
    document_type: record.document_type,
    name: record.document_name,
    drive_file_id: record.drive_file_id,
    drive_url: record.drive_url,
    source_role: record.source_role,
    source_version: record.source_version || null,
    internal_status: record.internal_status,
    external_status: record.external_status,
    related_ids: record.related,
    access_class: record.access_class,
    usage_policy: record.usage_policy,
    metadata_state: metadataState,
    substantive_review: "NOT_PERFORMED",
    official_approval_verified: false,
    may_edit_source: false
  };
}
