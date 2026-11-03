# Google-native Master Templates — Public Blueprint Only

This folder does **not** contain Google-native master files. It defines seven distinct blank internal template designs and a strict input contract. Authorized native Google Docs/Sheets masters live inside private Google Drive and are registered by ID/version in the *same* private Document Registry Google Sheet, tab `Template Masters`. At T2, approved internal Google Docs master `di.report.indicator@1.2.0` is READY. Versions v1.0.0 and v1.1.0 are RETIRED historical revisions after native copy-fill/render and typography QA. Four other distinct catalog entries remain blueprints, not created masters. No private Drive ID is stored here.

**Pedoman yang wajib dibaca lebih dahulu:** [Pedoman Dasar Produksi Dokumen](../../docs/foundation/05-document-production-baseline.md). Layout ditentukan fungsi dokumen, sedangkan setiap narasi baru menjalani human editorial pass. Profil formal berlaku untuk laporan naratif, bukan otomatis untuk Sheets atau Slides.


Catalog: [catalog.json](catalog.json). [Master 01 QA evidence](../../docs/qa/master01-fill-layout-2026-11-03.md). System workflow: [Google-native templates](../../docs/integrations/google-native-templates.md). **Visual quality gate:** [Standar Mutu Dokumen](QUALITY-STANDARD.md), [Profil Jenis Dokumen](DOCUMENT-PROFILES.md), [Token Visual](design-tokens.json) dan [Bukti Riset](../../docs/research/google-native-document-design-2026.md).

## Google Docs (3 designs)

- `di.report.indicator` — 9 uppercase `{{PLACEHOLDERS}}`; status `DRAFT / INTERNAL REVIEW` visible. Source: `templates/reporting/indicator-report.md`.
- `di.report.creative-narrative` — 6 placeholders; curatorial/process prose must derive from checked sources.
- `di.admin.package` — 7 placeholders; internal checklist and external approval status must remain distinct.

Use readable A4 layout, consistent headings, proper page breaks, and protected master editing. Internal document style is optional and cannot override verified official layouts. Do not invent government markings, signatures, logos, or reviewer names. Read back token replacement counts.

**Master Google Sheets pertama tersedia:** `di.procurement.price-comparison@1.0.0`, tab `Perbandingan`, READY INTERNAL dan diuji dengan empat contoh sintetis. Ini hanya pembanding harga referensi, bukan keputusan pengadaan. Baca [Standar Spreadsheet](SPREADSHEET-STYLE.md) serta [QA Master Sheets 01](../../docs/qa/master-sheets01-price-comparison-2026-11-03.md) sebelum membuat atau memakai salinan. Dua master Sheets lainnya masih blueprint.

## Google Sheets (4 designs)

Keep tab names and write-cell destinations **exactly** as specified. Write only into blank input regions; place protected formulas in separate cells and verify them after editing.

| Catalog ID | Native tab | Scalar cells | Table begins | Preallocate at least |
|---|---|---|---|---|
| `di.finance.rab-plan` | `RAB` | C4, I4, C5, C6, I6 | B11 | 100 rows |
| `di.procurement.price-comparison` | `Perbandingan` | B2, B3, B4 | A8 | 60 rows |
| `di.reporting.revision-matrix` | `Revisi` | B2, B3, B4 | A9 | 80 rows |
| `di.evidence.review` | `Bukti` | B2, B3 | A8 | 100 rows |

Use literal text for vendor names and evidence references. Numeric input is decimal integer string within 15 digits, then written as Sheets number. Listing prices are only quoted references; not transactions or accepted quotations.

## Kandidat desain laporan formal (review)

[Profil Laporan Kerja Formal](FORMAL-REPORT-STYLE.md) mendefinisikan v1.2.0: Times New Roman monokrom, judul tengah, metadata tanpa tabel, empat bagian naratif. [QA sintetis v1.2.0](../../docs/qa/master01-human-layout-2026-11-03.md) mencakup isi pendek/normal/panjang dan contoh fiktif yang lebih natural. **Status terkini:** v1.2.0 `READY` INTERNAL, v1.1.0/v1.0.0 `RETIRED` setelah persetujuan dan QA tipografi.

