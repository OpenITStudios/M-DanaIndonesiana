// Pure Google Docs typography preflight. Does not decide whether a source term is foreign,
// whether a citation is genuine, or whether a report meets academic/official format.
export class TypographyQaError extends Error {
  constructor(code) { super(code); this.name = "TypographyQaError"; this.code = code; }
}
const permitted = new Set([
  "EYD_FOREIGN_OR_REGIONAL", "EYD_WORK_TITLE", "EYD_LINGUISTIC_EMPHASIS",
  "APA_STYLE_STATISTICAL_SYMBOL", "VERIFIED_OFFICIAL_FORMAT"
]);
const isString = x => typeof x === "string" && !!x.trim();
const fail = code => { throw new TypographyQaError(code); };

export function inspectItalicRuns(doc,{approved=[]}={}) {
  if(!doc || !isString(doc.documentId) || !Array.isArray(approved))fail("INVALID_DOC_OR_APPROVALS");
  const keySet=new Set();
  for(const record of approved){
    if(!record || !isString(record.text) || !permitted.has(record.reason) ||
      !isString(record.source_ref))fail("INVALID_ITALIC_APPROVAL");
    const key=record.text.trim()+"\u0000"+record.reason;
    if(keySet.has(key))fail("DUPLICATE_ITALIC_APPROVAL");
    keySet.add(key);
  }
  const matches=[];
  const visit=(elements,tabId)=>{
    for(const element of elements??[]){
      if(element.paragraph){
        const style=element.paragraph.paragraphStyle?.namedStyleType||"NORMAL_TEXT";
        for(const part of element.paragraph.elements??[]){
          const tr=part.textRun;
          if(!tr || tr.textStyle?.italic!==true || !isString(tr.content))continue;
          const text=tr.content.trim();
          const approvals=approved.filter(x=>x.text.trim()===text);
          const violations=[];
          if(style.startsWith("HEADING_")||style==="TITLE"||style==="SUBTITLE")
            violations.push("HEADING_ITALIC_REQUIRES_FORMAT_REVIEW");
          if(!approvals.length)
            violations.push("ITALIC_REASON_UNVERIFIED");
          const a=approvals[0];
          if(a?.reason==="VERIFIED_OFFICIAL_FORMAT"&&style.startsWith("HEADING_")){
            // A reviewed official exception may override this particular styling issue.
            violations.splice(violations.indexOf("HEADING_ITALIC_REQUIRES_FORMAT_REVIEW"),1);
          }
          matches.push({text,tabId,paragraphStyle:style,
            startIndex:part.startIndex??null,endIndex:part.endIndex??null,
            approvedReason:a?.reason??null,source_ref:a?.source_ref??null,findings:violations});
        }
      }
      if(element.table){
        for(const row of element.table.tableRows??[])
          for(const cell of row.tableCells??[])visit(cell.content,tabId);
      }
    }
  };
  const tabs=Array.isArray(doc.tabs)&&doc.tabs.length?doc.tabs:[{tabId:null,body:doc.body}];
  for(const t of tabs)visit(t.body?.content,t.tabId??null);
  return {
    status:matches.some(m=>m.findings.length)?"TYPOGRAPHY_REVIEW_REQUIRED":"ITALIC_USAGE_CHECKED",
    italicRuns:matches,italicCount:matches.length,
    notice:"Only explicit italic runs were inspected. Source-based linguistic and citation review remains necessary; inherited/renderer font behavior requires PDF inspection."
  };
}
