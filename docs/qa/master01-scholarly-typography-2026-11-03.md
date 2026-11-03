# QA Tipografi Ilmiah Master 01 v1.2.0 — 3 November 2026

**Jenis uji:** Google Docs native INTERNAL (template dan salinan berisi **data sintetis**), tanpa materi proyek sebenarnya. User menyetujui arah desain formal v1.2 dengan syarat khusus penggunaan italic yang jelas dan gaya laporan yang mendekati karya tulis ilmiah. Uji tidak mengesahkan klaim proyek, metode penelitian, isi referensi resmi, atau kemampuan generator unattended.

## Sumber aturan

- [EYD V: Huruf Miring](https://ejaan.kemendikdasmen.go.id/eyd/penggunaan-huruf/huruf-miring/): karya tertentu, ungkapan asing/daerah, penegasan unsur bahasa; nama diri asing tidak otomatis miring.
- [EYD V: Huruf Tebal](https://ejaan.kemendikdasmen.go.id/eyd/penggunaan-huruf/huruf-tebal/): bab dan subbab diberi penandaan tebal.
- [APA Style and Grammar Guidelines](https://apastyle.apa.org/style-grammar-guidelines): untuk komunikasi ilmiah jelas dan konsisten; APA 7 dipakai apabila diwajibkan atau dipilih, bukan format otomatis bagi semua laporan administrasi.
- [Editorial rules](../../kits/dana-indonesiana/writing/ACADEMIC-REPORT-STYLE.md): aturan internal turunannya, bukan standarisasi pemerintah.

## Perubahan langsung pada master Google Docs

1. Menghilangkan \`italic\` dekoratif pada status draf, "Rencana kerja", "Pelaksanaan pada periode pelaporan" dan "Kendala dan penyesuaian".
2. Membuat tiga subjudul memakai **\`HEADING_2\` native**, bold, tegak; empat judul bagian tetap \`HEADING_1\`.
3. Menyetel font **Times New Roman** secara eksplisit pada keempat text run yang semula diwarisi Arial. Kasus yang dilihat pada inspeksi PDF awal menunjukkan Arial bahkan ketika format dokumen global Times New Roman; pemeriksaan setelah perbaikan dilakukan pada PDF hasil Google Docs.
4. **Tidak menambahkan italic lain** ke laporan. Aturan EYD hanya diterapkan ketika ada judul karya atau istilah asing yang benar-benar membutuhkan italic.

## Uji pada dokumen terisi

Satu salinan sintetis baru dibuat dengan sembilan placeholder yang sama dan narasi lebih terukur: tujuan, prosedur, tanggal simulasi, dua temuan, perbandingan catatan \`SIM-01\` dan \`SIM-02\`, keterbatasan, serta rencana lanjut. Seluruh aktivitas dan referensi tersebut **fiktif** dan berfungsi untuk QA desain, bukan faktualitas proyek.

- **Docs readback:** 4 \`HEADING_1\`, 3 \`HEADING_2\`, 9/9 token terganti, 0 token tersisa, 0 run italic.
- **PDF render:** 1 halaman A4; teks nonkosong seluruhnya menggunakan \`TimesNewRomanPSMT\` atau \`TimesNewRomanPS-BoldMT\`, 0 italic font runs. Tidak terlihat clipped text atau halaman kosong. Ini hanya validasi layout contoh yang diuji, bukan seluruh kemungkinan hasil.
- **Long-content regression:** salinan berbeda dengan data sintetis panjang diisi lagi setelah perubahan; 3 halaman. Page break sebelum "3. Tindak Lanjut" diterapkan hanya pada salinan agar tidak membelah pembahasan di tengah section. Semua teks bermakna tetap Times New Roman tegak/tebal, 0 italic font runs.
- **Italic pure QA helper:** \`tools/google-native-typography-qa.mjs\`; 5 kasus unit test sintetik lulus melalui V8 test harness, **bukan** perintah \`node --test\`. Kedua dokumen live yang diperiksa (master dan contoh terisi) menunjukkan \`ITALIC_USAGE_CHECKED\` dan 0 explicit italic runs.

## Keputusan versi dan otorisasi

Master Google Docs \`di.report.indicator@1.2.0\` telah diperbarui dan disetujui pengguna sebagai arah desain, dengan perbaikan italic sebagai syarat. Setelah QA dan pembacaan metadata, row di tab privat \`Template Masters\` ditetapkan \`READY\` untuk **INTERNAL**, dengan \`observed_modified_time\` yang cocok. v1.1.0 dan v1.0.0 keduanya \`RETIRED\` sebagai riwayat; tidak ada master lain yang diubah.

**Batas:** tidak ada klaim penelitian ilmiah telah dilakukan, tidak ada metode/sumber kajian ilmiah yang direkayasa, tidak ada audit PDF/UA atau screen reader, tidak ada pemeriksaan RAB/kontrak, dan belum ada executor Google-native unattended. Setiap laporan proyek harus menjalani pemeriksaan isi terhadap sumber, versi, otorisasi serta layout setelah pengisian. Gaya penulisan ilmiah **tidak berarti** otomatis memakai format artikel jurnal (abstrak, hipotesis, daftar pustaka) jika kegiatan tersebut bukan penelitian atau format resmi tidak mensyaratkannya.
