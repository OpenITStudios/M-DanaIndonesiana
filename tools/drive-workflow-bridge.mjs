// P2 Workflow Bridge: pure source-selection + typed handoff for existing seven skills.
// No network calls, persistence, approval inference, or changes to project records.
import { RegistryError, toSourcePointer } from "./drive-registry-core.mjs";

const one = (type, roles = null) => ({ type, roles, cardinality: "one" });
const many = (type, roles = null) => ({ type, roles, cardinality: "many" });
const support = (skill, when) => ({ skill, when });

export const WORKFLOWS = Object.freeze({
  "change-package": {
    purpose: "Review a proposed project change as a linked package, not as approved baseline",
    primary_skill: "grant-administration",
    primary_contract: "kits/dana-indonesiana/administration/CONTRACT.md",
    required: [one("PROPOSAL", ["PROPOSED"]), one("RAB", ["PROPOSED"]),
      one("LINIMASA", ["PROPOSED"])],
    optional: [many("PROGRAM_REFERENCE", ["CANDIDATE_REFERENCE"])],
    supporting: [
      support("regulatory-applicability", "Check applicability and change-approval requirements"),
      support("finance-reporting", "Compare monetary changes; do not treat draft RAB as approved ceiling"),
      support("creative-production", "Evaluate implications for indicators and delivery dates"),
      support("evidence-audit", "Check decision letters and substantiation only when available")
    ],
    content_review: "Read the three authorized source documents, compare versions and identify the approval evidence separately."
  },
  "disbursement-readiness": {
    purpose: "Check a disbursement package; no bank or e-RISPRO confirmation is inferred",
    primary_skill: "grant-administration",
    primary_contract: "kits/dana-indonesiana/administration/CONTRACT.md",
    required: [one("AGREEMENT"), one("RAB", ["APPROVED_BASELINE"]),
      one("FUNDING_PLAN")],
    optional: [many("PROGRAM_REFERENCE", ["CANDIDATE_REFERENCE"]), many("EVIDENCE")],
    supporting: [
      support("regulatory-applicability", "Validate the real contract, category, year and required documents"),
      support("finance-reporting", "Validate budget and cash facts, only from source evidence"),
      support("evidence-audit", "Review documentary support and any official receipt")
    ],
    content_review: "Confirm applicable contract/approved RAB and submission requirements before evaluating readiness."
  },
  "rab-review": {
    purpose: "Analyze one explicitly identified RAB as a draft or approved document according to evidence",
    primary_skill: "finance-reporting",
    primary_contract: "kits/dana-indonesiana/finance/CONTRACT.md",
    required: [one("RAB", ["PROPOSED", "APPROVED_BASELINE"])],
    optional: [one("PROPOSAL", ["PROPOSED"]), one("LINIMASA", ["PROPOSED"])],
    supporting: [
      support("grant-administration", "Confirm approved baseline before claiming an approved ceiling"),
      support("regulatory-applicability", "Review applicable cost/approval rules when making compliance claims")
    ],
    content_review: "Inspect RAB contents and formulas; a proposed RAB may be analyzed but must remain DRAFT."
  },
  "finance-report": {
    purpose: "Prepare a finance report from an approved RAB and actual recorded transactions",
    primary_skill: "finance-reporting",
    primary_contract: "kits/dana-indonesiana/finance/CONTRACT.md",
    required: [one("RAB", ["APPROVED_BASELINE"]), one("TRANSACTION_LEDGER")],
    optional: [many("EVIDENCE"), many("PROGRAM_REFERENCE", ["CANDIDATE_REFERENCE"])],
    supporting: [
      support("evidence-audit", "Reconcile actual payment evidence"),
      support("grant-administration", "Confirm approved RAB version and official report format")
    ],
    content_review: "Validate transaction-level evidence and numbers before any financial calculation or Excel export."
  },
  "progress-report": {
    purpose: "Prepare an evidence-grounded narrative of actual creative progress",
    primary_skill: "creative-documentation",
    primary_contract: "kits/dana-indonesiana/writing/CONTRACT.md",
    required: [one("INDICATOR"), one("ACTIVITY_RECORD")],
    optional: [many("EVIDENCE"), one("LINIMASA", ["APPROVED_BASELINE", "PROPOSED"])],
    supporting: [
      support("creative-production", "Supply actual outputs, milestone and indicator mapping"),
      support("evidence-audit", "Validate substantive support for individual claims"),
      support("grant-administration", "Check mandated format only when the report will be submitted")
    ],
    content_review: "Identify observable outcomes and citations; drafts and proposed timelines are not proof of implementation."
  },
  "evidence-review": {
    purpose: "Assess the evidentiary strength of a specific claim without approving it",
    primary_skill: "evidence-audit",
    primary_contract: "kits/dana-indonesiana/evidence/CONTRACT.md",
    required: [many("EVIDENCE")],
    optional: [one("RAB", ["APPROVED_BASELINE", "PROPOSED"]),
      many("PROGRAM_REFERENCE", ["CANDIDATE_REFERENCE"])],
    supporting: [
      support("grant-administration", "Confirm which approved obligation or submission is being evidenced"),
      support("finance-reporting", "Check matching amounts only if claim is financial")
    ],
    content_review: "Specify each claim and the relevant proof before classifying strength or completeness."
  },
  "regulatory-review": {
    purpose: "Review applicability of candidate program rules to a particular contract/context",
    primary_skill: "regulatory-applicability",
    primary_contract: "kits/dana-indonesiana/regulatory/CONTRACT.md",
    required: [many("PROGRAM_REFERENCE", ["CANDIDATE_REFERENCE"])],
    optional: [one("AGREEMENT"), one("DECISION"), many("PROGRAM_REFERENCE", ["COMPARATOR", "HISTORICAL"])],
    supporting: [
      support("grant-administration", "Supply actual agreement, amendments and dated decisions as needed")
    ],
    content_review: "Check actual provisions, contract and effective dates; a candidate reference is not automatically applicable."
  },
  "production-review": {
    purpose: "Compare actual digital production against indicators and accepted scope",
    primary_skill: "creative-production",
    primary_contract: "kits/dana-indonesiana/production/CONTRACT.md",
    required: [one("INDICATOR"), one("ACTIVITY_RECORD")],
    optional: [one("LINIMASA", ["APPROVED_BASELINE", "PROPOSED"]), many("EVIDENCE")],
    supporting: [
      support("evidence-audit", "Check product proof and QA evidence when available"),
      support("grant-administration", "Escalate material scope or schedule changes")
    ],
    content_review: "Review actual deliverables; internal task completion is not the official indicator score."
  },
  "publication-review": {
    purpose: "Check rights and support for a proposed publication or dissemination",
    primary_skill: "dissemination-rights",
    primary_contract: "kits/dana-indonesiana/rights/CONTRACT.md",
    required: [one("PUBLICATION_MATERIAL"), many("RIGHTS_CLEARANCE")],
    optional: [many("EVIDENCE"), one("INDICATOR"), many("PROGRAM_REFERENCE", ["CANDIDATE_REFERENCE"])],
    supporting: [
      support("creative-production", "Check material version and actual assets"),
      support("evidence-audit", "Confirm license or consent evidence"),
      support("creative-documentation", "Draft only cleared copy and attribution")
    ],
    content_review: "Check actual ownership, licenses and permissions; a public file is not proof of usage rights."
  }
});

