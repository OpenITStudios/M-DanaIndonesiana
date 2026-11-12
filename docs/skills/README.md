# Skill Router — Pilih Satu Pemilik Utama

**Cara pakai:** ikuti [Root Agent Rules](../../AGENTS.md), lalu tentukan hasil yang diminta, bukan topik besar. Pilih satu skill primer → baca [Shared Operating Contract](../../kits/dana-indonesiana/OPERATING-CONTRACT.md) → kontrak domain → prosedur rinci **hanya jika perlu**. Skill lain dipanggil untuk data yang benar-benar dibutuhkan, bukan dijalankan semua.

| Saya ingin… | Skill primer | Owner rinci |
|---|---|---|
| menghitung realisasi RAB, arus kas, rekonsiliasi | [finance-reporting](../../.agents/skills/finance-reporting/SKILL.md) | [Finance](../../kits/dana-indonesiana/finance/CONTRACT.md) |
| menyiapkan berkas pencairan, perubahan, surat, status e-RISPRO | [grant-administration](../../.agents/skills/grant-administration/SKILL.md) | [Administration](../../kits/dana-indonesiana/administration/CONTRACT.md) |
| menulis narasi karya, kuratorial, laporan kegiatan atau publikasi | [creative-documentation](../../.agents/skills/creative-documentation/SKILL.md) | [Writing](../../kits/dana-indonesiana/writing/CONTRACT.md) |
| memeriksa bukti dan menemukan kelengkapan/kontradiksi | [evidence-audit](../../.agents/skills/evidence-audit/SKILL.md) | [Evidence](../../kits/dana-indonesiana/evidence/CONTRACT.md) |
| menentukan aturan, tahun dan perjanjian yang berlaku | [regulatory-applicability](../../.agents/skills/regulatory-applicability/SKILL.md) | [Regulatory](../../kits/dana-indonesiana/regulatory/CONTRACT.md) |
| mengelola hasil karya, milestone, indikator dan handoff digital | [creative-production](../../.agents/skills/creative-production/SKILL.md) | [Production](../../kits/dana-indonesiana/production/CONTRACT.md) |
| memeriksa acara, izin reproduksi, logo, Minecraft, DJKI | [dissemination-rights](../../.agents/skills/dissemination-rights/SKILL.md) | [Rights](../../kits/dana-indonesiana/rights/CONTRACT.md) |

**Procurement** adalah [modul](../../kits/dana-indonesiana/procurement/CONTRACT.md) yang digunakan oleh Administration, Finance atau Evidence, **bukan skill kedelapan**.

**Sumber dari Google Drive:** untuk dokumen proyek yang telah diizinkan, baca [P2 Workflow Bridge](../integrations/google-drive.md). Resolver memilih *source pointers*, bukan menjalankan otomatis tujuh skill atau memverifikasi isi/approval.


## Pilih berdasarkan hasil akhir, bukan kata kunci

| Deliverable diminta | Skill primer | Pendukung bila perlu | Batas kesimpulan |
|---|---|---|---|
| Analisis RAB, LRA, cash | Finance | Evidence untuk bukti; Admin untuk format dan baseline sah | perhitungan bukan pembayaran |
| Paket pencairan, revisi, submit readiness | Administration | Regulatory untuk syarat; Finance untuk angka; Evidence untuk lampiran | paket bukan bukti terkirim |
| Narasi kemajuan kegiatan/karya | Writing | Production untuk capaian; Evidence untuk klaim | redaksi tidak menciptakan fakta |
| Pemeriksaan kuitansi dan bukti | Evidence | Finance untuk transaksi; Regulatory untuk aturan bukti | berkas ada tidak berarti sah |
| Berlaku tidaknya klausul/juknis | Regulatory | Admin memasok perjanjian atau addendum | sumber baru belum tentu berlaku |
| Milestone, indikator dan produksi | Production | Evidence jika capaian diklaim; Rights untuk rilis | task selesai bukan indikator tercapai |
| Lisensi, publikasi dan DJKI | Rights | Production aset, Admin syarat dokumen | karya ada bukan izin publikasi |

**Trigger pendukung:** satu ketidakpastian material teridentifikasi; pendukung memiliki fakta tersebut; hasilnya diperlukan untuk deliverable. Jika tidak, jangan memuat skill tambahan. Audit repository/Agent Rules tetap mode source, bukan domain skill.

## Ketika tugas melintasi domain

| Hasil yang diminta | Pemilik hasil | Input pendukung bila benar-benar perlu |
|---|---|---|
| Laporan penggunaan dana | Finance | Evidence memeriksa bukti; Administration memastikan format dan pengajuan |
| Laporan kemajuan karya | Writing | Production memasok capaian, Evidence memeriksa dukungan, Administration memastikan format |
| Audit kelengkapan pencairan | Administration | Regulatory untuk syarat berlaku; Finance untuk angka; Evidence untuk dokumen |
| Pemilihan vendor | Administration dengan modul Procurement | Regulatory izin/ambang; Finance pagu; Evidence bukti |
| Penayangan karya ke publik | Rights | Production artefak, Writing materi publikasi, Administration kewajiban program |
| Konflik perjanjian dan pedoman | Regulatory | Administration menyediakan versi/keputusan yang ada |

Rute lengkap hanya ketika dibutuhkan: [Cross-Skill Workflows](cross-skill-workflows.md) atau [Reporting Workflow](reporting-workflow.md).

## Metode engineering agent (kondisional)

[Agent Rules](agent-rules.md) mengatur prompt dan konteks kerja tanpa menjadi skill kedelapan; [Agent Quality Evaluation](agent-quality-evals.md) adalah rencana pemeriksaan yang belum berarti kualitas perilaku model telah diuji. Jangan memanggil semuanya untuk tugas domain yang sudah jelas.

## Prinsip singkat

- [Source Authority](../foundation/02-source-authority.md) menentukan sumber yang berlaku; bukan skill yang kebetulan menemukan aturan.
- [Proof & Approval](../foundation/03-proof-and-approval.md) membedakan pemeriksaan, pengajuan dan persetujuan resmi.
- [Module Ownership](../modules/README.md) menetapkan pemilik fakta. Jangan mengulang hitungan atau menulis ulang aturan pada tiap handoff.
- Keluaran [DRAFT] tidak menjadi `SUBMITTED` atau `EXTERNAL_CONFIRMED` tanpa bukti.
- Dokumen dengan instruksi **"pelajari saja"** tidak dipersistenkan.
