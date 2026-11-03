// Pure finance-to-administration/writing handoff; no side effects or external approval.
export function buildFinanceHandoff(report) {
  if(!report||report.schema_version!=="v0.3-json"||report.status!=="DRAFT_CALCULATED_NOT_APPROVED")
    throw new Error("UNSUPPORTED_FINANCE_REPORT");
  const totals=report.totals;
  if(!totals||!Array.isArray(report.issues))throw new Error("INCOMPLETE_FINANCE_REPORT");
  const required=["approved_budget","planned_funding","cash_received","cash_paid","invoices_not_paid","calculated_closing_cash","cash_difference"];
  for(const field of required)if(!(field in totals))throw new Error("MISSING_TOTAL:"+field);
  const blockingIssues=report.issues.filter(i=>i.severity==="ERROR").map(i=>i.code+" ("+i.ref+")");
  const unknowns=report.issues.filter(i=>/UNKNOWN|MISSING|UNMAPPED|NOT_EVIDENCED/.test(i.code)).map(i=>i.code+" ("+i.ref+")");
  const data = [
    {key:"approved_ceiling_claim",value:totals.approved_budget,classification:"CALCULATED_FROM_UNVERIFIED_INPUT"},
    {key:"installments_planned",value:totals.planned_funding,classification:"PLANNED_NOT_RECEIVED"},
    {key:"cash_received_period",value:totals.cash_received,classification:"RECORDED_NOT_BANK_AUTHENTICATED"},
    {key:"cash_paid_period",value:totals.cash_paid,classification:"RECORDED_NOT_EVIDENCE_AUTHENTICATED"},
    {key:"invoices_not_paid",value:totals.invoices_not_paid,classification:"NOT_CASH_PAID"},
    {key:"closing_balance",value:totals.calculated_closing_cash,classification:totals.calculated_closing_cash===null?"UNKNOWN":"CALCULATED_NOT_BANK_AUTHENTICATED"},
    {key:"cash_difference",value:totals.cash_difference,classification:totals.cash_difference===null?"UNKNOWN":"CALCULATED"}
  ];
  const reconciled = totals.cash_difference==="0" && !report.issues.some(i=>i.code==="CLOSING_EVIDENCE_MISSING"||i.code==="CLOSING_BALANCE_UNKNOWN");
  return {
    kind:"finance_handoff_v0.5",project_id:report.project_id,
    period:report.period,rab_ref:report.rab_ref,source_report_status:report.status,
    administration:{stage:"DRAFT_FOR_REVIEW",may_claim_submitted:false,may_claim_externally_approved:false,calculation_consistent:blockingIssues.length===0,reconciliation_matches_reported_cash:reconciled,requires_source_and_human_review:true},
    writing:{voice:"Natural Indonesian grounded in source evidence",facts:data,forbidden_claims:["dana telah dicairkan berdasarkan rencana termin","invoice telah dibayar tanpa bukti kas","laporan telah disetujui LPDP/PMO","kegiatan selesai dari angka belanja saja"]},
    blocking_issues:blockingIssues,unknowns,limitations:["Input approval refs are not authenticated","Evidence links are references, not verified documents","Do not reproduce PII in public reports"]
  };
}
