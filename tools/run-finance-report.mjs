import {readFileSync} from "node:fs";
import {buildFinanceReport} from "./finance-report.mjs";
try{if(process.argv.length>2)throw Error("USAGE: node tools/run-finance-report.mjs < input.json");const input=JSON.parse(readFileSync(0,"utf8"));process.stdout.write(JSON.stringify(buildFinanceReport(input),null,2)+"\n");}catch(e){process.stderr.write("FINANCE_REPORT_ERROR: "+String(e.message)+"\n");process.exitCode=1;}
