# QA Master Sheets 01 — Perbandingan Harga Referensi (3 November 2026)

**Lingkup:** Google Sheets native, template di.procurement.price-comparison versi 1.0.0, status INTERNAL. Semua contoh adalah data sintetis, bukan harga komersial asli atau bukti pembelian.

## Sumber desain

Mengikuti [Standar Spreadsheet](../../templates/google-native/SPREADSHEET-STYLE.md), [Pedoman Dasar Dokumen](../foundation/05-document-production-baseline.md), dan [kontrak pengadaan](../../kits/dana-indonesiana/procurement/CONTRACT.md).

## Pembuatan dan pengujian yang dilaksanakan

1. Membuat master langsung di Google Drive sebagai Google Sheets native, lalu memindahkan ke folder privat master. Tanpa file Office/perantara XLSX.
2. Menyusun satu tab Perbandingan dengan 72 baris, 5 kolom, judul dan metadata B2:B4, satu header A7:E7, dan 60 baris input A8:E67. Tujuh baris atas dibekukan.
3. Menata Arial hitam di atas putih; header bold dengan garis tegas, kolom harga rata kanan, teks panjang wrap, tanpa hiasan kartu/dashboard atau warna berlebihan.
4. Menetapkan kolom C8:C67 sebagai NUMBER dengan pola ribuan Indonesia dan validasi nonnegatif, serta sel B4 sebagai DATE nyata dengan validasi tanggal.
5. Menyalin master ke folder QA sintetis dan mengisi empat harga contoh 58000, 61000, 55000, 63500. Salah satu contoh memiliki gramatur berbeda sehingga tidak boleh otomatis dibandingkan sebagai barang ekuivalen.
6. Memastikan empat harga disimpan sebagai numberValue dan tampil 58.000; 61.000; 55.000; 63.500. Tanggal 3 November 2026 disimpan sebagai serial 46329 dan ditampilkan 03 November 2026.
7. Memperbaiki planner supaya field tanggal ISO YYYY-MM-DD menjadi angka tanggal Google Sheets dan dukungan metadata konektor mime_type tersedia. Menjalankan planner terhadap salinan, empat updateCells berhasil, nilai hasil cocok dengan sumber sintetis.
8. Tujuh uji planner lulus di V8 harness (bukan runner Node). Master tetap kosong pada field input, dan data uji hanya disimpan di salinan.

## Pemeriksaan hasil

| Gate | Status |
|---|---|
| Native Google Sheets, lokasi privat dan tab tunggal | VERIFIED |
| Header dan alamat field sesuai katalog | VERIFIED |
| Input master tetap kosong | VERIFIED |
| Harga numerik, format ribuan, validasi >= 0 | VERIFIED |
| Tanggal DATE asli dan zona waktu Asia/Jakarta | VERIFIED |
| Teks sebagai literal, tanpa formula injection | VERIFIED pada rencana dan contoh |
| Pemisahan master dan salinan | VERIFIED |
| Formula error pada contoh | Tidak ditemukan; master ini memang tidak memerlukan formula |
| Fit visual asli di browser/zoom Google Sheets | NOT_EXECUTED; pemeriksaan berbasis CellData/metadata, bukan screenshot |
| Kepatuhan pengadaan/aturan pemerintah | NOT_EXECUTED; format internal |
| Kebenaran harga, vendor dan bukti | NOT_EXECUTED; seluruhnya contoh sintetis |

## Keputusan

Template layak sebagai **READY INTERNAL** untuk mengumpulkan harga referensi dalam struktur yang tertib. Lima kolom katalog belum mewakili seluruh pemeriksaan pajak, ongkos, kesetaraan teknis, masa berlaku, dan alasan pemilihan yang ada pada kontrak pengadaan yang lebih luas. Jangan mengklaim template sebagai persetujuan pembelian atau hasil audit regulasi.

**Tindak lanjut:** gunakan satu master ini sebagai dasar menilai tata letak pada Google Sheets native; lanjutkan master berikutnya satu per satu. Jika ada bukti clipping pada antarmuka, perbaiki lebar atau tinggi baris pada area terkait, bukan merombak workbook.
