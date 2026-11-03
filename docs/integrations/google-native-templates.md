# Google-native Template Generation — T1

**Decision:** seluruh dokumen kerja berada di Google Drive dalam format **Google Docs, Google Sheets, dan (fase berikutnya) Google Slides**. PDF hanya hasil ekspor opsional; bukan sumber edit. Tidak memakai Microsoft Office, DOCX/XLSX/PPTX sebagai perantara, dashboard baru, atau skill kedelapan.

**Status implementasi (T2 bertahap):** enam definisi katalog publik + perencana Google API murni + regresi sintetis. Master Google Docs pertama telah melalui revisi v1.0.0 → **v1.1.0** setelah QA isi sintetis. Sembilan placeholder tetap sama; 3 skenario (pendek/normal/panjang) berhasil diisi melalui API Google dan dievaluasi melalui render PDF. v1.0.0 dipertahankan sebagai riwayat. Perbaikan page break untuk kasus normal dilakukan hanya pada **salinan output**; tidak ada executor generik tanpa supervisi atau persetujuan format resmi. Executor generik, master lain, adaptasi keuangan dan validasi OAuth belum selesai. Prototipe ekspor XLSX lama hanya historis.

## Satu Registry privat, bukan database baru

Pertahankan tab `Documents`, `Petunjuk`, dan `Review Queue`. Tab **`Template Masters` sudah ditambahkan di Google Sheet privat yang sama** pada T2 untuk mendaftarkan master bertahap. Master pertama tersimpan sebagai baris internal yang terverifikasi metadata. Urutan kolom yang wajib:

```text
template_id,template_version,master_file_id,mime_type,master_status,authority,source_document_id,project_scope,observed_modified_time,reviewer_ref
```

- `template_id@template_version` harus persis cocok dengan `templates/google-native/catalog.json`. Tidak memilih template berdasarkan nama berisi "final"/"terbaru".
- `master_file_id` hanya disimpan di Registry privat. Master harus berupa file asli Google Workspace, bukan file Office hasil impor yang belum diverifikasi.
- `mime_type`: native Google Docs / Sheets / Slides. `master_status`: `NEEDS_REVIEW`, `READY`, atau `RETIRED`.
- `authority`: `INTERNAL` atau `OFFICIAL_FORMAT`. Master resmi wajib mempunyai `source_document_id` di Documents dan `reviewer_ref`; T1 **memblokir** pemakaian `OFFICIAL_FORMAT` sampai mekanisme pemeriksaan keberlakuan dan format resmi diselesaikan.
- `project_scope`: `GLOBAL` atau ID lingkup proyek yang tepat. Kandidat master yang ambigu ditolak; bukan otomatis mengutamakan file termutakhir.
- `observed_modified_time`: waktu modifikasi Drive ketika master terakhir ditinjau. Ketidaksamaan metadata aktual memblokir planner, tetapi kecocokan metadata **bukan audit isi**.

Master dibuat di folder Drive privat yang disetujui, dikelola sebagai dokumen Google-native dengan hak edit terbatas dan riwayat revisi. Repository publik hanya menyimpan katalog, prosedur, aturan field dan tes sintetis. Jangan meletakkan ID file privat, data RAB, identitas, token, kuitansi asli, rekening, atau tanda tangan di repo.

## T2 — Master pertama yang benar-benar tersedia

