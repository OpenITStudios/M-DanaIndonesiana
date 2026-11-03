# M-DanaIndonesiana

**Sistem pedoman modular dan prototipe pelaporan pendanaan kebudayaan.**

Repository ini menyiapkan aturan kerja, struktur pengetahuan, prosedur produksi karya, pencatatan administrasi-keuangan, dan batas pembuktian untuk proyek Dana Indonesiana periode 2025–2026. **Belum ada data perjanjian, RAB, indikator, atau profil skema pendanaan proyek yang ditetapkan di repository ini.**

## Status saat ini

- Tahap: **Skill System v0.5.1 di `develop`** — tujuh skill, kalkulator JSON deterministik, dan ekspor XLSX draf dua lembar; belum ada aplikasi produksi, integrasi e-RISPRO, kalkulator pajak, atau pengesahan otomatis.
- RAB, indikator, aturan keberlakuan, termin, dan identitas proyek **tidak dipersistenkan dalam repo publik**; pemeriksaan spesifik menggunakan sumber yang diizinkan.
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

## Finance reporting v0.3

Kalkulator draft JSON dan uji sintetis tersedia di [Finance Validation Runbook](kits/dana-indonesiana/finance/VALIDATION-RUNBOOK.md); tanpa menyimpan kontrak, RAB privat, atau bukti proyek di GitHub publik.

## Finance Excel v0.4

[Excel Output Contract](kits/dana-indonesiana/finance/EXCEL-OUTPUT.md) mendokumentasikan ekspor dua sheet LRA dan Arus Kas dari JSON draft (menggunakan Python artifact_tool). Hanya untuk data yang diizinkan, bukan integrasi bank/e-RISPRO ataupun laporan resmi yang sudah disahkan.

## Koreksi invoice v0.5.1

`invoiced_period` hanya total invoice dalam satu periode; tidak membuktikan invoice belum dilunasi. Status pelunasan membutuhkan pencocokan dengan pembayaran dan bukti yang sah.


## Pelaporan administrasi dan tulisan karya v0.6

- [Alur paket administratif](kits/dana-indonesiana/administration/PACKAGE-WORKFLOW.md): checklist pencairan/kemajuan/penutupan berbasis sumber, bukan contoh universal.
- [Kendali dokumen](kits/dana-indonesiana/administration/DOCUMENT-CONTROL.md): fungsi, versi dan status internal/eksternal dipisahkan.
- [Editorial Workflow](kits/dana-indonesiana/writing/EDITORIAL-WORKFLOW.md): tulisan Indonesia natural, spesifik, dan berdasarkan fakta.
- [Struktur Laporan Karya](kits/dana-indonesiana/writing/REPORTING-STRUCTURES.md): narasi indikator publik/nonpublik, kemajuan dan kuratorial.
- [Template kosong pelaporan](templates/reporting/administrative-package.md): draft administrasi, indikator, narasi karya dan revisi.

Dokumen proyek rahasia tidak dimasukkan ke repo; pengujian sengaja ditunda pada fase ini. Prosedur belum membuktikan status penerimaan e-RISPRO atau kesesuaian dokumen secara hukum.


## Evidence & Procurement v0.7

- [Audit bukti berdasarkan klaim](kits/dana-indonesiana/evidence/CLAIM-TO-EVIDENCE.md): bedakan keberadaan dokumen, kesesuaian, substansi dan persetujuan.
- [Persyaratan bukti per jenis belanja](kits/dana-indonesiana/evidence/EXPENDITURE-EVIDENCE.md): rujukan pedoman 2025 dengan batas keberlakuan.
- [Manajemen pengadaan dan jasa](kits/dana-indonesiana/procurement/CONTRACT.md): kebutuhan → pembanding → kontrak → serah-terima → pembayaran.
- [Pembanding harga](kits/dana-indonesiana/procurement/PRICE-COMPARISON.md): bandingkan scope, sumber dan keterbatasan harga tanpa mengarang penawaran.
- Template kosong tersedia untuk [telaah bukti](templates/evidence/evidence-review.md), [permintaan pengadaan](templates/procurement/requirement-and-selection.md), [perbandingan harga](templates/procurement/price-comparison.md), dan [penerimaan hasil](templates/procurement/deliverable-acceptance.md).

Tetap tujuh skill; procurement adalah **modul prosedural**, bukan agen kedelapan. Tidak ada tes/QA yang dijalankan pada fase pengembangan ini. Semua dokumen proyek privat tetap di luar Git.

## Creative Production v0.8

Terdapat lima kontrak produksi di [Production Workflow](kits/dana-indonesiana/production/WORKFLOW.md), mencakup indikator, kuratorial, serah-terima digital dan preservasi. Template kosong hanya digunakan saat diperlukan. **Tes dan QA ditunda.**
