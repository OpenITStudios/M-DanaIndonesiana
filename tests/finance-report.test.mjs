import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {buildFinanceReport} from "../tools/finance-report.mjs";
const fixture=JSON.parse(readFileSync(new URL("./fixtures/finance-synthetic.json",import.meta.url),"utf8"));
const clone=()=>structuredClone(fixture),has=(r,k)=>r.issues.some(x=>x.code===k);
test("cash and LRA are distinct",()=>{const r=buildFinanceReport(clone());assert.equal(r.totals.approved_budget,"2500000");assert.equal(r.totals.cash_received,"1250000");assert.equal(r.totals.cash_paid,"450000");assert.equal(r.totals.cash_difference,"0");assert.equal(r.lra[0].remaining,"1050000");assert.equal(r.status,"DRAFT_CALCULATED_NOT_APPROVED")});
test("invoice is not cash",()=>{const r=buildFinanceReport(clone());assert.equal(r.totals.invoiced_period,"300000");assert.equal(r.lra[1].realized_period,"0")});
test("planned installment is not received",()=>{const x=clone();x.transactions=x.transactions.filter(t=>t.kind!=="RECEIPT");assert.equal(buildFinanceReport(x).totals.cash_received,"0")});
test("unknown opening balance stays null",()=>{const x=clone();delete x.cash_opening;assert.equal(buildFinanceReport(x).totals.calculated_closing_cash,null)});
test("unknown prior does not become zero",()=>{const x=clone();delete x.budget_lines[0].prior_realized;assert.equal(buildFinanceReport(x).lra[0].remaining,null)});
test("unmapped payment is flagged",()=>{const x=clone();x.transactions[1].budget_code="UNKNOWN";assert.ok(has(buildFinanceReport(x),"UNMAPPED_PAYMENT"))});
test("budget overrun is flagged",()=>{const x=clone();x.transactions[1].amount="1600000";assert.ok(has(buildFinanceReport(x),"CUMULATIVE_OVER_BUDGET"))});
test("suspected duplicate not dropped",()=>{const x=clone();x.transactions.push({...x.transactions[1],id:"T04"});const r=buildFinanceReport(x);assert.ok(has(r,"POSSIBLE_DUPLICATE_PAYMENT"));assert.equal(r.totals.cash_paid,"900000")});
test("cash mismatch is shown",()=>{const x=clone();x.cash_closing_observed="799999";assert.equal(buildFinanceReport(x).totals.cash_difference,"1")});
test("missing evidence is flagged",()=>{const x=clone();x.transactions[1].evidence_refs=[];assert.ok(has(buildFinanceReport(x),"MISSING_PAYMENT_EVIDENCE"))});
test("numeric JSON floats rejected",()=>{const x=clone();x.transactions[1].amount=450000;assert.throws(()=>buildFinanceReport(x),/INVALID_IDR/)});
test("out-of-period transaction rejected",()=>{const x=clone();x.transactions[1].date="2026-02-01";assert.throws(()=>buildFinanceReport(x),/TRANSACTION_OUTSIDE_PERIOD/)});
test("duplicate IDs rejected",()=>{const x=clone();x.transactions[1].id="T01";assert.throws(()=>buildFinanceReport(x),/DUPLICATE_TRANSACTION_ID/)});
test("large integer precision",()=>{const x=clone();x.budget_lines[0].approved_amount="9007199254740993";x.funding_plan=[];assert.equal(buildFinanceReport(x).totals.approved_budget,"9007199255740993")});

test("detail values preserved with exact product",()=>{
 const x=clone();x.budget_lines[0].details={cost_category:"Produksi",specification:"Aset sintetis",frequency:"1",frequency_unit:"Kegiatan",quantity:"3",quantity_unit:"Paket",unit_price:"500000",supporting_refs:["SYN-QUOTE-01"]};
 const r=buildFinanceReport(x);assert.equal(r.lra[0].details.quantity,"3");assert.equal(r.lra[0].detail_computed_amount,"1500000");assert.equal(r.lra[0].detail_amount_difference,"0");
});
test("RAB detail discrepancy is warned, not silently rewritten",()=>{
 const x=clone();x.budget_lines[0].details={frequency:"1",quantity:"3",unit_price:"450000",supporting_refs:["SYN-Q"]};
 const r=buildFinanceReport(x);assert.equal(r.lra[0].approved_amount,"1500000");assert.equal(r.lra[0].detail_amount_difference,"150000");assert.ok(has(r,"RAB_DETAIL_AMOUNT_DIFFERS"));
});
test("partial RAB detail is marked incomplete",()=>{
 const x=clone();x.budget_lines[0].details={quantity:"3"};
 const r=buildFinanceReport(x);assert.equal(r.lra[0].detail_computed_amount,null);assert.ok(has(r,"RAB_DETAIL_INCOMPLETE"));
});
test("cash memo and voucher are retained, not invented",()=>{
 const x=clone();x.transactions[1].recipient_name="Penyedia Sintetis";x.transactions[1].description="Produksi simulasi";x.transactions[1].voucher_no="SYN-02";x.transactions[1].support_url="SYN-EVD";
 const row=buildFinanceReport(x).cash_flow[1];assert.equal(row.recipient_name,"Penyedia Sintetis");assert.equal(row.voucher_no,"SYN-02");assert.equal(row.support_url,"SYN-EVD");
 assert.equal(buildFinanceReport(clone()).cash_flow[0].recipient_name,null);
});
test("invalid RAB metadata rejects negative factors",()=>{
 const x=clone();x.budget_lines[0].details={quantity:"-1"};assert.throws(()=>buildFinanceReport(x),/INVALID_IDR/);
});

test("invoice total is not an unpaid liability",()=>{
 const x=clone();x.transactions.push({id:"T04",date:"2026-01-10",kind:"PAYMENT",amount:"300000",budget_code:"A02",evidence_refs:["SYN-OUT-04"]});
 const r=buildFinanceReport(x);
 assert.equal(r.totals.invoiced_period,"300000");
 assert.equal(r.totals.cash_paid,"750000");
 assert.equal("invoices_not_paid" in r.totals,false);
});
