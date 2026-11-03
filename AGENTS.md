# M-DanaIndonesiana — Agent Router

**Satu pintu masuk untuk AI dan operator.** Repository ini berisi pedoman sistem publik; data proyek, kontrak, rekening dan bukti pribadi bukan bagian dari Git.

## Mulai dari sini

1. **Pin** repository, branch dan HEAD saat ini. Ikuti [GitHub Rules](GITHUB_RULES.md) sebelum mutasi.
2. **Pilih mode** sesuai permintaan dan batas izin sumber.
3. **Pilih satu skill primer** dari [Skill Router](docs/skills/README.md). Baca `SKILL.md` primer → [Shared Contract](kits/dana-indonesiana/OPERATING-CONTRACT.md) → kontrak domain → satu prosedur rinci bila diperlukan. Jangan membaca semua modul.
4. **Kerjakan lingkup nyata dan laporkan** sumber, hasil, pemeriksaan yang benar-benar dilakukan, UNKNOWN, dan keputusan manusia yang masih diperlukan. STOP.

## Sumber proyek dari Drive (jika diizinkan)

Untuk tugas yang menggunakan dokumen proyek, ikuti [Google Drive P0–P3 Integration](docs/integrations/google-drive.md). Pilih satu workflow P2 menurut **hasil yang diminta**; ambil sumber dari satu Registry privat, periksa metadata aktual, lalu baca isi **hanya bila tugas/izin memungkinkan**. Terapkan satu skill primer; skill lain hanya menerima fakta minimum ketika diperlukan. Jika pilihan RAB/versi ambigu atau sumber belum terindeks, keluarkan ketidakpastian spesifik; jangan menebak. Pointer yang ditemukan tidak membuktikan isi, penerimaan resmi, atau hak untuk menyimpan/memindahkan dokumen. Jangan commit ID/link privat, metadata proyek, isi berkas atau token ke Git publik.

### Saat dokumen Drive berubah

Untuk audit perubahan, ikuti [P3 Change Impact](docs/integrations/google-drive.md). Bedakan `METADATA_CHANGE_SIGNAL`, `METADATA_UNVERIFIED`, dan `METADATA_MATCH_ONLY`. Hanya `derived_from_ids` pada dokumen turunan yang menghasilkan *downstream review candidate*; `related_ids` adalah konteks, bukan bukti perubahan laporan. Jangan otomatis memperbarui RAB, laporan, penanda persetujuan atau waktu baseline.

### P4 — antrean review terkendali

Jika pengguna meminta review berulang, gunakan satu tab `Review Queue` pada Registry privat dan [P4 Review Workflow](docs/integrations/google-drive.md). `review --mode summary` dapat dijalankan ulang tanpa menambahkan baris secara otomatis. Temuan dengan fingerprint sama yang sudah diperiksa manusia tidak boleh dibuka ulang tanpa perubahan baru. Penutupan memerlukan reviewer dan referensi bukti. Tidak pernah mengubah RAB, laporan, atau status eksternal dari hasil metadata. Aktivasi jadwal dan token OAuth lokal memerlukan konfigurasi terpisah.

### P5 — Onboarding laporan nyata

Untuk menyambungkan laporan dengan sumbernya, ikuti [P5 Report Onboarding](docs/integrations/report-onboarding.md). Periksa folder laporan benar-benar berada di root proyek, ID belum terdaftar, isi laporan sesuai tugas yang diizinkan dan dependensi `derived_from_ids` adalah sumber yang benar-benar dipakai. Preview CLI `onboard-output` bukan izin menyimpan atau persetujuan; hanya reviewer terotorisasi yang dapat memasukkan baris ke Registry privat. Jika folder belum memiliki laporan asli, keluarkan `NO_CONFIRMED_PROJECT_REPORT` dan hentikan pendaftaran.

### Output dokumen Google-native

