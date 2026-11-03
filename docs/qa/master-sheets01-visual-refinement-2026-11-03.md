# QA dan Revisi Visual — Master Sheets 01 v1.1.0

**Tanggal:** 3 November 2026. **Status:** kandidat `NEEDS_REVIEW` (internal). Master yang diuji adalah **Google Sheets native**, bukan file Excel; tidak ada data pengadaan proyek asli. Pengguna meminta desain ulang karena v1.0.0 belum memenuhi standar kerapian yang diharapkan.

## Perubahan yang benar-benar diterapkan

- **Arsitektur informasi:** judul `MATRIKS PERBANDINGAN HARGA` di A1:E1, identitas kebutuhan pada A2:B4, keterangan tujuan di A5:B5, label grup pada A6, header tabel A7:E7 dan 60 baris penawaran A8:E67. Semua alamat input katalog lama dipertahankan.
- **Kolom input:** `Penyedia / sumber`, `Spesifikasi / kuantitas`, `Harga (Rp)`, `Rujukan harga`, `Catatan / keterbatasan`. Tidak menambahkan kolom penilaian atau vendor ranking yang tidak didukung sumber.
- **Merge terkontrol:** A1:E1, B2:E2, B3:E3, B4:E4, B5:E5, A6:E6. Tidak ada merged cell dalam area tabel A7:E67. Tujuannya membiarkan judul dan metadata panjang terbaca tanpa menerobos kolom lain.
- **Tipografi dan warna:** Arial berukuran sekitar 9–15 pt sesuai fungsi; judul 15 pt gelap, satu header navy kusam `#2D4458` dengan teks putih, teks isi gelap di atas putih; isian metadata berwarna biru sangat muda. Tidak ada banner dekoratif, kartu KPI, grafik rekaan atau warna kuning.
- **Keterbacaan data:** lebar A:E masing-masing 212, 350, 142, 232, 310 piksel; header ditahan saat menggulir dengan freeze tujuh baris; filter pada A7:E67; gridlines default disembunyikan dan garis horizontal tipis/warna selang-seling pucat native membantu pembacaan.
- **Tipe data:** `B4` tetap `DATE` dan kolom `C8:C67` tetap angka `NUMBER` dengan format ribuan Indonesia dan validasi harga >= 0. Semua sel input master kosong.
- **Tinggi baris:** header/metadata diatur ulang; baris input master 48 piksel agar teks pendek–sedang terbaca lebih leluasa. Pengisian panjang perlu pengecekan tinggi per baris.

## Pengujian pada salinan, bukan master

Salinan uji berlabel **QA SINTETIS** di folder privat QA berisi delapan penawaran fiktif: sebagian spesifikasinya berbeda, satu nama penyedia sangat panjang, catatan panjang, dan teks `=100+1` sebagai literal.

| Pemeriksaan | Hasil |
|---|---|
| Native Google Sheets; satu tab `Perbandingan` | VERIFIED |
| Enam merge berada **di luar** data A7:E67 | VERIFIED dari native spreadsheet response |
| Basic filter dan alternating banding | VERIFIED dari native sheet response |
| Freeze 7 baris; kolom 212/350/142/232/310 px | VERIFIED |
| Delapan harga sebagai `numberValue` dengan format ribuan Indonesia | VERIFIED |
| Tanggal 3 November 2026 sebagai serial DATE 46329 | VERIFIED |
| Catatan `=100+1` tersimpan sebagai `stringValue`, bukan rumus | VERIFIED |
| Tidak ada kesalahan formula pada 8 baris contoh | VERIFIED (master memang tidak memiliki formula perankingan) |
| Input pada master kosong | VERIFIED |
| Perbandingan ekuivalensi/vendor nyata | NOT_EXECUTED; data sintetis |
| Pemeriksaan screenshot langsung Google Sheets pada zoom 100% | NOT_EXECUTED; akses browser native tidak tersedia |

### Temuan penting: auto-resize baris

Pada salinan uji, perintah `autoResizeDimensions` tanpa verifikasi menghasilkan tinggi 21 piksel pada beberapa baris yang berisi teks panjang. Ini berisiko **memotong tampilan**. Telah diperbaiki dengan ukuran baris 56 piksel dan 72/65 piksel pada dua baris yang lebih panjang; hasil pengaturan diperiksa lagi lewat `rowMetadata`. **Jangan menganggap auto-resize merupakan QA visual.** Penyesuaian harus diikuti inspeksi tampilan sebelum laporan digunakan.

## Keputusan dan batas

Master v1.1.0 disimpan sebagai **kandidat untuk review desain**, `NEEDS_REVIEW` di `Template Masters` Registry privat yang sudah ada; v1.0.0 tetap `READY` sebagai fallback internal. Versi baru menggunakan field katalog yang sama sehingga tidak membutuhkan migrasi schema. Tidak ada master lama yang ditimpa.

**Tidak ada klaim screenshot native Google Sheets sudah diperiksa**, dan ini bukan format pengadaan resmi, bukti transaksi, kalkulasi pajak, atau persetujuan pemilihan penyedia. Tampilan perlu dinilai pengguna di Google Sheets sebelum master dipromosikan menjadi READY.

**Referensi:** [Standar Spreadsheet Profesional](../../templates/google-native/SPREADSHEET-STYLE.md), [Pedoman Dasar Produksi Dokumen](../foundation/05-document-production-baseline.md), [Kontrak Pengadaan](../../kits/dana-indonesiana/procurement/CONTRACT.md).
