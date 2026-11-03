// Google-native Docs structural QA and PDF-layout metric QA (pure, no Drive writes).
// Input from authorized Google Docs readback and rendered PDF geometry. No project data may be logged.
export class DocumentQaError extends Error {
  constructor(code){ super(code); this.name="DocumentQaError"; this.code=code; }
}
const fail=code=>{throw new DocumentQaError(code)};
const asArray=x=>Array.isArray(x)?x:[];
const getParagraphText=p=>asArray(p?.elements).map(e=>e.textRun?.content||"").join("");
function collect(elements,output) {
  for(const element of asArray(elements)){
    if(element.paragraph){
      output.parts.push(getParagraphText(element.paragraph));
      const text=getParagraphText(element.paragraph).trim();
      if(element.paragraph.paragraphStyle?.namedStyleType?.startsWith("HEADING_"))
        output.headings.push({text,style:element.paragraph.paragraphStyle.namedStyleType,startIndex:element.startIndex,endIndex:element.endIndex,tabId:output.currentTab});
    }
    if(element.table){
      const rows=asArray(element.table.tableRows);
      output.tables.push({rows:rows.length,columns:element.table.columns??0,tabId:output.currentTab});
      for(const r of rows)for(const cell of asArray(r.tableCells)) collect(cell.content,output);
    }
  }
}
export function inspectNativeDoc(doc,{phase="master",expectedTokens=[],expectedHeadings=[],minimumTables=0}={}) {
  if(!doc||typeof doc.documentId!=="string"||!["master","filled"].includes(phase))fail("INVALID_DOC_INPUT");
  if(!Array.isArray(expectedTokens)||new Set(expectedTokens).size!==expectedTokens.length||
     expectedTokens.some(t=>!/^\{\{[A-Z][A-Z0-9_]*\}\}$/.test(t)))fail("INVALID_TOKEN_CONTRACT");
  const tabs=asArray(doc.tabs).length?doc.tabs:[{tabId:null,body:doc.body}];
  const result={currentTab:null,parts:[],headings:[],tables:[]};
  for(const tab of tabs){result.currentTab=tab.tabId??null;collect(tab.body?.content,result);}
  const text=result.parts.join("");
  const matches=text.match(/\{\{[A-Z][A-Z0-9_]*\}\}/g)||[];
  const counts=Object.fromEntries([...new Set([...expectedTokens,...matches])].map(token=>[token,matches.filter(v=>v===token).length]));
  const findings=[];
  if(phase==="master"){
    for(const token of expectedTokens)if(counts[token]!==1)findings.push("MISSING_OR_DUPLICATE_TOKEN:"+token);
    for(const token of matches)if(!expectedTokens.includes(token))findings.push("UNDECLARED_TOKEN:"+token);
  } else if(matches.length) findings.push("UNRESOLVED_PLACEHOLDERS");
  if(result.tables.length<minimumTables)findings.push("NATIVE_TABLE_MISSING");
  for(const heading of expectedHeadings)if(result.headings.filter(h=>h.text===heading).length!==1)findings.push("HEADING_MISSING_OR_DUPLICATED:"+heading);
  return {status:findings.length?"NEEDS_REVIEW":"STRUCTURE_OK",findings,
    paragraphCount:result.parts.length,headings:result.headings,tables:result.tables,
    remainingTokens:matches,tokenCounts:counts,tabCount:tabs.length};
}

export function planPageBreakBeforeHeading(doc,{masterFileId,headingText}={}) {
  if(!doc?.documentId||!doc.revisionId||typeof masterFileId!=="string"||doc.documentId===masterFileId)
    fail("UNVERIFIED_COPY_OR_REVISION");
  if(typeof headingText!=="string"||!headingText.trim())fail("INVALID_HEADING_TARGET");
  const tabs=asArray(doc.tabs).length?doc.tabs:[{tabId:null,body:doc.body}];
  const targets=[];
  for(const tab of tabs)for(const element of asArray(tab.body?.content)){
    const p=element.paragraph;
    if(p?.paragraphStyle?.namedStyleType?.startsWith("HEADING_")&&getParagraphText(p).trim()===headingText)
      targets.push({tabId:tab.tabId??null,startIndex:element.startIndex,endIndex:element.endIndex});
  }
  if(targets.length!==1)fail(targets.length?"AMBIGUOUS_HEADING_TARGET":"HEADING_TARGET_NOT_FOUND");
  const x=targets[0];
  if(!Number.isInteger(x.startIndex)||!Number.isInteger(x.endIndex)||x.endIndex<=x.startIndex)fail("INVALID_HEADING_RANGE");
  const range={startIndex:x.startIndex,endIndex:x.endIndex};
  if(x.tabId)range.tabId=x.tabId;
  return {document_id:doc.documentId,write_control:{requiredRevisionId:doc.revisionId},
    requests:[{updateParagraphStyle:{range,paragraphStyle:{pageBreakBefore:true},fields:"pageBreakBefore"}}]};
}

// Evaluate measured geometry after actual Google Docs -> PDF export (e.g. PyMuPDF).
// Never label a document visually accepted from geometry alone.
export function evaluatePdfGeometry(pages,{left=0,right=0,top=0,bottom=0,minTrailingCoverage=0.30}={}) {
  if(!Array.isArray(pages)||!pages.length||typeof minTrailingCoverage!=="number"||minTrailingCoverage<0||minTrailingCoverage>1)
    fail("INVALID_PAGE_METRICS");
  const checked=pages.map((p,i)=>{
    if(!p||!Number.isFinite(p.width)||!Number.isFinite(p.height)||p.width<=0||p.height<=0||
        !Array.isArray(p.contentRect)||p.contentRect.length!==4||p.contentRect.some(x=>!Number.isFinite(x)) ||
        !Number.isInteger(p.charCount)||p.charCount<0)fail("INVALID_PAGE_METRICS");
    const [x0,y0,x1,y1]=p.contentRect;
    const contentHeight=Math.max(0,y1-y0);
    const available=Math.max(1,p.height-top-bottom);
    const coverage=Math.min(1,contentHeight/available);
    const findings=[];
    if(x0<left-4||x1>p.width-right+4||y0<top-4||y1>p.height-bottom+4)
      findings.push("CONTENT_OUTSIDE_EXPECTED_MARGINS");
    if(i===pages.length-1&&pages.length>1&&coverage<minTrailingCoverage)
      findings.push("SPARSE_TRAILING_PAGE");
    if(p.charCount===0)findings.push("EMPTY_RENDERED_PAGE");
    return {page:i+1,coverage:Number(coverage.toFixed(3)),charCount:p.charCount,findings};
  });
  return {status:checked.some(p=>p.findings.length)?"NEEDS_VISUAL_REVIEW":"GEOMETRY_WITHIN_THRESHOLDS",
    pages:checked,limits:{left,right,top,bottom,minTrailingCoverage},
    notice:"This metric cannot prove reading order, accessibility tagging, genuine evidence, text overlap, or aesthetic quality. Inspect rendered pages."};
}
