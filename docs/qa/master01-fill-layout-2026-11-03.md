# Master 01 Google-native — Pengisian dan QA layout sintetis (3 November 2026)

**Lingkup:** evaluasi master **INTERNAL** \`di.report.indicator\`, Google Docs native. **Tidak** menggunakan isi atau bukti proyek nyata. Semua contoh secara eksplisit diberi label \`QA SINTETIS\`, disimpan di subfolder QA privat terpisah, dan **tidak** didaftarkan sebagai laporan nyata/\`DERIVED_OUTPUT\`. ID Drive, URL privat dan sumber contoh tidak dicatat dalam repo publik.

## Input dan metode yang benar-benar digunakan

- Membaca Google Docs Master 01 v1.0.0 dan row \`Template Masters\` privat yang cocok dengan MIME/metadata.
- Menyalin master native Google Docs sebanyak tiga untuk skenario **pendek, normal, panjang** ke folder uji; master tidak ditimpa.
- Melakukan \`replaceAllText\` untuk **sembilan placeholder** + status dokumen; semua \`occurrencesChanged=1\`, tanpa token tersisa.
- Membaca ulang struktur Google Docs; 4 heading bagian dan tabel metadata native **3×2** tetap ada.
- Mengekspor setiap salinan Google Docs menjadi PDF hanya untuk QA, lalu merender halaman sebagai gambar dan membaca koordinat teks menggunakan PyMuPDF. Periksa status sintetis, jumlah halaman, clipping, pemisahan heading dan halaman terakhir.
- Menemukan masalah dan membuat master **v1.1.0** baru tanpa menimpa v1.0.0: font isi 11,5 pt, line spacing 120%, margin dari profil pedoman, kolom tabel disesuaikan lebar halaman, catatan internal penutup dihapus.
- Menyalin v1.1.0 sebanyak tiga dan mengisi **teks identik** dengan salinan v1.0.0; untuk kasus **normal**, perbaikan output spesifik \`pageBreakBefore\` pada heading \`Capaian dan tindak lanjut\` diterapkan **hanya di salinan**, tidak di master. Kasus pendek dan panjang menggunakan pagination natural.
- Membaca ulang output dan ekspor PDF; struktur dan token diperiksa. Semua angka dalam tabel berikut adalah metrik PDF aktual, bukan klaim kelayakan substantif proyek.

## Hasil perbandingan

\`Coverage\` adalah **perkiraan tinggi kotak teks terakhir / tinggi area teks tersedia**, bukan persentase halaman berisi tinta dan **bukan** metrik legal/aksesibilitas. Pembaca harus tetap memeriksa render secara visual.

| Master | Isi | Halaman | Coverage halaman akhir | Temuan |
|---|---|---:|---:|---|
| 1.0.0 | pendek | 1 | 76,4% | Muat satu halaman |
| 1.0.0 | normal | 2 | **14,7%** | Halaman terakhir terlalu kosong, hanya referensi bukti dan catatan |
| 1.0.0 | panjang | 3 | **8,6%** | Halaman terakhir hampir kosong |
| 1.1.0 | pendek | 1 | 73,9% | Muat satu halaman dengan tipografi lebih jelas |
| 1.1.0 | normal | 2 | **50,4%** | Heading \`Capaian\` dijadikan awal halaman kedua dalam output uji |
| 1.1.0 | panjang | 3 | **44,3%** | Halaman ketiga memuat rencana tindak lanjut dan bukti, bukan hanya sisa satu baris |

**Pembacaan visual:** versi 1.1.0 tidak menunjukkan teks keluar dari margin, blok saling tumpang tindih, atau halaman terakhir kosong pada tiga skenario ini. Bagian bukti pada dokumen panjang tetap utuh di halaman terakhir. Secara relatif, versi 1.1.0 lebih mudah dibaca dan mempunyai whitespace lebih wajar. Perbedaan panjang halaman tidak diatasi dengan mengecilkan font atau menyembunyikan isi.

## Keputusan implementasi

1. **Versi lama tetap ada sebagai riwayat.** v1.0.0 memiliki masalah layout pada pengisian panjang; setelah v1.1.0 diregistrasi, tandai v1.0.0 \`RETIRED\`.
2. **Master baru v1.1.0** menggunakan token yang sama sehingga tidak perlu mengubah skema input. Pilih tepat ID+versi; jangan cari berdasarkan nama "terbaru".
3. **Balancing hanya pada OUTPUT terisi.** Jangan memberikan \`pageBreakBefore\` permanen pada semua master, karena kasus pendek tidak membutuhkannya. Executor harus membaca output, mendeteksi halaman terakhir yang sangat jarang terisi, lalu mengusulkan atau menerapkan perbaikan kasus-per-kasus sebelum review visual.
4. **Pure QA helper** di \`tools/google-native-doc-qa.mjs\` memeriksa native structure, sisa placeholder, dan geometri PDF yang diberikan oleh renderer; dapat menghasilkan rencana \`pageBreakBefore\` yang aman untuk **salinan terverifikasi**, tidak untuk master. Tes sintetis: \`node --test tests/google-native-doc-qa.test.mjs\`.
5. **Ambang 30% trailing coverage** hanya sinyal \`NEEDS_VISUAL_REVIEW\` untuk dokumen lebih dari satu halaman, bukan auto-PASS desain. Pemeriksaan manusia diperlukan untuk split tabel, gambar, reading order, kualitas bahasa, dan keakuratan sumber.

## Batas klaim

- QA ini memakai contoh sintetis, **tidak memeriksa hasil kegiatan nyata**, kesesuaian pedoman program, atau bukti dari Google Drive proyek.
- Visual sudah diperiksa di PDF Google-native; **belum** diuji dengan screen reader, PDF/UA, atau satu set isi multibahasa yang lengkap.
- Pengisian dan balancing dilakukan melalui konektor Google Drive dengan supervisi ChatGPT. **Belum ada executor otomatis penuh** yang mengulang prosedur ini tanpa review; rute master → copy → fill → PDF QA tetap harus dijalankan pada setiap laporan.
- Belum ada pengujian resmi dari Google atau instansi. Master yang bagus bukan bukti dokumen yang diisi di kemudian hari sudah benar.
- **Tidak** ada promosi branch \`Local\` atau \`main\`, submit e-RISPRO, ataupun perubahan RAB/proposal/perjanjian.

## Tindak lanjut setelah QA

Pertahankan \`di.report.indicator@1.1.0\` sebagai master pilihan **internal** setelah registrasi dan verifikasi metadata. Laporan nyata hanya boleh dibuat setelah sumber, izin storage, bukti dan format yang berlaku dipastikan. Master kedua dikembangkan setelah satu prosedur pembuatan dokumen dari v1.1.0 diuji terhadap keperluan pengguna nyata yang sah.
