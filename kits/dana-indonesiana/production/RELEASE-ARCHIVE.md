# Release and Digital Preservation

Prinsip referensi: [UNESCO Digital Heritage Charter](https://www.unesco.org/en/legal-affairs/charter-preservation-digital-heritage). Bukan otomatis kewajiban kontrak pendanaan.

**Pisahkan:** (1) source editable, (2) build/export, (3) deployment server/website, (4) dokumentasi pemakaian dan dependensi, (5) paket arsip terpilih. Tidak semua materi boleh didistribusikan karena hak pihak ketiga atau privasi.

## Jalur rilis

1. Tentukan rilis internal, demo, publik, terbatas atau arsip menurut kebutuhan yang sah.
2. Catat versi/edition/platform, artefak yang tersedia, dependensi, cara instalasi dan pemulihan, tanpa credential.
3. Minta [Rights](../rights/CONTRACT.md) menilai lisensi karya seni, suara, merek, atribusi pendanaan, dan [Minecraft Usage Guidelines](https://www.minecraft.net/en-us/usage-guidelines). Penggunaan edukatif tidak otomatis memberi izin penggunaan merek atau promosi bagi organisasi.
4. Bedakan `PLANNED`, `READY_FOR_INTERNAL_REVIEW`, `PUBLISHED_WITH_EVIDENCE`, `ARCHIVED`. Tidak menciptakan bukti publikasi.
5. Siapkan catatan penyimpanan, backup, biaya hosting/akses jangka panjang bila relevan; pemeriksaan restore yang belum dilakukan → `NOT_EXECUTED`.
6. Kaitkan bukti rilis ke indikator, bukan mengarang statistik pengunjung.

Checksum menunjukkan kesamaan byte terhadap snapshot, bukan autentisitas pencipta atau izin. Hindari registry tambahan yang tidak menyelesaikan kegagalan konkret.

[Template manifest](../../../templates/production/release-manifest.md) dipakai hanya untuk paket nyata; jangan unggah source proprietary atau data pengguna ke GitHub publik.

## Gating rilis dan izin v0.9

Sebelum pengumuman atau distribusi rilis, panggil [Rights Clearance](../rights/RIGHTS-CLEARANCE.md), [Minecraft Platform](../rights/MINECRAFT-PLATFORM.md), dan [Branding & Publication](../rights/BRANDING-PUBLICATION.md) hanya untuk bagian yang relevan. Tidak ada rilis otomatis karena manifest telah lengkap. `PUBLISHED_WITH_EVIDENCE` memerlukan sumber publikasi aktual.
