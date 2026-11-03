# Google-native Master Templates — Public Blueprint Only

This folder does **not** contain Google-native master files. It defines six blank internal templates and a strict input contract. Authorized native Google Docs/Sheets masters live inside private Google Drive and are registered by ID/version in the *same* private Document Registry Google Sheet, tab `Template Masters`. At T2, internal Google Docs master `di.report.indicator@1.1.0` supersedes v1.0.0 after three synthetic Google Docs copy-fill/render scenarios. Version v1.0.0 is historical (pagination issue). The other five distinct catalog entries are blueprints, not created masters. No private Drive ID is stored here.

Catalog: [catalog.json](catalog.json). [Master 01 QA evidence](../../docs/qa/master01-fill-layout-2026-11-03.md). System workflow: [Google-native templates](../../docs/integrations/google-native-templates.md). **Visual quality gate:** [Standar Mutu Dokumen](QUALITY-STANDARD.md), [Profil Jenis Dokumen](DOCUMENT-PROFILES.md), [Token Visual](design-tokens.json) dan [Bukti Riset](../../docs/research/google-native-document-design-2026.md).

## Google Docs (3 designs)

- `di.report.indicator` — 9 uppercase `{{PLACEHOLDERS}}`; status `DRAFT / INTERNAL REVIEW` visible. Source: `templates/reporting/indicator-report.md`.
- `di.report.creative-narrative` — 6 placeholders; curatorial/process prose must derive from checked sources.
- `di.admin.package` — 7 placeholders; internal checklist and external approval status must remain distinct.

Use readable A4 layout, consistent headings, proper page breaks, and protected master editing. Internal document style is optional and cannot override verified official layouts. Do not invent government markings, signatures, logos, or reviewer names. Read back token replacement counts.

## Google Sheets (3 designs)

Keep tab names and write-cell destinations **exactly** as specified. Write only into blank input regions; place protected formulas in separate cells and verify them after editing.

| Catalog ID | Native tab | Scalar cells | Table begins | Preallocate at least |
|---|---|---|---|---|
| `di.procurement.price-comparison` | `Perbandingan` | B2, B3, B4 | A8 | 60 rows |
| `di.reporting.revision-matrix` | `Revisi` | B2, B3, B4 | A9 | 80 rows |
| `di.evidence.review` | `Bukti` | B2, B3 | A8 | 100 rows |

Use literal text for vendor names and evidence references. Numeric input is decimal integer string within 15 digits, then written as Sheets number. Listing prices are only quoted references; not transactions or accepted quotations.

## Master maintenance

For every change, retain a version and a reviewer trail. Actual Drive metadata must match the reviewed timestamp; otherwise planning halts. The public catalog does not carry Drive file IDs or actual project facts. The current planner requires an exact active master and deliberately blocks `OFFICIAL_FORMAT` until formal applicability review is implemented.
