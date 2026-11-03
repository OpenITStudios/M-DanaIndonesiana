# Standar Mutu Visual — Template Google-native

**Scope:** template **internal** pada proyek M-DanaIndonesiana (Google Docs / Google Sheets / Google Slides), bukan formulir resmi pemerintah. Untuk template resmi, bentuk, bagian wajib dan atribut lembaga mengikuti sumber yang terbukti berlaku. Jangan mengganti format resmi dengan style internal.

## Prinsip desain

1. **Baca sebagai dokumen kerja, bukan hasil chat.** Judul menunjukkan tujuan, label menjelaskan isi, tabel dipakai ketika lebih efektif, dan struktur mengikuti kebutuhan pembaca.
2. **Satu hirarki visual.** Gunakan satu keluarga font, ukuran/bobot konsisten, cukup whitespace, dan hanya 1 warna aksen. Jangan membuat semua heading berukuran besar, penuh huruf kapital, atau tabel dengan border hitam tebal.
3. **Hanya konten yang berguna.** Hindari basa-basi/generik, klaim dampak tanpa sumber, paragraf instruksi AI, slogan, judul kosong, daftar tanpa data, dan penambahan subbab karena mengikuti pola template umum. Instruksi pembuat seharusnya berada di dokumen sistem, bukan di badan laporan final.
4. **Struktur native.** Gunakan heading Google Docs, tabel Google Docs, tabel/formula Google Sheets, bukan screenshot tabel atau teks dengan banyak spasi agar terlihat seperti kolom.
5. **Template tetap dapat dipakai berulang.** Placeholder harus persis sama dengan katalog dan jumlahnya benar. Teks pengganti tidak boleh mewarisi format monospace/warna mencolok dari token. Master tidak ditimpa oleh laporan pengguna.
6. **Bukti dan status tidak dibuat-buat.** Tidak ada stempel, nomor surat, nama peninjau, tanda tangan, logo instansi, tanggal acara, nominal, foto, atau status approval tanpa sumber/izin yang benar.

## Design profile saat ini: INTERNAL_REPORT_A4_V1

Profil berikut menjadi **baseline visual** laporan internal baru; ini bukan hukum wajib bagi semua jenis dokumen.

| Elemen | Baseline |
|---|---|
| Halaman | A4 portrait, margin sekitar 54–59 pt |
| Font | Arial / satu font sans-serif yang aman untuk Google Docs |
| Judul dokumen | 20–22 pt, bold, navy gelap |
| Heading utama | 12–14 pt, bold; jarak atas sekitar 12–16 pt |
| Label | 9–10 pt, bold, biru keabu-abuan |
| Teks isi dan placeholder | 10–11 pt, gelap; line spacing sekitar 118–124% |
| Caption/catatan | 8–9 pt, muted |
| Tabel metadata | 2 kolom bila perlu, label lebih sempit, warna latar label sangat pucat, border 0.4–0.6 pt |
| Aksen | Navy #1B3043, teal-biru #286580, garis #D7E1E7; tanpa ornamen yang tidak punya fungsi |
| Status | DRAF dan cakupan internal jelas tetapi tidak mendominasi |

Google Sheets membutuhkan profil berbeda: area data jelas, pemisahan input/formula, judul kolom singkat, angka dengan format lokal benar, subtotal konsisten, lebar kolom cukup, freeze/filter bila relevan, dan tidak menggunakan kartu/dashboard dekoratif untuk tabel administrasi. Untuk Slides, gunakan pola presentasi yang tersendiri.

## Quality gate wajib sebelum master diberi READY (internal)

| Pemeriksaan | Metode yang harus **benar-benar** dilakukan |
|---|---|
| STRUCTURE | Baca dokumen native; heading semantik, tabel nyata, section dan field sesuai katalognya |
| PLACEHOLDERS | Setiap token katalog tepat sekali, tidak ada token liar/duplikat; jangan menyisipkan data contoh sebagai fakta |
| TYPOGRAPHY | Satu keluarga font, ritme judul/label/body konsisten, warna aksen hemat |
| LAYOUT | Ekspor Google Docs ke PDF **untuk inspeksi visual saja**, render seluruh halaman, cek teks terpotong, tabel pecah, overlap, orphan heading, margin dan jarak tidak wajar |
| CONTENT | Redaksi tidak generik, field sesuai pekerjaan, klaim sumber/status tidak menyesatkan |
| STORAGE & VERSION | File tetap native Google Drive, master di folder privat, metadata terakhir dicatat pada tab Registry **yang sama** |
| LIMITATION | Master yang baik tidak membuktikan hasil salin-isi akan tetap rapi; setiap **hasil berisi data** perlu QA ulang, terutama nilai panjang, paragraf, dan page break |

**Tolak master** bila salah satu: template dominan ornamen, status tidak jelas, token terduplikasi, tabel direka dengan spasi, border terlalu tebal, instruksi internal panjang ikut dicetak, pengisian panjang meluber, atau bukti visual belum diperiksa tetapi diklaim selesai.

## Master 01 — catatan review yang dilaksanakan

- **Template:** \`di.report.indicator@1.0.0\` (Google Docs INTERNAL).
- **Perbaikan:** judul lebih ringkas, empat section kecil, tabel metadata native 3×2, garis tipis, warna muted, instruksi berlebihan dihapus.
- **Pemeriksaan aktual pada revisi ini:** body Docs dibaca ulang; 9 placeholder katalog ditemukan tepat sekali, 4 heading, tabel 3×2; ekspor PDF A4 dirender dan **satu halaman** diperiksa secara visual tanpa clipping/overlap; parent, MIME dan modifiedTime di Drive cocok dengan tab \`Template Masters\` setelah diperbarui.
- **Batas:** belum dilakukan uji copy-and-fill dokumen berisi paragraf panjang; belum mengecek kepatuhan formulir resmi, isi laporan nyata, dan izin khusus untuk editor master.

## Alur untuk master berikutnya

Susun fungsi dokumen → rancang struktur → buat satu Google-native master → baca native → render PDF/cek visual → perbaiki → cek placeholder → catat versi dan timestamp pada Registry → baru sebut \`READY\` internal. Jangan membuat semua master secara massal atau menganggap satu contoh desain sesuai untuk Docs, Sheets, dan Slides.
