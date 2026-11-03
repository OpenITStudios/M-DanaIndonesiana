# QA Desain Master 01 v1.2.0 — Layout Laporan Formal (3 November 2026)

**Scope:** QA sintetis untuk \`di.report.indicator@1.2.0\` yang berupa Google Docs asli. User meminta agar output tidak lagi terasa seperti template AI, terutama pada layout. Ini evaluasi **desain dan struktur**, bukan klaim legal, sertifikasi aksesibilitas PDF, atau pemeriksaan laporan Dana Indonesiana sebenarnya.

## Hipotesis desain

Bandingkan pendekatan lama (warna biru, metadata di tabel berarsir, eyebrow dan label berlapis) dengan desain alternatif yang mendekati laporan formal yang ditulis manual: Times New Roman, monochrome, judul di tengah, identitas dalam paragraf pendek, heading bernomor sederhana dan narasi yang tidak dipisah ke dalam kartu atau tabel dekoratif.

**Sumber master:** v1.1.0 tetap tidak berubah. v1.2.0 adalah Google Docs baru di folder master privat dan berstatus \`NEEDS_REVIEW\` sampai pengguna menyetujui. Tidak ada ID Drive privat di repository.

## Langkah yang benar-benar dilakukan

1. Membuat satu kandidat master Google Docs v1.2.0 dengan sembilan token yang sama dengan versi terdahulu, empat heading semantik, nol tabel, Times New Roman 11,5 pt, A4 dan margin 67/65/71/71 pt.
2. Menyalin master untuk tiga uji stres: isi pendek, normal, panjang, menggunakan **konten sintetis yang sama** dengan uji v1.1.0. Sembilan token dan status diganti tepat satu kali pada masing-masing salinan; readback menunjukkan tanpa token tertinggal.
3. Mengekspor salinan sebagai PDF, membaca jumlah halaman dan geometri teks (PyMuPDF), serta meninjau render gambar; pada salinan normal, dokumen natural semula menyisakan halaman kedua berisi bukti saja.
4. Menerapkan \`pageBreakBefore\` pada heading "2. Capaian dan Evaluasi" **khusus salinan normal**, lalu memeriksa ulang PDF. Pada salinan panjang, break ditempatkan sebelum "3. Tindak Lanjut" agar halaman ketiga dimulai dengan heading, bukan kelanjutan paragraf.
5. Membuat satu contoh editorial tambahan dengan detail fiktif yang lebih spesifik (tanggal uji, salah arah navigasi, tindak lanjut). Menemukan satu paragraf kosong dari pengisian \`\\n\\n\` dan menghapusnya. Rendering akhir satu halaman A4.

## Hasil pemuatan isi dan render

| Skenario | Halaman akhir | Distribusi area teks per halaman, perkiraan | Catatan |
|---|---:|---|---|
| Pendek | 1 | 62% | Berhasil tanpa page break tambahan |
| Normal, sebelum penataan | 2 | 96% / **8%** | GAGAL komposisi: halaman 2 hampir kosong |
| Normal, setelah penataan | 2 | **57% / 46%** | Dua kelompok pembahasan yang jelas; section 2 mulai di halaman kedua |
| Panjang, setelah penataan | 3 | **93% / 84% / 42%** | Halaman 3 dimulai dengan "3. Tindak Lanjut", diikuti lampiran |
| Contoh narasi fiktif diedit | 1 | ~91% | Tidak ada halaman tambahan, semua heading dan isi lengkap |

*Perkiraan luas teks memakai tinggi bounding-box teks dibanding tinggi area tulis, bukan nilai keterbacaan manusia atau pengukuran area tinta. Angka tidak dipakai sebagai izin auto-PASS.*

### Pemeriksaan struktur Google-native

- Master: 9 placeholder katalog tepat sekali, 4 \`HEADING_1\`, tidak ada tabel untuk identitas, file Google Docs native di folder master.
- Salinan: 9 placeholder terganti tanpa sisa, status uji fiktif terlihat, format tetap native dan heading utuh.
- Semua file QA ditempatkan di folder sintetis terpisah; tidak memindahkan atau mengedit dokumen proyek nyata.
- Tidak ada teks terpotong atau overlap yang tampak pada render yang diperiksa.

### Evaluasi editorial

Contoh uji stres lama masih menggunakan prosa sintetis berulang; itu berguna untuk menguji halaman, tetapi tidak membuktikan kualitas narasi. Contoh tambahan berisi uraian khusus tentang rute galeri, tanggal revisi dan keterbatasan uji, **sepenuhnya fiktif**, dibuat untuk menilai ritme paragraf laporan nyata. Tidak ada klaim bahwa kegiatan tersebut terjadi.

## Keputusan dan batas

**Keputusan QA teknis:** master v1.2.0 layak sebagai **kandidat desain yang telah diuji sintetis**, belum langsung menjadi master aktif. Registry privat menandainya \`NEEDS_REVIEW\`. Master v1.1.0 tetap \`READY\` hingga preferensi desain disepakati.

**Tindak lanjut yang penting:** model generator perlu sanitasi paragraf kosong, pemeriksaan isi lengkap setelah replace, perhitungan geometri sebagai *sinyal* dan page break berbasis section **hanya di salinan**. Tidak boleh menyatakan "human-written" berdasarkan font saja: redaksi tetap memerlukan sumber yang benar dan suntingan editorial.

**Belum diperiksa:** dokumen laporan asli, kewajiban format resmi dan lampiran program, keabsahan evidence, output dengan gambar/table yang kompleks, screen reader/PDF/UA, dan otomasi tanpa supervisi.

## Addendum setelah persetujuan gaya dan koreksi italic

Gaya formal v1.2.0 diterima pengguna dengan syarat tidak memakai italic dekoratif. Status master di Registry privat telah dinaikkan dari `NEEDS_REVIEW` menjadi `READY` **INTERNAL** setelah memperbaiki 3 subjudul dan status menjadi tegak serta memeriksa PDF. Versi 1.1.0 kemudian `RETIRED`. Catatan versi awal di atas tetap merupakan riwayat saat kandidat masih review; hasil pemeriksaan terbaru berada di [QA tipografi](master01-scholarly-typography-2026-11-03.md).
