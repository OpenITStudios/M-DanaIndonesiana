---
id: foundation.traceability
authority: CANONICAL
status: ACTIVE
---

# Traceability & Canonical Records

Tujuan: menghubungkan **kewajiban → kegiatan → pengeluaran → bukti → laporan** tanpa menyimpan rincian proyek nyata dalam Git publik.

## Identitas konseptual

| Prefix | Jenis | Contoh pemakaian |
|---|---|---|
| SRC | sumber berwenang | dokumen, versi, lokasi |
| OBL | kewajiban program/proyek | klausul yang relevan |
| IND | indikator keluaran | target dan metode bukti |
| ACT | aktivitas | tanggal, penanggung jawab, status |
| RAB | pos anggaran | revisi yang berlaku, pagu |
| PRC | paket pengadaan | metode, vendor, bukti pembanding |
| TXN | transaksi | nominal, tanggal, referensi bukti bayar |
| EVD | bukti | jenis, pemilik akses, relasi, verifikasi |
| DEC | keputusan | siapa berwenang, tanggal, sumber |
| RPT | bagian laporan | sumber angka/aktivitas yang digunakan |

Ini **konvensi ID**, bukan instruksi untuk membuat sepuluh database/registry. Gunakan hanya entitas yang benar-benar diperlukan dan satu pemilik data per fakta.

## Relasi minimum

- Setiap **ACT** untuk keluaran proyek merujuk **IND** atau memiliki alasan eksplisit.
- Setiap **TXN** biaya proyek merujuk **RAB**, aktivitas/tujuan yang relevan, dan bukti pembayaran/pengecualian yang dijelaskan.
- Setiap **PRC** merujuk kebutuhan, sumber aturan yang berlaku, dan transaksi terkait bila telah terjadi.
- Setiap klaim **RPT** merujuk kembali ke baseline, aktivitas, transaksi, atau bukti asli; laporan tidak boleh menjadi sumber transaksi baru.
- Nilai uang disimpan dengan nominal tepat dan mata uang eksplisit; pembulatan/tarif hanya mengikuti aturan yang telah dipastikan.
- Versi RAB/perjanjian sebelumnya tidak ditimpa; koreksi mencatat sebelum, sesudah, alasan, dan otorisasi.

## Integritas

Tidak membuat record sukses tanpa bukti. Data hilang = UNKNOWN/INCOMPLETE; angka 0 hanya bila benar-benar nol. Hindari duplikasi transaksi dan nomor kuitansi. Untuk data personal, simpan pointer referensi privat/ID aman alih-alih isi dokumen pada laporan publik.

Saat perubahan sumber, evaluasi hanya relasi terdampak, bukan merombak seluruh proyek atau mempertahankan status verifikasi lama secara keliru.