- **ID dan versi:** `di.report.indicator@1.1.0` menjadi master internal terpilih setelah QA sintetis; v1.0.0 adalah riwayat, bukan format resmi program.
- **Lokasi:** folder template internal khusus di Drive privat proyek; `master_file_id` hanya terdapat pada tab `Template Masters`, **tidak pernah** di repository publik.
- **Registry:** `master_status=READY`, `authority=INTERNAL`, `project_scope=GLOBAL`, `source_document_id` kosong dan `reviewer_ref` kosong (tidak mengarang pemeriksa manusia). `observed_modified_time` cocok dengan metadata Google Drive pada pemeriksaan.
- **Pemeriksaan yang dilakukan:** native MIME, folder parent, A4, 4 heading bagian, tabel 3×2, sembilan placeholder (masing-masing tepat sekali), pengisian 3 salinan sintetis dengan metadata terpisah, PDF render setiap skenario, dan pagination balancing khusus salinan normal. Hasil rinci ada di [Master 01 QA](../qa/master01-fill-layout-2026-11-03.md).
- **Belum dilakukan:** executor generik tanpa supervisi, audit PDF/UA, pemeriksaan hak edit khusus master, penilaian substansi laporan nyata, atau kelayakan format resmi. Pengisian dan ekspor PDF lewat konektor sudah dijalankan **untuk data sintetis**. Setiap salinan nyata tetap `DRAFT` sampai review.
- **Master berikutnya:** satu per satu mengikuti katalog; jangan mencatat baris `READY` untuk master yang belum dibuat.

### Standar kualitas dokumen — dasar riset 2026

Pedoman baru: [Quality Standard](../../templates/google-native/QUALITY-STANDARD.md), [Document Profiles](../../templates/google-native/DOCUMENT-PROFILES.md) dan [design-tokens.json](../../templates/google-native/design-tokens.json); dasar dan batasnya ada di [riset 2026](../research/google-native-document-design-2026.md). Desain dimulai dari kebutuhan pembaca/jenis dokumen; tabel bukan dekorasi. Kontras teks memiliki target terukur. QA **master kosong** tidak membuktikan QA **output berisi data**, terutama panjang paragraf, page breaks dan formula. Master 01 sekarang memakai v1.1.0 setelah QA sintetis; pemeriksaan output nyata dan format resmi tetap terpisah. Format resmi yang diverifikasi mengesampingkan default internal.

### Standar visual wajib

Setiap master internal harus mengikuti [Standar Mutu Visual](../../templates/google-native/QUALITY-STANDARD.md): struktur dan token diverifikasi dalam Google-native document, sedangkan layout Google Docs dicek melalui render PDF setiap halaman yang terpengaruh. Pemeriksaan metadata saja **bukan** review visual. Master 01 telah mengalami penyempurnaan hierarki, tabel native dan tipografi, serta render A4 telah diperiksa; pengisian otomatis dengan data panjang tetap memerlukan QA terpisah.

## Alur AI ↔ Google Drive

1. **Pilih kebutuhan.** Ikuti `AGENTS.md` untuk satu skill primer. Ambil pointer melalui P2 Source Resolver; baca isi dokumen proyek hanya sesuai instruksi/izin. Gunakan sumber berwenang, bukan hasil generasi AI sebagai sumber fakta.
2. **Pilih template.** Tentukan ID + versi eksplisit, lingkup proyek dan row master pada tab privat `Template Masters`. Periksa Google Drive ID/MIME/modifiedTime terhadap row yang direview. Periksa placeholder/range master asli sebelum disalin.
3. **Preflight deterministik.** Jalankan `prepareTemplate` (dari `tools/google-native-template-plan.mjs`) dengan input berizin. Field wajib, tipe, tanggal, presisi nominal IDR, kapasitas tabel, dan referensi dicek. Hasil `DRAFT_PREFLIGHT` **bukan** klaim audit/approval.
4. **Salin, jangan mengubah master.** Gunakan konektor Google Drive `copy_file` ke folder tujuan yang benar-benar diizinkan. Baca metadata file salinan dan gunakan ID dari hasil aktual. Jika salinan tercipta tetapi langkah berikut gagal, laporkan status belum selesai; jangan menghapus diam-diam.
5. **Isi langsung dengan API Google.** Untuk Docs, gunakan `batch_update_document` dan `replaceAllText` pada salinan. Untuk Sheets, baca metadata tab **salinan** (nama/`sheetId`/ukuran), jalankan `buildGoogleWritePlan`, kemudian `batch_update_spreadsheet` dengan `updateCells`. Teks ditulis sebagai `userEnteredValue.stringValue`, termasuk bila dimulai `=`, agar tidak ditafsirkan sebagai formula. Angka IDR dipastikan <=15 digit.
6. **Readback dan review.** Pada Docs/Slides periksa jumlah penggantian placeholder serta token yang tersisa. Pada Sheets cek nilai dan tipe sel, formula yang dilindungi, subtotal, print range, batas tabel, dan bukti asal angka. Secara terpisah lakukan review editorial/bukti/administratif yang relevan. Status tetap `DRAFT` / `UNKNOWN` hingga pemeriksaan yang sesuai selesai.
7. **PDF bila diminta.** Ekspor dari file Google-native melalui Drive `files.export`; batas respons API normal adalah 10 MB. Review PDF sebelum menyimpan ulang ke folder terotorisasi. PDF bukan pengganti file Google yang editable.
8. **P5/P3/P4.** Setelah laporan nyata ada, P5 menawarkan pendaftaran `DERIVED_OUTPUT` dengan `derived_from_ids` yang benar-benar dipakai, melalui review manusia. P3/P4 memberi sinyal review ketika sumber berubah; **tidak** melakukan regenerasi otomatis, submit e-RISPRO, atau memberi approval pemerintah.

