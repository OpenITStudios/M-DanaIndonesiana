# Acceptance Matrix v0.3

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
