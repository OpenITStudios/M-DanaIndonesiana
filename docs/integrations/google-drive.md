# Google Drive Integration — P0/P1 Registry + P2 Workflow Bridge + P3 Change Impact

**Status:** P0–P3 read-only code added to `develop`; a private Google Sheet stores the document registry. Google OAuth CLI runtime, scheduled monitoring and end-to-end/QA acceptance have **not** been executed.

## Boundaries

- GitHub PUBLIC: resolver code, generic schema, instructions and synthetic tests only.
- Private Google Drive: source documents and one Document Registry Google Sheet in the authorized project folder.
- All CLI commands (`resolve`, `audit`, `discover`, `handoff`, `impact`) are **READ-ONLY**. They do not fetch document bodies, edit Google files, update registry status, or transmit project data to GitHub.
- A ChatGPT Google Drive connection allows supervised document discovery in chat; it does **not** automatically provide the OAuth token needed by a local Node process.
- Do not persist files marked *pelajari saja / jangan simpan* in the registry. Review storage permissions before adding any sensitive document metadata.

## Minimum registry contract

Sheet tab: **Documents**, header row 1. The required columns, in order, are:

    document_id,document_type,document_name,drive_file_id,drive_url,source_role,internal_status,external_status,source_version,related_ids,access_class,usage_policy,observed_modified_time,last_reviewed_at,notes

- Document ID must be unique and stable; Drive file ID must be unique among indexed rows.
- `related_ids` is a semicolon-separated set of existing `document_id` values.
- `observed_modified_time` is an observed Drive timestamp (ISO 8601), not an approval date or content hash.
- `source_role`: PROPOSED, APPROVED_BASELINE, CANDIDATE_REFERENCE, COMPARATOR, HISTORICAL, INTERNAL_INDEX, EVIDENCE or DERIVED_OUTPUT.
- `internal_status`: UNVERIFIED, DRAFT, IN_REVIEW, READY_TO_SUBMIT or SUPERSEDED.
- `external_status`: UNKNOWN, SUBMITTED, REVISION_REQUESTED or EXTERNAL_CONFIRMED.
- `access_class`: PUBLIC_SYSTEM, INTERNAL_PROJECT or RESTRICTED.
- `usage_policy`: READ_ONLY for this phase.
- `source_version` and `last_reviewed_at` may be empty when not verified. File dates and titles do not prove a document is approved.
- P3 adds **one optional column P**: `derived_from_ids` (semicolon-separated IDs). This is valid **only** on `source_role=DERIVED_OUTPUT` records, e.g. a real report derived from a registered RAB. Do not populate a speculative report or claim dependency from folder adjacency.
- `related_ids` is undirected/navigation/context, **not** evidence that one document is derived from another. P3 only propagates review signals via `derived_from_ids`.
- Existing 15-column sheets remain readable. The private registry has been extended by one header, with existing document records untouched. Missing/unregistered reports cannot be marked impacted.

## Running locally (Node 22+)

Prerequisites: an OAuth access token from your authorized Google account with `spreadsheets.readonly` and `drive.metadata.readonly` scopes. Set it locally through `GOOGLE_ACCESS_TOKEN`. Never paste or commit the token; do not run this against private project data on public CI.

    node tools/drive-source-resolver.mjs resolve --sheet-id PRIVATE_SHEET_ID --id DOC-EXAMPLE-01
    node tools/drive-source-resolver.mjs audit --sheet-id PRIVATE_SHEET_ID
    node tools/drive-source-resolver.mjs audit --sheet-id PRIVATE_SHEET_ID --root-folder-id PRIVATE_FOLDER_ID
    node tools/drive-source-resolver.mjs discover --sheet-id PRIVATE_SHEET_ID --root-folder-id PRIVATE_FOLDER_ID
    node tools/drive-source-resolver.mjs handoff --sheet-id PRIVATE_SHEET_ID --workflow change-package
    node tools/drive-source-resolver.mjs handoff --sheet-id PRIVATE_SHEET_ID --workflow rab-review --select RAB=DOC-EXAMPLE-01
    node tools/drive-source-resolver.mjs impact --sheet-id PRIVATE_SHEET_ID
    node tools/drive-source-resolver.mjs impact --sheet-id PRIVATE_SHEET_ID --root-folder-id PRIVATE_FOLDER_ID

