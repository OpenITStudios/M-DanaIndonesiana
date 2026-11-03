# Skill Router — M-DanaIndonesiana v0.2

Skill adalah **spesialis kerja**, bukan tujuh agen yang wajib berjalan bersamaan. Semua memakai [Shared Contract](../../kits/dana-indonesiana/OPERATING-CONTRACT.md).

| Masalah utama | Skill | Kontrak rinci |
|---|---|---|
| Mengolah angka keuangan agar dapat direkonsiliasi, ditelusuri, dan diproyeksikan ke format laporan yang berlaku | [finance-reporting](../../.agents/skills/finance-reporting/SKILL.md) | [finance](../../kits/dana-indonesiana/finance/CONTRACT.md) |
| Menyusun dan mengendalikan paket administrasi menurut jenis kegiatan dan perjanjian aktual | [grant-administration](../../.agents/skills/grant-administration/SKILL.md) | [administration](../../kits/dana-indonesiana/administration/CONTRACT.md) |
| Menerjemahkan fakta kegiatan dan karya ke tulisan yang efektif, spesifik, wajar dibaca manusia, tanpa menciptakan pengalaman palsu | [creative-documentation](../../.agents/skills/creative-documentation/SKILL.md) | [writing](../../kits/dana-indonesiana/writing/CONTRACT.md) |
| Mengukur kekuatan dukungan bukti untuk suatu klaim, bukan mengesahkan kegiatan/pembayaran berdasarkan nama berkas | [evidence-audit](../../.agents/skills/evidence-audit/SKILL.md) | [evidence](../../kits/dana-indonesiana/evidence/CONTRACT.md) |
| Memutuskan applicability setiap aturan berdasarkan bukti, dengan sumber otoritas tetap di docs/foundation/02-source-authority | [regulatory-applicability](../../.agents/skills/regulatory-applicability/SKILL.md) | [regulatory](../../kits/dana-indonesiana/regulatory/CONTRACT.md) |
| Menjaga keterhubungan hasil pekerjaan yang benar-benar ada dengan indikator, jadwal dan bukti, tanpa membuat klaim kemajuan berlebihan | [creative-production](../../.agents/skills/creative-production/SKILL.md) | [production](../../kits/dana-indonesiana/production/CONTRACT.md) |
| Memastikan rencana publikasi dan distribusi karya memiliki bukti kegiatan, perizinan dan atribusi yang sesuai | [dissemination-rights](../../.agents/skills/dissemination-rights/SKILL.md) | [rights](../../kits/dana-indonesiana/rights/CONTRACT.md) |

## Keputusan rute

- Sumber aturan berlaku / versi → `regulatory-applicability`.
- Angka dan kas → `finance-reporting`.
- Berkas persetujuan, surat, status e-RISPRO → `grant-administration`.
- Redaksi kegiatan/karya → `creative-documentation`.
- Kekuatan bukti dan audit → `evidence-audit`.
- Hasil produksi, QA dan jadwal teknis → `creative-production`.
- Publikasi, logo, HKI, lisensi → `dissemination-rights`.

Jika satu tugas mempunyai beberapa bagian, pilih satu pemilik utama lalu alihkan hanya hasil yang diperlukan. Contoh: laporan kemajuan = production membuktikan capaian → evidence cek bukti → writing menyusun uraian → admin cocokkan formulir; **tanpa menciptakan progres resmi**.

## Dokumentasi terkait

- [Alur antarskill](cross-skill-workflows.md)
- [Referensi riset publik](reference-sources.md)
- [Skenario uji sintetis](../../tests/skills/ACCEPTANCE-CASES.md)
- [Keputusan arsitektur](../knowledge/decisions/0002-modular-skills.md)

Format `SKILL.md` mencontoh standar Agent Skills dan root spesialis `M-PRD-Creator`; detail besar ditaruh di kontrak domain untuk mengurangi konsumsi konteks.


## Aktivasi lanjutan v0.6

- **Administrasi lebih dalam:** `grant-administration` → [Package Workflow](../../kits/dana-indonesiana/administration/PACKAGE-WORKFLOW.md) dan [Document Control](../../kits/dana-indonesiana/administration/DOCUMENT-CONTROL.md).
- **Tulisan lebih dalam:** `creative-documentation` → [Editorial Workflow](../../kits/dana-indonesiana/writing/EDITORIAL-WORKFLOW.md) dan [Reporting Structures](../../kits/dana-indonesiana/writing/REPORTING-STRUCTURES.md).
- **Laporan lintas skill:** [Reporting Workflow](reporting-workflow.md). Jangan menyalin angka dan status dari interpretasi skill lain; ikuti owner.


## Aktivasi Evidence & Procurement v0.7

- Pertanyaan **apakah klaim X didukung bukti?** → [evidence-audit](../../.agents/skills/evidence-audit/SKILL.md), rinci pada [Claim-to-Evidence](../../kits/dana-indonesiana/evidence/CLAIM-TO-EVIDENCE.md).
- Pertanyaan **bukti apa untuk jenis biaya ini?** → Evidence + [Expenditure Evidence](../../kits/dana-indonesiana/evidence/EXPENDITURE-EVIDENCE.md); Regulatory hanya bila keberlakuan sumber belum pasti.
- Pertanyaan **bagaimana membandingkan vendor dan menerima pekerjaan?** → [Procurement Contract](../../kits/dana-indonesiana/procurement/CONTRACT.md), sebagai **modul**, bukan skill kedelapan. Untuk harga baca [Price Comparison](../../kits/dana-indonesiana/procurement/PRICE-COMPARISON.md).
- Permintaan hanya menyusun/menata dokumen → Administration; permintaan menghitung atau mengakui pembayaran → Finance; uji mutu karya digital → Production. Aktivasi skill lain hanya jika benar-benar diperlukan.

## Aktivasi Creative Production v0.8

Untuk tugas produksi, pilih satu owner: [Workflow](../../kits/dana-indonesiana/production/WORKFLOW.md) untuk pekerjaan, [Indicator Mapping](../../kits/dana-indonesiana/production/INDICATOR-MAPPING.md) untuk capaian, [Curatorial Records](../../kits/dana-indonesiana/production/CURATORIAL-RECORDS.md) untuk isi museum, [Digital Deliverables](../../kits/dana-indonesiana/production/DIGITAL-DELIVERABLES.md) untuk serah-terima, atau [Release & Archive](../../kits/dana-indonesiana/production/RELEASE-ARCHIVE.md) untuk distribusi/preservasi. Tidak perlu memanggil semua skill.

## Aktivasi Dissemination & Rights v0.9

Pilih satu prosedur pada `dissemination-rights` sesuai tugas, **bukan lima agen terpisah**: [Event](../../kits/dana-indonesiana/rights/EVENT-DISSEMINATION.md), [Rights](../../kits/dana-indonesiana/rights/RIGHTS-CLEARANCE.md), [Minecraft](../../kits/dana-indonesiana/rights/MINECRAFT-PLATFORM.md), [Branding](../../kits/dana-indonesiana/rights/BRANDING-PUBLICATION.md), atau [DJKI](../../kits/dana-indonesiana/rights/DJKI-RECORDATION.md). Izin pihak ketiga dan merek/platform tidak otomatis diberikan oleh status penerima pendanaan.
