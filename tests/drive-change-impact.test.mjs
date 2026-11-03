// P3 change impact tests. Synthetic-only: no credentials, actual files, real project data or writes.
// Authenticated Google API and project acceptance remain deferred.
import test from "node:test";
import assert from "node:assert/strict";
import {
  REGISTRY_COLUMNS, REGISTRY_OPTIONAL_COLUMNS, parseRegistryRows
} from "../tools/drive-registry-core.mjs";
import {
  classifyDriveObservation, assessChangeImpact
} from "../tools/drive-change-impact.mjs";

const columns = [...REGISTRY_COLUMNS, ...REGISTRY_OPTIONAL_COLUMNS];
function file(document_id, document_type = "RAB", role = "PROPOSED", derived = "", related = "") {
  const drive_file_id = "synthetic_file_" + document_id.replaceAll("-", "_") + "_id";
  return {
    document_id, document_type, document_name: "Synthetic " + document_id,
    drive_file_id, drive_url: "https://drive.google.com/file/d/" + drive_file_id + "/view",
    source_role: role, internal_status: "UNVERIFIED",
    external_status: "UNKNOWN", source_version: "", related_ids: related,
    access_class: "INTERNAL_PROJECT", usage_policy: "READ_ONLY",
    observed_modified_time: "2026-11-01T00:00:00Z", last_reviewed_at: "",
    notes: "Synthetic example only", derived_from_ids: derived
  };
}
function registry(...items) {
  return parseRegistryRows([columns, ...items.map(entry => columns.map(key => entry[key] ?? ""))]);
}
function observed(records, changes = {}) {
  return Object.fromEntries(records.map(record => {
    const baseline = { id: record.drive_file_id, name: record.document_name,
      modifiedTime: record.observed_modified_time, trashed: false };
    return [record.document_id, changes[record.document_id] === undefined
      ? baseline : changes[record.document_id]];
  }));
}

test("P3 extension stays optional for old registry sheets", () => {
  const entry = file("DOC-SYNTHETIC-A");
  const records = parseRegistryRows([
    REGISTRY_COLUMNS, REGISTRY_COLUMNS.map(key => entry[key] ?? "")
  ]);
  assert.deepEqual(records[0].derived_from, []);
});

test("name and modified-time differences produce signals, never content validation", () => {
  const item = registry(file("DOC-SYNTHETIC-A"))[0];
  const state = classifyDriveObservation(item, {
    id: item.drive_file_id, name: "Synthetic renamed",
    modifiedTime: "2026-11-02T00:00:00Z"
  });
  assert.equal(state.state, "METADATA_CHANGE_SIGNAL");
  assert.deepEqual(state.flags, ["NAME_CHANGED", "MODIFIED_TIME_CHANGED"]);
  assert.equal(state.content_checked, false);
  assert.equal(state.approval_checked, false);
});

test("matching metadata is not proof of unchanged document contents", () => {
  const records = registry(file("DOC-SYNTHETIC-A"));
  const report = assessChangeImpact(records, observed(records));
  assert.equal(report.check_status, "NO_METADATA_CHANGE_SIGNAL");
  assert.equal(report.matched_metadata_only, 1);
  assert.match(report.interpretation, /does not establish authenticity/);
  assert.equal(report.derived_mapping_coverage, "NO_DERIVED_OUTPUTS_INDEXED");
});

