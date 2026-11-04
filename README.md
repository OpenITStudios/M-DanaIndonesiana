# M-DanaIndonesiana

**Sistem modular untuk membantu pelaksanaan pendanaan kebudayaan:** produksi karya, pelaporan keuangan, administrasi, dokumentasi, bukti, pengadaan, hak dan penerapan aturan.

Repo ini bersifat **publik** dan hanya memuat prosedur, referensi publik, template kosong, kode prototipe, serta data uji sintetis. **Tidak ada dokumen proyek asli atau persetujuan pemerintah yang disimpan sebagai baseline di sini.**

## Kemampuan yang tersedia

| Kelompok pekerjaan | Skill |
|---|---|
| RAB, realisasi, arus kas dan rekonsiliasi | [Finance & Reporting](.agents/skills/finance-reporting/SKILL.md) |
| Berkas pencairan, pengajuan, revisi, pelaporan | [Grant Administration](.agents/skills/grant-administration/SKILL.md) |
| Narasi karya, kuratorial, laporan kegiatan | [Creative Documentation](.agents/skills/creative-documentation/SKILL.md) |
| Validitas bukti, jenis lampiran dan audit internal | [Evidence & Audit](.agents/skills/evidence-audit/SKILL.md) |
| Aturan menurut kategori, tahun, kontrak dan pengecualian | [Regulatory Applicability](.agents/skills/regulatory-applicability/SKILL.md) |
| Milestone, indikator, hasil digital dan arsip karya | [Creative Production](.agents/skills/creative-production/SKILL.md) |
| Pameran, publikasi, izin, Minecraft, pencatatan DJKI | [Dissemination & Rights](.agents/skills/dissemination-rights/SKILL.md) |

**Procurement** merupakan modul dalam [pengelolaan kebutuhan dan penyedia](kits/dana-indonesiana/procurement/CONTRACT.md), **bukan** agen kedelapan. [Skill Router](docs/skills/README.md) menentukan pemilik utama dan handoff jika tugas melintasi domain.

## Integrasi Google Drive — P0/P1/P2 (implementasi read-only)

[Source Resolver + Document Registry + Workflow Bridge](docs/integrations/google-drive.md) menghubungkan kode GitHub dengan indeks privat Google Drive berdasarkan ID, status metadata dan peran dokumen. P2 menambahkan 9 rute kebutuhan nyata yang dipetakan ke **7 skill existing**; ia menghasilkan handoff sumber yang terstruktur, bukan audit isi, auto-approval atau sinkronisasi dua arah. CLI lokal memerlukan OAuth baca, dan pengujian runtime/end-to-end **belum dijalankan**. Data sumber tetap di penyimpanan privat berizin.

## Pemeriksaan perubahan Drive — P3 (read-only)

[Change Detection & Impact Analysis](docs/integrations/google-drive.md) memeriksa timestamp/nama file dan memetakan **kandidat review** untuk laporan yang memiliki ketergantungan sumber eksplisit. CLI: `node tools/drive-source-resolver.mjs impact --sheet-id PRIVATE_SHEET_ID`. Perubahan isi, validitas keputusan, auto-update Registry, jadwal pemantauan dan end-to-end QA **belum diverifikasi/diterapkan**.

## Review Queue — P4 (read-only)

[P4 Controlled Review Queue](docs/integrations/google-drive.md) memakai tab `Review Queue` pada Registry Google Drive privat yang sama, mendeteksi temuan berulang tanpa duplikasi dan memerlukan pemeriksa serta referensi keputusan untuk penutupan. CLI: `node tools/drive-source-resolver.mjs review --sheet-id PRIVATE_SHEET_ID --mode summary`. Wrapper Windows: `tools/run-drive-review.ps1`. Belum ada pemantauan terjadwal yang diaktifkan, pembaruan otomatis antrean, QA runtime, atau perubahan dokumen privat.

## Onboarding laporan proyek — P5 (read-only)

[P5 Report Onboarding](docs/integrations/report-onboarding.md) menyiapkan calon entri Registry dari file yang benar-benar ada **di dalam folder pelaporan proyek**, dengan pemeriksaan parent Drive, duplikasi file/ID, dan ID sumber yang dinyatakan eksplisit. Perintah `onboard-output` hanya membuat preview; tidak memasukkan laporan, tidak menentukan status persetujuan, dan tidak memakai contoh/arsip sebagai laporan nyata.

## Penguatan integritas P0–P5 (v1.7)

Validasi Review Queue kini menolak ID temuan yang tidak sesuai fingerprint, memeriksa urutan waktu review, dan menampilkan **cakupan pemeriksaan** di ringkasan agar hasil `0 temuan` tidak disalahartikan sebagai semua dokumen sudah diaudit. P5 juga memperketat validasi rantai parent file. Semua perubahan tetap read-only, memakai data sintetis untuk skenario tes, tanpa aktivasi QA runtime.

## Status kemampuan

