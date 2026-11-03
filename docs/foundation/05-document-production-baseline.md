---
id: foundation.document-production-baseline
authority: CANONICAL_INTERNAL
status: ACTIVE
effective_as_of: 2026-11-03
---

# Pedoman Dasar Produksi Dokumen — M-DanaIndonesiana

**Keputusan:** disetujui pengguna sebagai standar internal untuk dokumen baru dan revisi berikutnya. Ini **satu pintu masuk**, bukan pengganti kontrak domain, bukti, atau format resmi. **Media kerja pengguna hanya Google Docs, Google Sheets, dan Google Slides native**; PDF bila diminta/diperlukan untuk cetak atau inspeksi, bukan sumber edit. Tidak menggunakan Office sebagai perantara.

## 1. Hirarki aturan (urutan prioritas)

1. **Format resmi yang benar-benar berlaku** menurut kategori, periode, kontrak, Juknis, dan bukti sumber yang diperiksa. Jangan menganggap gaya internal sama dengan format pemerintah.
2. **Kebenaran isi dan sumber**: pernyataan, tanggal, angka, capaian, kutipan, dan status berasal dari owner domain serta referensi versi yang benar. Ketidakpastian dinyatakan, bukan diisi karangan.
3. **Fungsi dokumen dan kebutuhan pembaca**: keputusan/tugas pembaca menentukan struktur. Laporan naratif, surat, RAB, checklist, dan slide **tidak** menggunakan layout identik.
4. **Kaidah bahasa dan aksesibilitas**: bahasa Indonesia formal, EYD V, istilah konsisten, heading semantik, keterbacaan.
5. **Profil visual internal**: diterapkan hanya jika tidak bertentangan dengan sumber resmi dan kebutuhan dokumen. Ornamen adalah prioritas terendah.

