#!/usr/bin/env node
// Offline static structure and synthetic policy validation, not legal or model proof.
import {existsSync,readdirSync,readFileSync} from "node:fs";
import {join,resolve} from "node:path";
import {fileURLToPath} from "node:url";
import {PRIMARY_SKILLS,assessAction} from "./agent-preflight.mjs";
const ROOT=fileURLToPath(new URL("../",import.meta.url));
const REQUIRED=["AGENTS.md","GITHUB_RULES.md","CONTEXT.md","README.md","SECURITY.md",
  "docs/skills/README.md","kits/dana-indonesiana/OPERATING-CONTRACT.md",
  "kits/dana-indonesiana/VALIDATION.md",".agents/evals/manifest.json",
  ".agents/evals/decision-cases.json",".agents/evals/preflight-cases.json",
  "docs/skills/agent-quality-evals.md","tools/agent-preflight.mjs",
  "tests/agent-preflight.test.mjs",".github/workflows/governance-verify.yml"];
function json(root,path,errors){
  try{return JSON.parse(readFileSync(join(root,path),"utf8"))}
  catch{errors.push("INVALID_OR_MISSING_JSON:"+path);return null}
}
export function verifyRepository(root=ROOT){
  const errors=[];
  for(const p of REQUIRED)if(!existsSync(join(root,p)))errors.push("MISSING:"+p);
  const dir=join(root,".agents/skills");
  if(existsSync(dir)){
    const names=readdirSync(dir,{withFileTypes:true}).filter(x=>x.isDirectory()).map(x=>x.name).sort();
    if(JSON.stringify(names)!==JSON.stringify([...PRIMARY_SKILLS].sort()))
      errors.push("SKILL_OWNER_DRIFT");
    for(const name of PRIMARY_SKILLS){
      const file=join(dir,name,"SKILL.md");
      if(!existsSync(file)){errors.push("MISSING_SKILL:"+name);continue}
      const head=readFileSync(file,"utf8").split("\n").slice(0,9);
      if(head[0]!=="---" || !head.some(x=>x.trim()==="name: "+name))
        errors.push("INVALID_SKILL_FRONTMATTER:"+name);
    }
  } else errors.push("SKILL_DIRECTORY_MISSING");
  const manifest=json(root,".agents/evals/manifest.json",errors);
  const bindings={decision_corpus:".agents/evals/decision-cases.json",
    preflight_corpus:".agents/evals/preflight-cases.json",
    preflight_module:"tools/agent-preflight.mjs",
    structural_verifier:"tools/verify-repository.mjs",
    canonical_router:"docs/skills/README.md",
    runbook:"docs/skills/agent-quality-evals.md"};
  if(manifest){
    if(manifest.schema!==1)errors.push("BAD_MANIFEST_SCHEMA");
    for(const [k,p] of Object.entries(bindings))
      if(manifest[k]!==p || !existsSync(join(root,p)))errors.push("MANIFEST_DRIFT:"+k);
  }
  const d=json(root,".agents/evals/decision-cases.json",errors);
  if(d){
    if(d.schema!==1 || !Array.isArray(d.cases)||d.cases.length<14)
      errors.push("DECISION_CORPUS_INCOMPLETE");
    const ids=new Set(),skills=new Set(),outcomes=new Set();
    for(const c of d.cases||[]){
      if(!/^D\d{2}$/.test(c.id||"")||ids.has(c.id))errors.push("BAD_DECISION_ID");
      ids.add(c.id);
      if(!PRIMARY_SKILLS.includes(c.expected_primary_skill))
        errors.push("BAD_PRIMARY_SKILL:"+c.id);
      skills.add(c.expected_primary_skill);
      if(!["ROUTE","BLOCK","NEEDS_SOURCE","HUMAN_REVIEW"].includes(c.expected_outcome))
        errors.push("BAD_OUTCOME:"+c.id);
      outcomes.add(c.expected_outcome);
      if(typeof c.request!=="string"||c.request.length<35||
        typeof c.proof_boundary!=="string"||c.proof_boundary.length<20)
        errors.push("INCOMPLETE_DECISION:"+c.id);
    }
    if(skills.size!==PRIMARY_SKILLS.length || outcomes.size!==4)
      errors.push("DECISION_COVERAGE_MISSING");
  }
  const p=json(root,".agents/evals/preflight-cases.json",errors);
  if(p){
    if(p.schema!==1||!Array.isArray(p.cases)||p.cases.length<16||
      !/^[a-fA-F0-9]{40}$/.test(p.defaults?.head_sha||""))
      errors.push("PREFLIGHT_CORPUS_INVALID");
    const ids=new Set();
    for(const c of p.cases||[]){
      if(!/^P\d{2}-/.test(c.id||"")||ids.has(c.id))
        errors.push("BAD_PREFLIGHT_ID");
      ids.add(c.id);
      if(!c.overrides || !c.expected || !c.expected.reason){
        errors.push("INCOMPLETE_PREFLIGHT:"+c.id);continue;
      }
      const actual=assessAction({...p.defaults,...c.overrides});
      if(actual.decision!==c.expected.decision||actual.reason!==c.expected.reason)
        errors.push("PREFLIGHT_REGRESSION:"+c.id);
    }
  }
  return {status:errors.length?"FAIL":"STATIC_CONTRACT_PASS",errors,
    skills:PRIMARY_SKILLS.length,checked_paths:REQUIRED.length,
    model_evaluated:false,private_drive_checked:false};
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const result=verifyRepository();
  process.stdout.write(JSON.stringify(result,null,2)+"\n");
  if(result.errors.length)process.exitCode=1;
}
