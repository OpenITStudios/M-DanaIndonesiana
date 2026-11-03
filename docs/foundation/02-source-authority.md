---
id: foundation.source-authority
authority: CANONICAL
status: ACTIVE
---

# Source Authority & Applicability

**Instruksi pengguna mengotorisasi pekerjaan, bukan menciptakan legalitas belanja.** Satu referensi umum tidak otomatis menjadi aturan yang berlaku untuk proyek tertentu.

## Kelas sumber

| Kelas | Peran |
|---|---|
| LEGAL | undang-undang/peraturan yang relevan dengan transaksi dan tanggal |
| PROGRAM | pedoman/Juknis berdasarkan kategori/tahun yang berlaku |
| PROJECT | perjanjian, addendum, RAB, indikator, proposal sah |
| DECISION | surat/persetujuan/klarifikasi resmi yang otentik |
| SUPPORTING | notula, bukti pendukung, referensi harga, korespondensi non-otoritatif |
| DERIVED | ringkasan AI, hasil kalkulasi, format laporan, dashboard |

Hindari membuat satu ranking kaku untuk seluruh kemungkinan konflik hukum. Periksa hierarki hukum, ruang lingkup, tanggal efektif, otoritas penerbit, perjanjian, serta klausul yang dirujuk. Kebijakan internal tidak boleh mengubah syarat resmi.

## Setiap aturan yang diaktifkan harus memiliki

- ID sumber, judul, penerbit, URL/lokasi privat, versi, tanggal publikasi, tanggal efektif bila diketahui.
- Program/kategori, tahun anggaran/kontrak, jenis pengeluaran/aktivitas, dan kondisi pengecualian.
- Nomor pasal/bagian/halaman yang berhasil diperiksa; jangan mengarang nomor halaman.
- Ringkasan **parafrasa** ketentuan dan tipe tindakan: wajib/dilarang/boleh/perlu persetujuan.
- Bukti mengapa aturan itu berlaku pada proyek (perjanjian/Juknis/keputusan yang relevan).
- Status: DISCOVERED, REVIEWED, APPLICABLE, SUPERSEDED, CONFLICT, atau UNKNOWN.
- Tanggal/verifikator review dan konflik yang belum diselesaikan bila relevan.

## Aturan perubahan

- Jangan menerapkan ketentuan baru tahun 2026 ke proyek yang dimulai pada 2025 tanpa memeriksa dasar keberlakuan.
- Aturan mengenai **cara melaporkan aset** tidak dengan sendirinya merupakan **izin membeli aset**.
- Angka pajak, ambang harga, batas revisi, ketentuan pengadaan, atau daftar bukti wajib hanya boleh diaktifkan setelah sumber yang berlaku cocok.
- Saat konflik: tunjukkan kedua klaim, konsekuensinya, dan pihak yang layak memberi klarifikasi; hasil **UNKNOWN / NEEDS AUTHORITY REVIEW**, bukan keputusan AI.

## Sumber kebenaran

Dokumen asli dan keputusan resmi tetap utuh. Baseline dan daftar kewajiban merupakan ekstraksi yang direview; laporan ekspor adalah turunan. Koreksi dilakukan pada pemilik fakta yang pertama, lalu turunan dihasilkan kembali.

Daftar penemuan awal terpisah: [source-register.md](../regulations/source-register.md).

## Prosedur pemilihan aturan (v1.0)

Definisi kelas sumber dan batas legalitas **tetap dikendalikan oleh halaman ini**. Prosedur khusus yang mengimplementasikannya terdapat pada [Source Intake](../../kits/dana-indonesiana/regulatory/SOURCE-INTAKE.md), [Applicability Matrix](../../kits/dana-indonesiana/regulatory/APPLICABILITY-MATRIX.md), [Temporal & Contract Scope](../../kits/dana-indonesiana/regulatory/TEMPORAL-CONTRACT.md), dan [Conflict Escalation](../../kits/dana-indonesiana/regulatory/CONFLICT-ESCALATION.md). Dokumen-dokumen tersebut tidak mengubah hierarki hukum atau memberi otorisasi pengeluaran.