Koneksi Google Drive ChatGPT dapat menjalankan aksi supervisi di atas; tidak berarti token konektor otomatis tersedia bagi CLI Node lokal. Tidak perlu menjalankan Office atau converter Office pada komputer pengguna.

## Kontrak renderer T1

- **Docs:** master menggunakan placeholder literal `{{UPPERCASE_TOKEN}}` dan seluruh format halaman (judul, tabel, heading, footer) disimpan dalam master. Jumlah penggantian dan placeholder tertinggal harus diperiksa. Perubahan layout resmi harus mengikuti format yang berlaku, bukan desain internal.
- **Sheets:** tab dan koordinat input harus persis seperti katalog; sediakan baris kosong sesuai `max_rows`. Planner tidak menambah sheet/baris otomatis, tidak membuat atau mengubah formula, dan tidak mengganti nilai master yang tidak terdaftar. Sel tabel input tidak boleh mengandung formula/template data.
- **Slides:** protokol `replaceAllText` tersedia dalam planner, tetapi tidak ada master Slides siap pakai dalam katalog T1.
- **Finance:** `tools/finance-report.mjs` tetap pemilik perhitungan. Masih diperlukan adapter yang memetakan hasil JSON v0.5 dan laporan keuangan ke Google Sheets native beserta pemeriksaan formula; **jangan** menggunakan exporter XLSX lama sebagai konversi diam-diam.
- **Resmi:** `OFFICIAL_FORMAT` diblokir pada T1 sampai peninjau berwenang memastikan kategori, periode, source dan struktur template. `READY` internal bukan persetujuan PMO/LPDP.

## Batas keamanan dan kesiapan

Pemeriksaan struktur/generator bukan pemeriksaan legitimasi kegiatan, validitas bukti, penerimaan portal, atau legalitas pengeluaran. File dengan instruksi "pelajari saja" hanya dibaca, tidak dipakai membuat salinan atau output tersimpan. Jangan menggunakan master folder sebagai tujuan hasil.

Pengujian sintetis perencana: `node --test tests/google-native-template-plan.test.mjs`. Skenario mencakup katalog, duplikasi master, perubahan metadata, input hilang, token injeksi, Sheets literal, nominal besar, kapasitas tabel dan larangan mengedit master sebagai salinan.

**Roadmap:** T2 membuat dan mereview master Google-native di folder privat berizin; T3 executor konektor dengan verifikasi salinan + readback; T4 adapter Finance → Google Sheets dan audit formula; T5 PDF/Slides dan kelayakan format resmi. Belum ada mutasi Google Drive untuk T1.

