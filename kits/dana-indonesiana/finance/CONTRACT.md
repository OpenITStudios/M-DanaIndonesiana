# finance-reporting — Domain Contract

**Tanggung jawab:** Mengolah angka keuangan agar dapat direkonsiliasi, ditelusuri, dan diproyeksikan ke format laporan yang berlaku. Tidak menggantikan akuntan, otorisasi transaksi, atau keputusan pajak.

Patuhi [shared contract](../OPERATING-CONTRACT.md), [source authority](../../../docs/foundation/02-source-authority.md), [proof boundary](../../../docs/foundation/03-proof-and-approval.md) dan [traceability](../../../docs/foundation/04-traceability.md). Domain ini tidak menduplikasi aturan dari pemilik lain.

## Input yang diperlukan (privat bila terkait proyek nyata)

- RAB berstatus disetujui beserta riwayat revisi, pos/kode dan indikator
- rencana pencairan dan catatan penerimaan bank yang nyata
- transaksi pembayaran berikut nomor bukti dan referensi rekening koran
- jenis transaksi, periode laporan, status pemeriksaan pajak; data tetap di ruang privat

Jika sumber yang diminta tidak tersedia, keluarkan UNKNOWN spesifik, bukan mengarang. File sumber yang hanya diizinkan untuk dipelajari adalah read-only dan tidak boleh diekspor atau ditulis ke tempat lain.

## Prosedur

1. Pisahkan planned budget, approved ceiling, dana dicairkan, tagihan, pembayaran nyata, dan angka reported; jangan mencampurkan rencana dengan kas.
2. Cocokkan setiap TXN dengan pos RAB, aktivitas/indikator dan EVD; catat UNMAPPED untuk data belum jelas.
3. Hitung jumlah pos, realisasi per periode/kumulatif, selisih dan saldo dengan nilai rupiah numerik tepat; tampilkan rumus terbuka.
4. Rekonsiliasi saldo awal + kas masuk - kas keluar = saldo akhir terhadap bukti rekening koran dan kas tunai yang ada. Jika berbeda, catat selisih, jangan dipaksa nol.
5. Periksa risiko pembayaran ganda/duplikasi nomor bukti; jangan menghapus otomatis berdasarkan kemiripan.
6. Pisahkan bruto, potongan, neto, dan kewajiban pajak transaksi; jenis/tarif hanya diaktifkan jika sumber pajak dan konteks aktual diverifikasi.
7. Proyeksikan data yang telah dicek ke Laporan Realisasi Anggaran dan Arus Kas menurut format resmi yang berlaku; buat daftar temuan terbatas.

## Output contract

Tabel LRA per kode RAB (pagu, realisasi, sisa, nomor bukti), buku arus kas (tanggal, sumber, debit/kredit/saldo), rekonsiliasi, daftar gap, dan catatan periode/versi.

Sertakan ruang lingkup dan periode, versi sumber/nomor referensi aman, metode yang benar-benar dilakukan, status internal, exception, dan langkah tindak lanjut. Draf/hasil audit bukan bukti pengajuan atau persetujuan eksternal.

## Stop rules

- Angka tidak ditemukan = UNKNOWN, bukan Rp0; Rp0 hanya bila benar-benar nol.
- Harga katalog bukan kuitansi, rencana termin bukan pembayaran, invoice bukan bukti transfer.
- Tidak mengarang penerima, pajak, kuitansi, mutasi bank, atau nomor bukti.
- Ekspor CSV/Excel dari teks tak tepercaya harus menetralkan formula injection dan mempertahankan tipe data.

## Contoh uji dengan data sintetis

Dua angka berbeda pada LRA dan buku kas → laporkan selisih, transaksi yang perlu diperiksa, bukti yang hilang; jangan mengubah sumber.

## Kalkulator deterministik v0.3

Gunakan [Validation Runbook](VALIDATION-RUNBOOK.md) dan kalkulator JSON jika ada **data yang diizinkan**. Ini proyeksi DRAFT, bukan ekspor Excel resmi atau bukti persetujuan pemerintah. Realisasi kumulatif hanya dihitung dari prior yang diberikan eksplisit; tidak pernah disimpulkan sebagai nol.

## Excel v0.4

Untuk menghasilkan dua lembar Excel draf dari output JSON Finance v0.3, gunakan [Excel Output Contract](EXCEL-OUTPUT.md). Kalkulasi tetap milik finance engine; exporter tidak boleh menciptakan transaksi, satuan RAB, status disetujui, atau bukti.
 
 ## Metadata RAB v0.5

 Kolom rincian hanya boleh diisi dari data RAB yang memang tersedia dan memiliki status/versi jelas. Perbedaan `frekuensi × kuantitas × harga` terhadap nominal pos harus menjadi temuan, bukan koreksi otomatis. Gunakan [Excel Output](EXCEL-OUTPUT.md) untuk jalur penulisan terpisah.
