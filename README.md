# M-DanaIndonesiana

**Sistem modular untuk membantu pelaksanaan pendanaan kebudayaan:** produksi karya, pelaporan keuangan, administrasi, dokumentasi, bukti, pengadaan, hak dan penerapan aturan.

Repo ini bersifat **publik** dan hanya memuat prosedur, referensi publik, template kosong, kode prototipe, serta data uji sintetis. **Tidak ada dokumen proyek asli atau persetujuan pemerintah yang disimpan sebagai baseline di sini.**

## Kemampuan yang tersedia

| Kelompok pekerjaan | Skill |
|---|---|
| RAB, realisasi, arus kas dan rekonsiliasi | [Finance & Reporting](.agents/skills/finance-reporting/SKILL.md) |
| Berkas pencairan, pengajuan, revisi, pelaporan | [Grant Administration](.agents/skills/grant-administration/SKILL.md) |
| Narasi karya, kuratorial, laporan kegiatan | [Creative Documentation](.agents/skills/creative-documentation/SKILL.md) |
| Validitas bukti, jenis lampiran dan audit internal | [Evidence & Audit](.agents/skills/evidence-audit/SKILL.md) |
| Aturan menurut kategori, tahun, kontrak dan pengecualian | [Regulatory Applicability](.agents/skills/regulatory-applicability/SKILL.md) |
| Milestone, indikator, hasil digital dan arsip karya | [Creative Production](.agents/skills/creative-production/SKILL.md) |
| Pameran, publikasi, izin, Minecraft, pencatatan DJKI | [Dissemination & Rights](.agents/skills/dissemination-rights/SKILL.md) |

**Procurement** merupakan modul dalam [pengelolaan kebutuhan dan penyedia](kits/dana-indonesiana/procurement/CONTRACT.md), **bukan** agen kedelapan. [Skill Router](docs/skills/README.md) menentukan pemilik utama dan handoff jika tugas melintasi domain.

## Integrasi Google Drive — P0/P1 (implementasi read-only)

[Source Resolver + Document Registry](docs/integrations/google-drive.md) menghubungkan kode GitHub dengan indeks privat Google Drive berdasarkan ID dan versi metadata, tanpa menyimpan berkas proyek asli di Git. CLI memerlukan OAuth token lokal read-only dan **belum diuji sebagai workflow end-to-end**; penggunaan dokumen dan bukti tetap tunduk pada izin proyek.

## Status kemampuan

- **Pedoman:** tujuh skill dengan kontrak rinci dan template, belum dinyatakan lulus uji penggunaan nyata.
- **Finance prototype:** [perhitungan JSON](tools/finance-report.mjs) dan [ekspor XLSX dua lembar](tools/export-finance-xlsx.py). Hasil berstatus **DRAFT**, bukan laporan resmi yang telah diperiksa atau diterima e-RISPRO; lihat [runbook](kits/dana-indonesiana/finance/EXCEL-OUTPUT.md).
- **Tidak tersedia:** penyaluran bank, penetapan pajak otomatis, approval PMO/LPDP, pengiriman e-RISPRO, pengujian karya otomatis, sertifikasi kepatuhan.
- **Fase sekarang:** penyederhanaan arsitektur dokumentasi. Pengguna menunda QA sampai fase pengembangan dinyatakan cukup.

## Mulai bekerja

1. Baca [AGENTS.md](AGENTS.md) untuk mode, keselamatan dan aturan kerja.
2. Gunakan [Skill Router](docs/skills/README.md) untuk memilih **satu skill primer**. Baca referensi domain lain hanya jika tugas memerlukan.
3. Gunakan sumber proyek yang **diizinkan**, tandai versi serta ketentuan yang berlaku, hasilkan draf yang dapat ditelusuri, dan minta review manusia pada keputusan material.
4. Untuk perubahan repo, ikuti [GITHUB_RULES.md](GITHUB_RULES.md). Pengembangan rutin di `develop`; promosi ke `Local` lalu `main` memerlukan review yang benar-benar dilakukan.

## Referensi

[Documentation Index](docs/README.md) · [Module Ownership](docs/modules/README.md) · [Source Authority](docs/foundation/02-source-authority.md) · [Privacy](SECURITY.md) · [Current Context](CONTEXT.md) · [Development Plan](planning/development.md) · [History](CHANGELOG.md)

**Kriteria kerja:** hasil yang berguna, bahasa Indonesia alami dan akurat, satu sumber fakta per domain, tidak membuat fitur atau dokumen kosong yang tidak diperlukan.
