# Master LRA dan Arus Kas — Format Kerja Internal

**ID:** `di.finance.lra-cash@1.0.0`  
**Pemilik domain:** `finance-reporting`  
**Media:** Excel (.xlsx) dan Google Sheets native, dengan master privat yang dicatat pada Registry yang sama.  
**Status:** `NEEDS_REVIEW` (belum diperiksa untuk kesesuaian format resmi dan hasil cetak). Bukan laporan pengeluaran aktual, bukti pembayaran, atau persetujuan.

## Dasar penyusunan

- [Pedoman Administrasi Dana Indonesiana 2025](https://erispro-indonesiana.kemenkeu.go.id/upload/DAKB_Pedoman_administrasi_penerima_2025.pdf), bagian Laporan Penggunaan Dana dan lampiran LRA/Arus Kas, memuat ketentuan tahun 2025 bahwa **sheet 1** berisi Laporan Realisasi Anggaran dan **sheet 2** berisi Laporan Arus Kas. Penerapan pada kontrak/tahun/kategori lain harus diperiksa.
- [Kontrak domain Finance](../../kits/dana-indonesiana/finance/CONTRACT.md): rencana/pagu disetujui ≠ kas masuk ≠ pembayaran nyata; UNKNOWN tidak sama dengan nol.
- [Pedoman Dasar Produksi Dokumen](../../docs/foundation/05-document-production-baseline.md) dan [Standar Spreadsheet](../google-native/SPREADSHEET-STYLE.md): redaksi label singkat, tampilan profesional, rumus terbuka, sumber tertelusur, tanpa dekorasi AI.

## Tiga tab

### 1. LRA — 100 pos

Baris 1–10 adalah judul, periode, referensi dan ringkasan. **A11:O11** header sesuai urutan informasi lampiran 2025: kode, uraian, kategori, spesifikasi, frekuensi dan satuan, kuantitas dan satuan, harga satuan, jumlah/pagu, persentase, data dukung, realisasi, sisa, nomor bukti. Baris **12–111** untuk 100 pos. Kolom **A:J** diisi dari **RAB yang benar-benar disetujui**, bukan dari RAB draf; **J** mempertahankan angka pagu disetujui sebagai input, bukan menggantikannya dengan hasil hitung asumtif.

Kolom K (rasio realisasi), M (realisasi) dan N (sisa) berisi rumus. M hanya menjumlah pengeluaran pada `ARUS KAS` dengan kode RAB sama yang bertanda `DIPERIKSA` dan lolos pemeriksaan kode/bukti. Jika belum ada transaksi diperiksa, M dan N tetap **kosong**, tidak diganti nol. Kolom L (referensi data dukung) serta O (nomor bukti) tetap memerlukan pemeriksaan dan pengisian manual. Baris 113 menampilkan total; row 9 ringkasan pagu, realisasi, sisa dan jumlah pos/kode bermasalah.

### 2. ARUS KAS — 150 transaksi

**A:I** mengikuti sembilan jenis informasi pada lampiran Arus Kas 2025: Tanggal, Indikator, No. bukti data dukung, Nama Penerima, Uraian, Penerimaan (Rp), Pengeluaran (Rp), Saldo (Rp), Link data dukung. **J:M** adalah tambahan kerja internal: kode RAB, status pemeriksaan, cek kode/bukti, dan nilai pengeluaran yang lolos ke LRA. Status dapat diisi `DRAF` atau `DIPERIKSA`, tetapi **tidak boleh otomatis** menjadi `DIPERIKSA` tanpa pemeriksaan sumber sebenarnya.

Baris input **12–161**; kolom H, L, M adalah rumus dan tidak ditimpa oleh input. Saldo awal pada B4 adalah input yang harus berasal dari bukti; nilai **0 yang dikonfirmasi** berbeda dari belum diisi. Baris 163 ringkasan kas; B165/B166 untuk saldo tunai dan bank yang benar-benar diperiksa; B167 menghitung selisih rekonsiliasi tanpa memaksanya nol.

### 3. PANDUAN

Sepuluh langkah pengisian dan batas penggunaan, termasuk tautan pedoman publik. Tidak memakai logo resmi, tanda tangan atau identitas penerima fiktif.

## Kontrak generator v1 (parsial dan aman)

Field metadata yang boleh diisi ke **salinan**, bukan master:
- `recipient_name` → LRA!B4, teks.
- `report_period` → LRA!I4, teks.
- `rab_reference` → LRA!B5, teks.
- `inspection_date` → LRA!I5, tanggal opsional.
- `cash_opening` → ARUS KAS!B4, nominal opsional; **nol eksplisit valid**.
- `cash_recipient` → ARUS KAS!E4, teks opsional.

Blok input tabular:
- `budget_lines` → LRA!A12:J111 (10 kolom input, maksimum 100).
- `cash_rows` → ARUS KAS!A12:G161 (7 kolom input, maksimum 150).
- Referensi bukti pada LRA!L/O, ARUS KAS!I:J dan status ARUS KAS!K **harus dilengkapi/diperiksa oleh operator**. Planner tahap ini tidak menyatakan pemeriksaan otentisitas bukti dan tidak menulis ke kolom rumus K/M/N LRA atau H/L/M ARUS KAS. Untuk mengirim data dari planner, butuh penyesuaian terkait tanggal, status dan hasil yang belum diperiksa; jangan menggunakan input fiktif seolah laporan nyata.

## Pengujian

Contoh sintetis pagu Rp4.000.000, kas masuk Rp3.000.000, kas keluar Rp1.400.000 (satu transaksi Rp100.000 masih `DRAF`) menghasilkan realisasi LRA hanya Rp1.300.000, sisa RAB Rp2.700.000 dan saldo kas Rp1.600.000 dari saldo awal yang secara eksplisit dinyatakan Rp0. Kode tidak dikenal dan nomor bukti duplikat menghasilkan penanda pengecualian dan tidak dihitung sebagai realisasi terperiksa. Lihat [QA](../../docs/qa/master-lra-cash-2026-11-04.md).

**Batas:** print preview Excel/Google Sheets, validasi format resmi menurut tahun/kategori, audit data nyata, pajak, rekonsiliasi bank, dan pengisian otomatis bukti/nomor voucher belum dilakukan.
