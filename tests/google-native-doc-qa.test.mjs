import test from "node:test";
import assert from "node:assert/strict";
import {inspectNativeDoc,planPageBreakBeforeHeading,evaluatePdfGeometry} from "../tools/google-native-doc-qa.mjs";

const token=t=>"{{"+t+"}}";
const all=["PROJECT_NAME","PERIOD","INDICATOR","PLANNED_STAGES","ACTUAL_ACTIVITIES","VERIFIABLE_RESULTS","OBSTACLES","NEXT_ACTIONS","EVIDENCE_REFS"].map(token);
const p=(text,start,style="NORMAL_TEXT")=>({startIndex:start,endIndex:start+text.length+1,
  paragraph:{paragraphStyle:{namedStyleType:style},elements:[{textRun:{content:text+"\n"}}]}});
function docCopy({master=false,duplicate=false,filled=false}={}){
  const ids=master?"MASTER-TEST-001":"COPY-TEST-001";
  const head=[p("Laporan Indikator Kegiatan",1,"TITLE"),p("Informasi laporan",33,"HEADING_1"),p("Pelaksanaan",51,"HEADING_1"),p("Capaian dan tindak lanjut",65,"HEADING_1"),p("Bukti pendukung",94,"HEADING_1")];
  const rows=all.slice(0,3).map((t,i)=>({tableCells:[{content:[p(["Nama proyek","Periode","Indikator"][i],200+i*70)]},
    {content:[p(filled?["[SINTETIS] Proyek","Oktober 2026","Simulasi indikator"][i]:t,230+i*70)]}]}));
  const remaining=all.slice(3).map((t,i)=>p(filled?"Paragraf sintetis terverifikasi secara struktural.":t,500+i*70));
  if(duplicate)remaining.push(p(all[3],1100));
  return {documentId:ids,revisionId:"test-revision-1",tabs:[{tabId:"t.0",body:{content:[...head,{table:{columns:2,tableRows:rows}},...remaining]}}]};
}

test("master retains nine unique placeholders and four semantic headings",()=>{
  const a=inspectNativeDoc(docCopy({master:true}),{phase:"master",expectedTokens:all,
    expectedHeadings:["Informasi laporan","Pelaksanaan","Capaian dan tindak lanjut","Bukti pendukung"],minimumTables:1});
  assert.equal(a.status,"STRUCTURE_OK");
  assert.equal(a.tables[0].rows,3);
  assert.equal(a.tables[0].columns,2);
  assert.equal(a.remainingTokens.length,9);
});
test("duplicate placeholders and missing headings fail",()=>{
  const a=inspectNativeDoc(docCopy({master:true,duplicate:true}),{phase:"master",expectedTokens:all,expectedHeadings:["Tidak ada"]});
  assert.equal(a.status,"NEEDS_REVIEW");
  assert.ok(a.findings.some(x=>x.includes("DUPLICATE_TOKEN")));
  assert.ok(a.findings.some(x=>x.includes("HEADING_MISSING")));
});
test("filled docs have no unresolved token",()=>{
  assert.equal(inspectNativeDoc(docCopy({filled:true}),{phase:"filled",expectedTokens:all}).status,"STRUCTURE_OK");
  assert.equal(inspectNativeDoc(docCopy({master:true}),{phase:"filled",expectedTokens:all}).status,"NEEDS_REVIEW");
});
test("only copied document with unique semantic heading receives page break plan",()=>{
  const a=planPageBreakBeforeHeading(docCopy(),{masterFileId:"MASTER-TEST-001",headingText:"Capaian dan tindak lanjut"});
  assert.equal(a.requests.length,1);
  assert.equal(a.requests[0].updateParagraphStyle.paragraphStyle.pageBreakBefore,true);
  assert.equal(a.write_control.requiredRevisionId,"test-revision-1");
  assert.throws(()=>planPageBreakBeforeHeading(docCopy({master:true}),{masterFileId:"MASTER-TEST-001",headingText:"Capaian dan tindak lanjut"}),{code:"UNVERIFIED_COPY_OR_REVISION"});
  assert.throws(()=>planPageBreakBeforeHeading(docCopy(),{masterFileId:"MASTER-TEST-001",headingText:"Tidak ada"}),{code:"HEADING_TARGET_NOT_FOUND"});
});
test("sparse trailing pages are flagged, rebalanced ones are not",()=>{
  const page=(bottom,chars)=>({width:596,height:842,contentRect:[70.9,65.5,522,bottom],charCount:chars});
  const old=evaluatePdfGeometry([page(760,2000),page(162.3,265)],{left:70.9,right:70.9,top:65.2,bottom:62.4});
  assert.equal(old.status,"NEEDS_VISUAL_REVIEW");
  assert.deepEqual(old.pages[1].findings,["SPARSE_TRAILING_PAGE"]);
  const revised=evaluatePdfGeometry([page(557.7,1230),page(425.4,1006)],{left:70.9,right:70.9,top:65.2,bottom:62.4});
  assert.equal(revised.status,"GEOMETRY_WITHIN_THRESHOLDS");
});
test("geometry reports overflow and empty page without claiming visual PASS",()=>{
  const a=evaluatePdfGeometry([{width:596,height:842,contentRect:[60,50,540,800],charCount:0}],{left:70.9,right:70.9,top:65.2,bottom:62.4});
  assert.equal(a.status,"NEEDS_VISUAL_REVIEW");
  assert.ok(a.pages[0].findings.includes("CONTENT_OUTSIDE_EXPECTED_MARGINS"));
  assert.ok(a.pages[0].findings.includes("EMPTY_RENDERED_PAGE"));
  assert.match(a.notice,/cannot prove/);
});
