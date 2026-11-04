# QA Master LRA dan Arus Kas v1.0 — 4 November 2026

**Status:** `NEEDS_REVIEW`, internal. Pengujian dilakukan memakai data sintetis, tidak ada laporan proyek asli, identitas penerima, bukti bank, rekening atau kuitansi yang disalin.

## Yang dibuat

- Workbook Excel (.xlsx) dari `artifact_tool`, tiga tab tepat: **LRA** (pertama), **ARUS KAS** (kedua), **PANDUAN** (ketiga). Master tanpa nominal/proyek nyata.
- Google Sheets native dibuat terpisah sebagai master privat, karena import langsung Excel lokal melalui konektor tidak berhasil. Input/rumus ditulis dengan locale Indonesia yang memerlukan pemisah argumen titik koma. Bukan klaim konversi byte-per-byte dari Excel.
- Header putih/biru pucat, Arial tegak, margin informasi jelas, input berwarna biru teks dan kalkulasi gelap, 100 pos RAB dan 150 transaksi. Rumus tidak dicampur dengan data yang diisi pengguna.
- File Excel dirender pada tab LRA, Arus Kas dan Panduan; temuan judul bagian yang terbungkus dan label pemeriksaan yang terlalu sempit diperbaiki sebelum ekspor. PANDUAN tidak terpotong pada inspeksi contoh. Native Google Sheets diperiksa melalui metadata/CellData tetapi **belum** secara visual melalui browser.

## Uji perhitungan (sintetis)

| Skenario | Nilai yang dihitung |
|---|---|
| Tiga pagu RAB fiktif | Rp4.000.000 |
| Pengeluaran kas yang benar-benar dicatat | Rp1.400.000 |
| Satu pengeluaran Rp100.000 berstatus DRAF | Tidak dihitung di LRA |
| Realisasi yang lolos status + pemeriksaan | Rp1.300.000 |
| Sisa anggaran dari pagu yang punya data realisasi | Rp2.700.000 secara agregat |
| Kas masuk | Rp3.000.000 |
| Kas keluar | Rp1.400.000 |
| Saldo awal dinyatakan eksplisit Rp0 | Saldo akhir Rp1.600.000 |
| Saldo awal tidak diisi | Saldo akhir kosong |
| Kode pengeluaran tidak ditemukan di LRA | `KODE TIDAK ADA`; nilai ditahan |
| Nomor bukti diulang | `BUKTI GANDA`; nilai ditahan |
| Salah satu pagu pos tidak diisi | Ringkasan menandai 1 pos tanpa pagu |

Perhitungan pada salinan Excel via `artifact_tool` dan salinan Google Sheets native menghasilkan angka yang sama pada skenario inti, dengan formula terpisah. Scanner Excel pada master hasil ekspor tidak menemukan `#REF!`, `#DIV/0!`, `#VALUE!`, `#NAME?`, atau `#ERROR!`. Master Excel hasil ekspor diimpor kembali, baris input tetap kosong dan rumus tetap ada. Pembacaan ulang Google Sheets master menghasilkan tiga tab dan formula awal tanpa error.

## Hal yang tidak boleh diklaim

- Template ini belum dibuktikan memenuhi format unggah e-RISPRO atau perjanjian proyek saat ini. Referensi tata letak [Pedoman Dana Indonesiana 2025](https://erispro-indonesiana.kemenkeu.go.id/upload/DAKB_Pedoman_administrasi_penerima_2025.pdf) tidak menetapkan sendiri keberlakuan pada tahun lain.
- Angka contoh bukan pembayaran sungguhan dan label `DIPERIKSA` pada file QA bukan approval internal yang benar-benar terjadi.
- Inspeksi browser 100% Google Sheets, preview cetak A3/A4, PDF/UA, bukti bank, rekonsiliasi sumber rekening, dan validasi aplikasi e-RISPRO **NOT_EXECUTED**.
- Master yang dibuat bersifat internal dan bertahap, tidak mengubah dokumen RAB lain atau status pelaporan eksternal.

## Keputusan

Daftarkan master native sebagai `di.finance.lra-cash@1.0.0`, `NEEDS_REVIEW` dalam tab `Template Masters` Registry privat yang sama. Jangan memasukkan ID Drive master/QA dan materi privat ke GitHub publik. Pengujian dokumen proyek nyata dan print preview masih harus dilaksanakan sebelum `READY` internal atau klaim kesesuaian resmi.
