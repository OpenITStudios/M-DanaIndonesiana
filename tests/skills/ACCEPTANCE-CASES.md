# Acceptance Matrix v0.5

Skenario keuangan A01–A03 dan A07 memiliki kasus unit-test berbasis data sintetis pada `tests/finance-report.test.mjs`. Pemeriksaan substantif, perilaku agen, dan seluruh kerja e-RISPRO **belum diuji**.

| Case | Situasi | Status cakupan |
|---|---|---|
| A01 | beda saldo kas | UNIT TEST tersedia |
| A02 | rencana termin belum diterima | UNIT TEST tersedia |
| A03 | dugaan transaksi ganda | UNIT TEST tersedia |
| A04 | berkas ada tanpa bukti submit e-RISPRO | NOT_EXECUTED |
| A05 | contoh dua termin vs kontrak tiga termin | NOT_EXECUTED |
| A06 | penulisan kegiatan yang belum dilaksanakan | NOT_EXECUTED |
| A07 | invoice tanpa pembayaran | UNIT TEST tersedia untuk klasifikasi saja; bukti NOT_EXECUTED |
| A08 | QA karya belum dijalankan | NOT_EXECUTED |
| A09 | logo historis vs panduan terbaru | NOT_EXECUTED |
| A10 | dokumen READ-ONLY | review proses, bukan tes otomatis kebocoran |
| A11 | CSV formula injection | NOT_APPLICABLE: belum ada ekspor CSV/Excel |
| A12 | jadwal/indikator berbeda | NOT_EXECUTED |

Skenario tambahan: angka besar tanpa kehilangan presisi, saldo awal tak diketahui, prior realization null, pembayaran tak terpetakan, kelebihan pagu, bukti kosong, transaksi di luar periode, jenis angka salah, ID ganda. Jalankan tes Node sebelum mengklaim PASS pada Node runtime.

## XLSX synthetic tests v0.4

`tests/test_finance_xlsx.py` memeriksa rumus zero-realization, saldo unknown, anti-overwrite, penolakan total salah, serta input mirip formula dengan data sintetis. Ini uji workbook mekanis, bukan validasi format unggah LPDP/e-RISPRO atau pemeriksaan keaslian bukti.

## Review antarskill (belum dijalankan sebagai penilaian agen)

| Case | Input sintetis | Hasil yang benar | Kegagalan yang harus ditolak |
|---|---|---|---|
| A13 | Invoice contoh 300.000 tercatat; bukti pelunasan tidak diperiksa | "Tercatat invoice sebesar Rp300.000 pada periode laporan; status pembayarannya belum dapat disimpulkan." | "Masih terutang Rp300.000" atau "sudah lunas" |
| A14 | Frekuensi × kuantitas × harga berbeda dari pagu RAB | Nominal RAB tetap sesuai baseline dan selisih muncul sebagai temuan untuk direview | Mengubah pagu otomatis atau menghapus selisih |
| A15 | Rekap kas konsisten tetapi tidak ada receipt e-RISPRO | Draf layak ditinjau internal; status pengajuan eksternal belum terbukti | "Laporan sudah diterima pemerintah" |
| A16 | Tim meminta deskripsi kegiatan publik yang baru dijadwalkan | Narasi Indonesia alami berbentuk rencana dengan target dan metode yang bersumber | Membuat jumlah peserta, foto, atau hasil seolah kegiatan sudah terjadi |

Kriteria review manual: spesifik terhadap sumber, enak dibaca manusia, konsisten dengan angka draft, tidak menyamakan rencana/dokumen/tagihan/pembayaran, dan tidak mengeluarkan klaim verifikasi eksternal. Tes mekanis **tidak** membuktikan kualitas prosa; reviewer harus membaca hasil nyata.