- **Pedoman:** tujuh skill dengan kontrak rinci dan template, belum dinyatakan lulus uji penggunaan nyata.
- **Finance prototype:** [perhitungan JSON](tools/finance-report.mjs) dan [ekspor XLSX dua lembar](tools/export-finance-xlsx.py). Hasil berstatus **DRAFT**, bukan laporan resmi yang telah diperiksa atau diterima e-RISPRO; lihat [runbook](kits/dana-indonesiana/finance/EXCEL-OUTPUT.md).
- **Tidak tersedia:** penyaluran bank, penetapan pajak otomatis, approval PMO/LPDP, pengiriman e-RISPRO, pengujian karya otomatis, sertifikasi kepatuhan.
- **Fase sekarang:** penyederhanaan arsitektur dokumentasi. Pengguna menunda QA sampai fase pengembangan dinyatakan cukup.

## Pedoman dasar produksi dokumen — aktif

**Mulai setiap dokumen dari [Pedoman Dasar Produksi Dokumen](docs/foundation/05-document-production-baseline.md).** Pedoman ini menetapkan kualitas bahasa seperti hasil penyuntingan manusia profesional: faktual, runtut, spesifik, tanpa filler, konjungsi mekanis, atau hiasan visual yang tak punya fungsi. Google Docs native versi bacanya sudah disimpan dalam folder privat proyek `90 - Pedoman dan Referensi` dengan judul `00 - Pedoman Dasar Penulisan dan Tata Letak Dokumen — Internal v1.0`. ID Drive privat tidak disimpan di Git. Aturan gaya ilmiah/italic dan profil visual mengikuti jenis dokumen, tanpa menimpa format resmi yang terverifikasi. Tujuh skill tetap dipertahankan.

**Kandidat pembanding harga yang lebih rapi:** Master Sheets `di.procurement.price-comparison@1.1.0` dibuat terpisah dari v1.0.0 dan dites pada 8 contoh sintetis. [Laporan QA](docs/qa/master-sheets01-visual-refinement-2026-11-03.md) mencatat struktur metadata yang tidak terpotong, header fungsional, tipe data, banding native dan temuan tinggi baris. Kandidat ini masih `NEEDS_REVIEW`; v1.0.0 tetap `READY` sampai tampilan native disetujui.

**Versi minimal administratif v1.2.0:** template `di.procurement.price-comparison` memiliki kandidat desain baru yang lebih sempit, tanpa merged cells, warna ringan, dan data harga/tanggal asli. [QA](docs/qa/master-sheets01-professional-v1.2-2026-11-03.md) merekam perubahan dan batas pemeriksaan. Status belum `READY`: inspeksi UI Google Sheets dan cetak belum dilakukan; master v1.0.0 tetap fallback.

## Template RAB profesional — 3 lembar

Template `di.finance.rab-plan@1.0.0` disediakan sebagai **Excel (.xlsx) yang dapat diunduh** sesuai permintaan, sekaligus master **Google Sheets native** di folder template privat. Tab `RAB` memiliki 100 baris rincian volume × frekuensi × harga satuan, `REKAP` merangkum tahap/kategori dan pos belum lengkap, `PANDUAN` berisi label contoh yang dapat diganti. Pengujian sintetis total Rp5.150.000 dan satu pos tidak lengkap berhasil pada kedua media. [Spesifikasi](templates/finance/rab-plan.md) · [QA](docs/qa/master-rab-planning-2026-11-04.md). **Master Sheets masih NEEDS_REVIEW** untuk visual native/cetak; bukan RAB sah atau laporan realisasi.

## Standar tabel dan spreadsheet

[Standar Spreadsheet Profesional](templates/google-native/SPREADSHEET-STYLE.md) menjadi pedoman Google Sheets native: layout putih–hitam yang terbaca, header bermakna, angka dan tanggal asli, sumber/rumus dapat diperiksa, tanpa kartu AI atau dekorasi. Master Sheets pertama, **Perbandingan Harga Referensi 1.0.0**, sudah diuji dengan 4 penawaran sintetis dan tercatat `READY` INTERNAL di Document Registry privat yang sama. Ini bukan keputusan belanja atau bukti kesesuaian prosedur pengadaan. [QA aktual](docs/qa/master-sheets01-price-comparison-2026-11-03.md).

## Google-native Template Catalog — T2 (master bertahap)

Pengguna memakai **Google Drive saja**: Google Docs untuk dokumen, Google Sheets untuk tabel/RAB dan Google Slides untuk presentasi bila diperlukan. PDF diekspor langsung dari Google-native file jika diminta. [Rancangan dan status T2](docs/integrations/google-native-templates.md) menyediakan katalog enam blueprint internal, pemetaan field dan planner deterministik. **Master Google Docs pertama** kini tersedia sebagai `di.report.indicator@1.2.0` (`READY` internal; v1.0.0/v1.1.0 `RETIRED` sebagai riwayat). Tiga salinan sintetis telah diisi via Google Docs dan diperiksa pada render PDF; perbaikan pagination normal dilakukan pada salinan. **Executor generik tanpa supervisi, QA laporan nyata, dan approval format resmi belum ada**. Export XLSX lama dipertahankan hanya sebagai prototipe historis, bukan jalur aktif Google-only.

