import test from "node:test";
import assert from "node:assert/strict";
import {inspectItalicRuns} from "../tools/google-native-typography-qa.mjs";

const paragraph=(text,italic,heading="NORMAL_TEXT")=>({paragraph:{
  paragraphStyle:{namedStyleType:heading},
  elements:[{startIndex:1,endIndex:text.length+1,textRun:{content:text,textStyle:{italic}}}]
}});
const doc=(...ps)=>({documentId:"SYNTHETIC-DOC-ID",tabs:[{tabId:"t.0",body:{content:ps}}]});
test("plain scholarly body with bold upright headings needs no italics",()=>{
  const r=inspectItalicRuns(doc(paragraph("1. Pelaksanaan Kegiatan",false,"HEADING_1"),
    paragraph("Rencana kerja",false,"HEADING_2"),paragraph("Laporan ini menggunakan sumber yang tercatat.",false)));
  assert.equal(r.status,"ITALIC_USAGE_CHECKED");
  assert.equal(r.italicCount,0);
});
test("decorative italic heading is flagged",()=>{
  const r=inspectItalicRuns(doc(paragraph("Rencana kerja",true,"HEADING_2")));
  assert.equal(r.status,"TYPOGRAPHY_REVIEW_REQUIRED");
  assert.ok(r.italicRuns[0].findings.includes("HEADING_ITALIC_REQUIRES_FORMAT_REVIEW"));
  assert.ok(r.italicRuns[0].findings.includes("ITALIC_REASON_UNVERIFIED"));
});
test("approved foreign term is allowed only when exact run is reviewed",()=>{
  const foreign={text:"walkthrough",reason:"EYD_FOREIGN_OR_REGIONAL",source_ref:"EYD-V-G"};
  const r=inspectItalicRuns(doc(paragraph("walkthrough",true)),{approved:[foreign]});
  assert.equal(r.status,"ITALIC_USAGE_CHECKED");
  assert.equal(r.italicRuns[0].approvedReason,"EYD_FOREIGN_OR_REGIONAL");
  const unreviewed=inspectItalicRuns(doc(paragraph("Google Docs",true)),{approved:[foreign]});
  assert.equal(unreviewed.status,"TYPOGRAPHY_REVIEW_REQUIRED");
  assert.ok(unreviewed.italicRuns[0].findings.includes("ITALIC_REASON_UNVERIFIED"));
});
test("official exception for named heading requires source and specific approval",()=>{
  const r=inspectItalicRuns(doc(paragraph("Abstract",true,"HEADING_2")),{approved:[
    {text:"Abstract",reason:"VERIFIED_OFFICIAL_FORMAT",source_ref:"VERIFIED-STYLE-SHEET-01"}
  ]});
  assert.equal(r.status,"ITALIC_USAGE_CHECKED");
  assert.deepEqual(r.italicRuns[0].findings,[]);
});
test("invalid approval reason or missing source cannot mark italic justified",()=>{
  assert.throws(()=>inspectItalicRuns(doc(paragraph("walkthrough",true)),{approved:[
    {text:"walkthrough",reason:"AI_FANCY",source_ref:"EYD"}]}),{code:"INVALID_ITALIC_APPROVAL"});
  assert.throws(()=>inspectItalicRuns(doc(),{approved:[
    {text:"walkthrough",reason:"EYD_FOREIGN_OR_REGIONAL"}]}),{code:"INVALID_ITALIC_APPROVAL"});
});
