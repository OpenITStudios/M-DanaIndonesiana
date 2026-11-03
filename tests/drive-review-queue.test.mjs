// Synthetic-only P4 controlled review queue tests.
// Deliberately not executed while project QA remains deferred.
import test from "node:test";
import assert from "node:assert/strict";
import {
  REVIEW_QUEUE_COLUMNS, parseReviewQueueRows,
  buildReviewCandidates, reconcileReviewQueue
} from "../tools/drive-review-queue.mjs";
import { parseRegistryRows, REGISTRY_COLUMNS, REGISTRY_OPTIONAL_COLUMNS } from "../tools/drive-registry-core.mjs";
import { assessChangeImpact } from "../tools/drive-change-impact.mjs";

const NOW = "2026-11-03T12:00:00.000Z";
const COLUMNS = [...REGISTRY_COLUMNS, ...REGISTRY_OPTIONAL_COLUMNS];

function make(id, type="RAB", role="PROPOSED", derived="") {
  const drive_file_id = "synthetic_" + id.replaceAll("-", "_") + "_FileId";
  return {
    document_id:id, document_type:type, document_name:"Synthetic "+id,
    drive_file_id, drive_url:"https://drive.google.com/file/d/"+drive_file_id+"/view",
    source_role:role, internal_status:"UNVERIFIED", external_status:"UNKNOWN",
    source_version:"", related_ids:"", access_class:"INTERNAL_PROJECT",
    usage_policy:"READ_ONLY", observed_modified_time:"2026-11-01T00:00:00Z",
    last_reviewed_at:"", notes:"Synthetic only", derived_from_ids:derived
  };
}
function register(...rows) {
  return parseRegistryRows([COLUMNS,...rows.map(o=>COLUMNS.map(key=>o[key]??""))]);
}
function observations(records) {
  return Object.fromEntries(records.map(r=>[r.document_id,{
    id:r.drive_file_id, name:r.document_name,
    modifiedTime:r.observed_modified_time, version:"1", trashed:false
  }]));
}
function table(...rows) {
  return [REVIEW_QUEUE_COLUMNS,...rows.map(row=>REVIEW_QUEUE_COLUMNS.map(col=>row[col]??""))];
}
test("no output registered, matching metadata yields no invented review items",()=>{
  const r=register(make("DOC-SYNTHETIC-RAB"));
  const impact=assessChangeImpact(r,observations(r));
  const preview=reconcileReviewQueue(impact,table(),NOW);
  assert.equal(preview.status,"NO_NEW_REVIEW_ITEMS");
  assert.equal(preview.summary.candidates_detected,0);
  assert.equal(preview.auto_written,false);
});
test("repeat run produces exact same issue and never duplicates queue entries",()=>{
  const r=register(make("DOC-SYNTHETIC-RAB"));
  const state=observations(r);
  state["DOC-SYNTHETIC-RAB"].modifiedTime="2026-11-02T00:00:00Z";
  const impact=assessChangeImpact(r,state);
  const first=reconcileReviewQueue(impact,table(),NOW);
  const entry=first.new_candidates[0];
  assert.match(entry.review_id,/^RQ-[A-F0-9]{20}$/);
  assert.equal(first.summary.new_candidates,1);
  const second=reconcileReviewQueue(impact,table(entry),"2026-11-04T12:00:00.000Z");
  assert.equal(second.summary.new_candidates,0);
  assert.equal(second.summary.existing_open,1);
});
test("a resolved finding needs reviewer and decision; unchanged signature does not reopen",()=>{
  const r=register(make("DOC-SYNTHETIC-RAB"));
  const obs=observations(r);
  obs["DOC-SYNTHETIC-RAB"].modifiedTime="2026-11-02T00:00:00Z";
  const impact=assessChangeImpact(r,obs);
  const entry=buildReviewCandidates(impact,NOW)[0];
  assert.throws(()=>parseReviewQueueRows(table({...entry,status:"RESOLVED"})),/REVIEW_CLOSURE_NEEDS_EVIDENCE/);
  const reviewed={...entry,status:"RESOLVED",reviewer:"Synthetic reviewer",decision_ref:"SYNTHETIC-DECISION"};
  const second=reconcileReviewQueue(impact,table(reviewed),"2026-11-04T12:00:00.000Z");
  assert.equal(second.summary.previously_reviewed,1);
  assert.equal(second.summary.new_candidates,0);
  // A later new metadata fingerprint must generate a distinct review item.
  obs["DOC-SYNTHETIC-RAB"].modifiedTime="2026-11-05T00:00:00Z";
  const third=reconcileReviewQueue(assessChangeImpact(r,obs),table(reviewed),
    "2026-11-05T12:00:00.000Z");
  assert.equal(third.summary.new_candidates,1);
  assert.notEqual(third.new_candidates[0].review_id,entry.review_id);
});
test("derived output creates one review candidate despite own and upstream changes",()=>{
  const r=register(
    make("DOC-SYNTHETIC-RAB"),make("DOC-SYNTHETIC-REPORT","REPORT","DERIVED_OUTPUT","DOC-SYNTHETIC-RAB")
  );
  const obs=observations(r);
  obs["DOC-SYNTHETIC-RAB"].modifiedTime="2026-11-02T00:00:00Z";
  obs["DOC-SYNTHETIC-REPORT"].modifiedTime="2026-11-02T00:00:00Z";
  const candidates=buildReviewCandidates(assessChangeImpact(r,obs),NOW);
  assert.equal(candidates.filter(c=>c.document_id==="DOC-SYNTHETIC-REPORT").length,1);
  assert.equal(candidates.filter(c=>c.document_id==="DOC-SYNTHETIC-RAB").length,1);
  assert.equal(candidates.find(c=>c.document_id==="DOC-SYNTHETIC-REPORT").finding_type,
    "DERIVED_OUTPUT_REVIEW");
});
test("inaccessible source and unindexed files are separately reviewed; no approval",()=>{
  const r=register(make("DOC-SYNTHETIC-RAB"));
  const obs=observations(r);
  obs["DOC-SYNTHETIC-RAB"]=null;
  const impact=assessChangeImpact(r,obs);
  impact.unindexed_files=[{drive_file_id:"synthetic_unindexed_id_2026",name:"Synthetic placeholder"}];
  const queue=reconcileReviewQueue(impact,table(),NOW);
  assert.equal(queue.status,"INCOMPLETE_SOURCE_CHECK");
  assert.equal(queue.summary.new_candidates,2);
  assert.equal(queue.requires_human_review,true);
  assert.equal(queue.source_documents_modified,false);
});
test("a missing finding is never auto-closed when current scan is clean",()=>{
  const r=register(make("DOC-SYNTHETIC-RAB"));
  const obs=observations(r);
  obs["DOC-SYNTHETIC-RAB"].modifiedTime="2026-11-02T00:00:00Z";
  const oldEntry=buildReviewCandidates(assessChangeImpact(r,obs),NOW)[0];
  const clean=reconcileReviewQueue(assessChangeImpact(r,observations(r)),
    table(oldEntry),"2026-11-04T12:00:00.000Z");
  assert.equal(clean.summary.not_seen_but_open,1);
  assert.equal(clean.status,"REVIEW_STILL_PENDING");
});
test("duplicate keys and invalid status fail closed",()=>{
  const r=register(make("DOC-SYNTHETIC-RAB"));
  const obs=observations(r);
  obs["DOC-SYNTHETIC-RAB"].modifiedTime="2026-11-02T00:00:00Z";
  const entry=buildReviewCandidates(assessChangeImpact(r,obs),NOW)[0];
  assert.throws(()=>parseReviewQueueRows(table(entry,entry)),/DUPLICATE_REVIEW_ID/);
  assert.throws(()=>parseReviewQueueRows(table({...entry,status:"APPROVED"})),/INVALID_REVIEW_STATE/);
});