The sheet ID/folder ID must come from your *private* Drive, not a committed config file. Both raw IDs and standard URLs are accepted.

Registry CLI intentionally reads a bounded sheet of **up to 1,000 grid rows**. If the Documents tab is allocated more rows, the CLI raises `REGISTRY_ROW_CAPACITY_EXCEEDED` rather than silently skipping additional documents. Expanding capacity safely is a separate, explicit change.

### Output states

- `METADATA_MATCH_ONLY`: the saved name/time/ID match Drive metadata; **not** an audit of content, authenticity, suitability, or legal status.
- `METADATA_CHANGED_REVIEW_REQUIRED` or `NAME_CHANGED_REVIEW_REQUIRED`: metadata has changed; inspect the source and review affected outputs.
- `SOURCE_UNAVAILABLE` / `SOURCE_TRASHED`: verify access and lifecycle before proceeding.
- `NOT_REGISTERED_REVIEW_REQUIRED`: a file in the selected folder tree has no registry row; do not automatically classify or approve it.
- `AMBIGUOUS_SELECTION`: more than one source has the requested document type; use the exact document ID.

Exit code 0: no detected metadata changes (or P2 pointers ready for **content** review), not business completion. Exit code 2: source selection, metadata/impact finding or incomplete metadata checks. Exit code 1: invalid command, authorization, unavailable registry, or structural failure. Failed API calls are not silently treated as clean checks.

## Source Resolver behavior

1. Load the authorized private Registry Sheet using Sheets API, then validate IDs, status enums, links, and related-document references.
2. Resolve by exact `document_id`; type-based resolution is allowed only if unique. No filename-contains-`final` or newest-date heuristics.
3. Read Drive metadata using file ID and compare with the last observed metadata.
4. Return a *source pointer* plus explicit uncertainty. Do not load a document body until the user authorizes the relevant project task and privacy boundaries.
5. For audit/discover, optionally scan a bounded project folder tree; unindexed files are reported, not copied or registered automatically.

## P2 Workflow Bridge — real source selection, not auto-approval

The deterministic definitions live at [tools/drive-workflow-bridge.mjs](../../tools/drive-workflow-bridge.mjs) and the CLI uses them through `handoff`. The bridge selects source pointers from the **existing private registry**; it does not create new finance/transaction/indicator registries and does not execute all seven skills.

| Workflow ID | Primary existing skill | Required registry source types | Action if unavailable |
| --- | --- | --- | --- |
| `change-package` | grant-administration | proposed PROPOSAL, RAB, LINIMASA | Report missing or ambiguous files |
| `disbursement-readiness` | grant-administration | AGREEMENT, approved-baseline RAB, FUNDING_PLAN | Block completeness claim |
| `rab-review` | finance-reporting | one RAB (proposed or approved-baseline) | Require exact ID if ambiguous |
| `finance-report` | finance-reporting | approved-baseline RAB, TRANSACTION_LEDGER | Block report-source readiness |
| `progress-report` | creative-documentation | INDICATOR, ACTIVITY_RECORD | Report missing source registration |
| `evidence-review` | evidence-audit | at least one EVIDENCE | Report missing source registration |
| `regulatory-review` | regulatory-applicability | candidate PROGRAM_REFERENCE documents | Read sources to assess applicability |
| `production-review` | creative-production | INDICATOR, ACTIVITY_RECORD | Report missing source registration |
| `publication-review` | dissemination-rights | PUBLICATION_MATERIAL, RIGHTS_CLEARANCE | Report missing source registration |

