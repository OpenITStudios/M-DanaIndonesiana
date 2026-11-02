# Module Boundaries

Modul berikut adalah **batas domain logis**, bukan sembilan aplikasi, database, atau agen. Model data/implementasi hanya dibuat ketika bentuk kebutuhan proyek terverifikasi. Tiap domain memegang fakta asalnya; domain lain membaca atau membuat proyeksi, bukan menyalin sumber.

| Domain | Canonical owner | Konsumen / batas |
|---|---|---|
| Regulatory & Sources | inventaris sumber, status keberlakuan, konflik | semua modul membaca; tidak mengeluarkan persetujuan resmi |
| Grant & Contract | baseline perjanjian, addendum, termin, indikator | planning/finance/reporting; tidak mengubah kontrak |
| Budget & RAB | pos, revisi yang disetujui, pagu, pemetaan | finance/procurement/reporting; tidak mengarang pagu |
| Procurement | kebutuhan, pembanding, pilihan vendor, penerimaan | finance; tidak menganggap pembandingan = izin belanja |
| Finance & Tax | transaksi, bukti pembayaran, kewajiban pajak, rekonsiliasi | reporting; bukan transfer/pemotongan otomatis |
| Creative Production | pekerjaan, karya, milestone, hasil, dokumentasi | reporting; kualitas karya butuh review substansi |
| Administration | surat, notula, respons PMO/LPDP, keputusan | memutakhirkan baseline jika sah; bukan approval buatan |
| Reporting & Submission | proyeksi laporan dan status pengajuan | tidak membuat fakta baru atau mengklaim disetujui |
| Audit & Risk | temuan lintas-domain, gap, eskalasi, tingkat bukti | memberi risiko, bukan sertifikasi kepatuhan final |

## Kontrak integrasi

    source/decision → baseline/activities/budget → transactions/evidence
    → checks → derived reports → externally confirmed status (jika ada)

Gunakan ID/relasi sebagaimana [Traceability](../foundation/04-traceability.md). Aturan applicability ada di [Source Authority](../foundation/02-source-authority.md), dan kualitas bukti ada di [Proof & Approval](../foundation/03-proof-and-approval.md).

## Ekspansi

Jangan membuat folder kode atau skema untuk setiap baris tabel sampai ada kebutuhan dan antarmuka yang jelas. Pertahankan satu model rekam kanonis dan satu jalur ekspor; jangan membuat sistem finance kedua hanya karena tersedia repo MIVUBI Finance. Reuse konsep/komponen setelah lisensi, dependensi, dan kontrak data ditinjau.
