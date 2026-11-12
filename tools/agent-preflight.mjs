// Intent preflight only; this does NOT intercept tools, attest identity, or grant access.
export const REPOSITORY="OpenITStudios/M-DanaIndonesiana";
export const PRIMARY_SKILLS=Object.freeze(["finance-reporting","grant-administration",
  "creative-documentation","evidence-audit","regulatory-applicability",
  "creative-production","dissemination-rights"]);
const MODES=new Set(["INSPECT","SYSTEM_DEVELOPMENT","PROJECT_EXECUTION","VALIDATION","MAINTENANCE"]);
const ACTIONS=new Set(["read_repo","write_repo","read_private","write_private",
  "external_submit","approve_external","disburse","release"]);
const ROOTS=new Set(["AGENTS.md","GITHUB_RULES.md","CONTEXT.md","README.md",
  "CHANGELOG.md","SECURITY.md",".gitignore"]);
const DOMAINS={finance:"finance-reporting",administration:"grant-administration",
  writing:"creative-documentation",evidence:"evidence-audit",
  procurement:"grant-administration",production:"creative-production",
  regulatory:"regulatory-applicability",rights:"dissemination-rights"};
const PREFIXES=[[".github/","repository-governance"],[".agents/evals/","agent-evaluation"],
  ["docs/","documentation"],["templates/","templates"],["tools/","tooling"],
  ["tests/","validation"],["planning/","planning"]];
export function safeRepoPath(p){
  return typeof p==="string" && p.length>0 && p.length<=256 &&
    /^[A-Za-z0-9_./-]+$/.test(p) && !p.startsWith("/") && !p.endsWith("/") &&
    !p.includes("//") && !p.split("/").some(s=>s==="." || s==="..");
}
export function ownerForPath(p){
  if(!safeRepoPath(p))return null;
  if(ROOTS.has(p))return "repository-governance";
  if(p==="workspace/README.md")return "documentation";
  if(["kits/dana-indonesiana/SKILL.md","kits/dana-indonesiana/VALIDATION.md",
      "kits/dana-indonesiana/OPERATING-CONTRACT.md"].includes(p))return "shared-contract";
  const kit=/^kits\/dana-indonesiana\/([^/]+)\//.exec(p);
  if(kit)return DOMAINS[kit[1]]||null;
  const skill=/^\.agents\/skills\/([^/]+)\//.exec(p);
  if(skill)return PRIMARY_SKILLS.includes(skill[1])?skill[1]:null;
  for(const [prefix,owner] of PREFIXES)if(p.startsWith(prefix))return owner;
  return null;
}
function decision(value,reason,owner=null){return Object.freeze({
  decision:value,reason,owner,enforcement:"ADVISORY_ONLY_NOT_TRUSTED_TOOL_INTERCEPTION",
  external_approval_verified:false
});}
const block=(reason,owner=null)=>decision("BLOCK",reason,owner);
const allow=(reason,owner=null)=>decision("ALLOW",reason,owner);
export function assessAction(x){
  if(!x || typeof x!=="object" || Array.isArray(x))return block("INVALID_PREFLIGHT_INPUT");
  if(x.repository!==REPOSITORY)return block("WRONG_REPOSITORY");
  if(!/^[0-9a-fA-F]{40}$/.test(x.head_sha||""))return block("INVALID_PINNED_HEAD");
  if(!["develop","Local","main"].includes(x.branch))return block("UNKNOWN_BRANCH");
  if(!MODES.has(x.mode))return block("UNKNOWN_MODE");
  if(!ACTIONS.has(x.action))return block("UNKNOWN_ACTION");
  if(x.action==="read_private"){
    if(!["INTERNAL_PROJECT","RESTRICTED"].includes(x.data_class))
      return block("INVALID_PRIVATE_DATA_CLASS");
    if(x.persist_requested===true)return block("PRIVATE_PERSISTENCE_FORBIDDEN");
    if(x.source_authorized!==true)return block("PRIVATE_READ_NOT_AUTHORIZED");
    if(!["INSPECT","PROJECT_EXECUTION","VALIDATION"].includes(x.mode))
      return block("PRIVATE_READ_MODE_REQUIRED");
    return allow("PRIVATE_READ_ONLY_CONDITIONAL","authorized-private-source");
  }
  if(x.action==="write_private")return block("PRIVATE_WRITE_REQUIRES_TRUSTED_TOOL");
  if(["external_submit","approve_external","disburse","release"].includes(x.action))
    return block("EXTERNAL_ACTION_OUTSIDE_SCOPE");
  if(!safeRepoPath(x.path))return block("UNSAFE_OR_UNOWNED_PATH");
  const owner=ownerForPath(x.path);
  if(x.action==="read_repo")return allow("REPO_READ_ONLY",owner);
  if(!owner)return block("UNSAFE_OR_UNOWNED_PATH");
  if(!["PUBLIC_SYSTEM","SYNTHETIC"].includes(x.data_class))
    return block("NONPUBLIC_REPO_PAYLOAD",owner);
  if(x.branch!=="develop")return block("WRITE_REQUIRES_DEVELOP",owner);
  if(!["SYSTEM_DEVELOPMENT","MAINTENANCE"].includes(x.mode))
    return block("WRITE_MODE_REQUIRED",owner);
  if(x.user_authorized!==true)return block("EXPLICIT_WRITE_SCOPE_REQUIRED",owner);
  return allow("REPO_WRITE_CONDITIONAL",owner);
}
