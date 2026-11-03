// P2 workflow bridge scenarios use synthetic registry data only.
// Not executed while project-level QA remains intentionally deferred.
import test from "node:test";
import assert from "node:assert/strict";
import { parseRegistryRows, REGISTRY_COLUMNS } from "../tools/drive-registry-core.mjs";
import {
  WORKFLOWS, parseSelections, selectWorkflowSources, buildWorkflowHandoff
} from "../tools/drive-workflow-bridge.mjs";

function make(id, type, role = "PROPOSED") {
  const fileId = "synthetic_" + id.replace(/[^A-Za-z0-9]/g, "") + "_longFileId";
  return {
    document_id: id, document_type: type, document_name: "Synthetic " + id,
    drive_file_id: fileId,
    drive_url: "https://drive.google.com/file/d/" + fileId + "/view",
    source_role: role, internal_status: "UNVERIFIED",
    external_status: "UNKNOWN", source_version: "", related_ids: "",
    access_class: "INTERNAL_PROJECT", usage_policy: "READ_ONLY",
    observed_modified_time: "2026-01-01T00:00:00Z",
    last_reviewed_at: "", notes: "Synthetic fixture"
  };
}
function records(...data) {
  return parseRegistryRows([
    REGISTRY_COLUMNS, ...data.map(row => REGISTRY_COLUMNS.map(key => row[key] ?? ""))
  ]);
}

test("all seven existing skills own at least one workflow", () => {
  assert.deepEqual(new Set(Object.values(WORKFLOWS).map(x => x.primary_skill)),
    new Set(["grant-administration", "finance-reporting", "creative-documentation",
      "evidence-audit", "regulatory-applicability", "creative-production",
      "dissemination-rights"]));
});

test("change package produces three required pointers without approval", () => {
  const list = records(
    make("DOC-TEST-PROPOSAL", "PROPOSAL"),
    make("DOC-TEST-RAB", "RAB"),
    make("DOC-TEST-TIMELINE", "LINIMASA")
  );
  const plan = selectWorkflowSources(list, "change-package");
  const checks = Object.fromEntries(plan.matched.map(x =>
    [x.record.document_id, "METADATA_MATCH_ONLY"]));
  const result = buildWorkflowHandoff(plan, checks);
  assert.equal(result.primary_skill, "grant-administration");
  assert.equal(result.sources.filter(s => s.purpose === "REQUIRED").length, 3);
  assert.equal(result.status, "POINTERS_READY_FOR_CONTENT_REVIEW");
  assert.equal(result.document_bodies_read, false);
  assert.equal(result.official_approval_verified, false);
  assert.equal(result.may_submit_or_edit, false);
});

test("actual disbursement remains blocked when agreement and approved RAB are unindexed", () => {
  const list = records(make("DOC-TEST-RAB", "RAB", "PROPOSED"));
  const plan = selectWorkflowSources(list, "disbursement-readiness");
  const result = buildWorkflowHandoff(plan);
  assert.equal(result.status, "SOURCE_SELECTION_BLOCKED");
  assert.deepEqual(result.missing_or_unindexed.filter(g => g.required)
    .map(g => g.document_type).sort(), ["AGREEMENT", "FUNDING_PLAN", "RAB"]);
  assert.equal(result.sources.length, 0);
});

test("a proposed RAB is acceptable for draft analysis but not finance-report baseline", () => {
  const list = records(make("DOC-TEST-RAB", "RAB", "PROPOSED"));
  assert.equal(selectWorkflowSources(list, "rab-review").matched.length, 1);
  const report = buildWorkflowHandoff(selectWorkflowSources(list, "finance-report"));
  assert.equal(report.status, "SOURCE_SELECTION_BLOCKED");
});

test("ambiguous RAB candidates require explicit selection", () => {
  const list = records(
    make("DOC-TEST-RAB-A", "RAB"),
    make("DOC-TEST-RAB-B", "RAB")
  );
  const auto = selectWorkflowSources(list, "rab-review");
  assert.equal(auto.ambiguous.length, 1);
  assert.equal(buildWorkflowHandoff(auto).status, "SOURCE_SELECTION_BLOCKED");
  const selected = parseSelections("RAB=DOC-TEST-RAB-B");
  const plan = selectWorkflowSources(list, "rab-review", selected);
  assert.equal(plan.ambiguous.length, 0);
  assert.equal(plan.matched.find(x => x.document_type === "RAB").record.document_id,
    "DOC-TEST-RAB-B");
});

test("metadata changes prevent pointer-ready classification", () => {
  const list = records(make("DOC-TEST-RAB", "RAB", "PROPOSED"));
  const plan = selectWorkflowSources(list, "rab-review");
  const result = buildWorkflowHandoff(plan, {
    "DOC-TEST-RAB": "METADATA_CHANGED_REVIEW_REQUIRED"
  });
  assert.equal(result.status, "METADATA_REVIEW_REQUIRED");
  assert.equal(result.sources[0].metadata_state, "METADATA_CHANGED_REVIEW_REQUIRED");
});

test("missing optional references are visible but do not falsely block source selection", () => {
  const list = records(make("DOC-TEST-RAB", "RAB", "PROPOSED"));
  const plan = selectWorkflowSources(list, "rab-review");
  const result = buildWorkflowHandoff(plan, { "DOC-TEST-RAB": "METADATA_MATCH_ONLY" });
  assert.equal(result.status, "POINTERS_READY_FOR_CONTENT_REVIEW");
  assert.equal(result.missing_or_unindexed.length, 2);
  assert.equal(result.missing_or_unindexed.every(g => !g.required), true);
});

test("multiple candidate program references may be returned for rule comparison", () => {
  const list = records(
    make("DOC-TEST-REFERENCE-A", "PROGRAM_REFERENCE", "CANDIDATE_REFERENCE"),
    make("DOC-TEST-REFERENCE-B", "PROGRAM_REFERENCE", "CANDIDATE_REFERENCE"),
    make("DOC-TEST-HISTORY-C", "PROGRAM_REFERENCE", "HISTORICAL")
  );
  const plan = selectWorkflowSources(list, "regulatory-review");
  assert.equal(plan.matched.length, 3);
  assert.equal(plan.matched.filter(s => s.required).length, 2);
});

test("selection parsing rejects unknown, duplicate and malformed source identifiers", () => {
  assert.throws(() => parseSelections("RAB=DOC-TEST-A,RAB=DOC-TEST-B"));
  assert.throws(() => parseSelections("RAB=../../secret"));
  assert.throws(() => selectWorkflowSources([], "change-package", { EVIDENCE: "DOC-TEST-A" }));
  assert.throws(() => selectWorkflowSources([], "not-defined"));
});
