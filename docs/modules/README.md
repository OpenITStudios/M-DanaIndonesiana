# Module Ownership — Satu Pemilik Fakta

**Tujuh skill AI, bukan sembilan aplikasi.** Domain bisnis boleh mencakup subproses seperti pengadaan dan kontrak; masing-masing tetap mempunyai **pemilik keputusan/fakta utama**. Modul lain mengonsumsi hasil, tidak membuat baseline paralel.

| Fakta atau keputusan | Owner utama | Pengguna atau pendukung | Batas |
|---|---|---|---|
| Keberlakuan aturan, kategori, tahun | [Regulatory](../../kits/dana-indonesiana/regulatory/CONTRACT.md) | semua skill | `APPLICABLE` bukan sertifikat kepatuhan |
| Perjanjian, addendum, versi pengajuan, termin dan status portal | [Administration](../../kits/dana-indonesiana/administration/CONTRACT.md) | Regulatory, Finance | tidak menciptakan keputusan PMO/LPDP |
| Pagu dan RAB disetujui (sebagai dokumen sumber) | Administration menjaga versi; [Finance](../../kits/dana-indonesiana/finance/CONTRACT.md) memodelkan angka | Production, Procurement | draf RAB tidak mengganti baseline sah |
| Kas, tagihan, pembayaran, LRA, rekonsiliasi | Finance | Evidence, Administration, Writing | rencana/invoice bukan bukti dana dibayar |
| Asal dan kecukupan bukti, temuan audit | [Evidence](../../kits/dana-indonesiana/evidence/CONTRACT.md) | semua skill | bukti tersedia tidak sama dengan autentik/terima |
| Kebutuhan, pembanding dan serah terima vendor | [Procurement](../../kits/dana-indonesiana/procurement/CONTRACT.md) sebagai **modul pendukung** | Administration, Finance, Evidence | bukan skill kedelapan dan bukan izin belanja |
| Aktivitas, hasil digital, milestone dan progres internal | [Production](../../kits/dana-indonesiana/production/CONTRACT.md) | Evidence, Writing | progres tugas bukan capaian indikator resmi |
| Naskah kuratorial, laporan dan publikasi sebagai tulisan | [Writing](../../kits/dana-indonesiana/writing/CONTRACT.md) | Production, Finance, Evidence | redaksi tidak membuat angka atau aktivitas baru |
| Lisensi, logo, kegiatan publik dan pencatatan ciptaan | [Rights](../../kits/dana-indonesiana/rights/CONTRACT.md) | Writing, Production, Administration | izin material tidak otomatis berasal dari hibah |

## Aturan integrasi

```text
sumber dan keputusan resmi
  → baseline dan kewajiban yang berlaku
  → ACT / IND / RAB / TXN / EVD sesuai owner
  → pemeriksaan dengan batas yang dijelaskan
  → laporan turunan untuk peninjauan manusia
  → receipt/keputusan eksternal bila bukti ada
```

Gunakan [Traceability](../foundation/04-traceability.md) untuk identitas data, [Source Authority](../foundation/02-source-authority.md) untuk aturan, dan [Proof & Approval](../foundation/03-proof-and-approval.md) untuk status.

**Perluasan:** tambahkan modul/alat hanya jika pekerjaan nyata tidak dapat diselesaikan oleh pemilik yang ada. Tidak perlu engine procurement, portal pengajuan, database hukum, atau katalog museum baru sebelum ada kebutuhan konkret.
