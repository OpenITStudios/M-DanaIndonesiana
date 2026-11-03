# Finance Excel Export v0.5

Status: **DRAFT prototype**. Hanya data JSON yang diizinkan pengguna. JANGAN gunakan dokumen yang ditandai "pelajari saja" sebagai input atau fixture tersimpan. Output harus menuju lokasi privat yang dipilih secara eksplisit; output dilarang di-commit ke GitHub publik.

## Rute dan sumber

Input: hasil `node tools/run-finance-report.mjs < input.json` dari kalkulator v0.5.
Output: file XLSX dua sheet: (1) `Realisasi RAB`, (2) `Arus Kas`. Judul kolom mengacu pada lampiran Pedoman Administrasi 2025 dan [contoh format LPDP](https://erispro-indonesiana.kemenkeu.go.id/information-corner). **Ini bukan salinan/template resmi dan belum otomatis siap unggah.** Tidak ada penggunaan logo pemerintah, nama proyek, atau contoh transaksi dari template.

Perintah lokal di runtime Python yang menyediakan `artifact_tool`:

```bash
node tools/run-finance-report.mjs < synthetic-input.json | python tools/export-finance-xlsx.py --output /private/report-DRAFT-v01.xlsx
```

Pastikan lingkungan mempunyai Node 22+ dan paket `artifact_tool`. Skrip Python membaca JSON dari stdin dan menulis XLSX ke path yang dipilih pengguna. Tidak ada koneksi bank, pajak, web, e-RISPRO, ataupun API eksternal.

## Penjagaan nilai

- Nominal rupiah dari JSON adalah string integer. Nilai lebih dari 15 digit ditolak untuk mencegah kehilangan presisi Excel.
- Hasil awal dengan saldo kas/realisasi periode sebelumnya UNKNOWN akan tetap kosong, tidak berubah menjadi nol.
- Rincian RAB tambahan yang tidak diberikan dalam input yang benar-benar ada dibiarkan kosong. Jangan mengarang satuan, frekuensi, harga atau spesifikasi.
- Hasil formula `Sisa RAB` dihitung sebagai `Jumlah - Realisasi`; pengeluaran Rp0 tetap memberi sisa penuh.
- Saldo arus kas direkonstruksi dengan formula dari saldo awal + penerimaan - pengeluaran.
- Sebelum ekspor, skrip menolak jumlah yang tidak konsisten antara baris dan total, serta nomor transaksi/pos ganda.
- Label DRAFT selalu terlihat di kedua sheet. Semua sumber bukti dan validasi eksternal tetap perlu peninjauan manusia.
- Teks yang dimulai karakter rumus ditulis sebagai literal sel, bukan formula buatan sumber.

## Batasan

Generator **tidak** menyalin contoh kategori lain dari workbook template LPDP; tidak mengisi rincian RAB yang belum dimasukkan ke engine; tidak dapat memeriksa keabsahan bukti atau ketepatan perlakuan pajak. Dokumen yang dihasilkan belum dianggap laporan resmi sebelum cocok format yang berlaku, dokumen sumber dan persetujuan internal.

Uji: `python -m unittest discover -s tests -p 'test_finance_xlsx.py'` dalam lingkungan dengan `artifact_tool`. Unit tests menggunakan input fiktif.
 
 ## Metadata RAB dan bukti arus kas (v0.5)

 `budget_lines[].details` dapat berisi `cost_category`, `specification`, `frequency` (string integer), `frequency_unit`, `quantity` (string integer), `quantity_unit`, `unit_price` (string integer), serta `supporting_refs` (array). Semua **opsional**; informasi yang hilang tetap kosong. Jika tiga angka tersedia, engine membandingkan hasil perkaliannya dengan pagu yang tercantum; selisih dilaporkan, tidak mengubah pagu sah.

 `transactions[]` dapat berisi `indicator_id`, `voucher_no`, `recipient_name`, `description`, dan `support_url` untuk menyusun kolom Arus Kas. Semua itu data input yang belum terotentikasi; jangan masukkan PII atau bukti rahasia ke repo/fixture publik.

 Handoff ke administrasi dan penulisan diberikan oleh `tools/finance-handoff.mjs`, yang menandai status selalu DRAFT dan memisahkan termin direncanakan dari dana diterima.

## Semantik yang tidak disimpulkan

`invoiced_period` menunjukkan nilai invoice dicatat dalam periode, **bukan saldo piutang/utang yang belum lunas**. Arus kas dan LRA hanya memuat transaksi sesuai input. Status pelunasan memerlukan pencocokan invoice dan bukti pembayaran yang berada di luar engine sekarang.
