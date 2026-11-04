# Documentation Index

Dokumentasi menggunakan tiga jenis konten: **aturan inti** (otoritas/batas), **prosedur per pekerjaan** (how-to), dan **catatan referensi/keputusan**. Baca yang diperlukan saja.

## Pilih pekerjaan

[Skill Router](skills/README.md) → satu `SKILL.md` → satu kontrak domain → prosedur rinci bila perlu. Untuk pekerjaan lintas domain gunakan [Cross-Skill Workflows](skills/cross-skill-workflows.md); untuk paket laporan lebih rinci gunakan [Reporting Workflow](skills/reporting-workflow.md).

## Pedoman dasar produksi dokumen — mulai dari sini

- **[Pedoman Dasar Produksi Dokumen](foundation/05-document-production-baseline.md):** aturan internal utama yang telah disetujui untuk semua dokumen baru dan revisi. Mengatur kebutuhan pembaca, kualitas tulisan alami seperti hasil kerja editor, EYD/italic, layout, sumber, dan gerbang QA. Versi Google Docs ada di folder `90 - Pedoman dan Referensi` proyek; riset desain terdahulu merupakan referensi pendukung, bukan pedoman paralel.


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
## Pedoman dan QA Google Sheets

- [Standar Spreadsheet Profesional](../templates/google-native/SPREADSHEET-STYLE.md): struktur, tipografi, tanggal/IDR, validasi, formula, keamanan teks, dan batas pengadaan.
- [QA Master Sheets 01](qa/master-sheets01-price-comparison-2026-11-03.md): native Google Sheets dan contoh empat harga sintetis; tidak mengklaim verifikasi visual browser atau status pengadaan.


## Kualitas dokumen dan riset (2026)

- [Standar Mutu Dokumen](../templates/google-native/QUALITY-STANDARD.md): aturan layout, arsitektur informasi, anti-generik, aksesibilitas dan QA dua tahap.
- [Document Profiles](../templates/google-native/DOCUMENT-PROFILES.md): struktur berbeda untuk surat, laporan, keuangan, pengadaan, editorial, bukti dan presentasi.
- [Design Tokens](../templates/google-native/design-tokens.json): default Google-native yang terukur dan dapat dibaca mesin, bukan format resmi.
- [Riset primer dan batas penerapan](research/google-native-document-design-2026.md): referensi ISO, GOV.UK, W3C, Section508, Google API, EYD V, dan konteks ANRI.

## Pemeriksaan Master Google-native

- [Master 01 Fill & Layout QA](qa/master01-fill-layout-2026-11-03.md): perbandingan v1.0.0 dan v1.1.0 menggunakan salinan sintetis Google Docs, metrik PDF, temuan serta batas klaim.
- [Google-native Docs QA helper](../tools/google-native-doc-qa.mjs): struktur/placeholder dan perencanaan pagination salinan; bukan pemeriksaan aksesibilitas PDF otomatis.

- [Profil desain laporan formal](../templates/google-native/FORMAL-REPORT-STYLE.md) dan [uji render Master 01 v1.2.0](qa/master01-human-layout-2026-11-03.md): profil formal yang telah disetujui untuk dokumen internal (QA tetap menggunakan data sintetis).

- [Pedoman penulisan laporan ilmiah & italic](../kits/dana-indonesiana/writing/ACADEMIC-REPORT-STYLE.md): ketentuan EYD V, struktur argumentasi, format sitasi bersyarat, dan review sumber.
- [Bukti QA tipografi Master 01 v1.2.0](qa/master01-scholarly-typography-2026-11-03.md): pemeriksaan Google Docs/PDF dengan contoh sintetis, font dan italic.

- [QA redesain profesional Master Sheets 01 v1.2.0](qa/master-sheets01-professional-v1.2-2026-11-03.md): audit struktur/format dan 8 penawaran sintetis, berikut batas visual browser/cetak.

- [Blueprint RAB](../templates/finance/rab-plan.md): struktur kolom/sel, formula dan batas rencana biaya (Excel + Google Sheets native).
- [QA Template RAB](qa/master-rab-planning-2026-11-04.md): uji RAB 3 tahap, salinan sintetis, perbedaan formula locale, dan batas visual/format resmi.

- [QA RAB Profesional v2.1.0](qa/master-rab-v2-1-2026-11-04.md): hasil perhitungan Excel dan Google Sheets, perbaikan kosong-vs-nol, keterlacakan versi serta batas uji tampilan/cetak.

- [QA Master LRA dan Arus Kas v1.0](qa/master-lra-cash-2026-11-04.md): cakupan 100 pos dan 150 transaksi, pemeriksaan saldo, bukti duplikat, kode RAB, serta batas format resmi.
- [Spesifikasi LRA dan Arus Kas](../templates/finance/lra-cash.md): definisi tab, input, rumus dan pemisahan RAB disetujui versus kas aktual.

- [QA Master Checklist Bukti dan Matriks Revisi](qa/master-evidence-revision-2026-11-04.md): pembuatan dua Google Sheets native dan Excel, kontrak metadata/kolom, dropdown status, contoh tiga record sintetis, serta batas validasi format resmi.

- [QA Google Docs Master 02 dan 03](qa/master-docs02-03-2026-11-04.md): pemeriksaan dua master kreatif/administrasi, token 6/7, tipografi, contoh sintetis normal/panjang dan batas keabsahan.

## Referensi dan konteks

- [Regulatory Source Register](regulations/source-register.md): kandidat publik, **bukan ketentuan otomatis yang berlaku**.
- [Public Design Sources](skills/reference-sources.md): acuan penulisan dan pengembangan skill.
- [Decision Records](knowledge/decisions/0002-modular-skills.md): alasan pemisahan tujuh skill.
- [Planning](../planning/development.md): backlog yang belum dilakukan, bukan izin otomatis menjalankan tes.
- [Templates](../templates/project-intake.md): berkas kosong hanya dibuat saat dibutuhkan di tempat berizin.

Catatan historis versi berada di [CHANGELOG](../CHANGELOG.md), tidak diduplikasi pada router.
