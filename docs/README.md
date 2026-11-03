# Documentation Index

Dokumentasi menggunakan tiga jenis konten: **aturan inti** (otoritas/batas), **prosedur per pekerjaan** (how-to), dan **catatan referensi/keputusan**. Baca yang diperlukan saja.

## Pilih pekerjaan

[Skill Router](skills/README.md) → satu `SKILL.md` → satu kontrak domain → prosedur rinci bila perlu. Untuk pekerjaan lintas domain gunakan [Cross-Skill Workflows](skills/cross-skill-workflows.md); untuk paket laporan lebih rinci gunakan [Reporting Workflow](skills/reporting-workflow.md).

## Fondasi kanonis

| Pertanyaan | Satu pemilik |
|---|---|
| Batas produk | [Product Boundaries](foundation/00-product-boundaries.md) |
| Alur pekerjaan proyek | [Production Flow](foundation/01-production-flow.md) |
| Aturan mana yang berlaku | [Source Authority](foundation/02-source-authority.md) |
| Klaim dan status persetujuan | [Proof & Approval](foundation/03-proof-and-approval.md) |
| Relasi fakta, aktivitas, transaksi, dan bukti | [Traceability](foundation/04-traceability.md) |
| Pembagian tanggung jawab | [Module Ownership](modules/README.md) |
| Privasi dan mutasi Git | [Security](../SECURITY.md) / [GitHub Rules](../GITHUB_RULES.md) |

## Detail spesialis

| Domain | Prosedur utama |
|---|---|
| Finance | [Finance Contract](../kits/dana-indonesiana/finance/CONTRACT.md) |
| Administration | [Administrative Package](../kits/dana-indonesiana/administration/PACKAGE-WORKFLOW.md) |
| Writing | [Editorial Workflow](../kits/dana-indonesiana/writing/EDITORIAL-WORKFLOW.md) |
| Evidence & Procurement | [Claim-to-Evidence](../kits/dana-indonesiana/evidence/CLAIM-TO-EVIDENCE.md) / [Procurement](../kits/dana-indonesiana/procurement/CONTRACT.md) |
| Regulatory | [Applicability Matrix](../kits/dana-indonesiana/regulatory/APPLICABILITY-MATRIX.md) |
| Production | [Production Workflow](../kits/dana-indonesiana/production/WORKFLOW.md) |
| Rights | [Rights Clearance](../kits/dana-indonesiana/rights/RIGHTS-CLEARANCE.md) |

## Integrasi penyimpanan privat

- [Google Drive — Source Resolver & Document Registry](integrations/google-drive.md): pemetaan ID dokumen dan deteksi perubahan metadata secara read-only. Tidak menyimpan sumber privat di Git.

## Registrasi laporan proyek

- [P5 Report Onboarding](integrations/report-onboarding.md): cara aman menghubungkan laporan nyata dari folder proyek dengan dokumen sumber yang telah direview, tanpa auto-register.

## Template Google-native

- [Google-native Template Generation — T1](integrations/google-native-templates.md): satu Registry privat, katalog enam blueprint, planner read-only untuk Docs/Sheets, batas copy/edit/review/P5, serta pekerjaan yang belum diimplementasi.
- [Master authoring guide](../templates/google-native/README.md): placeholder Google Docs, tab/cell Google Sheets dan aturan master privat.
## Kualitas dokumen dan riset (2026)

- [Standar Mutu Dokumen](../templates/google-native/QUALITY-STANDARD.md): aturan layout, arsitektur informasi, anti-generik, aksesibilitas dan QA dua tahap.
- [Document Profiles](../templates/google-native/DOCUMENT-PROFILES.md): struktur berbeda untuk surat, laporan, keuangan, pengadaan, editorial, bukti dan presentasi.
- [Design Tokens](../templates/google-native/design-tokens.json): default Google-native yang terukur dan dapat dibaca mesin, bukan format resmi.
- [Riset primer dan batas penerapan](research/google-native-document-design-2026.md): referensi ISO, GOV.UK, W3C, Section508, Google API, EYD V, dan konteks ANRI.

## Pemeriksaan Master Google-native

- [Master 01 Fill & Layout QA](qa/master01-fill-layout-2026-11-03.md): perbandingan v1.0.0 dan v1.1.0 menggunakan salinan sintetis Google Docs, metrik PDF, temuan serta batas klaim.
- [Google-native Docs QA helper](../tools/google-native-doc-qa.mjs): struktur/placeholder dan perencanaan pagination salinan; bukan pemeriksaan aksesibilitas PDF otomatis.

- [Profil desain laporan formal](../templates/google-native/FORMAL-REPORT-STYLE.md) dan [uji render Master 01 v1.2.0](qa/master01-human-layout-2026-11-03.md): alternatif lebih sederhana yang masih menunggu review pengguna.

- [Pedoman penulisan laporan ilmiah & italic](../kits/dana-indonesiana/writing/ACADEMIC-REPORT-STYLE.md): ketentuan EYD V, struktur argumentasi, format sitasi bersyarat, dan review sumber.
- [Bukti QA tipografi Master 01 v1.2.0](qa/master01-scholarly-typography-2026-11-03.md): pemeriksaan Google Docs/PDF dengan contoh sintetis, font dan italic.

## Referensi dan konteks

- [Regulatory Source Register](regulations/source-register.md): kandidat publik, **bukan ketentuan otomatis yang berlaku**.
- [Public Design Sources](skills/reference-sources.md): acuan penulisan dan pengembangan skill.
- [Decision Records](knowledge/decisions/0002-modular-skills.md): alasan pemisahan tujuh skill.
- [Planning](../planning/development.md): backlog yang belum dilakukan, bukan izin otomatis menjalankan tes.
- [Templates](../templates/project-intake.md): berkas kosong hanya dibuat saat dibutuhkan di tempat berizin.

Catatan historis versi berada di [CHANGELOG](../CHANGELOG.md), tidak diduplikasi pada router.
