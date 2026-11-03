# Development Intent (system, not project execution)

## Foundation v0.1

- [x] Mendefinisikan cakupan dan batas produk.
- [x] Menentukan work modes, ownership, source authority, privacy dan proof boundaries.
- [x] Menyediakan workflow, module boundaries dan template kosong.
- [x] Membedakan penemuan regulasi dari aturan yang benar-benar berlaku.

Item checklist di atas berarti **dokumen didesain**, bukan status CI atau implementasi runtime.

## Langkah berikutnya — tergantung masukan proyek

1. Pemilik menjelaskan kategori pendanaan, jenis karya, kebutuhan administrasi, dan sumber kontrak/RAB/indikator yang tersedia.
2. Lakukan intake di storage privat, buat applicability matrix dan daftar konflik yang perlu klarifikasi.
3. Tetapkan model data dan prioritas modul berdasarkan data sebenarnya; baru pertimbangkan alat impor, pemeriksaan, dan generator laporan.
4. Untuk setiap implementasi, definisikan metrik sukses dan proof yang bisa benar-benar dijalankan.

Jangan mengubah catatan ini menjadi jadwal otomatis, komitmen fitur, atau otorisasi mengerjakan backlog tanpa perintah pengguna. Riwayat Git dan sumber aktif menjadi rujukan progres implementasi.

## v0.2 — Skill design

- [x] Tujuh skill dan kontrak domain dengan input/output/gates.
- [x] Router, batas kerahasiaan, natural writing, contoh uji sintetis.
- [ ] Uji perilaku pada dataset sintetis (belum dieksekusi).
- [ ] Helper kalkulasi deterministik dan export LRA/arus kas bila diminta setelah validasi kebutuhan.

## Finance prototype v0.3

- [x] Proyeksi JSON deterministik LRA dan arus kas, tanpa Excel/portal.
- [x] Fixture dan pengujian sintetis dibuat.
- [ ] Jalankan pengujian pada Node runtime dan catat hasilnya sesuai bukti.
- [ ] Periksa perilaku admin dan penulisan secara manual dengan data sintetis.
- [ ] Pertimbangkan Excel resmi hanya sesudah sumber format dan model data disetujui.

## Finance export v0.4

- [x] Ekspor draft XLSX dengan dua sheet LRA dan Arus Kas sesuai susunan kolom pedoman 2025.
- [x] Kontrak data hilang, rumus sisa/saldo, penolakan laporan inkonsisten.
- [x] Tes sintetis Python untuk artefak Excel tersedia; hasil eksekusi harus dilaporkan sesuai runtime sebenarnya.
- [ ] Melengkapi metadata RAB resmi (satuan, volume, harga, data dukung) melalui input yang disetujui.
- [ ] Review manual ekspor terhadap berkas contoh resmi yang masih mengandung sample, tanpa menyalinnya.
- [ ] Uji kesiapan administrasi dan gaya naratif berdasarkan sumber yang berwenang.

 ## Finance detail & cross-skill v0.5

 - [x] Metadata volume, satuan, spesifikasi, kategori dan data dukung masuk pipeline JSON dan Excel ketika disediakan.
 - [x] Pemeriksaan perbedaan perkalian rincian dengan pagu disediakan tanpa auto-revisi.
 - [x] Handoff JSON finance → administration/writing mempertahankan status DRAFT.
 - [ ] Uji pada Node dan artifact_tool dari checkout hasil commit; pemeriksaan V8 terpisah tidak menggantikan kedua runtime tersebut.
 - [ ] Uji penerimaan manusia atas layout Excel dan kualitas naskah laporan sintetis.