function fail(code, detail) { throw new RegistryError(code, detail); }

export function parseSelections(raw = "") {
  const selections = {};
  if (!raw) return selections;
  for (const part of String(raw).split(",")) {
    const pair = part.split("=");
    if (pair.length !== 2 || !/^[A-Z][A-Z0-9_]{2,60}$/.test(pair[0]) ||
      !/^[A-Z][A-Z0-9-]{2,90}$/.test(pair[1]) || Object.hasOwn(selections, pair[0])) {
      fail("INVALID_SELECTION", part);
    }
    selections[pair[0]] = pair[1];
  }
  return selections;
}

export function selectWorkflowSources(records, workflowId, selections = {}) {
  const workflow = WORKFLOWS[workflowId];
  if (!workflow) fail("UNKNOWN_WORKFLOW", workflowId);
  const specifications = [...workflow.required.map(spec => ({ ...spec, required: true })),
    ...workflow.optional.map(spec => ({ ...spec, required: false }))];
  const types = new Set(specifications.map(spec => spec.type));
  for (const type of Object.keys(selections)) {
    if (!types.has(type)) fail("SELECTION_NOT_USED_BY_WORKFLOW", type);
  }
  const matched = [];
  const gaps = [];
  const ambiguous = [];
  const byId = new Set();
  for (const spec of specifications) {
    let candidates = records.filter(r => r.document_type === spec.type &&
      (!spec.roles || spec.roles.includes(r.source_role)));
    const explicitId = selections[spec.type];
    if (explicitId) candidates = candidates.filter(r => r.document_id === explicitId);
    if (!candidates.length) {
      gaps.push({
        document_type: spec.type, required: spec.required,
        reason: explicitId ? "SELECTED_ID_NOT_FOUND_OR_ROLE_MISMATCH" : "NOT_INDEXED_IN_REGISTRY",
        requested_id: explicitId || null
      });
    } else if (spec.cardinality === "one" && candidates.length !== 1) {
      ambiguous.push({
        document_type: spec.type, required: spec.required,
        reason: "EXPLICIT_ID_REQUIRED",
        candidate_ids: candidates.map(r => r.document_id).sort()
      });
    } else {
      for (const record of candidates) {
        if (byId.has(record.document_id)) continue;
        byId.add(record.document_id);
        matched.push({ required: spec.required, document_type: spec.type, record });
      }
    }
  }
  return { workflow_id: workflowId, workflow, matched, gaps, ambiguous };
}