Jika format wajib belum dapat diverifikasi, beri status \`NEEDS_FORMAT_REVIEW\`, bukan menyatakan dokumen "resmi" atau "compliant".

## 2. Standar penulisan alami seperti hasil kerja editor profesional

**Tujuan bukan menyamarkan asal tulisan.** Hasil harus terlihat dan terbaca sebagai naskah yang disunting dengan pertimbangan nyata: spesifik, tertib, tidak kaku secara artifisial, dan tidak berisi klaim tanpa dasar.

- **Mulai dari materi yang tersedia.** Identifikasi pembaca, pertanyaan yang harus dijawab, fakta terverifikasi, periode, indikator, serta dokumen pendukung. Jangan mulai dengan paragraf umum tentang pentingnya teknologi, budaya, kemajuan, atau inovasi.
- **Setiap paragraf mempunyai satu pekerjaan.** Jelaskan keputusan/tindakan, hasil, hubungan sebab-akibat yang memang didukung, atau keterbatasan. Hapus paragraf yang tidak menambah informasi.
- **Gunakan bahasa yang manusiawi tetapi tetap ilmiah.** Pilih kalimat aktif/pasif sesuai kebutuhan; panjang kalimat bervariasi karena kepadatan gagasan, bukan aturan mekanis "selalu tiga kalimat" atau "lima bullet".
- **Jaga suara penulis secara konsisten.** Pilih istilah yang sama untuk objek yang sama, pertahankan istilah karya dan ruang lingkup dari sumber, serta gunakan transisi hanya saat hubungan antargagasan memang perlu dijelaskan.
- **Tunjukkan batas.** Bedakan rencana dengan yang sudah dilakukan, hasil pengujian internal dengan penerimaan pengguna, bukti yang ada dengan yang belum terverifikasi, dan status internal dengan keputusan instansi.
- **Sunting sebelum tata letak.** Periksa pengulangan isi, tautan kalimat, kelemahan argumen, jargon Inggris yang tidak perlu, dan kesimpulan yang melampaui temuan. Hindari dekorasi untuk menutupi tulisan yang belum matang.
- **Sitasi mengikuti kebutuhan naskah.** Gunakan daftar pustaka dan gaya APA 7 hanya ketika sumber akademik benar-benar digunakan atau diwajibkan. Jangan menciptakan DOI, nomor halaman, teori, hasil wawancara, statistik, atau dokumen bukti.

### Redaksi yang harus ditolak

Hapus atau tulis ulang pernyataan kosong seperti "memberikan kontribusi signifikan", "mewujudkan sinergi yang berkelanjutan", "berjalan dengan optimal", "langkah strategis yang inovatif", "seiring pesatnya perkembangan teknologi", atau "berhasil meningkatkan kualitas" jika tidak ada fakta, ukuran dan bukti yang sesuai.

Jangan menggunakan pembuka/penutup otomatis yang hanya memparafrasa isi, konjungsi yang sama pada setiap paragraf, daftar yang sengaja disimetriskan, atau nada berlebihan untuk membuat tulisan tampak "profesional". Kalimat yang sederhana tetapi tepat lebih diutamakan daripada rangkaian istilah abstrak.

**Uji editorial:** setiap klaim material dapat ditelusuri; pembaca dapat menjawab apa yang dikerjakan, kapan, bagaimana, hasilnya apa, dan apa yang masih terbuka **jika pertanyaan itu relevan**. Tidak ada keharusan semua jawaban menjadi bab terpisah.

## 3. Struktur, layout, dan tipografi

Gunakan [Profil Jenis Dokumen](../../templates/google-native/DOCUMENT-PROFILES.md) untuk menentukan urutan bagian. Jangan membuat cover, ringkasan eksekutif, tabel, atau daftar isi apabila jenis naskah tidak memerlukannya.

**Default laporan naratif internal yang disetujui:** [Laporan Kerja Formal Indonesia](../../templates/google-native/FORMAL-REPORT-STYLE.md), dengan referensi master Google Docs \`di.report.indicator@1.2.0\` pada Registry privat. Format A4, Times New Roman, monokrom, isi 11,5 pt, judul tengah, identitas dalam beberapa baris, heading \`HEADING_1\` dan \`HEADING_2\` tebal-tegak, tanpa tabel identitas dekoratif. Kebutuhan laporan atau sumber resmi dapat menentukan ukuran/gaya lain.

**Google Sheets**: satu record per baris, header terbaca, kolom angka numerik, rumus terlindungi bila memungkinkan, status dan bukti dapat ditelusuri. **Google Slides**: satu pesan utama tiap slide; teks ringkas, sumber jelas. Jangan memaksakan layout Google Docs ke kedua media ini.

**Huruf miring (italic)** mengikuti [Pedoman Redaksi Laporan Ilmiah](../../kits/dana-indonesiana/writing/ACADEMIC-REPORT-STYLE.md) dan EYD V: hanya untuk kata/ungkapan asing atau daerah yang belum diserap, judul karya tertentu, penegasan unsur bahasa yang memang dianalisis, atau aturan sitasi/gaya selingkung terverifikasi. Nama aplikasi, lembaga, merek, istilah serapan, subjudul, label, status draf, dan paragraf umum **tidak otomatis italic**. Bila tidak ada kebutuhan tersebut, nol italic adalah benar.

## 4. Alur wajib sebelum dokumen diserahkan

1. **Brief** — tentukan pembaca, tugas, jenis dokumen, format resmi yang berlaku atau ketidakpastiannya, sumber dan tingkat kerahasiaan.
2. **Struktur** — pilih profil dan komponen yang diperlukan; tempatkan informasi penting dahulu, gunakan Google-native headings/tables/ranges yang tepat.
3. **Draft berdasarkan sumber** — gunakan fakta dari owner yang benar; tandai UNKNOWN dan jangan membuat realisasi atau hasil fiktif.
4. **Human editorial pass** — hapus filler, repetisi, klaim berlebihan, konstruksi formulaik, dan istilah yang tidak konsisten; perbaiki alur dan kejelasan tanpa mengubah fakta.
5. **Typography pass** — pastikan font dan heading benar, tidak ada italic dekoratif, sitasi dan bahasa Indonesia konsisten. [Pemeriksa italic](../../tools/google-native-typography-qa.mjs) adalah sinyal teknis, **bukan** pengganti editor bahasa.
6. **Source & arithmetic pass** — periksa angka, tanggal, bukti, status dan formula sesuai modul masing-masing, bukan berdasarkan penilaian gaya.
7. **Layout pass pada file terisi** — salin master, isi Google-native, baca kembali, lalu periksa render halaman (untuk Docs: ekspor PDF sebagai bukti inspeksi). Uji pendek/normal/panjang ketika mengembangkan **master baru**. Perbaiki pagination pada output, jangan memaksakan page break permanen tanpa kebutuhan.
8. **Handoff** — simpan pada folder Google Drive berizin, pertahankan versi, catat sumber dan batas QA. Status \`READY\` master internal **bukan** persetujuan isi laporan atau instansi.

## 5. Gerbang kualitas dan kegagalan

| Gate | Tolak/revisi bila ditemukan |
|---|---|
| \`CONTENT_AND_SOURCE\` | angka/tanggal/kutipan rekaan, rencana diklaim selesai, bukti/versi tak dapat diperiksa |
| \`HUMAN_EDITORIAL\` | filler, pembuka generik, repetisi, paragraf tanpa fungsi, pola kaku yang tidak mengikuti isi |
| \`STRUCTURE\` | judul tidak jelas, heading tidak semantik, placeholder tersisa, tabel untuk dekorasi |
| \`TYPOGRAPHY\` | italic tanpa dasar, font campuran karena pewarisan style, hierarki heading tidak konsisten |
| \`LAYOUT\` | clipping, overlap, judul bagian sendirian, halaman akhir nyaris kosong tanpa alasan, tabel kehilangan konteks |
| \`AUTHORITY_AND_PRIVACY\` | menyatakan kepatuhan/approval tanpa bukti, mengirim data privat ke Git publik atau folder tidak berizin |

Jika ada gate material yang tidak diperiksa, tandai \`NOT_EXECUTED\` atau \`NEEDS_REVIEW\`; jangan mengubahnya menjadi PASS hanya karena layout terlihat baik.

## 6. Kepemilikan dokumen dan referensi

- **Aturan baseline ini:** kontrak kanonis yang dibaca AI sebelum semua pekerjaan pembuatan/edit dokumen dalam M-DanaIndonesiana.
- **Standar teknis layout/QA:** [Quality Standard](../../templates/google-native/QUALITY-STANDARD.md), [Design Tokens](../../templates/google-native/design-tokens.json), [Document Profiles](../../templates/google-native/DOCUMENT-PROFILES.md).
- **Aturan editorial spesifik laporan:** [Editorial Workflow](../../kits/dana-indonesiana/writing/EDITORIAL-WORKFLOW.md) dan [Academic Report Style](../../kits/dana-indonesiana/writing/ACADEMIC-REPORT-STYLE.md).
- **Workspace manusia:** satu Google Docs native bernama *00 - Pedoman Dasar Penulisan dan Tata Letak Dokumen — Internal v1.0* di folder \`90 - Pedoman dan Referensi\` proyek. ID atau URL Google Drive privat **tidak** disalin ke repo publik.
- **Riset historis:** [Document Design Research 2026](../research/google-native-document-design-2026.md) sebagai landasan referensi, **bukan** template aktif.

**Batas implementasi:** aturan ini telah disimpan dan diarahkan dalam router. Tidak berarti executor unattended atau pemeriksa otomatis gaya bahasa telah ada. Kualitas manusiawi tetap memerlukan pemeriksaan editorial pada isi aktual; model tidak dapat menjamin kesan tulisan manusia atau lolos suatu detektor AI.
