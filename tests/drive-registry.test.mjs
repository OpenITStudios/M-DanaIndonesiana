// Synthetic-only tests. Intentionally not executed while QA remains deferred.
import test from "node:test";
import assert from "node:assert/strict";
import {
  REGISTRY_COLUMNS, RegistryError, parseRegistryRows,
  resolveRecord, compareRemote, toSourcePointer
} from "../tools/drive-registry-core.mjs";

function row(document_id, type = "RAB", related = "") {
  const id = "synthetic-FileId_" + document_id.replace(/[^A-Za-z0-9]/g, "");
  return {
    document_id, document_type: type, document_name: "Synthetic " + document_id,
    drive_file_id: id, drive_url: "https://drive.google.com/file/d/" + id + "/view",
    source_role: "PROPOSED", internal_status: "UNVERIFIED",
    external_status: "UNKNOWN", source_version: "", related_ids: related,
    access_class: "INTERNAL_PROJECT", usage_policy: "READ_ONLY",
    observed_modified_time: "2026-01-01T00:00:00Z", last_reviewed_at: "",
    notes: "No actual project facts"
  };
}
function table(...records) {
  return [REGISTRY_COLUMNS, ...records.map(record => REGISTRY_COLUMNS.map(key => record[key] ?? ""))];
}

test("parses a linked synthetic registry and resolves exact ID", () => {
  const records = parseRegistryRows(table(
    row("DOC-SYNTHETIC-01", "RAB", "DOC-SYNTHETIC-02"),
    row("DOC-SYNTHETIC-02", "PROPOSAL", "DOC-SYNTHETIC-01")
  ));
  assert.equal(records.length, 2);
  assert.equal(resolveRecord(records, { id: "DOC-SYNTHETIC-01" }).related[0], "DOC-SYNTHETIC-02");
  assert.equal(toSourcePointer(records[0], "METADATA_MATCH_ONLY").official_approval_verified, false);
});

test("rejects duplicate IDs and broken relations", () => {
  assert.throws(() => parseRegistryRows(table(row("DOC-SYNTHETIC-01"), row("DOC-SYNTHETIC-01"))),
    err => err instanceof RegistryError && err.code === "DUPLICATE_DOCUMENT_ID");
  assert.throws(() => parseRegistryRows(table(row("DOC-SYNTHETIC-01", "RAB", "DOC-MISSING-02"))),
    err => err instanceof RegistryError && err.code === "BROKEN_RELATION");
});

test("rejects mismatched Drive URL and disallowed usage policy", () => {
  const badLink = row("DOC-SYNTHETIC-01");
  badLink.drive_url = "https://drive.google.com/file/d/wrong-id/view";
  assert.throws(() => parseRegistryRows(table(badLink)),
    err => err.code === "URL_FILE_ID_MISMATCH");
  const badPolicy = row("DOC-SYNTHETIC-01");
  badPolicy.usage_policy = "EDIT";
  assert.throws(() => parseRegistryRows(table(badPolicy)),
    err => err.code === "UNAUTHORIZED_USAGE_POLICY");
});

test("rejects an ambiguous document type", () => {
  const records = parseRegistryRows(table(row("DOC-SYNTHETIC-01"), row("DOC-SYNTHETIC-02")));
  assert.throws(() => resolveRecord(records, { type: "RAB" }),
    err => err.code === "AMBIGUOUS_SELECTION");
});

test("a matching timestamp is metadata-only, changes require review", () => {
  const record = parseRegistryRows(table(row("DOC-SYNTHETIC-01")))[0];
  const remote = {
    id: record.drive_file_id, name: record.document_name,
    modifiedTime: record.observed_modified_time, trashed: false
  };
  assert.equal(compareRemote(record, remote), "METADATA_MATCH_ONLY");
  assert.equal(compareRemote(record, { ...remote, modifiedTime: "2026-01-02T00:00:00Z" }),
    "METADATA_CHANGED_REVIEW_REQUIRED");
  assert.equal(compareRemote(record, null), "SOURCE_UNAVAILABLE");
});
