# Google Drive Integration — P0 Source Resolver + P1 Document Registry

**Status:** implementation added to develop; not yet validated by runtime tests or full project acceptance.

## Boundaries

- GitHub PUBLIC: resolver code, generic schema, instructions and synthetic tests only.
- Private Google Drive: source documents and one Document Registry Google Sheet in the authorized project folder.
- The bridge is **READ-ONLY**. No source bodies are downloaded, no sheets/files are edited by the CLI, and no GitHub workflows upload private data.
- A ChatGPT Google Drive connection allows supervised document discovery in chat; it does **not** automatically provide the OAuth token needed by a local Node process.
- Do not persist files marked *pelajari saja / jangan simpan* in the registry. Review storage permissions before adding any sensitive document metadata.

## Minimum registry contract

Sheet tab: **Documents**, header row 1. The required columns, in order, are:

    document_id,document_type,document_name,drive_file_id,drive_url,source_role,internal_status,external_status,source_version,related_ids,access_class,usage_policy,observed_modified_time,last_reviewed_at,notes

- Document ID must be unique and stable; Drive file ID must be unique among indexed rows.
- `related_ids` is a semicolon-separated set of existing `document_id` values.
- `observed_modified_time` is an observed Drive timestamp (ISO 8601), not an approval date or content hash.
- `source_role`: PROPOSED, APPROVED_BASELINE, CANDIDATE_REFERENCE, COMPARATOR, HISTORICAL, INTERNAL_INDEX or EVIDENCE.
- `internal_status`: UNVERIFIED, DRAFT, IN_REVIEW, READY_TO_SUBMIT or SUPERSEDED.
- `external_status`: UNKNOWN, SUBMITTED, REVISION_REQUESTED or EXTERNAL_CONFIRMED.
- `access_class`: PUBLIC_SYSTEM, INTERNAL_PROJECT or RESTRICTED.
- `usage_policy`: READ_ONLY for this phase.
- `source_version` and `last_reviewed_at` may be empty when not verified. File dates and titles do not prove a document is approved.

## Running locally (Node 22+)

Prerequisites: an OAuth access token from your authorized Google account with `spreadsheets.readonly` and `drive.metadata.readonly` scopes. Set it locally through `GOOGLE_ACCESS_TOKEN`. Never paste or commit the token; do not run this against private project data on public CI.

    node tools/drive-source-resolver.mjs resolve --sheet-id PRIVATE_SHEET_ID --id DOC-EXAMPLE-01
    node tools/drive-source-resolver.mjs audit --sheet-id PRIVATE_SHEET_ID
    node tools/drive-source-resolver.mjs audit --sheet-id PRIVATE_SHEET_ID --root-folder-id PRIVATE_FOLDER_ID
    node tools/drive-source-resolver.mjs discover --sheet-id PRIVATE_SHEET_ID --root-folder-id PRIVATE_FOLDER_ID

The sheet ID/folder ID must come from your *private* Drive, not a committed config file. Both raw IDs and standard URLs are accepted.

### Output states

- `METADATA_MATCH_ONLY`: the saved name/time/ID match Drive metadata; **not** an audit of content, authenticity, suitability, or legal status.
- `METADATA_CHANGED_REVIEW_REQUIRED` or `NAME_CHANGED_REVIEW_REQUIRED`: metadata has changed; inspect the source and review affected outputs.
- `SOURCE_UNAVAILABLE` / `SOURCE_TRASHED`: verify access and lifecycle before proceeding.
- `NOT_REGISTERED_REVIEW_REQUIRED`: a file in the selected folder tree has no registry row; do not automatically classify or approve it.
- `AMBIGUOUS_SELECTION`: more than one source has the requested document type; use the exact document ID.

Exit code 0: metadata matched or discovery had no findings. Exit code 2: action completed but needs review. Exit code 1: command, authorization, or structural failure. Failed API calls are not silently treated as clean checks.

## Source Resolver behavior

1. Load the authorized private Registry Sheet using Sheets API, then validate IDs, status enums, links, and related-document references.
2. Resolve by exact `document_id`; type-based resolution is allowed only if unique. No filename-contains-`final` or newest-date heuristics.
3. Read Drive metadata using file ID and compare with the last observed metadata.
4. Return a *source pointer* plus explicit uncertainty. Do not load a document body until the user authorizes the relevant project task and privacy boundaries.
5. For audit/discover, optionally scan a bounded project folder tree; unindexed files are reported, not copied or registered automatically.

## Relationship to the seven skills

- Administration owns document status, version/decision references and changes to the controlled baseline.
- Finance reads the applicable RAB *after* Administration validates its approved status; a PROPOSED RAB is not approved budget.
- Regulatory verifies which rule applies to the contract year, category and effective period.
- Evidence reviews source and supporting proof; Writing/Production/Rights receive only the minimum appropriate linked facts.
- The registry is a navigation/index layer. It does not become a second ledger for transactions, procurement, indicators, or spending.

## Non-features and handoff

- No unattended sync, bidirectional editing, auto-approval, e-RISPRO submission, private-data push to GitHub or automatic Sheet updates.
- Do not derive `SUBMITTED` or `EXTERNAL_CONFIRMED` from a filename, modified date, folder or receipt count; review official supporting evidence.
- P2 can add reviewed workflow handoffs; P3 can add explicitly authorized private metadata update. Neither should be claimed as implemented now.
- Unit tests are authored with synthetic values but deliberately not run while project QA remains deferred.

Related: `AGENTS.md`, `SECURITY.md`, `docs/foundation/02-source-authority.md`, `docs/foundation/04-traceability.md`, `kits/dana-indonesiana/administration/DOCUMENT-CONTROL.md`.
