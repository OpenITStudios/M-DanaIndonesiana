# Development Plan — Current State (v1.7)

**Ini backlog kerja sistem, bukan izin otomatis untuk menjalankan semua item.** Riwayat implementasi v0.1–v1.0 berada di [CHANGELOG](../CHANGELOG.md).

## Sudah tersedia

- [x] Tujuh skill dengan kontrak domain, aturan sumber, bukti, dan privasi.
- [x] Prosedur keuangan, administrasi, writing, evidence, procurement, produksi, rights dan regulatory.
- [x] Prototipe kalkulasi JSON dan exporter XLSX dua lembar berbasis data sintetis.
- [x] Template kosong dipakai hanya jika ada kebutuhan.
- [x] v1.1: router, konteks, pemilik data dan dokumentasi navigasi diringkas.

- [x] P0/P1 kode Source Resolver read-only dan kontrak registry; satu indeks privat proyek dibuat di Google Drive. Status pengujian: NOT EXECUTED; tidak otomatis menyinkronkan metadata.
- [x] P2 kode Workflow Bridge read-only: rute sumber ketujuh skill, selection ambiguity, status metadata dan handoff terstruktur; dokumentasi operasional serta tes sintetis ditulis tetapi belum dieksekusi.
- [x] P3 change-impact preview: membandingkan metadata, memeriksa ketidakpastian, dan memetakan kandidat review turunan dari dependensi eksplisit. Kolom `derived_from_ids` opsional ditambahkan ke Registry privat; belum ada laporan turunan yang didaftarkan.

- [x] P4 Review Queue: tab privat pada Registry yang sama, deduplikasi event metadata, status manual dan CLI review read-only; wrapper PowerShell untuk pemakaian terjadwal bila disetujui. Tes sintetis ditulis tetapi belum dijalankan.
- [x] Pemeriksaan kandidat laporan proyek: folder pelaporan proyek kosong; contoh format dan KOL di folder terpisah tidak otomatis ditetapkan sebagai laporan turunan resmi.

- [x] P5 `onboard-output` preview untuk laporan nyata: scope folder+root diperiksa, duplikasi dicegah, dependensi hanya dari ID eksplisit, hasil tetap `UNVERIFIED` sampai review. Petunjuk Registry privat dilengkapi.
- [x] Pencarian laporan ulang di folder pelaporan: masih kosong; **tidak** membuat artefak atau hubungan sumber fiktif.

- [x] v1.7: guard validasi Review Queue, scope parent P5 dan ringkasan cakupan baca; skenario regresi sintetis ditambahkan. **Belum dieksekusi** sesuai QA yang ditunda.

## Belum dapat dinyatakan selesai

- [ ] P2 penerapan langsung pada isi dokumen melalui connector/CLI, pengujian OAuth nyata dan review user terhadap output sumber pada satu tugas nyata. **QA ditunda**.
- [ ] Pembaruan metadata private registry pascareview manual atau secara terotorisasi (belum dibuat); jangan menerapkan auto-sync mutasi tanpa izin.
- [ ] Registrasi laporan dan dependensi untuk **laporan nyata** setelah file tersedia dan substansi diperiksa. P5 baru preview, bukan registrasi final.
- [ ] Konfigurasi OAuth lokal yang aman dan jadwal pemeriksaan aktif hanya jika disetujui; `review` tersedia on-demand tetapi belum otomatis berjalan.
- [ ] Pembaruan status/queue secara eksplisit melalui operator yang berwenang; auto-write dan auto-close tetap tidak ada.

- [ ] Pengujian Node dan Python pada checkout yang sama; pemeriksaan workbook nyata dan kesesuaian format unggah e-RISPRO.
- [ ] Evaluasi perilaku tujuh skill pada skenario sintetis, penilaian manusia atas tulisan dan ketepatan laporan.
- [ ] Verifikasi penerapan aturan pada transaksi/kegiatan nyata oleh pihak berwenang, menggunakan dokumen berizin.
- [ ] Uji kualitas karya digital, keamanan/aksesibilitas, izin, distribusi dan arsip **jika dan ketika** diminta.
- [ ] Promosi `develop` ke `Local`/ `main` melalui proses review yang benar-benar dilaksanakan.

**Instruksi aktif pengguna:** pengujian/QA masih ditunda; jangan jalankan hanya karena daftar backlog. Tidak ada klaim `PASS`, `compliant` atau `approved` berdasarkan penyusunan dokumen.

## Google-native template T1/T2 (master bertahap)

- [x] Menetapkan Google Docs/Sheets/Slides sebagai master dan output editable, PDF hanya ekspor opsional; tidak memakai Office sebagai perantara.
- [x] Menyusun enam definisi template internal dan planner murni untuk field/versi/Google API requests.
- [x] Menulis tes sintetis T1; eksekusi lokal pada kandidat dilakukan, **bukan** QA Google API atau OAuth end-to-end.
- [x] Dengan instruksi pengguna, membuat folder master di Drive proyek dan tab `Template Masters` **di Registry privat yang sama** tanpa memindahkan sumber asli.
- [x] Membuat master Google Docs pertama untuk laporan indikator, memeriksa sembilan placeholder, struktur A4, metadata dan baris Registry.
- [x] Memperbaiki mutu visual Master 01: struktur tabel native 3×2, heading dan tipografi konsisten, membuang instruksi berlebihan; PDF A4 satu halaman telah dirender dan diperiksa. Timestamp di Registry diselaraskan.
- [x] Menetapkan [Standar Mutu Visual](../templates/google-native/QUALITY-STANDARD.md) sebagai gate wajib untuk master berikutnya; tidak mengklaim uji otomatis pengisian berdata panjang.
- [ ] Membuat dan memeriksa **lima master lainnya** dari katalog, satu per satu; belum otomatis tersedia.
- [ ] Memeriksa dan memperketat izin edit master sesuai kebutuhan pengguna tanpa memutus akses yang diperlukan.
- [ ] Menyiapkan executor Google Drive connector dengan preflight, copy-only, readback, bukti hasil dan status DRAFT.
- [ ] Menghubungkan kalkulator Finance JSON ke master Google Sheets dengan formula + QA tanpa converter XLSX.
- [ ] Menyusun jalur PDF ekspor native + layout/readback; mengerjakan kelayakan master format resmi per tahun/kategori.
## Prioritas desain berikutnya

Gunakan hasil pekerjaan nyata untuk menentukan apakah perlu alat tambahan. Hindari registry paralel, dashboard, skema pajak universal, automation submit, atau agen kedelapan tanpa kegagalan konkret yang hendak diselesaikan.
