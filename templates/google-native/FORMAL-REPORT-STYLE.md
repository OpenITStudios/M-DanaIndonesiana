# Profil Visual: Laporan Kerja Formal Indonesia (v1)

**Status:** profil desain **READY untuk template INTERNAL** setelah persetujuan pengguna dan perbaikan aturan italic. Ini bukan formulir resmi pemerintah atau pengganti bentuk yang diwajibkan dalam perjanjian/Juknis. Profil ini berlaku untuk `di.report.indicator@1.2.0` sebagai alternatif yang lebih mirip laporan kerja manusia; tidak dipaksakan pada naskah kuratorial, surat, spreadsheet atau presentasi.

## Masalah yang diperbaiki dari v1.1

Master terdahulu terasa seperti antarmuka/formulir AI karena judul berwarna dan eyebrow dekoratif, tabel identitas dengan sel berwarna, label kecil yang diulang, serta bagian/catatan yang tampil sebagai komponen visual terpisah. Pada pengisian normal, estetika itu tidak menyerupai laporan kerja yang biasa disusun staf.

## Aturan presentasi v1

| Komponen | Aturan |
|---|---|
| Media | Google Docs native, A4 portrait |
| Margin | Atas 67 pt; bawah 65 pt; kiri/kanan 71 pt |
| Font | Times New Roman konsisten (fallback font sistem apabila tidak tersedia) |
| Judul | "LAPORAN PELAKSANAAN KEGIATAN", 15 pt bold, centered |
| Teks isi | 11,5 pt, hitam nyaris pekat; line spacing 126%; jarak setelah paragraf ±7–8 pt |
| Heading bagian | 11,75 pt bold, semantik `HEADING_1`, bernomor 1–4 |
| Subjudul tingkat dua | 11,5 pt **bold tegak**, Google Docs `HEADING_2`; tanpa italic atau latar berwarna |
| Identitas | Tiga baris teks biasa (Kegiatan, Periode, Indikator), label tebal; **tanpa tabel dekoratif** |
| Status | Satu baris kecil **tegak** di kanan atas: draf internal; tidak menjadi judul utama |
| Warna | Monokrom: #202020 untuk isi; abu #595959 untuk status |
| Halaman | Jangan paksa satu halaman. Pindahkan section utuh pada **salinan hasil pengisian** hanya jika hasil render menuntut |
| Instruksi AI | Tidak dicetak dalam badan laporan; disimpan dalam kontrak template |
| Nilai kosong | Tidak otomatis diisi dengan kalimat generik. Jika opsional kosong dan section tidak relevan, keputusan pemangkasan dilakukan pada output setelah review |

### Struktur konten

1. Judul dan identitas (termasuk indikator), tanpa cover.
2. Pelaksanaan kegiatan: rencana kerja dan pelaksanaan pada periode pelaporan.
3. Capaian dan evaluasi: hasil yang dapat diperiksa serta kendala/penyesuaian.
4. Tindak lanjut.
5. Dokumen pendukung.

Heading yang muncul di native Docs: `1. Pelaksanaan Kegiatan`, `2. Capaian dan Evaluasi`, `3. Tindak Lanjut`, dan `4. Dokumen Pendukung`. **Sembilan placeholder katalog tidak berubah.**

### Huruf miring dan tulisan ilmiah

Ketentuan utama: **italic bukan dekorasi**. Subjudul dan status draf tegak; hanya istilah asing/daerah yang belum diserap, judul karya tertentu, atau kebutuhan ejaan/sitasi yang benar-benar diverifikasi yang menggunakan huruf miring. Pemeriksaannya ada di [Pedoman Redaksi Laporan Ilmiah](../../kits/dana-indonesiana/writing/ACADEMIC-REPORT-STYLE.md) berdasarkan EYD V. Kata yang sudah menjadi serapan, nama lembaga, merek/aplikasi dan seluruh frasa untuk menonjolkan kesan akademik **tidak** otomatis miring. Hindari menciptakan abstrak, hipotesis, metode penelitian atau pustaka yang tidak relevan dengan laporan sebenarnya.

## Standar redaksi

- Tulisan harus terasa seperti catatan kegiatan yang faktual: *apa yang direncanakan, apa yang dikerjakan, apa keluarannya, apa yang masih salah, dan apa langkah berikutnya*.
- Jangan memakai "program ini merupakan langkah strategis", "meningkatkan ekosistem inovasi", "berhasil secara optimal", atau ekspresi keberhasilan tanpa bukti.
- Ketika tersedia nama pekerjaan, tanggal, masalah teknis, revisi atau keluaran yang benar-benar terbukti, tulis secara spesifik dan seperlunya. Bila tidak ada data, tandai kebutuhan sumber secara internal; **jangan mengarang detail hanya agar terlihat alami**.
- Hindari jeda kosong `\\n\\n` yang tidak terkendali ketika `replaceAllText` memasukkan beberapa paragraf. Validasi pemisahan paragraf setelah pengisian; normalisasikan blank spacer sebelum rendering jika tidak semestinya.
- Referensi bukti adalah ID atau tautan asli yang terverifikasi di lokasi berizin; contoh `EVD-SYN` **hanya bahan QA**, bukan bukti kegiatan.

## Ambang QA master dan salinan

Master: 9 token tepat sekali, 4 heading semantik, Google Docs native, tanpa tabel dekoratif, style sesuai definisi dan status internal tidak menonjol.

Salinan: semua token diganti, tidak ada instruksi AI atau contoh data fiktif yang tertinggal pada keluaran nyata. PDF A4 dirender dan diperiksa untuk isi pendek, normal dan panjang. Jika halaman akhir sangat kosong, susun ulang bagian per-output dengan `pageBreakBefore` di heading yang semantik. Jangan menerapkannya pada master tanpa alasan karena isi tiap periode berbeda.

## Batas implementasi

Profil ini **sudah diuji dengan data sintetis**. Sesudah pengguna menyetujui desain dan perbaikan italic dilakukan, Master v1.2.0 kini `READY` untuk **INTERNAL** pada Registry privat; v1.1.0 dan v1.0.0 `RETIRED` sebagai arsip. Master v1.2.0 mempunyai 4 heading utama dan 3 subjudul tebal-tegak, tanpa italic dekoratif. Pengujian normal/panjang memerlukan pagination pada salinan output saja. **Belum ada pengujian laporan nyata, PDF/UA, screen reader, atau kepatuhan format resmi.**

Lihat [perbandingan render](../../docs/qa/master01-human-layout-2026-11-03.md), [Quality Standard](QUALITY-STANDARD.md) dan [profil jenis dokumen](DOCUMENT-PROFILES.md).
