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
