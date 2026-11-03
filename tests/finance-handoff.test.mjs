import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { buildFinanceReport } from "../tools/finance-report.mjs";
import { buildFinanceHandoff } from "../tools/finance-handoff.mjs";
const fixture=JSON.parse(readFileSync(new URL("./fixtures/finance-synthetic.json",import.meta.url),"utf8"));
const clone=()=>structuredClone(fixture);
test("handoff keeps all financial claims marked unverified",()=>{
 const r=buildFinanceHandoff(buildFinanceReport(clone()));
 assert.equal(r.administration.may_claim_submitted,false);
 assert.equal(r.administration.may_claim_externally_approved,false);
 assert.equal(r.administration.requires_source_and_human_review,true);
 assert.equal(r.writing.facts.find(x=>x.key==="installments_planned").classification,"PLANNED_NOT_RECEIVED");
});
test("invoice not treated as paid in writing handoff",()=>{
 const r=buildFinanceHandoff(buildFinanceReport(clone()));
 assert.equal(r.writing.facts.find(x=>x.key==="invoices_not_paid").value,"300000");
 assert.ok(r.writing.forbidden_claims.some(x=>x.includes("invoice")));
});
test("cash variance becomes blocking issue",()=>{
 const x=clone();x.cash_closing_observed="799999";
 const r=buildFinanceHandoff(buildFinanceReport(x));
 assert.equal(r.administration.calculation_consistent,false);
 assert.ok(r.blocking_issues.some(x=>x.includes("CASH_MISMATCH")));
});
test("unknown cash opening not assumed reconciled",()=>{
 const x=clone();delete x.cash_opening;const r=buildFinanceHandoff(buildFinanceReport(x));
 assert.equal(r.administration.reconciliation_matches_reported_cash,false);
 assert.ok(r.unknowns.some(x=>x.includes("OPENING_BALANCE_UNKNOWN")));
});
test("handoff rejects unapproved document type",()=>{
 assert.throws(()=>buildFinanceHandoff({status:"EXTERNAL_CONFIRMED",schema_version:"v0.3-json"}),/UNSUPPORTED_FINANCE_REPORT/);
});