**Selection rules:**
- One expected document: unique match only. Multiple matches = `EXPLICIT_ID_REQUIRED`; never select by latest filename/date.
- Many expected documents: list all matching source roles; comparison/historical references never become automatically applicable.
- `--select TYPE=DOCUMENT_ID[,TYPE=DOCUMENT_ID]` resolves an ambiguity; the selected ID must still match the type and role allowed for that workflow.
- `NOT_INDEXED_IN_REGISTRY` does not mean the document does not exist anywhere in Drive.
- A proposed RAB may be inspected as a **draft**, never claimed to be the official approved ceiling based on a registry flag.
- Optional sources are reported as unindexed if absent, but do not block matching required pointers. A content-level requirement may still block the real business task later.
- `METADATA_MATCH_ONLY` and `POINTERS_READY_FOR_CONTENT_REVIEW` mean pointers match metadata only; documents, decisions, financial claims, legal applicability and actual proof have **not** been checked.

### ChatGPT with connected GitHub + Drive (operator-assisted)

1. Read `AGENTS.md`, [Skill Router](../skills/README.md), this integration document and the active domain contract **from the pinned branch**.
2. Select one workflow using the intended output, not a vague topic. For a review of changed proposal/RAB/linimasa use `change-package`.
3. With user-authorized Google Drive access, read the private Registry's **Documents** tab and find the required IDs/roles. Confirm actual file metadata (do not simply rely on the old timestamp). When a connector does not expose a necessary field, label it `NOT_CHECKED`.
4. For an ambiguous or missing registry source, report the exact missing type/candidates and avoid inventing a baseline. Do not publish private registry IDs or document URLs to GitHub.
5. When the user authorizes the project task, fetch **only required document content** from Drive, following the privacy restriction on that source. Read-only permission for a document is not permission to copy, edit, export, or store it elsewhere.
6. Apply the **single primary skill**; use supporting skills conditionally for finance, regulation, evidence, rights or production as shown in the workflow definition. Pass only facts/references required by each owner.
7. Deliver results with explicit source version, content actually reviewed, method, missing evidence, and separation of internal review vs external confirmation. `SUBMITTED`/ `EXTERNAL_CONFIRMED` requires official evidence, not status fields or metadata.

**Important:** ChatGPT connectors enable supervised reads in a conversation. They do not execute this Node CLI by themselves, share OAuth access tokens with a local process, or provide unattended bidirectional synchronization. The CLI can operate locally with an authorized token; ChatGPT can follow the same contract by reading its definitions and the private sheet.

### Example sequence for a change-package review

```text
User: "Periksa paket perubahan proposal, RAB, dan linimasa."
  -> workflow: change-package (owner Administration)
  -> Registry selects 3 proposed documents by type/role
  -> Drive metadata check: MATCH or REVIEW_REQUIRED
  -> Authorized source-content read, then version and consistency checks
  -> Regulatory/Finance/Production/Evidence only where needed
  -> Draft comparison + missing official approvals (never assumed)
```

Expected `handoff` shape: `kind=drive_workflow_handoff_v1`, `workflow_id`, `primary_skill`, `supporting_skills_conditional`, `sources[]`, `missing_or_unindexed[]`, `ambiguous[]`, `status`, `human_review_required=true`, `official_approval_verified=false`, `may_submit_or_edit=false`.

## P3 — Change Detection & Impact Analysis (preview only)

**Goal:** When an indexed Google Drive source changes, identify **review candidates** without editing the original document, recalculating RAB, changing project baselines or claiming official approval. P3 is invoked on demand with `impact`. It is **not** a continuous background watcher.

**Pure change engine:** [tools/drive-change-impact.mjs](../../tools/drive-change-impact.mjs) compares Drive metadata against the `observed_modified_time` and `document_name` recorded during initial inventory. The CLI fetches metadata read-only. The engine classifies:

| Output signal | Meaning | Action |
| --- | --- | --- |
| `METADATA_MATCH_ONLY` | File ID, name and modified time match baseline metadata | No metadata change signal; not proof of identical content |
| `METADATA_CHANGE_SIGNAL` | Modified time and/or name differs; file trashed or ID mismatch | Review the actual source before reusing affected outputs |
| `METADATA_UNVERIFIED` | File inaccessible/404, API check failed, incomplete metadata or no timestamp baseline | Investigate access/baseline. **Do not claim it changed** |
| `REVIEW_REQUIRED_NOT_AUTOMATICALLY_STALE` | An indexed derived output has direct/transitive dependency on an affected source | Open the output and verify whether content or calculations need revision |
| `NOT_REGISTERED_REVIEW_REQUIRED` | Optional folder inventory finds a file without a registry entry | Classify manually before using it |

