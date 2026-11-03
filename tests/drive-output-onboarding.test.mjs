// Synthetic-only P5 onboarding preview contract tests. Not executed while QA is deferred.
import test from "node:test";
import assert from "node:assert/strict";
import {
  REGISTRY_COLUMNS, REGISTRY_OPTIONAL_COLUMNS, parseRegistryRows
} from "../tools/drive-registry-core.mjs";
import { prepareOutputIntake, parseOutputSourceIds } from "../tools/drive-output-onboarding.mjs";

const root="synthetic_ProjectRoot_2026";
const allowed="synthetic_ReportsFolder_2026";
const fileId="synthetic_ActualReportFile_2026";
const columns=[...REGISTRY_COLUMNS,...REGISTRY_OPTIONAL_COLUMNS];
const original={
  document_id:"DOC-SYNTHETIC-SOURCE",
  document_type:"RAB", document_name:"Synthetic RAB",
  drive_file_id:"synthetic_RegisteredSource_2026",
  drive_url:"https://drive.google.com/file/d/synthetic_RegisteredSource_2026/view",
  source_role:"PROPOSED", internal_status:"UNVERIFIED", external_status:"UNKNOWN",
  source_version:"", related_ids:"", access_class:"INTERNAL_PROJECT",
  usage_policy:"READ_ONLY", observed_modified_time:"2026-11-03T08:00:00Z",
  last_reviewed_at:"", notes:"", derived_from_ids:""
};
const registry=()=>parseRegistryRows([columns,columns.map(key=>original[key]||"")]);
const remote=()=>({
  id:fileId, name:"Laporan Proyek (Synthetic).pdf", trashed:false,
  mimeType:"application/pdf", modifiedTime:"2026-11-03T08:50:00Z",
  webViewLink:"https://drive.google.com/file/d/"+fileId+"/view?usp=drivesdk",
  parents:[allowed]
});
const options=()=>({
  documentId:"DOC-SYNTHETIC-REPORT",
  outputType:"FINANCIAL_REPORT",
  sourceIds:["DOC-SYNTHETIC-SOURCE"],
  projectRootId:root,
  allowedFolderId:allowed,
  ancestorIds:[allowed,root]
});

test("proposes one compatible private registry row but never registers or approves",()=>{
  const source=registry();
  const preview=prepareOutputIntake(source,remote(),options());
  assert.equal(preview.kind,"drive_output_intake_preview_v1");
  assert.equal(preview.status,"SOURCE_LINKS_PROPOSED_PENDING_CONTENT_REVIEW");
  assert.equal(preview.proposed_registry_row.source_role,"DERIVED_OUTPUT");
  assert.equal(preview.proposed_registry_row.external_status,"UNKNOWN");
  assert.equal(preview.proposed_registry_row.internal_status,"UNVERIFIED");
  assert.equal(preview.proposed_registry_row.derived_from_ids,"DOC-SYNTHETIC-SOURCE");
  assert.equal(preview.checks.report_content_reviewed,false);
  assert.equal(preview.may_register_without_human_review,false);
  assert.equal(preview.registry_write_performed,false);
  assert.equal(source.length,1);
  assert.equal(preview.registry_columns.length,16);
  assert.equal(preview.registry_values.length,16);
  assert.equal(preview.proposed_registry_row.drive_url,
    "https://drive.google.com/file/d/"+fileId+"/view?usp=drivesdk");
});

test("unknown source lineage stays unmapped, never fabricated",()=>{
  const p=prepareOutputIntake(registry(),remote(),{...options(),sourceIds:[]});
  assert.equal(p.status,"SOURCE_LINEAGE_NOT_MAPPED");
  assert.equal(p.proposed_registry_row.derived_from_ids,"");
});

test("rejects report outside approved reporting folder even inside project",()=>{
  assert.throws(()=>prepareOutputIntake(registry(),remote(),{
    ...options(),ancestorIds:["synthetic_OtherFolder_2026",root]
  }),/OUTPUT_IMMEDIATE_PARENT_MISMATCH/);
  assert.throws(()=>prepareOutputIntake(registry(),remote(),{
    ...options(),ancestorIds:[allowed]
  }),/OUTPUT_OUTSIDE_APPROVED_PROJECT_REPORT_FOLDER/);
  assert.throws(()=>prepareOutputIntake(registry(),remote(),{
    ...options(),ancestorIds:[allowed,root,allowed]
  }),/CYCLIC_FOLDER_ANCESTRY/);
});

test("rejects duplicate document ID, duplicate Drive file and unindexed dependencies",()=>{
  assert.throws(()=>prepareOutputIntake(registry(),remote(),{
    ...options(),documentId:"DOC-SYNTHETIC-SOURCE"
  }),/OUTPUT_ID_ALREADY_REGISTERED/);
  assert.throws(()=>prepareOutputIntake(registry(),{
    ...remote(),id:original.drive_file_id,
    webViewLink:original.drive_url
  },options()),/DRIVE_FILE_ALREADY_REGISTERED/);
  assert.throws(()=>prepareOutputIntake(registry(),remote(),{
    ...options(),sourceIds:["DOC-NOT-REGISTERED"]
  }),/SOURCE_NOT_REGISTERED/);
});

test("rejects dangerous links, shortcuts and wrong document MIME types",()=>{
  assert.throws(()=>prepareOutputIntake(registry(),{
    ...remote(),webViewLink:"https://evil.example/file/d/"+fileId+"/view"
  },options()),/UNTRUSTED_REMOTE_LINK_HOST/);
  assert.throws(()=>prepareOutputIntake(registry(),{
    ...remote(),webViewLink:"https://drive.google.com/file/d/wrong-target-id/view"
  },options()),/REMOTE_LINK_ID_MISMATCH/);
  assert.throws(()=>prepareOutputIntake(registry(),{
    ...remote(),mimeType:"application/vnd.google-apps.shortcut"
  },options()),/UNSUPPORTED_OUTPUT_MIME/);
});

test("rejects duplicate or malformed source ID selections",()=>{
  assert.deepEqual(parseOutputSourceIds(""),[]);
  assert.deepEqual(parseOutputSourceIds("DOC-SYNTHETIC-SOURCE"),["DOC-SYNTHETIC-SOURCE"]);
  assert.throws(()=>parseOutputSourceIds("DOC-SYNTHETIC-SOURCE,DOC-SYNTHETIC-SOURCE"),/DUPLICATE_OUTPUT_SOURCE_ID/);
  assert.throws(()=>parseOutputSourceIds("DOC-SYNTHETIC-SOURCE,../secret"),/INVALID_OUTPUT_SOURCE_ID/);
});

test("caller-provided ancestor sequence must start at the real parent and end at project root",()=>{
  const metadata=remote();
  assert.throws(()=>prepareOutputIntake(registry(),metadata,{
    ...options(),ancestorIds:[root,allowed]
  }),/OUTPUT_IMMEDIATE_PARENT_MISMATCH/);
  assert.throws(()=>prepareOutputIntake(registry(),metadata,{
    ...options(),ancestorIds:[allowed,root,"synthetic_UnrelatedRoot_2026"]
  }),/OUTPUT_OUTSIDE_APPROVED_PROJECT_REPORT_FOLDER/);
  assert.throws(()=>prepareOutputIntake(registry(),{
    ...metadata, parents:["synthetic_UnexpectedFolder_2026"]
  },options()),/OUTPUT_IMMEDIATE_PARENT_MISMATCH/);
});

