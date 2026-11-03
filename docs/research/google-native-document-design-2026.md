# Riset standar dokumen Google-native — 3 November 2026

**Mode:** SYSTEM DEVELOPMENT / research, tidak memeriksa atau menyalin data proyek privat. **Status:** RESEARCH_REVIEWED (sumber yang disebut di bawah diperiksa); pedoman visual internal merupakan **rekomendasi desain**, bukan aturan pemerintah, sertifikat aksesibilitas, atau bukti master sudah lolos QA isi nyata.

## Pertanyaan riset

Bagaimana membuat dokumen administrasi, laporan, tabel keuangan, dan presentasi di Google Drive yang benar-benar mudah digunakan, tidak terlihat sebagai output AI generik, dan tetap menjaga integritas data serta format resmi?

Metode: membandingkan pedoman primer standar plain language, content design, aksesibilitas, tipografi, spreadsheet, Google Workspace API, ejaan Indonesia, dan regulasi arsip. Hasil diturunkan menjadi keputusan desain dan kriteria penolakan yang dapat diperiksa, bukan mengimpor semua aturan dari yurisdiksi lain sebagai kewajiban hukum Indonesia.

## Matriks bukti dan keputusan

| Sumber primer | Klaim yang didukung | Adaptasi M-DanaIndonesiana | Batas transfer |
|---|---|---|---|
| [ISO 24495-1:2023, laman resmi ISO](https://www.iso.org/standard/78907.html) | Plain language menargetkan dokumen yang relevan, mudah ditemukan, dipahami, dan digunakan | Awali desain dari pembaca dan keputusan/tugas, bukan dari heading-template; uji apakah pembaca menemukan fakta dengan cepat | Hanya abstrak/preview resmi diperiksa; tidak mengklaim audit kepatuhan teks ISO penuh |
| [GOV.UK content design](https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/plan-manage-content/understand-content-design/) | Konten ditentukan oleh kebutuhan pengguna dan format yang tepat | Buat brief pembaca, tujuan, jenis dokumen, informasi prioritas sebelum layout | Panduan untuk publikasi layanan UK, bukan format hukum laporan hibah di Indonesia |
| [GOV.UK publishing accessible documents](https://www.gov.uk/guidance/publishing-accessible-documents) | Struktur heading asli, font sans-serif, teks rata kiri, tabel hanya untuk data, alt text, link deskriptif | Pakai Google-native headings, tabel untuk relasi data, PDF sebagai hasil ekspor; untuk publikasi yang aksesibel targetkan body 12 pt | Angka dan persyaratan panduan publikasi UK diterapkan sebagai baseline kualitas internal, bukan kewajiban universal Indonesia |
| [GOV.UK table formatting](https://guidance.publishing.service.gov.uk/formatting-content/text-formatting/tables/) | Tabel harus menjelaskan relasi data, punya header jelas dan sel mudah dipindai; jangan memakai tabel hanya untuk kosmetik | Tabel data: header setiap kolom; hindari merge/nested table; pindahkan data lebar atau sangat panjang ke Sheets | Saran minimum baris/kolom untuk web tidak diberlakukan sebagai larangan tabel metadata kecil di Docs |
| [W3C WAI tables tutorial](https://www.w3.org/WAI/tutorials/tables/) | Header data dan relasinya penting bagi pembaca serta assistive technology | Definisikan header/label; jangan hanya mengecat baris untuk mengklaim tabel aksesibel | WAI HTML spesifik; Google Docs/PDF punya mekanisme berbeda dan tidak otomatis memiliki tagging setara |
| [WCAG 2.2](https://www.w3.org/TR/WCAG22/) | Teks biasa target kontras minimum 4,5:1; teks besar 3:1 (kriteria 1.4.3 untuk konten web) | Tetapkan minimal 4,5:1 untuk semua teks internal sebagai target yang lebih konsisten; periksa warna lewat perhitungan nyata | Bukan sertifikasi WCAG bagi PDF Google Docs; perlu audit terpisah, PDF export tidak menjamin PDF/UA |
| [USWDS Typography](https://designsystem.digital.gov/components/typography/) | Hierarki tipografi, ukuran baris, dan batas panjang baris membantu keterbacaan; web longform 45–90 karakter/baris | Uji dokumen pada zoom 100%, jangan memaksakan body terlalu lebar / justified; gunakan ritme heading yang tenang | Rentang karakter berasal dari desain web; bukan batas kaku untuk halaman A4 |
| [Section508 Accessible Spreadsheets](https://www.section508.gov/blog/accessibility-bytes/accessible-spreadsheets/) | Spreadsheet membutuhkan header dapat dipahami secara programatik, rentang kontinyu, minim merge dan blank spacer | Satu baris data satu record, tabel tanpa merge di area data, heading/freeze/filter, nilai-kosong eksplisit | Panduan federal AS; bukan bukti bahwa Sheets otomatis memenuhi Section 508 |
| [UK Government Analysis Function](https://gss.civilservice.gov.uk/policy-store/making-analytical-publications-accessible/) | Tabel, grafik dan rilis angka perlu konteks, sumber, judul, serta alternatif yang dapat dibaca | Sajikan periode/satuan/status angka; grafik opsional harus menyertakan data sumber dan penjelasan | Tidak berlaku otomatis sebagai standar pelaporan LPDP |
| [Google Docs API: documents](https://developers.google.com/workspace/docs/api/reference/rest/v1/documents) dan [requests](https://developers.google.com/workspace/docs/api/reference/rest/v1/documents/request) | Docs mendukung namedStyleType, spacing, keepWithNext, keepLinesTogether, avoidWidowAndOrphan, native tables, styles | Implementasikan heading semantik dan aturan halaman melalui Docs; periksa ulang indeks/tab/hasil render | Kemampuan API bukan jaminan page fit ketika placeholder diisi panjang |
| [Google Sheets API: number/date formats](https://developers.google.com/workspace/sheets/api/guides/formats) dan [GridProperties](https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets/sheets) | Nilai/formula terpisah dari tampilan angka; locale memengaruhi format; freeze rows tersedia | Pisahkan nominal dasar dari formatting Rp, persen & tanggal; cek locale id_ID, formula, freeze, grid bounds | Tidak membuktikan kebenaran RAB/bukti transaksi |
| [EYD Edisi V](https://ejaan.kemendikdasmen.go.id/eyd/) | Pedoman bahasa Indonesia resmi termasuk kapitalisasi, tanda baca dan penulisan kata | Gunakan bahasa Indonesia baku, jelas, dan istilah konsisten, kecuali nama/istilah resmi sumber wajib persis | EYD mengatur ejaan, bukan font, jenis laporan, atau keabsahan pengeluaran |
| [Peraturan ANRI No. 5/2021](https://peraturan.bpk.go.id/Details/173489/peraturan-anri-no-5-tahun-2021) | Pedoman umum tata naskah dinas tersedia | Rujukan saat membandingkan naskah dinas, jika kategori dan instrumen proyek relevan | Tidak otomatis mengikat semua penerima bantuan; periksa perjanjian/Juknis berlaku |
| [Peraturan ANRI No. 5/2025](https://peraturan.bpk.go.id/Details/316786/peraturan-anri-no-5-tahun-2025) | Mengatur tata naskah dinas **di lingkungan ANRI** | Contoh pentingnya memeriksa lingkup institusi dan tahun | **Bukan** pengganti otomatis Peraturan ANRI No. 5/2021 untuk semua instansi |

## Konflik dan penyesuaian yang diselesaikan

1. **Tabel metadata vs tabel kosmetik.** Master 01 saat ini memakai tabel key–value 3×2 untuk identitas. Itu masih dapat dipertahankan sebagai struktur metadata yang memadankan label/nilai, bukan alat untuk memosisikan dua kolom dekoratif. Tetapi harus diuji urutan baca dan format PDF; untuk label tunggal pendek bisa memakai paragraf saja.
2. **Ukuran teks.** Master 01 pernah memakai body 10–10,5 pt dan catatan 8,5–9 pt. Sementara GOV.UK menyarankan minimal 12 pt untuk dokumen aksesibel yang dipublikasikan. Keputusan: default internal body 11,5 pt, default publikasi 12 pt; font lebih kecil hanya untuk metadata ringkas atau tabel padat ketika benar-benar diperlukan, tidak untuk paragraf utama. Ini **pilihan desain internal**.
3. **Satu halaman.** Master placeholder yang muat satu halaman belum tentu muat setelah diisi. QA harus menguji isi ringkas, normal dan panjang, bukan memberi syarat satu halaman untuk semua laporan.
4. **Teks rata kiri vs justified.** Default rata kiri, tidak memaksakan rata kanan-kiri. Format resmi boleh berbeda jika diwajibkan.
5. **WCAG vs PDF.** Target kontras 4,5:1 diadopsi, namun PDF hasil Google Drive **tidak otomatis** memenuhi tag, urutan baca, atau semua kriteria WCAG/PDF/UA.
6. **Bentuk resmi vs desain.** Aspek visual internal adalah rekomendasi saat tidak ada format wajib. Jika format resmi ditemukan dan berlaku, presisi format tersebut menjadi prioritas; pelaporan kelemahan aksesibilitasnya tidak memberi izin mendesain ulang sepihak.
7. **Excel sebagai perantara.** Tidak dipakai. Generator menulis langsung Google Docs/Sheets/Slides; PDF hanya turunan untuk cetak/inspeksi/pengajuan bila diminta.

## Model mutu hasil: lima lapisan

- **Information architecture:** pembaca, keputusan, urutan informasi dan jenis output tepat.
- **Content fidelity:** sumber asli, status rencana/realisasi/UNKNOWN, perhitungan dan rujukan tepat.
- **Visual hierarchy:** tingkat judul jelas, kontras cukup, whitespace, tabel/grafik fungsional.
- **Native & accessibility:** elemen Google asli, headings/tabel/range semantik, bukan screenshot; kemampuan layar-baca diverifikasi bila diperlukan.
- **Delivery & review:** versi sumber, evidence, ekspor dan persetujuan dibedakan, master tidak ditimpa.

Tidak boleh menyebut hasil "profesional/siap produksi" hanya dari jumlah halaman dan metadata. Semua gate visual harus dilakukan pada **isi representatif** dan tercatat.

## Hasil dan lokasi kanonis

- **Aturan eksekusi yang dituju:** [QUALITY-STANDARD.md](../../templates/google-native/QUALITY-STANDARD.md).
- **Pilihan struktur menurut jenis dokumen:** [DOCUMENT-PROFILES.md](../../templates/google-native/DOCUMENT-PROFILES.md).
- **Token format default yang dibaca sistem:** [design-tokens.json](../../templates/google-native/design-tokens.json).
- **Catatan riset ini:** argumen, rujukan primer, batas transfer dan keputusan yang masih perlu diuji. Jangan menduplikasi daftar sumber ke tujuh skills.

## Belum dilakukan / bukan klaim

Tidak melakukan audit PDF/UA dengan screen reader atau pemeriksaan substantif laporan dana sebenarnya; belum ada uji regresi long-content pada semua master dan belum ada review/legal sign-off format resmi tertentu. Standar ini **bukan** rekomendasi mengubah file administratif yang sudah diajukan.
