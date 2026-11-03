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

## Google-native Template Catalog — T2 (master bertahap)

Pengguna memakai **Google Drive saja**: Google Docs untuk dokumen, Google Sheets untuk tabel/RAB dan Google Slides untuk presentasi bila diperlukan. PDF diekspor langsung dari Google-native file jika diminta. [Rancangan dan status T2](docs/integrations/google-native-templates.md) menyediakan katalog enam blueprint internal, pemetaan field dan planner deterministik. **Master Google Docs pertama** (`di.report.indicator@1.0.0`) sudah dibuat dan tercatat di tab `Template Masters` pada Registry privat yang sama. Pemeriksaan struktur dan metadata telah dilakukan; **belum ada executor generik, uji pengisian otomatis end-to-end, maupun approval format resmi**. Export XLSX lama dipertahankan hanya sebagai prototipe historis, bukan jalur aktif Google-only.

## Pedoman struktur dan mutu dokumen (riset 2026)

Untuk seluruh master Google-native, gunakan [Standar Mutu Dokumen Profesional](templates/google-native/QUALITY-STANDARD.md), [profil struktur berdasarkan jenis dokumen](templates/google-native/DOCUMENT-PROFILES.md), dan [token visual internal](templates/google-native/design-tokens.json). [Riset primer dan batas penerapan](docs/research/google-native-document-design-2026.md) mencakup ISO plain language, GOV.UK, W3C, Section508, Google Workspace API, EYD V dan regulasi tata naskah Indonesia. **Default desain bukan format resmi atau approval.** Master pertama belum diuji isi panjang dan tidak otomatis lulus profil baru.

## Mulai bekerja

1. Baca [AGENTS.md](AGENTS.md) untuk mode, keselamatan dan aturan kerja.
2. Gunakan [Skill Router](docs/skills/README.md) untuk memilih **satu skill primer**. Baca referensi domain lain hanya jika tugas memerlukan.
3. Gunakan sumber proyek yang **diizinkan**, tandai versi serta ketentuan yang berlaku, hasilkan draf yang dapat ditelusuri, dan minta review manusia pada keputusan material.
4. Untuk perubahan repo, ikuti [GITHUB_RULES.md](GITHUB_RULES.md). Pengembangan rutin di `develop`; promosi ke `Local` lalu `main` memerlukan review yang benar-benar dilakukan.

## Referensi

[Documentation Index](docs/README.md) · [Module Ownership](docs/modules/README.md) · [Source Authority](docs/foundation/02-source-authority.md) · [Privacy](SECURITY.md) · [Current Context](CONTEXT.md) · [Development Plan](planning/development.md) · [History](CHANGELOG.md)

**Kriteria kerja:** hasil yang berguna, bahasa Indonesia alami dan akurat, satu sumber fakta per domain, tidak membuat fitur atau dokumen kosong yang tidak diperlukan.
