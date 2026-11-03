# Procurement & Vendor Management — Domain Contract

**Modul logis**, bukan skill/agen kedelapan. Dipanggil melalui `evidence-audit` untuk ketersediaan bukti, `finance-reporting` untuk nilai dan pembayaran, `grant-administration` untuk kontrak dan persetujuan, atau `regulatory-applicability` untuk menentukan aturan yang berlaku.

Tujuan: **kebutuhan jelas, pembelian diizinkan, pembanding dapat dipertanggungjawabkan, hasil diterima, biaya dan bukti tertelusur**. Jangan memaksakan tata cara formal LKPP kepada setiap penerima manfaat; ruang lingkup Perpres/PerLKPP perlu dinilai oleh Regulatory terhadap status pelaku pengadaan dan sumber anggaran.

Sumber: [Pedoman Administrasi 2025 LPDP](https://erispro-indonesiana.kemenkeu.go.id/upload/DAKB_Pedoman_administrasi_penerima_2025.pdf), [LKPP Perpres 46/2025](https://jdih.lkpp.go.id/regulation/peraturan-presiden/peraturan-presiden-nomor-46-tahun-2025), dan [Peraturan LKPP 3/2026](https://jdih.lkpp.go.id/regulation/peraturan-lkpp/peraturan-lkpp-nomor-3-tahun-2026). Dua sumber LKPP adalah **referensi metode dan ruang lingkup**, bukan aturan yang otomatis berlaku pada semua transaksi Dana Indonesiana.

## Satu jalur dari kebutuhan ke hasil

1. **Kebutuhan dan izin:** identifikasi kegiatan `ACT/IND`, pos dan versi `RAB`, jenis belanja, periode, dasar izin kategori. Jika aset dilarang atau status belanja belum jelas: berhenti pada `NEEDS AUTHORITY REVIEW`.
2. **Spesifikasi:** tulis hasil kerja yang diperlukan dan kriteria penerimaan yang bisa diperiksa; untuk jasa digital tentukan deliverable, format penyerahan, kompatibilitas, hak pakai, jadwal dan batas revisi yang disepakati.
3. **Pemeriksaan harga:** gunakan [Price Comparison](PRICE-COMPARISON.md), pembanding yang relevan **secara spesifikasi/kuantitas/scope**, tanggal, sumber, harga dan pajak. Penawaran independen tidak dibuktikan dari jumlah screenshot saja.
4. **Pemilihan penyedia:** pertimbangkan kecocokan teknis, mutu, pengalaman yang relevan, waktu pengerjaan, harga total, syarat lisensi, kemampuan menyerahkan bukti. Catat alasan; jangan otomatis memilih paling murah ataupun memakai skor matematis palsu.
5. **Kontrak/pemesanan:** pastikan ruang lingkup, biaya, pekerjaan/tahapan, jadwal, kriteria penerimaan, kepemilikan hasil, lisensi, dan termin pembayaran bila memang ditetapkan. Nomor/penandatangan/approval asli tidak dibuat oleh AI.
6. **Penyerahan dan inspeksi:** pisahkan `DELIVERED` (ada hasil) dari `ACCEPTED_INTERNAL` (telah direview sesuai kriteria) dan `NOT_EXECUTED` (pengujian yang belum dilakukan). Foto saja tidak membuktikan semua fitur jasa digital bekerja.
7. **Pembayaran dan pajak:** Finance mencatat pembayaran nyata, memisahkan invoice dan status pelunasan yang belum direkonsiliasi, serta memeriksa bukti dan pajak menurut kondisi aktual.
8. **Pelaporan dan arsip:** tautkan `PRC → RAB/IND/ACT → TXN → EVD → RPT`, pertahankan riwayat serta dasar persetujuan. Jenis bukti mengikuti [Expenditure Evidence](../evidence/EXPENDITURE-EVIDENCE.md).

## Pola bukti per fase

| Fase | Rekam yang bermakna | Bukan bukti otomatis |
|---|---|---|
| Permintaan | alasan kebutuhan, kode RAB dan hasil yang diperlukan | izin belanja final |
| Referensi harga | asal harga, spesifikasi, tanggal, kondisi harga | pembelian/jasa sudah dipesan |
| Pemilihan | alasan keputusan dan referensi yang diperiksa | kelayakan hukum otomatis |
| Komitmen | kontrak/surat pesanan nyata | hasil sudah diterima |
| Serah terima | file/artefak, tanggal, reviewer dan cakupan review | seluruh QA lulus |
| Pembayaran | bukti kas/rekening, kuitansi dan pajak relevan | hasil profesional atau lisensi telah lengkap |

Untuk pembelian barang/jasa yang menurut pedoman LPDP 2025 **di atas Rp50 juta**, periksa kebutuhan dokumentasi survei harga atau pembanding sesuai teks dan keberlakuannya, **jangan menjadikannya angka universal yang tertanam dalam setiap modul**. Periksa juga larangan pembelian aset dalam Juknis kategori sebelum menyusun pengadaan.

## Konflik kepentingan dan vendor

- Tanyakan hubungan pihak pengusul, pemilih, penyedia dan pihak yang memeriksa hasil jika ada risiko yang material. Ketentuan deklarasi hubungan mengikuti aturan organisasi/perjanjian yang berlaku, bukan formulir fiktif.
- Dua penawaran oleh entitas yang terafiliasi belum tentu pembanding independen; verifikasi sumber bila menjadi persyaratan.
- Data vendor (rekening, KTP, NPWP, nomor telepon pribadi, kontrak personal) **RESTRICTED/INTERNAL** sesuai [SECURITY](../../../SECURITY.md). Hindari menyimpannya dalam Git publik atau tautan contoh.
- Jangan menganjurkan memecah transaksi untuk menghindari persyaratan, menebak status perpajakan vendor, atau membuat penawaran palsu.

## Digital creative work

Untuk jasa aset 3D, game, website, musik/naskah, dan dokumentasi: tentukan format deliverable, versi, akses, kelengkapan berkas, kebutuhan lisensi, dan pengembalian/revisi jika tidak sesuai. `creative-production` menentukan mutu teknis; `dissemination-rights` memeriksa lisensi/hak cipta; Evidence memeriksa keberadaan dan dukungan dokumennya.

Pakai [template permintaan](../../../templates/procurement/requirement-and-selection.md) dan [template serah-terima](../../../templates/procurement/deliverable-acceptance.md) jika pengguna benar-benar memerlukannya. **Jangan membuat folder atau dokumen kosong yang tidak dipakai.**
