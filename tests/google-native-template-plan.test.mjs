import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {TEMPLATE_MASTER_COLUMNS, validateTemplateCatalog,
  parseTemplateMasters, prepareTemplate, buildGoogleWritePlan} from '../tools/google-native-template-plan.mjs';

const catalog = JSON.parse(readFileSync(new URL('../templates/google-native/catalog.json',import.meta.url),'utf8'));
const id = '1SyntheticGoogleMaster01';
const copyId = '1SyntheticGoogleCopy0001';
const stamp = '2026-11-01T08:00:00.000Z';
const masterDoc = (type, idKey, scope='GLOBAL') =>
  TEMPLATE_MASTER_COLUMNS.map(key => ({
    template_id:idKey,template_version:'1.0.0',master_file_id:id,
    mime_type:type,master_status:'READY',authority:'INTERNAL',source_document_id:'',
    project_scope:scope,observed_modified_time:stamp,reviewer_ref:'REVIEWER-SYNTHETIC'
  })[key]);
const rows = (type,idKey) => [[...TEMPLATE_MASTER_COLUMNS],masterDoc(type,idKey)];
const remote = type => ({id,mimeType:type,modifiedTime:stamp,trashed:false});
const docMime = 'application/vnd.google-apps.document';
const sheetMime = 'application/vnd.google-apps.spreadsheet';

function indicator(valuesOverride={}) {
  return prepareTemplate({catalog,templateId:'di.report.indicator',version:'1.0.0',
    masterRows:rows(docMime,'di.report.indicator'),projectScope:'SYNTHETIC',
    masterMetadata:remote(docMime),sourceDocumentIds:['DOC-SYN-01'],
    values:{fields:{project_name:'SYNTHETIC',period:'Nov 2026',indicator:'Output 1',
      planned_stages:'Planned',actual_activities:'Recorded',verifiable_results:'Pending',
      ...valuesOverride}}});
}

