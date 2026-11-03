# Development Plan — Current State (v1.1)

**Ini backlog kerja sistem, bukan izin otomatis untuk menjalankan semua item.** Riwayat implementasi v0.1–v1.0 berada di [CHANGELOG](../CHANGELOG.md).

## Sudah tersedia

- [x] Tujuh skill dengan kontrak domain, aturan sumber, bukti, dan privasi.
- [x] Prosedur keuangan, administrasi, writing, evidence, procurement, produksi, rights dan regulatory.
- [x] Prototipe kalkulasi JSON dan exporter XLSX dua lembar berbasis data sintetis.
- [x] Template kosong dipakai hanya jika ada kebutuhan.
- [x] v1.1: router, konteks, pemilik data dan dokumentasi navigasi diringkas.

- [x] P0/P1 kode Source Resolver read-only dan kontrak registry; satu indeks privat proyek dibuat di Google Drive. Status pengujian: NOT EXECUTED; tidak otomatis menyinkronkan metadata.

## Belum dapat dinyatakan selesai

- [ ] Pengujian Node dan Python pada checkout yang sama; pemeriksaan workbook nyata dan kesesuaian format unggah e-RISPRO.
- [ ] Evaluasi perilaku tujuh skill pada skenario sintetis, penilaian manusia atas tulisan dan ketepatan laporan.
- [ ] Verifikasi penerapan aturan pada transaksi/kegiatan nyata oleh pihak berwenang, menggunakan dokumen berizin.
- [ ] Uji kualitas karya digital, keamanan/aksesibilitas, izin, distribusi dan arsip **jika dan ketika** diminta.
- [ ] Promosi `develop` ke `Local`/ `main` melalui proses review yang benar-benar dilaksanakan.

**Instruksi aktif pengguna:** pengujian/QA masih ditunda; jangan jalankan hanya karena daftar backlog. Tidak ada klaim `PASS`, `compliant` atau `approved` berdasarkan penyusunan dokumen.

## Prioritas desain berikutnya

Gunakan hasil pekerjaan nyata untuk menentukan apakah perlu alat tambahan. Hindari registry paralel, dashboard, skema pajak universal, automation submit, atau agen kedelapan tanpa kegagalan konkret yang hendak diselesaikan.
