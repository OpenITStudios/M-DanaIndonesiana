// Deterministic reporting helper; safe synthetic test inputs only.
export function buildFinanceReport(input){
 const die=s=>{throw Error(s)};
 const S=(v,k)=>{if(typeof v!=="string"||!v.trim())die("INVALID_TEXT:"+k);return v.trim()};
 const M=(v,k,positive=false)=>{if(typeof v!=="string"||!/^(0|[1-9]\d*)$/.test(v))die("INVALID_IDR:"+k);const n=BigInt(v);if(positive&&n===0n)die("ZERO_AMOUNT:"+k);return n};
 const D=(v,k)=>{if(typeof v!=="string"||!/^\d{4}-\d{2}-\d{2}$/.test(v))die("INVALID_DATE:"+k);const d=new Date(v+"T00:00:00Z");if(Number.isNaN(d.valueOf())||d.toISOString().slice(0,10)!==v)die("INVALID_DATE:"+k);return v};
 const A=(v,k)=>{if(!Array.isArray(v))die("INVALID_ARRAY:"+k);return v};
 if(!input||typeof input!=="object"||Array.isArray(input))die("INPUT_OBJECT_REQUIRED");
 if(input.currency!=="IDR")die("CURRENCY_MUST_BE_IDR");
 const project_id=S(input.project_id,"project_id"),rab_ref=S(input.rab_ref,"rab_ref");
 if(!input.period)die("PERIOD_REQUIRED");
 const start=D(input.period.start,"period.start"),end=D(input.period.end,"period.end");
 if(start>end)die("INVALID_PERIOD_ORDER");
 const issues=[],issue=(code,severity,ref)=>issues.push({code,severity,ref});
 const status=input.rab_status==="APPROVED"?"APPROVED":"UNCONFIRMED";
 if(status!=="APPROVED"||!input.rab_approval_evidence_ref)issue("RAB_APPROVAL_NOT_EVIDENCED","WARNING",rab_ref);
 const lines=A(input.budget_lines,"budget_lines");if(!lines.length)die("BUDGET_REQUIRED");
 const bs=new Map(),spend=new Map(),evMap=new Map();let approved=0n;
 for(const [i,b]of lines.entries()){
   const code=S(b.code,"budget.code");if(bs.has(code))die("DUPLICATE_BUDGET:"+code);
   const ceiling=M(b.approved_amount,"budget.approved_amount"),prior=b.prior_realized==null?null:M(b.prior_realized,"budget.prior_realized");
   // Optional approved-RAB detail. Never turn missing metadata into fabricated volume or price.
   const d=b.details??{};
   if(!d||typeof d!=="object"||Array.isArray(d))die("INVALID_BUDGET_DETAILS:"+code);
   const optionalText=(v,key)=>{if(v==null)return null;if(typeof v!=="string"||v.length>512||/[\u0000-\u001f]/.test(v))die("INVALID_DETAIL_TEXT:"+key);return v.trim()||null;};
   const numberDetail=(v,key)=>v==null?null:M(v,"budget.details."+key,true);
   const refs=A(d.supporting_refs??[],"budget.details.supporting_refs");
   if(refs.length>30||refs.some(v=>typeof v!=="string"||!v.trim()||v.length>256))die("INVALID_SUPPORTING_REFS:"+code);
   const details={
     cost_category:optionalText(d.cost_category,"cost_category"),
     specification:optionalText(d.specification,"specification"),
     frequency:numberDetail(d.frequency,"frequency"),
     frequency_unit:optionalText(d.frequency_unit,"frequency_unit"),
     quantity:numberDetail(d.quantity,"quantity"),
     quantity_unit:optionalText(d.quantity_unit,"quantity_unit"),
     unit_price:numberDetail(d.unit_price,"unit_price"),
     supporting_refs:[...refs]
   };
   const n=[details.frequency,details.quantity,details.unit_price].filter(v=>v!==null).length;
   if(n>0&&n<3)issue("RAB_DETAIL_INCOMPLETE","WARNING",code);
   const calc=n===3?details.frequency*details.quantity*details.unit_price:null;
   if(calc!==null&&calc!==ceiling)issue("RAB_DETAIL_AMOUNT_DIFFERS","WARNING",code);
   const v={code,label:S(b.label,"budget.label"),indicator_id:S(b.indicator_id,"budget.indicator_id"),ceiling,prior,details,calc};
   bs.set(code,v);spend.set(code,0n);evMap.set(code,new Set());approved+=ceiling;
   if(prior===null)issue("PRIOR_REALIZATION_UNKNOWN","WARNING",code);
   else if(prior>ceiling)issue("PRIOR_OVER_BUDGET","ERROR",code);
 }
 let planned=0n;const plans=A(input.funding_plan??[],"funding_plan");
 for(const p of plans){S(p.stage,"funding.stage");planned+=M(p.planned_amount,"funding.planned_amount");}
 if(plans.length&&planned!==approved)issue("FUNDING_PLAN_MISMATCH","WARNING",rab_ref);
 const records=A(input.transactions,"transactions"),ids=new Set(),fingerprints=new Set(),cash=[];
 let received=0n,paid=0n,invoiced=0n,unmapped=0n;
 for(const [index,t]of records.entries()){
   const id=S(t.id,"txn.id");if(ids.has(id))die("DUPLICATE_TRANSACTION_ID:"+id);ids.add(id);
   const date=D(t.date,"txn.date");if(date<start||date>end)die("TRANSACTION_OUTSIDE_PERIOD:"+id);
   const kind=t.kind;if(!["RECEIPT","PAYMENT","INVOICE"].includes(kind))die("INVALID_KIND:"+id);
   const value=M(t.amount,"txn.amount",true),proof=A(t.evidence_refs??[],"txn.evidence_refs");
   if(proof.some(p=>typeof p!=="string"||!p.trim()))die("INVALID_EVIDENCE_REF:"+id);
   if(kind==="INVOICE"){invoiced+=value;continue;}
   if(!proof.length)issue("MISSING_PAYMENT_EVIDENCE","WARNING",id);
   const optionalCashText=(v,key)=>{if(v==null)return null;if(typeof v!=="string"||v.length>2048||/[\u0000-\u001f]/.test(v))die("INVALID_CASH_TEXT:"+key);return v.trim()||null;};
   cash.push({id,date,kind,value,index,evidence_refs:proof,
     indicator_id:optionalCashText(t.indicator_id,"indicator_id"),
     voucher_no:optionalCashText(t.voucher_no,"voucher_no"),
     recipient_name:optionalCashText(t.recipient_name,"recipient_name"),
     description:optionalCashText(t.description,"description"),
     support_url:optionalCashText(t.support_url,"support_url")});
   if(kind==="RECEIPT"){received+=value;continue;}
   paid+=value;
   const code=S(t.budget_code,"txn.budget_code"),b=bs.get(code);
   if(!b){unmapped+=value;issue("UNMAPPED_PAYMENT","ERROR",id);}
   else{
      spend.set(code,spend.get(code)+value);
      for(const p of proof)evMap.get(code).add(p);
      if(t.indicator_id&&t.indicator_id!==b.indicator_id)issue("INDICATOR_MISMATCH","WARNING",id);
   }
   if(typeof t.recipient_ref==="string"&&t.recipient_ref.trim()){
     const key=[date,code,value.toString(),t.recipient_ref.trim()].join("|");
     if(fingerprints.has(key))issue("POSSIBLE_DUPLICATE_PAYMENT","WARNING",id);
     fingerprints.add(key);
   }
 }
 const lra=[];
 for(const b of bs.values()){
   const period=spend.get(b.code),cumulative=b.prior===null?null:b.prior+period;
   if(period>b.ceiling)issue("PERIOD_OVER_BUDGET","ERROR",b.code);
   if(cumulative!==null&&cumulative>b.ceiling)issue("CUMULATIVE_OVER_BUDGET","ERROR",b.code);
   lra.push({
     code:b.code,label:b.label,indicator_id:b.indicator_id,
     approved_amount:b.ceiling.toString(),prior_realized:b.prior===null?null:b.prior.toString(),
     realized_period:period.toString(),realized_cumulative:cumulative===null?null:cumulative.toString(),
     remaining:cumulative===null?null:(b.ceiling-cumulative).toString(),
     evidence_refs:[...evMap.get(b.code)].sort(),
     details:{
       cost_category:b.details.cost_category,specification:b.details.specification,
       frequency:b.details.frequency===null?null:b.details.frequency.toString(),
       frequency_unit:b.details.frequency_unit,
       quantity:b.details.quantity===null?null:b.details.quantity.toString(),
       quantity_unit:b.details.quantity_unit,
       unit_price:b.details.unit_price===null?null:b.details.unit_price.toString(),
       supporting_refs:[...b.details.supporting_refs]
     },
     detail_computed_amount:b.calc===null?null:b.calc.toString(),
     detail_amount_difference:b.calc===null?null:(b.ceiling-b.calc).toString()
   });
 }
 const opening=input.cash_opening==null?null:M(input.cash_opening,"cash_opening");if(opening===null)issue("OPENING_BALANCE_UNKNOWN","WARNING","cash_opening");
 let running=opening;
 const cash_flow=cash.sort((a,b)=>a.date.localeCompare(b.date)||a.index-b.index).map(t=>{
   if(running!==null)running+=t.kind==="RECEIPT"?t.value:-t.value;
   if(running!==null&&running<0n)issue("NEGATIVE_RUNNING_BALANCE","WARNING",t.id);
   return {date:t.date,transaction_id:t.id,type:t.kind,inflow:t.kind==="RECEIPT"?t.value.toString():"0",outflow:t.kind==="PAYMENT"?t.value.toString():"0",balance:running===null?null:running.toString(),evidence_refs:t.evidence_refs,
     indicator_id:t.indicator_id,voucher_no:t.voucher_no,
     recipient_name:t.recipient_name,description:t.description,support_url:t.support_url};
 });
 const observed=input.cash_closing_observed==null?null:M(input.cash_closing_observed,"cash_closing_observed");
 if(observed===null)issue("CLOSING_BALANCE_UNKNOWN","WARNING","cash_closing_observed");
 else if(!input.cash_closing_evidence_ref)issue("CLOSING_EVIDENCE_MISSING","WARNING","cash_closing_observed");
 const variance=observed===null||running===null?null:running-observed;
 if(variance!==null&&variance!==0n)issue("CASH_MISMATCH","ERROR","cash_closing_observed");
 const lraPaid=[...spend.values()].reduce((x,y)=>x+y,0n);
 return {schema_version:"v0.5-json",status:"DRAFT_CALCULATED_NOT_APPROVED",project_id,rab_ref,rab_status:status,currency:"IDR",period:{start,end},totals:{approved_budget:approved.toString(),planned_funding:plans.length?planned.toString():null,cash_received:received.toString(),cash_paid:paid.toString(),mapped_lra_paid:lraPaid.toString(),unmapped_paid:unmapped.toString(),invoiced_period:invoiced.toString(),opening_cash:opening===null?null:opening.toString(),calculated_closing_cash:running===null?null:running.toString(),observed_closing_cash:observed===null?null:observed.toString(),cash_difference:variance===null?null:variance.toString()},lra,cash_flow,issues,limitations:["Input documents and approval evidence are not authenticated.","Invoice is not cash; payment status of invoices cannot be determined without matching transactions; planned installment is not receipt.","Unknown previous realization and opening balances remain null.","Not an official Excel e-RISPRO report, tax computation, or external approval."]};
}
