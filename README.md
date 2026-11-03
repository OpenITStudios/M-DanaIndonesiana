# M-DanaIndonesiana

**Sistem pedoman dan pengelolaan proyek pendanaan kebudayaan (fondasi awal).**

Repository ini menyiapkan aturan kerja, struktur pengetahuan, prosedur produksi karya, pencatatan administrasi-keuangan, dan batas pembuktian untuk proyek Dana Indonesiana periode 2025–2026. **Belum ada data perjanjian, RAB, indikator, atau profil skema pendanaan proyek yang ditetapkan di repository ini.**

## Status saat ini

- Tahap: **Foundation v0.1** — pedoman dan routing; belum ada aplikasi, integrasi e-RISPRO, kalkulator pajak, atau validator otomatis yang dapat diklaim berjalan.
- Kategori pendanaan, kewajiban, tahun aturan yang berlaku, dan termin proyek: **BELUM DIVERIFIKASI** sampai dokumen proyek yang sah diperiksa.
- Repository bersifat **publik**. Simpan kontrak, rekening, identitas, bukti bayar, dan data proyek nyata hanya di ruang privat yang disetujui; lihat [SECURITY.md](SECURITY.md).
- Sistem ini **membantu persiapan, pemeriksaan, dan pelaporan internal**; bukan pemberi persetujuan resmi, konsultan hukum, atau pengganti e-RISPRO.

## Alur kerja

    Project Setup → Source & Grant Intake → Project Baseline
    → Work Planning → Execution & Evidence
    → Verification → Reporting & Submission → Closeout

Setiap tahap memakai sumber yang dapat dilacak. Tahap yang tidak terdampak tidak perlu diulang jika ada revisi terbatas. Keputusan penting tidak disimpulkan diam-diam oleh AI.

## Navigasi

- [AGENTS.md](AGENTS.md) — router pekerjaan AI/operator, batas otoritas, mode, dan stop rule.
- [CONTEXT.md](CONTEXT.md) — konteks stabil dan status fondasi.
- [GITHUB_RULES.md](GITHUB_RULES.md) — disiplin branch, commit, dan pembuktian.
- [docs/README.md](docs/README.md) — indeks seluruh pedoman.
- [kits/dana-indonesiana/SKILL.md](kits/dana-indonesiana/SKILL.md) — prosedur produksi dokumen berbasis proyek.
- [templates/project-intake.md](templates/project-intake.md) — daftar informasi yang perlu diisi nanti.
- [workspace/README.md](workspace/README.md) — konvensi data proyek privat.

## Branch

    develop  : pengembangan aktif selanjutnya
    Local    : baseline integrasi yang telah ditinjau
    main     : fondasi/stabil yang disetujui

Bootstrap awal dimulai dari repository kosong. Setelah fondasi terbentuk, perubahan rutin diarahkan ke **develop**; promosi mengikuti [GITHUB_RULES.md](GITHUB_RULES.md). Tidak ada klaim branch protection atau CI otomatis jika belum dikonfigurasi dan dibuktikan.

## Cara melanjutkan

Saat pemilik proyek memberikan informasi, mulai dari **Project Intake**, bukan dari mengarang RAB atau mengeksekusi transaksi. Validasi sumber, daftar asumsi/konflik, lalu minta persetujuan atas perubahan material sebelum menyiapkan dokumen turunan.

Prinsip utama: **satu sumber fakta per domain, bukti dapat ditelusuri, status dilaporkan secara jujur, data sensitif tetap privat, dan tidak membangun komponen yang belum diperlukan.**

## Skills v0.2

Paket tujuh [Agent Skills](.agents/skills/) tersedia dengan [routing](docs/skills/README.md), kontrak domain, kerahasiaan dan sumber fakta bersama. Skill bersifat prosedural: tidak mengimplementasikan akuntansi, pajak atau integrasi e-RISPRO otomatis. Jangan menyimpan dokumen proyek privat pada repo publik.
