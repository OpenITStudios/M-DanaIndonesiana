import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {assessAction,ownerForPath,safeRepoPath} from "../tools/agent-preflight.mjs";
const f=JSON.parse(readFileSync(new URL("../.agents/evals/preflight-cases.json",import.meta.url),"utf8"));
for(const c of f.cases)test("preflight "+c.id,()=>{
  const actual=assessAction({...f.defaults,...c.overrides});
  assert.equal(actual.decision,c.expected.decision);
  assert.equal(actual.reason,c.expected.reason);
  assert.equal(actual.enforcement,"ADVISORY_ONLY_NOT_TRUSTED_TOOL_INTERCEPTION");
  assert.equal(actual.external_approval_verified,false);
});
test("unknown paths and traversal are rejected",()=>{
  for(const p of ["../README.md","docs/../README.md","/tmp/file",
    "docs//x","docs\\secret","x%2fsecret","workspace/active/data.json"])
    assert.equal(ownerForPath(p),null);
  assert.equal(safeRepoPath("docs/skills/README.md"),true);
  assert.equal(ownerForPath("kits/dana-indonesiana/procurement/CONTRACT.md"),
    "grant-administration");
});
test("private source identifiers are not echoed by preflight",()=>{
  const a=assessAction({...f.defaults,action:"read_private",
    data_class:"RESTRICTED",path:"private/very-sensitive-id"});
  assert.equal(a.decision,"BLOCK");
  assert.equal(JSON.stringify(a).includes("very-sensitive"),false);
});