Sumber API: [Drive files.copy](https://developers.google.com/workspace/drive/api/reference/rest/v3/files/copy), [Docs replaceAllText](https://developers.google.com/workspace/docs/api/reference/rest/v1/documents/request), [Sheets batchUpdate](https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets/batchUpdate), [Drive files.export](https://developers.google.com/workspace/drive/api/reference/rest/v3/files/export).

### Bentuk metadata konektor

Planner menerima baik metadata API mentah (`mimeType`, `modifiedTime`) maupun metadata konektor Google Drive (`mime_type`, `modified_time`). Untuk Sheets, argumen `sheetMetadata` menerima objek lengkap hasil `get_spreadsheet_metadata` (`sheets[].properties`) dari **salinan**, atau matriks flat sintetis dalam pengujian. Jangan menggunakan `sheetId` master untuk menulis ke salinan tanpa readback.

### Pedoman baca manusia di Google Drive

Ringkasan standar dalam Google Docs native tersedia di folder privat proyek `90 - Pedoman dan Referensi` dengan judul `Pedoman Mutu Dokumen Google-native — Riset & Standar v2.0 [DRAF]`. Ini **bukan** master untuk disalin menjadi laporan maupun Registry `DERIVED_OUTPUT`, dan belum ada sinkronisasi dua arah GitHub–Google Docs. Definisi kanonis bagi AI tetap [Quality Standard](../../templates/google-native/QUALITY-STANDARD.md) dan [Document Profiles](../../templates/google-native/DOCUMENT-PROFILES.md); perubahan substantif harus menjaga keduanya konsisten. PDF yang diekspor hanya digunakan untuk memeriksa tampilan dokumen riset (3 halaman A4 setelah perbaikan orphan/blank page), bukan klaim PDF/UA atau aksesibilitas penuh.

### T2 — Pagination QA dan perbaikan pada salinan

[Pure QA helper](../../tools/google-native-doc-qa.mjs) mengevaluasi heading/token/tabel Google-native serta geometri PDF yang disediakan renderer. Ambang trailing-page 30% hanyalah pemicu `NEEDS_VISUAL_REVIEW`, bukan kelulusan visual. [Uji perbandingan Master 01](../qa/master01-fill-layout-2026-11-03.md) menemukan v1.0.0 menghasilkan halaman akhir sangat jarang terisi. Master v1.1.0 menggunakan profil internal baru, dan salinan normal diberi page break pada awal bagian `Capaian` setelah dilihat hasil render. Jangan membuat page break permanen di master dan jangan mengklaim QA otomatis tanpa executor nyata.

### T2 — Riwayat desain kandidat formal v1.2.0

Atas umpan balik pengguna bahwa v1.1.0 masih seperti desain AI, dibuat master Google Docs baru dengan [profil formal Indonesia](../../templates/google-native/FORMAL-REPORT-STYLE.md), tetap memakai 9 placeholder/4 heading yang sama. [Laporan QA](../qa/master01-human-layout-2026-11-03.md) mendokumentasikan uji tiga tingkat panjang dan satu narasi contoh fiktif. Kasus normal dan panjang memerlukan penataan page break **pada salinan output**, bukan master. Pada tahap kandidat, Registry semula menandai v1.2.0 `NEEDS_REVIEW`; setelah persetujuan dan QA italic, v1.2.0 telah diaktifkan sebagai `READY` INTERNAL dan v1.1.0/v1.0.0 `RETIRED`. Executor otomatis penuh masih belum tersedia.

### T2 — Aktivasi formal dan aturan editorial ilmiah

Setelah pengguna menerima layout v1.2.0 dengan syarat italic tidak dekoratif, subjudul diubah menjadi Google Docs `HEADING_2` bold-tegak, status upright, dan seluruh text run terkait dipaksa Times New Roman agar tidak terkena fallback Arial. [QA terverifikasi](../qa/master01-scholarly-typography-2026-11-03.md) memuat uji contoh sintetis 1 halaman, uji panjang 3 halaman, zero italic dan font pada PDF render. **Master privat v1.2.0 = `READY` INTERNAL**, versi v1.1.0/v1.0.0 = `RETIRED`; semua status tetap terpisah dari persetujuan resmi. [Aturan italic dan laporan ilmiah](../../kits/dana-indonesiana/writing/ACADEMIC-REPORT-STYLE.md) digunakan oleh domain creative-documentation. Tidak ada auto italic kata asing tanpa validasi sumber.