**Dependency propagation** is conservative:
1. Observe each registered file; produce multi-signal findings (name and modified time can change together).
2. Use `derived_from_ids` **only for actual registered derived outputs** (`DERIVED_OUTPUT`). Links must point to existing IDs; repeated, self-referential, cyclic and broken references are rejected.
3. Walk directed dependencies transitively (e.g. RAB → LRA report → summary); emit root source IDs and `REVIEW_REQUIRED`, **not** an automatic statement that output values are wrong.
4. Show `related_ids` peers as **context only**; they never imply a derived report is stale.
5. Map changed or unverified source types to potentially affected P2 workflows and their existing owner skills; these are candidates, not completed skill executions.
6. Optionally compare all files under a bounded `--root-folder-id`, reporting unindexed files as discovery gaps; no file copying or auto-registration.
7. If a metadata API call fails, retain `INCOMPLETE_METADATA_CHECK`. Never report a clean scan from a partially checked set.

**Result fields:** `kind=drive_change_impact_v1`, `check_status`, `metadata_change_signals[]`, `metadata_unverified[]`, `impacted_outputs[]`, `workflow_impact_candidates[]`, `related_document_context[]`, `unindexed_files[]` (when folder inventory requested), and summary counts. The CLI prints JSON to stdout; stdout may include private document IDs/names. Do **not** paste reports into public GitHub Issues, Actions, PRs or logs.

**Manual review and future refresh:**
- Review actual source version and the scope of the change before updating any derived report.
- If a reviewed metadata baseline must change, the authorized owner can update the private Registry's observed timestamp/name after review with an audit note. The **CLI never performs this write**.
- There are no derived output records in the initial nine-file registry; `derived_mapping_coverage=NO_DERIVED_OUTPUTS_INDEXED` must be presented, not a claim that no reports require review.
- File timestamps are metadata, not checksums. This phase does not compare document bodies, Drive revision streams, financial amounts, official approval evidence or internal status.
- To compare **substantive** document revisions, use authorized source-specific revisions/content reads and the correct domain skill. Do not infer causality from timestamps alone.

**ChatGPT workflow:** when the user requests a change audit, read the private Registry through connected Drive, obtain current metadata for the indexed files, distinguish changed/inaccessible/unchanged, map only explicit `derived_from_ids`, and report gaps. ChatGPT cannot run the local OAuth CLI simply by reading its GitHub source. Do not promise background checks or automatic updates.

## Relationship to the seven skills

- Administration owns document status, version/decision references and changes to the controlled baseline.
- Finance reads the applicable RAB *after* Administration validates its approved status; a PROPOSED RAB is not approved budget.
- Regulatory verifies which rule applies to the contract year, category and effective period.
- Evidence reviews source and supporting proof; Writing/Production/Rights receive only the minimum appropriate linked facts.
- The registry is a navigation/index layer. It does not become a second ledger for transactions, procurement, indicators, or spending.

## Non-features and handoff

- No unattended sync, bidirectional editing, auto-approval, e-RISPRO submission, private-data push to GitHub or automatic Sheet updates.
- Do not derive `SUBMITTED` or `EXTERNAL_CONFIRMED` from a filename, modified date, folder or receipt count; review official supporting evidence.
- P2 builds source-pointer handoffs; P3 builds **read-only metadata and dependency impact previews**. Private registry writes, real document-content comparison and unattended scheduling are not part of this phase.
- Synthetic-only unit tests for P0–P3 are authored but deliberately not run while project QA remains deferred.

Related: `AGENTS.md`, `SECURITY.md`, `docs/foundation/02-source-authority.md`, `docs/foundation/04-traceability.md`, `kits/dana-indonesiana/administration/DOCUMENT-CONTROL.md`.