export function buildWorkflowHandoff(plan, metadataById = {}) {
  if (!plan?.workflow || !Array.isArray(plan.matched)) fail("INVALID_WORKFLOW_PLAN");
  const sources = plan.matched.map(({ required, document_type, record }) => {
    const metadata = metadataById[record.document_id];
    const state = typeof metadata === "string" ? metadata : "METADATA_NOT_CHECKED";
    return {
      purpose: required ? "REQUIRED" : "OPTIONAL",
      requirement_type: document_type,
      ...toSourcePointer(record, state)
    };
  });
  const requiredGaps = plan.gaps.filter(g => g.required);
  const requiredAmbiguity = plan.ambiguous.filter(a => a.required);
  const metadataProblems = sources.filter(s => s.metadata_state !== "METADATA_MATCH_ONLY");
  const status = requiredGaps.length || requiredAmbiguity.length
    ? "SOURCE_SELECTION_BLOCKED"
    : metadataProblems.length ? "METADATA_REVIEW_REQUIRED"
    : "POINTERS_READY_FOR_CONTENT_REVIEW";
  return {
    kind: "drive_workflow_handoff_v1",
    workflow_id: plan.workflow_id,
    purpose: plan.workflow.purpose,
    status,
    primary_skill: plan.workflow.primary_skill,
    primary_contract: plan.workflow.primary_contract,
    supporting_skills_conditional: plan.workflow.supporting,
    sources,
    missing_or_unindexed: plan.gaps,
    ambiguous: plan.ambiguous,
    content_review_next: plan.workflow.content_review,
    document_bodies_read: false,
    source_applicability_verified: false,
    human_review_required: true,
    official_approval_verified: false,
    may_submit_or_edit: false,
    caveat: "This is a source-pointer handoff, not a completed audit, transaction, content review, approval or e-RISPRO submission."
  };
}
