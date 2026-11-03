# M-DanaIndonesiana — Agent Routing

Dokumen ini merupakan **router kanonis** bagi ChatGPT/agen dan operator pada repository ini. Patuhi instruksi pemilik saat ini dan sumber proyek yang terverifikasi; pedoman internal tidak dapat mengesampingkan hukum atau perjanjian yang sah.

## Boot untuk setiap sesi

1. Pin repository, branch, dan HEAD aktual; jangan menyimpulkan status dari chat lama.
2. Baca **AGENTS.md**, lalu **CONTEXT.md**, dan domain router di **docs/README.md**.
3. Pilih **satu mode** sesuai hasil yang diminta, lalu baca owner terkecil yang relevan.
4. Baca **GITHUB_RULES.md** sebelum mengubah repository atau riwayat Git.
5. Laporkan temuan, bukti yang benar-benar diperiksa, dan batas verifikasi. STOP setelah permintaan selesai.

## Mode kerja

| Mode | Boleh | Tidak boleh otomatis |
|---|---|---|
| INSPECT | membaca, mengaudit, merancang | mengubah repo/proyek |
| SYSTEM DEVELOPMENT | memperbaiki pedoman, skema, aplikasi, pengujian di develop | mengganti data proyek nyata |
| PROJECT EXECUTION | menyusun dan merevisi dokumen untuk satu proyek yang dipilih | mengubah pedoman sistem |
| VALIDATION | memeriksa fakta, kelengkapan, dan bukti pada sumber yang ada | mengklaim persetujuan resmi |
| MAINTENANCE | memperbaiki kesalahan terbatas pada owner asal | refactor/fitur melebar |

Jika pengguna berkata "lanjutkan", pertahankan topik dan mode kerja yang aktif; jangan memilih backlog lain. Jika data proyek yang penting belum ada, buat daftar UNKNOWN dan selesaikan pekerjaan independen.

## Sumber dan otoritas

- Instruksi pengguna menentukan **permintaan kerja**, bukan legalitas pengeluaran.
- Untuk setiap klaim kepatuhan, periksa hukum relevan, pedoman/Juknis sesuai kategori, perjanjian dan addendum, RAB/indikator disetujui, serta keputusan resmi yang dapat dibuktikan.
- Aturan antar tahun **tidak otomatis berlaku silang**. Catat tahun anggaran, kategori, versi, tanggal efektif, klausul, dan keputusan relevan.
- Jika terjadi konflik material, beri status **UNKNOWN / NEEDS AUTHORITY REVIEW**; jangan memilih aturan hanya karena terbit paling baru.
- Hierarki dan prosedur pemeriksaan: [source-authority](docs/foundation/02-source-authority.md).

## Jalur kanonis

    sumber asli + keputusan resmi
    → baseline proyek yang disetujui
    → catatan aktivitas / anggaran / transaksi / bukti
    → pemeriksaan internal
    → keluaran laporan turunan
    → catatan pengajuan dan hasil persetujuan eksternal

Keluaran Excel, PDF, HTML, ringkasan, atau dashboard **bukan** sumber untuk menimpa dokumen asli. Perbaiki pertama-tama sumber/owner yang salah lalu regenerasi output terdampak.

## Ownership

| Masalah | Mulai dari |
|---|---|
| lingkup proyek, apa yang bukan tugas sistem | docs/foundation/00-product-boundaries.md |
| langkah kerja, approval, transisi | docs/foundation/01-production-flow.md |
| dokumen resmi, konflik sumber | docs/foundation/02-source-authority.md |
| bukti, kesiapan, batas klaim PASS | docs/foundation/03-proof-and-approval.md |
| identitas/relasi anggaran-kegiatan-bukti | docs/foundation/04-traceability.md |
| fungsi antarmodul | docs/modules/README.md |
| sumber aturan yang diketahui | docs/regulations/source-register.md |
| cara mengolah proyek | kits/dana-indonesiana/SKILL.md |
| cara memeriksa hasil | kits/dana-indonesiana/VALIDATION.md |
| GitHub/history/data protection | GITHUB_RULES.md dan SECURITY.md |

Jangan menggandakan aturan di modul lain. Jika makna berubah, ubah owner kanonis dahulu; rujuk dari tempat lain.

## Larangan operasional

- Tidak membuat kuitansi, kontrak, persetujuan PMO, bukti setor, foto kegiatan, atau capaian fiktif.
- Tidak mengeluarkan putusan "patuh pemerintah", "lulus audit", atau "disetujui LPDP/PMO" dari template, kalkulasi, ataupun pemeriksaan mekanis.
- Tidak memindahkan data sensitif ke repository publik, issue, log, atau contoh.
- Tidak mengasumsikan kategori Dana Indonesiana atau menerapkan aturan numerik tertentu sebelum sumber dan keberlakuannya ditentukan.
- Tidak membuat aplikasi, registry paralel, agen tambahan, atau antarmuka kompleks semata-mata agar terlihat lengkap.

## Continuity

Gunakan HEAD aktual, perubahan owner terkait, dan [CONTEXT.md](CONTEXT.md). Catatan chat adalah orientasi, bukan sumber proyek otoritatif. Saat ada keputusan material, catat pada sumber privat proyek atau catatan keputusan sistem yang memang relevan. Cantumkan pekerjaan, status, bukti dan keterbatasan pada commit material; tidak perlu heartbeat/status duplikat.

**STOP** saat keluaran yang diminta selesai dengan bukti cukup, atau saat batas data/akses dilaporkan secara spesifik.

## Skill modular

Pilih satu spesialis dari [Skill Router](docs/skills/README.md). Baca [Shared Contract](kits/dana-indonesiana/OPERATING-CONTRACT.md). Dokumen dengan instruksi "pelajari saja" tidak pernah di-upload/disimpan. Domain kedua hanya diaktifkan jika tugas memerlukan.
