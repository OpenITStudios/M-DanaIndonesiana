# QA — Master RAB Anggaran v1.0.0 (4 November 2026)

**Status:** DRAFT / NEEDS_REVIEW, internal. Data uji sepenuhnya sintetis. Pengujian ini tidak membuktikan kepatuhan format administrasi pemerintah, kelayakan harga, pajak, atau keberhasilan pengadaan.

## Dua media output

1. **Excel (.xlsx)** dihasilkan dengan artifact_tool, tiga tab RAB/REKAP/PANDUAN. File master final bersih dari data uji dan telah diekspor serta lolos pemeriksaan struktur ZIP/XLSX.
2. **Google Sheets native** dibuat langsung dalam folder master privat proyek karena import dari snapshot XLSX tidak tersedia melalui konektor sesi ini. Layout dan rumus dipindahkan dalam struktur yang setara; ini **bukan konversi langsung dari Excel**.

Tidak ada ID privat Drive atau angka proyek sungguhan disimpan di repository publik.

## Struktur yang diperiksa

- RAB: 100 baris input 11–110; kolom A/J berupa formula; metadata terpisah; total J112; pos belum lengkap J113; drop-down tahap; harga nonnegatif (native Sheets); sumber harga dan catatan tersedia pada K/L.
- REKAP: nilai total tunggal dari RAB, rekap tiga tahap dan delapan kategori contoh, sisa tak terpetakan dan status kualitas data.
- PANDUAN: petunjuk, daftar tahap/kategori/satuan yang bisa disesuaikan, serta batas penggunaan.
- Tidak ada angka harga, honorarium, termin atau pagu yang diklaim sebagai data nyata.

## Uji perhitungan

Satu salinan Google Sheets dan satu pengisian sementara Excel diuji dengan data sintetik identik:

| Uji | Hasil |
|---|---:|
| Tahap 1: 2 x 1 x Rp1.200.000 | Rp2.400.000 |
| Tahap 2: 3 x 1 x Rp750.000 | Rp2.250.000 |
| Tahap 3: 5 x 2 x Rp50.000 | Rp500.000 |
| Pos keempat tanpa frekuensi | **Tidak dihitung; harus diperiksa** |
| Total | **Rp5.150.000** |
| Jumlah pos terisi | 4 |
| Pos belum lengkap | 1 |
| Status | PERLU PEMERIKSAAN |
| Rekonsiliasi tahap dan kategori | Anggaran terpetakan Rp5.150.000; selisih Rp0 |

Uji memperlihatkan COUNTIFS dengan hasil formula kosong tidak konsisten pada evaluator lokal Excel; diperbaiki menggunakan \`COUNTIF(uraian;"<>")-COUNT(jumlah)\`, yang menghasilkan satu pos belum lengkap pada kedua media.

## Koreksi formula untuk locale

Google Sheets dalam locale \`in_ID\` memerlukan pemisah argumen **titik koma**. Rumus yang dikirim dengan pemisah koma dari Excel menghasilkan \`Formula parse error\`, bahkan beberapa fungsi seperti SUM terlihat error karena referensi turunannya ikut error. Masalah diperbaiki setelah dilakukan uji probe: \`IF(1=1;42;0)\` menghasilkan 42, sedangkan versi dengan koma gagal. Rumus 100 baris RAB dan formula REKAP diperbarui secara eksplisit per baris. Tidak menggunakan repeatCell untuk mengisi rumus karena repeatCell awal **tidak mengubah referensi baris** pada sesi ini.

Readback setelah perbaikan master Google Sheets: sel formula kosong tidak menimbulkan error, total awal ditampilkan sebagai garis (format nol), dan status \`BELUM ADA DATA\`. Salinan berisi data sintetis menghasilkan seluruh nilai yang diharapkan.

## Pemeriksaan desain

- **Excel:** render RAB (baris 1–17) dan REKAP (baris 1–24) telah diperiksa; judul, header, metadata, numerik dan ringkasan terbaca. RAB 12 kolom membutuhkan layar lebar atau pencetakan A3 landscape; bukan dipaksa A4 kecil.
- **Google Sheets:** native MIME, tiga tab, grid bounds, freeze, filter, format sel, validasi, warning-only protection, rumus, dan angka diuji lewat API. **Belum** diperiksa dengan screenshot browser Google Sheets maupun Print Preview.

## Batas dan tindak lanjut

- Master native berada di Registry privat sebagai \`NEEDS_REVIEW\` sampai UI dan pengaturan cetak diperiksa bersama pengguna; status berbeda dari approved budget.
- Angka kategori pada PANDUAN adalah label internal yang dapat disesuaikan; bukan nama pos resmi semua program.
- Model tidak melakukan perhitungan pajak otomatis karena sumber/tarif belum diperiksa.
- Sumber harga K dan catatan L belum menjadi bagian dari table-bindings planner; perlu pemeriksaan manual ketika salinan digunakan.
- RAB disediakan sebagai *rencana*. Realisasi, arus kas, dan termin pencairan tetap domain atau file berbeda sesuai [kontrak keuangan](../../kits/dana-indonesiana/finance/CONTRACT.md).

## Acuan

[Template RAB](../../templates/finance/rab-plan.md) · [Standar Spreadsheet](../../templates/google-native/SPREADSHEET-STYLE.md) · [Pedoman Dokumen](../foundation/05-document-production-baseline.md).
