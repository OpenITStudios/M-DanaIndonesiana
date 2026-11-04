# QA Master Checklist Bukti dan Matriks Revisi — 4 November 2026

**Lingkup:** dua template internal berbentuk Google Sheets native dan dua berkas Excel (.xlsx) yang dibuat terpisah dengan kontrak kolom identik. Seluruh data pengujian adalah fiktif. Tidak ada dokumen atau bukti proyek nyata disalin atau dimasukkan ke repository.

## 1. Kontrak dan sumber

- **Bukti**: template di.evidence.review@1.0.0; metadata B2 program dan B3 periode; tab Bukti; header A7:F7; input A8:F107 (100 baris). Kolom ID klaim/transaksi, pos RAB, jenis bukti, referensi dokumen, status pemeriksaan, catatan/tindak lanjut. Pemilik: evidence-audit. Kontrak asli ada pada templates/evidence-checklist.md.
- **Revisi**: template di.reporting.revision-matrix@1.0.0; metadata B2 nama dokumen, B3 versi sumber, B4 alasan perubahan; tab Revisi; header A8:E8; input A9:E88 (80 baris). Kolom komponen, sebelum, usulan sesudah, dampak perubahan, referensi keputusan. Pemilik: grant-administration. Kontrak asli ada pada templates/reporting/revision-decision.md.
- Kedua workbook menyertakan tab PANDUAN. Tidak ada dashboard, angka rekaan, rumus perankingan, atau asumsi persetujuan pemerintah.

## 2. Desain yang diterapkan

- Tipografi Arial tegak, judul 15 pt, isi/header 10 pt, warna putih dan teks gelap. Header satu tingkat abu-biru sangat muda dan garis tipis hanya untuk membantu membaca.
- Lebar kolom mengikuti isi, data teks dibungkus, baris header dibekukan, basic filter aktif, dan alternating banding nyaris putih pada rentang data.
- Metadata di bagian atas tabel dan tidak bercampur dengan data. Tidak ada merge di dalam rentang data; pada Excel hanya judul/catatan di luar tabel yang digabung untuk keterbacaan.
- Untuk Google Sheets, nilai pada kedua tabel diformat sebagai TEXT; pengisian melalui API pada QA menggunakan stringValue agar tanda sama dengan tidak ditafsirkan sebagai rumus.

## 3. Pengujian yang benar-benar dilaksanakan

| Aspek | Bukti | Revisi |
|---|---|---|
| Master native Google Sheets dan folder privat | VERIFIED | VERIFIED |
| Identitas tab, ukuran grid, freeze header, banding | VERIFIED | VERIFIED |
| Alamat binding katalog dan nama kolom | VERIFIED | VERIFIED |
| Sel input master kosong | VERIFIED | VERIFIED |
| Sampel tiga record sintetis pada copy berbeda | VERIFIED | VERIFIED |
| Batas referensi status | Native dropdown empat nilai, strict | Panduan menjelaskan PROPOSED dan referensi keputusan opsional |
| Formula error pada berkas Excel kosong | Tidak ditemukan | Tidak ditemukan |
| Excel berhasil diekspor dan diimpor kembali | VERIFIED | VERIFIED |
| Render tampilan atas Excel | VERIFIED untuk bagian yang diperiksa | VERIFIED untuk bagian yang diperiksa |
| Screenshot browser Google Sheets 100% | NOT_EXECUTED | NOT_EXECUTED |
| Cetak dan audit aksesibilitas | NOT_EXECUTED | NOT_EXECUTED |
| Kebenaran bukti, keputusan, dan kelayakan format resmi | NOT_EXECUTED — contoh fiktif | NOT_EXECUTED — contoh fiktif |

### Pemeriksaan status bukti

Pilihan status dibatasi pada INCOMPLETE, NEEDS_REVIEW, CHECKED_INTERNAL, dan NOT_EXECUTED. CHECKED_INTERNAL **bukan** persetujuan eksternal dan hanya layak digunakan bila metode/cakupan pemeriksaan benar-benar tercatat. Contoh tiga record diberi status NEEDS_REVIEW, INCOMPLETE, dan NOT_EXECUTED, tanpa mengaku ada bukti pembayaran atau pemeriksaan yang sudah berhasil.

### Pemeriksaan riwayat revisi

Contoh tiga perubahan menampilkan versi sebelum, usulan sesudah, dan dampak yang belum dipastikan. Semua referensi keputusan sengaja kosong, karena tidak ada keputusan sah pada skenario sintetis. Master tidak menimpa sumber ataupun mengubah status usulan menjadi perubahan yang sudah berlaku.

## 4. Batas implementasi

Import langsung berkas Excel lokal ke Google Sheets tidak berhasil melalui konektor pada sesi ini. Karena itu, Google Sheets dibuat **native secara langsung** dengan layout dan binding yang sama; ini bukan konversi XLSX byte-for-byte. Catatan tersebut penting ketika memeriksa perbedaan fitur, filter, atau validasi antara kedua media.

Master berstatus NEEDS_REVIEW di Registry privat yang sama. Perlu penilaian tampilan langsung dan kesesuaian format resmi per tahun/kategori sebelum menyatakan READY. Registry menyimpan ID file privat; tidak ada ID atau tautan privat dicantumkan dalam Git publik.

## 5. Acuan

- [Pedoman dasar produksi dokumen](../foundation/05-document-production-baseline.md)
- [Standar spreadsheet](../../templates/google-native/SPREADSHEET-STYLE.md)
- [Kontrak bukti](../../kits/dana-indonesiana/evidence/CONTRACT.md)
- [Kontrak administrasi](../../kits/dana-indonesiana/administration/PACKAGE-WORKFLOW.md)
- [Katalog template](../../templates/google-native/catalog.json)
