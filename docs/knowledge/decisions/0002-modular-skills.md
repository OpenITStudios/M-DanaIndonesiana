---
id: decision.0002-modular-skills
authority: CANONICAL
status: ACTIVE
date: 2026-11-03
---

# Decision 0002 — Tujuh Skill, Satu Sumber Fakta

## Alasan

Produksi karya, pembukuan, pelaporan, dan penelitian aturan memerlukan cara berpikir berbeda. Memusatkan semua dalam satu agen menimbulkan risiko angka, narasi, dan status persetujuan divergen.

## Keputusan

- Tujuh `.agents/skills` sebagai spesialis dengan aktivasi berdasar tujuan, didukung tujuh kontrak domain di `kits/dana-indonesiana`.
- Satu [shared contract](../../../kits/dana-indonesiana/OPERATING-CONTRACT.md) mengendalikan privasi, sumber, status, dan handoff.
- Satu pemilik fakta per domain. Tidak ada database/agent/registry baru hanya untuk membuat struktur seragam.
- Skill dinyatakan sebagai **instruksi kerja**, bukan alat yang sudah menjalankan integrasi finansial atau submission.
- Hanya instruksi umum, referensi publik dan skenario sintetis masuk repository. Rincian data penerima tidak dipersistenkan.
- Penulisan manusiawi diartikan sebagai naskah alami, spesifik dan terverifikasi—bukan pemalsuan pengalaman.

## Keputusan yang ditunda

Pembuatan aplikasi, sistem pajak otomatis, upload e-RISPRO, dashboard finansial, dan validator runtime. Evaluasi hanya ketika ada kebutuhan konkret dan dataset sintetis untuk uji.
