# M-DanaIndonesiana — Agent Router

**Satu pintu masuk untuk AI dan operator.** Repository ini berisi pedoman sistem publik; data proyek, kontrak, rekening dan bukti pribadi bukan bagian dari Git.

## Mulai dari sini

1. **Pin** repository, branch dan HEAD saat ini. Ikuti [GitHub Rules](GITHUB_RULES.md) sebelum mutasi.
2. **Pilih mode** sesuai permintaan dan batas izin sumber.
3. **Pilih satu skill primer** dari [Skill Router](docs/skills/README.md). Baca `SKILL.md` primer → [Shared Contract](kits/dana-indonesiana/OPERATING-CONTRACT.md) → kontrak domain → satu prosedur rinci bila diperlukan. Jangan membaca semua modul.
4. **Kerjakan lingkup nyata dan laporkan** sumber, hasil, pemeriksaan yang benar-benar dilakukan, UNKNOWN, dan keputusan manusia yang masih diperlukan. STOP.

## Sumber proyek dari Drive (jika diizinkan)

Saat pengguna mengizinkan penggunaan Document Registry privat, ikuti [Google Drive Integration](docs/integrations/google-drive.md) untuk menentukan ID dan versi dokumen sebelum analisis domain. Resolver hanya mengembalikan metadata/pointer; jangan menyimpulkan isi, keabsahan atau approval dari hasilnya. Jangan commit file ID, folder ID, link dokumen privat, metadata proyek, maupun token ke Git publik. Jika akses registry tidak ada, kembalikan kebutuhan sumber spesifik, bukan menebak.

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