Ketika pengguna memilih Google Drive sebagai satu-satunya workspace, gunakan [Google-native Template Generation](docs/integrations/google-native-templates.md) dan [Standar Mutu Dokumen](templates/google-native/QUALITY-STANDARD.md). Rancang dokumen berdasarkan [profil fungsional](templates/google-native/DOCUMENT-PROFILES.md), lalu gunakan [design tokens](templates/google-native/design-tokens.json) sebagai default internal **hanya bila tidak ada format resmi yang terverifikasi**. Ringkasan dasar bukti dan batas transfer: [riset 2026](docs/research/google-native-document-design-2026.md). Pilih satu skill primer dan sumber P2 yang diizinkan, lalu template ID+versi tepat. Master Google Docs/Sheets/Slides berada dalam Drive privat; **salin master** untuk membuat draf, jangan mengedit master. Planner sistem berada di `tools/google-native-template-plan.mjs`; ia hanya menyusun rencana dan belum menulis ke Drive. PDF adalah ekspor opsional, bukan format sumber editable. Untuk layout pada output berisi data gunakan [Google-native QA helper](tools/google-native-doc-qa.mjs) dan [Master 01 QA runbook](docs/qa/master01-fill-layout-2026-11-03.md); hindari master-only PASS, lakukan inspeksi PDF render bila diperlukan dan jangan beri pageBreak permanen pada semua output. XLSX exporter lama bukan jalur kerja pengguna ini. Status T2: satu master internal `di.report.indicator@1.0.0` telah dibuat di Drive privat dan didaftarkan pada tab `Template Masters` (tanpa ID privat di Git). Master ini lulus pemeriksaan struktur dan placeholder, **bukan** approval resmi; executor generik serta template resmi belum tersedia.

## Mode kerja

| Mode | Tujuan | Batas |
|---|---|---|
| INSPECT | membaca, memetakan dan mengaudit sumber | tanpa perubahan data/repo |
| SYSTEM DEVELOPMENT | mengubah sistem, panduan atau program di `develop` | tidak mengubah data proyek nyata |
| PROJECT EXECUTION | membuat/mengedit keluaran proyek pada lokasi berizin | tidak mengubah pedoman sistem diam-diam |
| VALIDATION | memeriksa klaim, hasil, bukti dan alat sesuai instruksi | tidak menciptakan persetujuan eksternal |
| MAINTENANCE | perbaikan terbatas pada pemilik kesalahan | tidak otomatis memperluas scope |

Permintaan "lanjutkan" mempertahankan topik dan mode yang sedang aktif. Instruksi pengguna terbaru tentang **pengujian, kerahasiaan dan ruang lingkup** berlaku untuk tugas saat ini; catatan lama bukan larangan atau izin permanen.

## Batas yang tidak boleh dilanggar

- **Sumber dan hukum:** perjanjian, addendum, Juknis, pedoman dan peraturan dinilai menurut kategori, lingkup, waktu, dan bukti keberlakuannya melalui [Source Authority](docs/foundation/02-source-authority.md). File bernama `final` atau `terbaru` bukan bukti sah.
- **Klaim dan persetujuan:** `CHECKED_INTERNAL`, `SUBMITTED`, `EXTERNAL_CONFIRMED` berbeda; baca [Proof & Approval](docs/foundation/03-proof-and-approval.md). Tidak membuat surat, kuitansi, tanda tangan, transaksi, kegiatan, hasil QA atau keputusan palsu.
- **Privasi:** `pelajari saja/jangan simpan` berarti **read-only**; jangan membuat salinan, upload, commit, fixture, atau output file yang berisi data tersebut. Klasifikasi lebih rinci ada di [SECURITY.md](SECURITY.md).
- **Sumber fakta:** kontrak dan keputusan → baseline proyek berizin → aktivitas/keuangan/bukti → hasil pemeriksaan → laporan turunan. Jangan mengubah sumber asli berdasarkan laporan AI. Gunakan [Traceability](docs/foundation/04-traceability.md).
- **Modularitas:** satu pemilik tiap fakta. Domain lain mengonsumsi hasil minimum, bukan membuat registri paralel. Tidak membuat aplikasi/agen baru hanya untuk menambah struktur.

## Navigasi

- [Skill Router](docs/skills/README.md): satu matriks tujuh skill dan batas kepemilikannya.
- [Documentation Index](docs/README.md): fondasi dan prosedur spesialis.
- [Module Ownership](docs/modules/README.md): pemilik data dan pemroses turunan.
- [Production Flow](docs/foundation/01-production-flow.md): tahapan proyek dan batas masing-masing.
- [Current Context](CONTEXT.md): status produk, bukan log sejarah.
- [Changelog](CHANGELOG.md): riwayat versi.

**Aturan berhenti:** hasil selesai sesuai mandat; jika ada kekurangan material, sebut dengan tepat dan selesaikan pekerjaan independen yang aman. Jangan menutupnya dengan klaim PASS atau kepatuhan yang tidak didukung pemeriksaan.
