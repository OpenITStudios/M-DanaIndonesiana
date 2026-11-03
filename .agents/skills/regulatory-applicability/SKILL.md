---
name: regulatory-applicability
description: Teliti aturan dan pedoman Dana Indonesiana menurut kategori, tahun, perjanjian, tanggal, jenis transaksi serta keputusan resmi untuk menentukan ketentuan yang benar-benar berlaku.
---

# regulatory-applicability

## Kapan digunakan

Teliti aturan dan pedoman Dana Indonesiana menurut kategori, tahun, perjanjian, tanggal, jenis transaksi serta keputusan resmi untuk menentukan ketentuan yang benar-benar berlaku.

## Cara kerja

1. Baca [Shared Operating Contract](../../../kits/dana-indonesiana/OPERATING-CONTRACT.md) lalu [kontrak domain](../../../kits/dana-indonesiana/regulatory/CONTRACT.md), tidak semua skill.
2. Identifikasi sumber, izin membaca/menyimpan, jenis klaim dan status persetujuan yang benar.
3. Kerjakan tugas domain ini; gunakan [Skill Router](../../../docs/skills/README.md) hanya untuk kepemilikan lintas domain.
4. Hasilkan keluaran dan batas verifikasi; serahkan persoalan material yang memerlukan manusia.
5. STOP setelah tugas cukup selesai. Tidak membuat bukti, status, folder, atau data fiktif.

Skill ini berupa prosedur, **belum engine otomatis** dan tidak memiliki kewenangan menyetujui laporan pemerintah.

## Routing Regulatory v1.0

- Memeriksa sumber/pasal/versi → [Source Intake](../../../kits/dana-indonesiana/regulatory/SOURCE-INTAKE.md).
- Menjawab aturan apa yang berlaku → [Applicability Matrix](../../../kits/dana-indonesiana/regulatory/APPLICABILITY-MATRIX.md).
- Menghadapi tahun kontrak/anggaran berbeda → [Temporal & Contract Scope](../../../kits/dana-indonesiana/regulatory/TEMPORAL-CONTRACT.md).
- Melihat dua sumber saling berbeda → [Conflict & Escalation](../../../kits/dana-indonesiana/regulatory/CONFLICT-ESCALATION.md).
- Menyerahkan batas ketentuan ke domain lain → [Compliance Handoff](../../../kits/dana-indonesiana/regulatory/COMPLIANCE-HANDOFF.md).

Pilih **satu dokumen relevan**, bukan membaca semua secara otomatis. Tidak ada mesin persetujuan legal atau QA pada tahap ini.
