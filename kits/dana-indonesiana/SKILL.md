---
name: dana-indonesiana
description: Router prosedur pengelolaan dokumen proyek pendanaan kebudayaan; non-executable pada Foundation v0.1.
version: 0.1.0
---

# Dana Indonesiana Production Kit

Berkas ini adalah **petunjuk operasional** untuk pekerjaan proyek di ChatGPT, bukan klaim bahwa sudah ada engine terpasang atau data proyek tersedia.

## Masukan dan pemilihan mode

- INSPECT: lihat status dan dokumen tanpa perubahan.
- SYSTEM DEVELOPMENT: ubah aturan/arsitektur pada develop; jangan ubah data nyata.
- PROJECT EXECUTION: susun dokumen atau update satu proyek yang ditentukan berdasarkan sumber privat resmi.
- VALIDATION: uji dan laporkan ketidaksesuaian spesifik; tidak mengubah bukti.
- MAINTENANCE: perbaiki cacat terbatas pada owner yang tepat.

Sebelum pekerjaan proyek, baca [AGENTS.md](../../AGENTS.md), [Source Authority](../../docs/foundation/02-source-authority.md) dan [Production Flow](../../docs/foundation/01-production-flow.md).

## Jalur minimum

    brief + dokumen resmi
    → source inventory (asal, versi, kategori, tanggal)
    → baseline / UNKNOWN / konflik
    → aktivitas dan relasi RAB
    → pencatatan bukti asli
    → pemeriksaan terpisah
    → draf laporan / human review
    → pengajuan resmi oleh pihak berwenang

## Ketika pengguna belum menyediakan data proyek

Tulis hanya template, daftar dokumen yang dibutuhkan, atau rancangan alternatif dengan label asumsi. Jangan mengisi nama proyek, angka pendanaan, termin, persetujuan, atau kewajiban spesifik dari dugaan.

## Ketika menghasilkan dokumen

1. Tentukan satu dokumen hasil dan penggunaan sebenarnya.
2. Catat sumber, identitas revisi, bagian yang terverifikasi, dan hal yang belum diketahui.
3. Pertahankan redaksi asli saat diperlukan; jangan memalsukan cap/tanda tangan.
4. Tautkan klaim capaian, angka, atau biaya ke catatan kanonis.
5. Jalankan pemeriksaan yang benar-benar mungkin sesuai [VALIDATION.md](VALIDATION.md).
6. Tandai jelas **DRAFT / INTERNAL REVIEW / SUBMITTED / EXTERNALLY CONFIRMED** hanya bila kondisi terbukti.

Jangan membuat schema dan registri paralel; isi spesialis finance, hukum, produksi, atau pelaporan diaktifkan sesuai kebutuhan nyata. Status mesin dan status penerimaan eksternal tidak boleh dicampur.