## Pedoman struktur dan mutu dokumen (riset 2026)

Untuk seluruh master Google-native, gunakan [Standar Mutu Dokumen Profesional](templates/google-native/QUALITY-STANDARD.md), [profil struktur berdasarkan jenis dokumen](templates/google-native/DOCUMENT-PROFILES.md), dan [token visual internal](templates/google-native/design-tokens.json). [Riset primer dan batas penerapan](docs/research/google-native-document-design-2026.md) mencakup ISO plain language, GOV.UK, W3C, Section508, Google Workspace API, EYD V dan regulasi tata naskah Indonesia. **Default desain bukan format resmi atau approval.** Master pertama v1.2.0 sudah diuji dengan isi pendek, normal dan panjang memakai sumber sintetis, tetapi **output proyek nyata dan kepatuhan format resmi tetap belum diuji**. [Bukti QA](docs/qa/master01-fill-layout-2026-11-03.md).

**Alternatif laporan formal v1.2.0:** [profil desain](templates/google-native/FORMAL-REPORT-STYLE.md) dan [uji render](docs/qa/master01-human-layout-2026-11-03.md) tersedia setelah masukan pengguna mengenai kesan desain AI. Setelah persetujuan desain dan koreksi italic, v1.2.0 menjadi `READY` **INTERNAL**; v1.1.0/v1.0.0 kini `RETIRED` (riwayat).

**Gaya ilmiah Master 01:** setelah penyempurnaan italic, master `di.report.indicator@1.2.0` sudah `READY` untuk **internal**. Subjudul dan status tegak, Times New Roman konsisten; istilah asing atau judul karya dimiringkan hanya berdasarkan aturan [EYD V dan pedoman editorial](kits/dana-indonesiana/writing/ACADEMIC-REPORT-STYLE.md). [Bukti QA](docs/qa/master01-scholarly-typography-2026-11-03.md) menyatakan pengujian dengan data sintetis, bukan kepatuhan format resmi atau validasi laporan nyata.

## Mulai bekerja

1. Baca [AGENTS.md](AGENTS.md) untuk mode, keselamatan dan aturan kerja.
2. Gunakan [Skill Router](docs/skills/README.md) untuk memilih **satu skill primer**. Baca referensi domain lain hanya jika tugas memerlukan.
3. Gunakan sumber proyek yang **diizinkan**, tandai versi serta ketentuan yang berlaku, hasilkan draf yang dapat ditelusuri, dan minta review manusia pada keputusan material.
4. Untuk perubahan repo, ikuti [GITHUB_RULES.md](GITHUB_RULES.md). Pengembangan rutin di `develop`; promosi ke `Local` lalu `main` memerlukan review yang benar-benar dilakukan.

**RAB Profesional v2.1.0:** kandidat Excel dan Google Sheets native baru mengikuti [spesifikasi RAB](templates/finance/rab-plan.md). REKAP disusun vertikal, 100 pos tetap tersedia, nilai kosong tidak diubah menjadi nol, dan tes empat pos sintetis cocok pada kedua media. [Bukti QA](docs/qa/master-rab-v2-1-2026-11-04.md). Status master Google Sheets masih NEEDS_REVIEW; bukan format pengajuan resmi.

**Master keuangan baru:** [LRA dan Arus Kas](templates/finance/lra-cash.md) dengan tab LRA (100 pos) dan Arus Kas (150 transaksi). Tersedia dalam Excel dan Google Sheets native; transaksi draf tidak dihitung sebagai realisasi. [QA sintetis](docs/qa/master-lra-cash-2026-11-04.md). Belum dapat diklaim sebagai format resmi/e-RISPRO sebelum verifikasi program dan pemeriksaan cetak.

**Master Checklist Bukti dan Matriks Revisi v1.0:** tersedia sebagai Google Sheets native dan Excel, dengan desain administrasi sederhana dan pengujian contoh sintetis pada salinan terpisah. Katalog dan Registry mempertahankan binding dan versi yang sudah disepakati. [QA](docs/qa/master-evidence-revision-2026-11-04.md). Status kedua master `NEEDS_REVIEW` sampai pemeriksaan tampilan native dan sumber/format resmi.

## Referensi

[Documentation Index](docs/README.md) · [Module Ownership](docs/modules/README.md) · [Source Authority](docs/foundation/02-source-authority.md) · [Privacy](SECURITY.md) · [Current Context](CONTEXT.md) · [Development Plan](planning/development.md) · [History](CHANGELOG.md)

**Kriteria kerja:** hasil yang berguna, bahasa Indonesia alami dan akurat, satu sumber fakta per domain, tidak membuat fitur atau dokumen kosong yang tidak diperlukan.

**Pembaruan 4 November 2026:** kandidat v1.2.0 telah disetujui sementara untuk penggunaan internal dan tercatat `READY` pada Registry privat. v1.0 tetap READY sebagai fallback, v1.1 RETIRED. **Belum** ada inspeksi screenshot Google Sheets atau validasi cetak A4; format ini bukan approval pengadaan resmi.