## Master 01 aktif dan aturan redaksi

`di.report.indicator@1.2.0` kini **READY** untuk laporan internal setelah persetujuan desain dan pemeriksaan italic; versi 1.1 dan 1.0 disimpan sebagai riwayat. Seluruh subjudul, metadata dan status menggunakan teks tegak; untuk pengecualian italic, baca [Pedoman Laporan Ilmiah](../../kits/dana-indonesiana/writing/ACADEMIC-REPORT-STYLE.md). Pemeriksa [italic](../../tools/google-native-typography-qa.mjs) menandai run yang belum beralasan, tetapi bukan pengganti pemeriksaan bahasa asli. [Bukti QA lanjutan](../../docs/qa/master01-scholarly-typography-2026-11-03.md).

## Kandidat Master Sheets 01 v1.1.0

[Redesain visual Perbandingan Harga](../../docs/qa/master-sheets01-visual-refinement-2026-11-03.md) kini tersedia sebagai Google Sheets native dengan tata letak yang lebih tertib: judul dan metadata tidak terpotong, header tunggal yang tegas, baris bergaris halus dan warna selang-seling, serta 60 baris input sesuai katalog. **Status v1.1.0 = NEEDS_REVIEW**, v1.0.0 tetap READY INTERNAL hingga review pengguna. Kontrak input tidak berubah. Jangan membuat laporan pengadaan resmi dari harga sintetis.

## Kandidat Master Sheets 01 v1.2.0

[QA dan perbandingan v1.2.0](../../docs/qa/master-sheets01-professional-v1.2-2026-11-03.md): lembar **minimal administratif** tanpa merged cells, lima kolom berukuran lebih proporsional, warna header sangat ringan, harga/tanggal native, baris ringkas, dan pengujian delapan contoh sintetis termasuk catatan sangat panjang. Kontrak input tetap B2:B4 dan A8:E67; tidak ada migrasi skema atau perubahan master lama. **v1.2.0 = READY INTERNAL (disetujui sementara 4 Nov 2026)**; **v1.1.0 = RETIRED**; **v1.0.0 = READY** (fallback lama). Inspeksi screenshot Google Sheets dan hasil cetak A4 belum dilaksanakan, sehingga belum final secara visual atau resmi.

## Master RAB v1.0.0

[Spesifikasi](../finance/rab-plan.md) · [QA](../../docs/qa/master-rab-planning-2026-11-04.md). RAB perencanaan anggaran memuat 3 tab dan **100 pos**. Status Google-native `di.finance.rab-plan@1.0.0` adalah `NEEDS_REVIEW` sebelum pemeriksaan visual browser dan cetak. Planner mengisi B11:I110 dan metadata; kolom J tetap formula, sedangkan sumber K dan catatan L masih diperiksa/diisi manual. Jangan menganggap versi Excel sebagai sumber asli yang dikonversi otomatis ke Google Sheets pada sesi ini.

## Master RAB v2.1.0 — kandidat internal

Template di.finance.rab-plan@2.1.0 kini tersedia sebagai Google Sheets native dalam folder master privat. Input dan 100 baris tetap kompatibel dengan kontrak versi 1.0.0; REKAP baru disusun vertikal, formula kosong-vs-nol dan pengecekan kelengkapan diuji melalui Excel dan salinan Google Sheets berdata sintetis. Status Registry: NEEDS_REVIEW sampai UI Google Sheets dan cetak diperiksa. Master versi sebelumnya tidak ditimpa. [QA v2.1](../../docs/qa/master-rab-v2-1-2026-11-04.md).

## Master maintenance

For every change, retain a version and a reviewer trail. Actual Drive metadata must match the reviewed timestamp; otherwise planning halts. The public catalog does not carry Drive file IDs or actual project facts. The current planner requires an exact active master and deliberately blocks `OFFICIAL_FORMAT` until formal applicability review is implemented.
