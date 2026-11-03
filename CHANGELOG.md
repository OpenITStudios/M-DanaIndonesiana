# Changelog

## 0.1.0 — 2026-11-03 (foundation)

- Membuat repository sebagai sistem pedoman reusable, bukan penyimpanan data proyek.
- Menetapkan router kerja, batas sumber otoritatif, approval, keamanan, dan status pembuktian.
- Mendefinisikan kontrak antarmodul dan hubungan karya–RAB–transaksi–bukti–laporan.
- Menyediakan template kosong untuk intake, keputusan, dan daftar bukti.
- Menyimpan rujukan administrasi awal sebagai **kandidat**, bukan ketentuan proyek yang sudah disetujui.

Tidak ada engine, UI, integrasi e-RISPRO, kalkulator pajak, maupun klaim kelulusan audit pada tahap ini.

## 0.2.0 — 2026-11-03

- Tujuh skill modular untuk finance, administrasi, writing, evidence, regulatory, production, dissemination.
- Kontrak sumber tunggal, privasi, gaya alami dan skenario uji sintetis.
- Belum ada eksekusi runtime, integrasi e-RISPRO, atau hasil audit kepatuhan yang diklaim PASS.

## 0.3.0 — 2026-11-03

- Finance deterministic projection (BigInt IDR, LRA, arus kas, selisih dan gap).
- Synthetic test fixture and Node regression suite; JSON only.
- Finance handoff ke administrasi dan narasi diperjelas.
- Belum ada export Excel, pajak otomatis atau submission eksternal.

## 0.4.0 — 2026-11-03

- Menambah exporter Excel draft LRA/Arus Kas dengan 16/11 kolom rujukan LPDP 2025.
- Menolak laporan yang tidak konsisten dan mengosongkan data yang belum diketahui.
- Menambah tes sintetis artifact_tool, menjaga tidak ada data privat di repo.
- Bukan template pemerintah resmi, bukan penentuan pajak/approval e-RISPRO.

 ## 0.5.0 — 2026-11-03

 - Bawa rincian RAB yang tersedia ke LRA, tanpa mengarang kolom kosong.
 - Tampilkan selisih perkalian rincian dan pagu sebagai temuan, bukan koreksi diam-diam.
 - Bawa metadata transaksi ke Arus Kas dan buat handoff berlabel DRAFT untuk administrasi dan penulisan.
 - Tambahkan regresi sintetis untuk metadata serta batas klaim.

## 0.5.1 — 2026-11-03

- Koreksi arti nilai invoice: tercatat tidak berarti belum dilunasi.
- Bump schema ke `v0.5-json` agar perubahan semantik eksplisit.
- Perbarui dokumentasi status dan konvensi data privat.


## 0.6.0 — 2026-11-03 (reporting workflow development)

- Pendalaman `grant-administration`: paket dokumen, kesiapan pencairan, perubahan dan document control.
- Pendalaman `creative-documentation`: editorial workflow, struktur laporan dan kualitas narasi natural.
- Empat template kosong, satu peta pelaporan lintas skill, dan keputusan arsitektur.
- Tetap tujuh skill; tidak ada agen atau database baru.
- Tidak ada tes yang dijalankan pada tahap ini; tidak ada dokumen privat yang direplikasi.


## 0.7.0 — 2026-11-03 (evidence & procurement guidance)

- Memperluas Evidence & Audit melalui Claim-to-Evidence dan rujukan bukti pengeluaran.
- Menambahkan domain Procurement sebagai modul logis (tanpa skill/agen ke-8), termasuk Price Comparison dan serah terima.
- Menyediakan empat template kosong untuk bukti, pengadaan, pembanding, dan penerimaan hasil.
- Membedakan aturan LPDP dan rujukan metode LKPP berdasarkan ruang lingkup serta keberlakuan.
- Tidak menjalankan tes, tidak menambah fitur runtime, tidak mengunggah data proyek rahasia.

## 0.8.0 — 2026-11-03

- Creative Production memperoleh lima kontrak domain, empat template dan keputusan desain.
- Tidak menambah skill/agen, database museum, atau integrasi eksternal.
- Data privat tidak disalin, tes tidak dijalankan.

## 0.9.0 — 2026-11-03 (dissemination & rights)

- Lima kontrak rights: kegiatan publik, izin karya, platform Minecraft, branding pendanaan dan DJKI.
- Empat template kosong untuk kegiatan, matriks lisensi, review publikasi, dan pencatatan ciptaan.
- Memisahkan hak cipta otomatis, pemegang hak, surat pencatatan serta izin pihak ketiga.
- Menambahkan pemeriksaan risiko promosi oleh organisasi melalui Minecraft tanpa menyatakan izin otomatis.
- Tetap tujuh skill; tidak ada data rahasia, uji runtime, QA, atau pengiriman eksternal.
