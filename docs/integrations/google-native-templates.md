# Google-native Template Generation — T1

**Decision:** seluruh dokumen kerja berada di Google Drive dalam format **Google Docs, Google Sheets, dan (fase berikutnya) Google Slides**. PDF hanya hasil ekspor opsional; bukan sumber edit. Tidak memakai Microsoft Office, DOCX/XLSX/PPTX sebagai perantara, dashboard baru, atau skill kedelapan.

**Status implementasi:** enam definisi katalog publik + perencana Google API murni + regresi sintetis. **Belum** tersedia file master Google-native, tab Registry privat baru, executor yang benar-benar menulis ke Drive, validasi OAuth, uji end-to-end Google, atau persetujuan format resmi. Prototipe ekspor XLSX lama tetap ada untuk sejarah tetapi bukan jalur target.

## Satu Registry privat, bukan database baru

Pertahankan tab `Documents`, `Petunjuk`, dan `Review Queue`. Ketika operator memberi izin membuat konfigurasi, tambahkan **satu tab `Template Masters` di Google Sheet privat yang sama** (tidak dilakukan oleh kode T1). Urutan kolom yang wajib:

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
