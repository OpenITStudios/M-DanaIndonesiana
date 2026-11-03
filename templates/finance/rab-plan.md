# Template RAB — Rencana Anggaran Biaya (Internal)

**ID template:** di.finance.rab-plan@1.0.0  
**Pemilik domain:** finance-reporting  
**Media:** Excel (.xlsx) untuk kebutuhan pengguna, dengan padanan Google Sheets native dalam proyek.  
**Status:** desain internal untuk review; **bukan** lampiran resmi LPDP, Juknis atau RAB yang telah disetujui.

## Tujuan dan batas

Membuat rencana biaya per pos yang dapat ditelusuri, dihitung dan diringkas menurut tahap maupun kategori. Tidak menyatukan **RAB rencana** dengan realisasi transaksi, pencairan termin, saldo kas, laporan pertanggungjawaban atau perhitungan pajak.

Pagu, kode pos, kategori dan harga **tidak berasal dari sumber resmi secara otomatis**. User harus memasukkannya berdasarkan pedoman, kontrak, dokumen proyek atau penawaran yang benar-benar berlaku.

## Tab

**RAB** — data utama, 100 baris input pada baris 11–110. A1:L2 judul/penjelasan, C4 nama program, I4 periode, C5 ref/versi RAB, I5 status \`DRAF INTERNAL\` (label manual), C6 dasar anggaran, I6 pagu acuan bila benar tersedia. Baris 10 header:

A No. (otomatis), B Tahap, C Kode RAB, D Kelompok biaya, E Uraian, F Volume, G Satuan, H Frekuensi, I Harga satuan (Rp), J Jumlah (Rp, otomatis), K Dasar harga/sumber, L Catatan.

\`J{row}=IF(OR(E{row}="";F{row}="";H{row}="";I{row}="");"";F{row}*H{row}*I{row})\` pada Google Sheets locale Indonesia; Excel memakai koma sebagai pemisah argumen. **Frekuensi wajib eksplisit** (mis. 1 untuk satu kali), jangan menganggap input kosong = 1. Pos yang belum cukup data tidak masuk total dan ditandai perlu pemeriksaan.

J112 = SUM(J11:J110), J113 = COUNTIF(E11:E110;"<>") - COUNT(J11:J110). Kolom formula diberi warning-only protection pada Google Sheets untuk mengurangi perubahan tidak sengaja. Tabel ada basic filter, freeze 10 baris, angka dan harga berupa number asli.

**REKAP** — menghitung total, jumlah pos dan yang belum lengkap. Rekap tahap dengan SUMIF pada B8:B10, rekap kategori F8:F15, porsi terhadap total, jumlah pos, dan nilai yang tidak terpetakan menurut nama tahap/kategori. Jika belum ada input, status menampilkan \`BELUM ADA DATA\`. Selisih atau pos belum lengkap menampilkan \`PERLU PEMERIKSAAN\`. Pagu acuan hanya ditampilkan jika benar diisi.

**PANDUAN** — petunjuk penulisan, tiga tahap default dan delapan kelompok biaya **sebagai kategori contoh internal**. User dapat mengganti label kelompok/tahap mengikuti klasifikasi yang sah; label pada RAB harus sama agar rekap cocok.

## Kontrak generator Google Sheets

Field metadata pada sheet RAB:
- \`project_name -> C4\` (text, wajib)
- \`period -> I4\` (text, wajib)
- \`rab_ref -> C5\` (text, wajib)
- \`budget_basis -> C6\` (text, opsional)
- \`reference_ceiling -> I6\` (money, opsional)

\`line_items\` adalah tabel **input B11:I110** dengan 8 kolom berurutan: \`stage\`, \`rab_code\`, \`cost_category\`, \`description\`, \`volume\`, \`unit\`, \`frequency\`, \`unit_price\`. Nominal dan kuantitas dibaca sebagai angka, bukan teks berformat. Sumber harga K dan catatan L tetap diisi/review **secara manual** pada master awal; perencana belum menulis ke kolom tersebut. Tidak pernah menimpa A/J yang berisi formula. Jangan membuat input otomatis yang tidak punya referensi sumber.

## Prinsip desain

Gaya administrasi profesional, putih, teks gelap, judul jelas, satu header biru tua, tanpa kartu dashboard, tanpa warna kuning/abu untuk menandakan status. Input manual font biru, hasil kalkulasi hitam, angka rata kanan; total terpisah secara tipografis. Tiga tahap hanya dibedakan halus di bagian rekap. RAB cukup lebar untuk keterbacaan; saran cetak **A3 landscape** untuk rincian dan A4 untuk rekap, yang harus diperiksa dalam aplikasi sebelum dicetak. Jangan mengecilkan font secara berlebihan.

## QA dan batas

Skenario sintetis: tahap 1 (2 x 1 x 1.200.000 = 2.400.000), tahap 2 (3 x 1 x 750.000 = 2.250.000), tahap 3 (5 x 2 x 50.000 = 500.000), satu pos tanpa frekuensi tidak dihitung. Total = **Rp5.150.000**, satu pos \`PERLU PEMERIKSAAN\`. RAB master tidak memuat nilai sintetis setelah QA.

Diuji pada Excel artifact_tool dan Google Sheets locale \`in_ID\`; pemisah fungsi Excel adalah koma, sedangkan formula Google Sheets locale Indonesia memakai titik koma. QA visual Excel telah dilakukan untuk detail dan rekap; **fit visual native Google Sheets dan cetak belum diverifikasi**. Status master native \`NEEDS_REVIEW\`, bukan siap diajukan.

Rujukan: [finance contract](../../kits/dana-indonesiana/finance/CONTRACT.md), [pedoman dasar](../../docs/foundation/05-document-production-baseline.md), [standar spreadsheet](../google-native/SPREADSHEET-STYLE.md).