test('ten versioned public catalog specifications validate',()=>{
  assert.equal(validateTemplateCatalog(catalog).templates.length,10);
});
test('private master mapping rejects invalid headers and duplicates',()=>{
  assert.throws(()=>parseTemplateMasters([['template_id']]),{code:'INVALID_TEMPLATE_MASTER_HEADER'});
  assert.throws(()=>parseTemplateMasters([...rows(docMime,'di.report.indicator'),masterDoc(docMime,'di.report.indicator')]),
    {code:'DUPLICATE_TEMPLATE_MASTER'});
});
test('Google Docs replacement plan targets native copy and retains DRAFT status',()=>{
  const p=indicator();
  const out=buildGoogleWritePlan(p,{copyMetadata:{id:copyId,mimeType:docMime}});
  assert.equal(out.requests.length,9);
  assert.equal(out.requests[0].replaceAllText.containsText.text,'{{PROJECT_NAME}}');
  assert.equal(out.requests[0].replaceAllText.replaceText,'SYNTHETIC');
  assert.equal(out.target_file_id,copyId);
  assert.equal(p.external_status,'UNKNOWN');
});
test('required missing data, template injection tokens and stale masters fail closed',()=>{
  assert.throws(()=>indicator({indicator:''}),{code:'REQUIRED_VALUE_MISSING'});
  const copy=prepareTemplate({catalog,templateId:'di.report.indicator',version:'1.0.0',
    masterRows:rows(docMime,'di.report.indicator'),projectScope:'SYNTHETIC',
    masterMetadata:{id,mime_type:docMime,modified_time:stamp},
    values:{fields:{project_name:'P',period:'T',indicator:'X',planned_stages:'A',
      actual_activities:'B',verifiable_results:'C'}}});
  assert.equal(copy.status,'DRAFT_PREFLIGHT');
  assert.throws(()=>indicator({indicator:'{{UNSAFE_TOKEN}}'}),{code:'UNSAFE_OR_INVALID_FIELD_VALUE'});
  assert.throws(()=>prepareTemplate({catalog,templateId:'di.report.indicator',version:'1.0.0',
    masterRows:rows(docMime,'di.report.indicator'),projectScope:'SYNTHETIC',
    masterMetadata:{...remote(docMime),modifiedTime:'2026-11-02T08:00:00Z'},
    values:{fields:{}}}),{code:'MASTER_METADATA_UNVERIFIED_OR_CHANGED'});
});
test('Google Sheets writes numerical money and formula-like text literally',()=>{
  const p=prepareTemplate({catalog,templateId:'di.procurement.price-comparison',version:'1.0.0',
    masterRows:rows(sheetMime,'di.procurement.price-comparison'),projectScope:'SYNTHETIC',
    masterMetadata:remote(sheetMime),values:{fields:{item_name:'=HYPERLINK("https://invalid.test")',
      rab_reference:'RAB-SYN',research_date:'2026-11-01'},tables:{offers:[{
        vendor:'Vendor synthetic',specification:'like for like',price:'125000',
        evidence_ref:'EVD-SYN-1',notes:'No tax estimate'}]}}});
  const out=buildGoogleWritePlan(p,{copyMetadata:{id:copyId,mimeType:sheetMime},
    sheetMetadata:[{title:'Perbandingan',sheetId:22,rowCount:100,columnCount:12}]});
  assert.equal(out.requests.length,4);
  assert.deepEqual(out.requests[0].updateCells.rows[0].values[0].userEnteredValue,
    {stringValue:'=HYPERLINK("https://invalid.test")'});
  assert.deepEqual(out.requests.at(-1).updateCells.rows[0].values[2].userEnteredValue,{numberValue:125000});
  assert.equal(out.requests.at(-1).updateCells.start.sheetId,22);
  const nested=buildGoogleWritePlan(p,{copyMetadata:{id:copyId,mimeType:sheetMime},
    sheetMetadata:{sheets:[{properties:{title:'Perbandingan',sheetId:22,
      gridProperties:{rowCount:100,columnCount:12}}}]}});
  assert.deepEqual(nested.requests,out.requests);
});
test('Sheets date input writes true date serial and accepts connected copy mime shape',()=>{
  const p=prepareTemplate({catalog,templateId:'di.procurement.price-comparison',version:'1.0.0',
    masterRows:rows(sheetMime,'di.procurement.price-comparison'),projectScope:'SYNTHETIC',
    masterMetadata:remote(sheetMime),values:{fields:{item_name:'Paper A4',
      rab_reference:'RAB-SYN',research_date:'2026-11-03'},tables:{offers:[
      {vendor:'Vendor A',specification:'80 gsm',price:'58000',evidence_ref:'EVD-SYN-1',notes:'=100+1'}
    ]}}});
  const plan=buildGoogleWritePlan(p,{copyMetadata:{id:copyId,mime_type:sheetMime},sheetMetadata:{
    sheets:[{properties:{title:'Perbandingan',sheetId:35,gridProperties:{rowCount:72,columnCount:5}}}]}});
  const date=plan.requests.find(x=>x.updateCells?.start?.rowIndex===3);
  assert.deepEqual(date.updateCells.rows[0].values[0].userEnteredValue,{numberValue:46329});
  const table=plan.requests.find(x=>x.updateCells?.start?.rowIndex===7);
  assert.deepEqual(table.updateCells.rows[0].values[2].userEnteredValue,{numberValue:58000});
  assert.deepEqual(table.updateCells.rows[0].values[4].userEnteredValue,{stringValue:'=100+1'});
  assert.equal(plan.target_file_id,copyId);
});
test('no silent truncation; reject sheet capacity, precision and missing copy',()=>{
  const config={catalog,templateId:'di.procurement.price-comparison',version:'1.0.0',
    masterRows:rows(sheetMime,'di.procurement.price-comparison'),projectScope:'SYNTHETIC',
    masterMetadata:remote(sheetMime)};
  const valid={fields:{item_name:'Item',rab_reference:'RAB',research_date:'2026-11-01'},
    tables:{offers:[{vendor:'A',specification:'B',price:'12',evidence_ref:'C'}]}};
  const p=prepareTemplate({...config,values:valid});
  assert.throws(()=>buildGoogleWritePlan(p,{copyMetadata:{id:copyId,mimeType:sheetMime},
    sheetMetadata:[{title:'Perbandingan',sheetId:2,rowCount:7,columnCount:10}]}),
    {code:'SHEET_GRID_CAPACITY_EXCEEDED'});
  assert.throws(()=>prepareTemplate({...config,values:{...valid,
    tables:{offers:[{...valid.tables.offers[0],price:'1000000000000000'}]}}}),
    {code:'INVALID_INTEGER'});
  assert.throws(()=>buildGoogleWritePlan(p,{copyMetadata:{id,mimeType:sheetMime}}),{code:'COPY_NOT_VERIFIED'});
});