test("RAB change impacts only the explicitly derived report, not its unrelated peer", () => {
  const records = registry(
    file("DOC-SYNTHETIC-RAB", "RAB", "PROPOSED", "", "DOC-SYNTHETIC-PROPOSAL"),
    file("DOC-SYNTHETIC-PROPOSAL", "PROPOSAL", "PROPOSED", "", "DOC-SYNTHETIC-RAB"),
    file("DOC-SYNTHETIC-REPORT", "REPORT", "DERIVED_OUTPUT", "DOC-SYNTHETIC-RAB")
  );
  const remote = observed(records);
  remote["DOC-SYNTHETIC-RAB"].modifiedTime = "2026-11-02T00:00:00Z";
  const report = assessChangeImpact(records, remote);
  assert.equal(report.summary.changed_count, 1);
  assert.deepEqual(report.impacted_outputs.map(o => o.document_id), ["DOC-SYNTHETIC-REPORT"]);
  assert.deepEqual(report.impacted_outputs[0].upstream_ids, ["DOC-SYNTHETIC-RAB"]);
  assert.equal(report.impacted_outputs[0].automatic_status_update, false);
  assert.equal(report.related_document_context[0].related_ids_for_context.includes("DOC-SYNTHETIC-PROPOSAL"), true);
  assert.equal(report.workflow_impact_candidates.some(w => w.workflow_id === "change-package"), true);
  assert.equal(report.workflow_impact_candidates.some(w => w.workflow_id === "finance-report"), false);
});

test("explicit transitive derived outputs inherit only real ancestry", () => {
  const records = registry(
    file("DOC-SYNTHETIC-RAB", "RAB"),
    file("DOC-SYNTHETIC-REPORT", "REPORT", "DERIVED_OUTPUT", "DOC-SYNTHETIC-RAB"),
    file("DOC-SYNTHETIC-SUMMARY", "SUMMARY", "DERIVED_OUTPUT", "DOC-SYNTHETIC-REPORT")
  );
  const remote = observed(records);
  remote["DOC-SYNTHETIC-RAB"].modifiedTime = "2026-11-02T00:00:00Z";
  const report = assessChangeImpact(records, remote);
  assert.deepEqual(report.impacted_outputs.map(o => o.document_id),
    ["DOC-SYNTHETIC-REPORT", "DOC-SYNTHETIC-SUMMARY"]);
  assert.deepEqual(report.impacted_outputs[1].upstream_ids,
    ["DOC-SYNTHETIC-RAB"]);
});

test("unreachable or unchecked sources show uncertainty without inventing a change", () => {
  const records = registry(file("DOC-SYNTHETIC-RAB"), file("DOC-SYNTHETIC-REPORT", "REPORT",
    "DERIVED_OUTPUT", "DOC-SYNTHETIC-RAB"));
  const o = observed(records);
  o["DOC-SYNTHETIC-RAB"] = null;
  const report = assessChangeImpact(records, o);
  assert.equal(report.check_status, "INCOMPLETE_METADATA_CHECK");
  assert.equal(report.summary.changed_count, 0);
  assert.equal(report.summary.uncertain_count, 1);
  assert.deepEqual(report.impacted_outputs[0].upstream_ids, ["DOC-SYNTHETIC-RAB"]);
  const nothing = assessChangeImpact(records, {});
  assert.equal(nothing.summary.uncertain_count, 2);
});

test("broken derivation and cycles are rejected by the registry parser", () => {
  assert.throws(() => registry(file("DOC-SYNTHETIC-A", "REPORT",
    "DERIVED_OUTPUT", "DOC-SYNTHETIC-NOT-REGISTERED")), /BROKEN_DERIVATION/);
  assert.throws(() => registry(
    file("DOC-SYNTHETIC-A", "REPORT", "DERIVED_OUTPUT", "DOC-SYNTHETIC-B"),
    file("DOC-SYNTHETIC-B", "REPORT", "DERIVED_OUTPUT", "DOC-SYNTHETIC-A")
  ), /CYCLIC_DERIVATION/);
  assert.throws(() => registry(file("DOC-SYNTHETIC-A", "REPORT",
    "PROPOSED", "DOC-SYNTHETIC-B"), file("DOC-SYNTHETIC-B")),
  /DERIVATION_REQUIRES_OUTPUT_ROLE/);
});

test("one metadata failure does not make an impact assessment look fully checked", () => {
  const records = registry(file("DOC-SYNTHETIC-A"), file("DOC-SYNTHETIC-B"));
  const o = observed(records);
  o["DOC-SYNTHETIC-A"] = { error: "METADATA_CHECK_FAILED" };
  const report = assessChangeImpact(records, o);
  assert.equal(report.check_status, "INCOMPLETE_METADATA_CHECK");
  assert.equal(report.summary.uncertain_count, 1);
});
