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


## 0.7.0 — 2026-11-03 (evidence & procurement guidance)

- Memperluas Evidence & Audit melalui Claim-to-Evidence dan rujukan bukti pengeluaran.
- Menambahkan domain Procurement sebagai modul logis (tanpa skill/agen ke-8), termasuk Price Comparison dan serah terima.
- Menyediakan empat template kosong untuk bukti, pengadaan, pembanding, dan penerimaan hasil.
- Membedakan aturan LPDP dan rujukan metode LKPP berdasarkan ruang lingkup serta keberlakuan.
- Tidak menjalankan tes, tidak menambah fitur runtime, tidak mengunggah data proyek rahasia.

## 0.8.0 — 2026-11-03

- Creative Production memperoleh lima kontrak domain, empat template dan keputusan desain.
- Tidak menambah skill/agen, database museum, atau integrasi eksternal.
- Data privat tidak disalin, tes tidak dijalankan.

## 0.9.0 — 2026-11-03 (dissemination & rights)

- Lima kontrak rights: kegiatan publik, izin karya, platform Minecraft, branding pendanaan dan DJKI.
- Empat template kosong untuk kegiatan, matriks lisensi, review publikasi, dan pencatatan ciptaan.
- Memisahkan hak cipta otomatis, pemegang hak, surat pencatatan serta izin pihak ketiga.
- Menambahkan pemeriksaan risiko promosi oleh organisasi melalui Minecraft tanpa menyatakan izin otomatis.
- Tetap tujuh skill; tidak ada data rahasia, uji runtime, QA, atau pengiriman eksternal.

## 1.0.0 — 2026-11-03 (regulatory design)

- Lima prosedur Regulatory Intelligence: Source Intake, Applicability, Temporal/Contract, Conflict Escalation, Compliance Handoff.
- Empat template kosong dan satu keputusan arsitektur untuk aturan bersyarat.
- Perluasan source discovery: Kategori 2025, SBM 2025/2026/2027, dan kerangka hierarki hukum.
- Handoff ke Finance, Administration, Procurement, Evidence, Production, Rights dan Writing.
- Tidak menambah skill kedelapan, automatic compliance engine, data privat, atau hasil QA.
 
## 1.1.0 — 2026-11-03 (documentation consolidation)

- Merampingkan router utama, README, konteks, indeks dokumentasi dan matriks tujuh skill.
- Memperjelas ownership tujuh skill vs procurement sebagai modul pendukung serta sumber persetujuan eksternal.
- Menyatukan tambahan kronologis tujuh kontrak domain menjadi referensi current-state; pedoman rinci tetap pada lokasi lama.
- Menghindari instruksi "QA tidak boleh" yang permanen; fase QA saat ini masih ditunda sesuai permintaan pengguna.
- Mengonsolidasikan planning menjadi status/backlog saat ini; riwayat tetap di changelog.
- Tidak menambah agen, modul, template, runtime feature, tes atau data proyek privat.

## 1.2.0 — 2026-11-03 (Google Drive metadata bridge P0/P1)

- Menambahkan Source Resolver read-only berbasis Google Sheets registry dan Drive metadata, dengan pemilihan ID yang ketat dan laporan perubahan metadata.
- Menetapkan satu Document Registry privat sebagai indeks, tanpa menduplikasi berkas, anggaran atau bukti ke Git publik.
- Menambahkan audit metadata dan penemuan file belum terindeks yang dibatasi folder serta batas item; tidak ada auto-sync atau modifikasi dokumen.
- Menautkan instruksi penggunaan dan guardrail dari router, konteks, README, dan backlog.
- Tes sintetis ditulis, tetapi **belum dijalankan** sesuai penundaan QA; integrasi autentikasi lokal memerlukan OAuth read-only dan belum dinyatakan lulus uji end-to-end.

## 1.3.0 — 2026-11-03 (P2 Drive Workflow Bridge)

- Menambahkan rute source-pointer untuk sembilan tugas operasional yang melibatkan ketujuh skill yang sudah ada; tidak menambah skill atau registry.
- CLI read-only mendukung `handoff --workflow` dan `--select` untuk pilihan ID eksplisit. Sumber ambigu, belum terindeks, dan metadata yang berubah tidak dipaksa dianggap sah.
- Handoff mempertahankan pemilik utama, sumber minimum dan pemeriksaan lintas domain kondisional; approval/isi dokumen tidak diinferensikan dari metadata.
- Instruksi ChatGPT connector-assisted dan OAuth CLI lokal dipisahkan secara jelas; berkas privat tetap tidak masuk Git publik.
- Tes sintetis ditulis dan integrasi source-pointer disusun, tetapi runtime/QA dan verifikasi end-to-end **NOT EXECUTED** sesuai penundaan saat ini.

## 1.4.0 — 2026-11-03 (P3 Drive change impact preview)

- Menambahkan `impact` command read-only untuk membandingkan nama/tanggal modifikasi metadata dokumen Drive dengan baseline Registry privat.
- Membedakan `METADATA_CHANGE_SIGNAL`, `METADATA_UNVERIFIED`, dan `METADATA_MATCH_ONLY`; perubahan metadata bukan pembuktian perubahan isi.
- Menambahkan satu kolom opsional `derived_from_ids` ke Registry privat untuk menelusuri keluaran `DERIVED_OUTPUT` yang benar-benar bergantung pada sumber tertentu. Tidak menduplikasi registri proyek dan tidak mengubah sembilan entri lama.
- Dampak report ditandai sebagai kandidat review dan propagasi transitif berbasis dependensi eksplisit, tanpa mengasumsikan `related_ids` sebagai hubungan derivasi.
- Mengeluarkan kandidat workflow terpengaruh dan opsional penemuan file tidak terindeks; tidak menulis ke Drive, GitHub publik, laporan, persetujuan, atau e-RISPRO.
- Tes sintetis ditulis tetapi **NOT EXECUTED**; autentikasi OAuth lokal dan QA end-to-end tetap belum dilaksanakan sesuai status fase ini.

## 1.5.0 — 2026-11-03 (P4 controlled review queue)

- Menambahkan satu tab `Review Queue` pada Document Registry privat; tidak membuat database kedua dan tidak memasukkan data proyek nyata ke Git publik.
- P4 membuat kandidat review deterministik berdasarkan fingerprint metadata P3, mendeteksi temuan baru, sedang ditinjau, sudah diperiksa manusia dan yang tidak lagi terdeteksi tanpa auto-close.
- CLI `review --mode summary|details` membaca Google Sheets + Drive dengan OAuth read-only, tanpa menulis antrean, sumber, status eksternal, atau e-RISPRO. Mode summary menghindari paparan ID dokumen di keluaran terjadwal.
- Wrapper Windows `tools/run-drive-review.ps1` disiapkan untuk pemanggilan operator/scheduler privat. Tidak mengaktifkan jadwal atau menyimpan token.
- Pencarian sumber proyek menunjukkan folder pelaporan utama kosong; format contoh dan file KOL di luar folder tidak otomatis didaftarkan sebagai laporan turunan.
- Skenario tes sintetis ditambahkan, tetapi **NOT EXECUTED** karena penundaan QA. OAuth lokal, runtime end-to-end dan penjadwalan sesungguhnya belum diverifikasi.

## 1.6.0 — 2026-11-03 (P5 report onboarding preview)

- Menambahkan `tools/drive-output-onboarding.mjs` dan CLI `onboard-output` untuk mengusulkan satu entri `DERIVED_OUTPUT` dari file asli yang sudah ada, **tanpa registrasi otomatis**.
- Memvalidasi lokasi di bawah folder pelaporan yang ditentukan di dalam root proyek melalui rantai parent Google Drive, mengecek tipe berkas, URL, duplikasi ID/file, dan sumber `derived_from_ids` yang dipilih eksplisit.
- Menampilkan rekap tanpa ID privat secara default dan draf baris 16 kolom hanya dengan `--mode details`; status tetap `UNVERIFIED` dan `UNKNOWN` sampai review isi serta otorisasi pencatatan.
- Menambah [panduan P5](docs/integrations/report-onboarding.md) dan petunjuk pada Sheet privat yang sama, tanpa membuat database baru.
- Folder pelaporan utama proyek masih kosong saat diperiksa; contoh laporan dan KOL di luar folder **tidak diimpor** atau diberi relasi yang tidak terbukti.
- Skenario uji sintetis tersedia tetapi QA runtime dan OAuth CLI end-to-end **NOT EXECUTED** sesuai fase pengembangan. Branch `develop` saja; tidak mempromosikan ke `Local` atau `main`.

## 1.7.0 — 2026-11-03 (P0–P5 safety and coverage hardening)

- Review Queue now verifies that each existing `review_id` cryptographically matches its finding type, document ID and metadata fingerprint, preventing misattributed closed findings from suppressing current review candidates.
- Review timestamps must be timezone-aware ISO values in chronological order; malformed or reversed entries fail closed.
- The `review --mode summary` read-only output now includes safe coverage metrics: indexed documents, metadata checked, registered derived outputs, folder inventory status, and explicit limitations on content/approval checks. A zero-finding result is not presented as complete project verification.
- P5 onboarding requires the supplied verified ancestry to start with the source file's actual immediate parent and terminate at the declared project root; forged or inconsistent ancestry is rejected.
- Regression scenarios use synthetic test data only. No QA/runtime execution, live OAuth CLI acceptance, project-source modifications, scheduling changes, or branch promotion occurred.

## 1.8.0-dev — 2026-11-03 (Google-native template foundation T1)

- Menetapkan Google Drive, Docs, Sheets dan Slides sebagai satu-satunya jalur dokumen editable; PDF ekspor opsional, tanpa Microsoft Office.
- Menambah enam definisi katalog internal, kontrak tab `Template Masters` dalam Registry privat yang sama dan pure JavaScript planner untuk permintaan Docs/Sheets.
- Menjaga master tetap read-only, memeriksa versi/metadata, memblokir template resmi yang belum direview dan menghasilkan DRAFT bukan approval.
- Menambahkan tes sintetis untuk validasi katalog, input, keamanan Sheets, dan kapasitas grid. Kandidat diuji lokal; **tanpa** tes Google API, file master Drive, modifikasi sumber proyek, atau promosi branch.

## 1.8.1-dev — 2026-11-03 (Google-native Master 01 / T2)

- Dengan instruksi pengguna, membuat folder master Google-native di Drive privat proyek, menambahkan tab `Template Masters` ke Document Registry yang sama, serta mengisi satu baris master internal.
- Membuat master Google Docs native `di.report.indicator@1.0.0` dengan format A4, heading dan sembilan placeholder tepat satu kali sesuai katalog.
- Memeriksa pembacaan ulang Docs, parent/MIME/modifiedTime master, header dan data Registry serta dropdown status/authority. Status `READY` hanya berarti master **internal** tersedia untuk disalin; bukan approval dokumen atau format resmi.
- Tanpa ID/file proyek privat di Git publik; tab lama tidak diubah, master lain belum dibuat. Uji copy-fill otomatis, PDF/visual dan pembatasan akses editor belum dijalankan.

## 1.8.2-dev — 2026-11-03 (visual quality gate)

- Merevisi master internal `di.report.indicator@1.0.0` langsung di Google Docs: hierarki tipografi, empat heading, tabel metadata native 3×2, garis dan border halus, serta menghapus instruksi internal berlebihan.
- Melakukan pemeriksaan struktur Docs serta ekspor PDF untuk inspeksi visual: A4 satu halaman, tanpa clipping/overlap, sembilan placeholder tepat sekali. Menyelaraskan `observed_modified_time` dan status `READY` internal pada Registry privat.
- Menambahkan standar mutu visual master Google-native berikut gate untuk Docs, Sheets, Slides serta larangan filler, ornamen dan klaim resmi palsu.
- Belum menjalankan uji generator copy-and-fill berisi data panjang, QA dokumen proyek nyata, atau pemeriksaan formulir resmi. Tidak ada file ID/sumber privat dipublikasikan pada repository.

## 1.8.3-dev — 2026-11-03 (evidence-based document design research)

- Merangkum sumber primer untuk mutu dokumen Google-native: ISO 24495, GOV.UK, W3C, USWDS, Section508, Google Workspace API, EYD V dan lingkup aturan ANRI.
- Menyusun aturan desain yang berbasis pembaca, tujuh profil fungsional, token internal machine-readable, batas aksesibilitas dan QA terpisah untuk master serta hasil terisi.
- Mengubah fokus kualitas dari "template satu halaman tampak rapi" menjadi informasi relevan, struktur native, identitas/status jelas, layout siap konten nyata, dan sumber tertelusur.
- Belum menjalankan uji master terisi, audit PDF/UA/screen reader, evaluasi dokumen resmi per kategori/tahun, atau pengembangan renderer/penulisan Drive baru. Master 01 tidak diubah pada fase riset ini.

## 1.8.4-dev — 2026-11-03 (human-readable Google Docs guide)

- Membuat ringkasan pedoman v2.0 sebagai **Google Docs native DRAF** dalam folder privat pedoman proyek (bukan master laporan dan bukan format resmi).
- Memeriksa heading semantik, tautan sumber dan lokasi folder; melakukan ekspor PDF untuk inspeksi layout. Temuan halaman keempat yang hanya berisi tautan dihapus; hasil akhir 3 halaman A4 tanpa halaman kosong ekstra.
- Detail machine-readable dan sumber rujukan tetap di GitHub. Tidak membuat sinkronisasi otomatis, tidak menyalin dokumen proyek, tidak menjalankan QA output proyek nyata atau audit PDF/UA.

## 1.8.5-dev — 2026-11-03 (Master 01 long-content validation)

- Menjalankan QA pengisian master Google Docs v1.0.0 dengan data sintetis pendek/normal/panjang, menemukan halaman akhir 14,7% dan 8,6% pada output multi-halaman.
- Membuat master v1.1.0 sebagai file baru (v1.0.0 tetap sebagai riwayat), menyesuaikan font isi 11,5 pt, jarak baris, margin, lebar tabel, serta menghilangkan footer instruksi internal.
- Mengisi tiga salinan v1.1.0 dengan konten sintetis **identik** dan memeriksa Google Docs serta ekspor PDF. Hasil: 1/2/3 halaman; coverage akhir 73,9% / 50,4% / 44,3%. Pada salinan normal, page break sebelum bagian `Capaian` diterapkan secara kondisional; tidak mengubah master.
- Menambahkan helper QA murni dan tes sintetis untuk placeholder, heading, tabel, page-break aman, serta deteksi halaman akhir sangat kosong. **Unit test baru belum dieksekusi pada commit ini**; pemeriksaan Google Drive/PDF telah dilaksanakan.
- Tidak ada data proyek privat, ID Drive, receipt resmi, atau PDF pengujian yang masuk repository publik. QA laporan proyek nyata, visual aksesibilitas, dan executor otomatis penuh belum selesai.

## 1.8.6-dev — 2026-11-03 (formal Indonesian report candidate)

- Membuat kandidat Google Docs `di.report.indicator@1.2.0` dengan Times New Roman, tata letak formal monokrom, judul tengah, identitas tanpa tabel dekoratif, empat heading, dan 9 placeholder yang sama.
- Menguji 3 salinan sintetis dan 1 contoh narasi fiktif yang disunting; QA hasil render menemukan page break perlu diterapkan pada output normal/panjang saja. Contoh fiktif selesai satu halaman A4.
- Kandidat `NEEDS_REVIEW` pada Registry privat; v1.1.0 tetap `READY`, v1.0.0 `RETIRED`.
- Tidak ada ID Google Drive privat, data proyek asli, atau bukti palsu di GitHub publik. Tidak ada klaim kepatuhan format resmi ataupun executor end-to-end otomatis.

## 1.8.7-dev — 2026-11-03 (scholarly report typography, EYD italic)

- Menetapkan pedoman redaksi ilmiah dan huruf miring bersumber EYD V, membedakan laporan kegiatan dari artikel ilmiah dan sitasi APA 7 yang hanya diterapkan bila relevan/diwajibkan.
- Master Google Docs `di.report.indicator@1.2.0` diperbaiki: 3 subjudul menjadi `HEADING_2` tebal-tegak, status draf tegak, dan font Times New Roman diterapkan eksplisit hingga text run tanpa pewarisan Arial yang terlihat.
- Satu salinan laporan ilmiah fiktif 1 halaman dan satu salinan konten panjang 3 halaman telah diisi serta diperiksa render PDF; sembilan placeholder terganti, tanpa italic dekoratif. Page break untuk konten panjang hanya pada salinan.
- Membuat `tools/google-native-typography-qa.mjs` dan lima tes sintetis yang lulus dalam V8 test harness; Node runner belum dijalankan.
- Registry privat kini memilih v1.2.0 = `READY` INTERNAL, v1.1.0/v1.0.0 = `RETIRED`; metadata Drive telah cocok saat diperiksa. Belum ada QA substantif laporan proyek, PDF/UA, atau persetujuan format resmi.

## 1.8.8-dev — 2026-11-03 (approved document production baseline)

- Menetapkan pedoman dasar yang disetujui sebagai kontrak kanonis internal untuk seluruh dokumen Google-native, dengan hierarki sumber resmi, kebutuhan pembaca, kebenaran fakta, lalu desain.
- Membuat pedoman baca-manusia langsung di Google Docs privat proyek; render A4 dua halaman ditinjau, dengan Times New Roman, heading tebal-tegak, dan tanpa italic dekoratif.
- Mengikat gerbang penyuntingan human writer yang operasional: substansi spesifik, alur wajar, tanpa filler, repetisi, konektor mekanis, atau klaim yang melampaui sumber.
- Memperbarui AGENTS router, owner creative-documentation, standar Google-native, design tokens, README, indeks dan roadmap; tanpa skill/agen kedelapan.
- Master 01 v1.2.0 tetap READY INTERNAL. Belum ada audit isi laporan proyek nyata, klaim format pemerintah atau executor editorial otomatis.

## 1.8.9-dev — 2026-11-03 (Google-native spreadsheet foundation)

- Menetapkan [Standar Spreadsheet Profesional](templates/google-native/SPREADSHEET-STYLE.md) di bawah pedoman dasar yang sudah disetujui; fokus tabel rapi, angka asli, tanggal DATE, keterlacakan sumber dan tampilan sederhana tanpa dashboard AI.
- Membuat Master Sheets 01 `di.procurement.price-comparison@1.0.0` native di Google Drive: tab `Perbandingan`, metadata B2:B4, tabel A8:E67 (60 baris), format harga Indonesia dan validasi nonnegatif/tanggal.
- Menguji 4 penawaran sintetis pada salinan; nilai harga tersimpan numerik, tanggal 03 November 2026 adalah date serial 46329, dan input master tetap kosong. Master didaftarkan READY INTERNAL dalam Registry privat yang sama.
- Memperbaiki planner Google-native agar date ISO diubah ke serial Sheets dan metadata salinan konektor `mime_type` diterima. 7 unit tests planner PASS melalui V8 harness, bukan runner Node.
- Pemeriksaan browser/zoom Google Sheets, legalitas pengadaan, data harga/vendor asli, dan formula keuangan kompleks belum dilakukan. Tidak ada file XLSX atau data privat di GitHub.

## 1.8.10-dev — 2026-11-03 (price comparison spreadsheet layout refinement)

- Membuat salinan master Google Sheets `di.procurement.price-comparison@1.1.0` untuk desain yang lebih profesional; v1.0.0 tidak ditimpa dan tetap READY sementara.
- Merapikan judul dan metadata di atas tabel menggunakan merge terbatas **di luar data A7:E67**; header navy tunggal, banding native pucat, filter, gridlines disembunyikan, kolom dan pemformatan ulang.
- Menguji 8 penawaran sintetis (termasuk teks panjang dan literal `=100+1`) dengan format tanggal/harga asli, tanpa formula yang tidak diperlukan; menemukan autoResize dapat mengecilkan tinggi baris menjadi 21px dan memperbaikinya dengan ukuran terukur.
- Registry privat menyimpan v1.1.0 sebagai `NEEDS_REVIEW`; v1.0.0 tetap `READY`. Screenshot native browser belum dapat diverifikasi; tidak ada klaim format resmi atau bukti harga asli. Detail [QA](docs/qa/master-sheets01-visual-refinement-2026-11-03.md).

## 1.8.11-dev — 2026-11-03 (professional minimalist Sheets candidate v1.2.0)

- Mengganti pendekatan v1.1.0 yang terlalu lebar/berwarna/banyak merge dengan **v1.2.0 tanpa merge** pada salinan native Google Sheets baru. Tata letak lebih kompak (1.032 px), header terang, teks gelap, tinggi baris lebih wajar, data tabel tetap A8:E67.
- Menguji 8 penawaran sintetis di copy terpisah: semua harga numberValue dan tanggal DATE, literal berawalan `=` bukan formula, 0 error sel. Tinggi baris contoh diukur dan dibaca ulang dari rowMetadata.
- Memeriksa dokumen publik 2025 untuk konteks survei/perbandingan harga; keberlakuan terhadap proyek tiap tahun tetap belum dipastikan.
- Registry tetap tunggal: v1.2.0 `NEEDS_REVIEW`, v1.1.0 `RETIRED`, v1.0.0 `READY` lama. Screenshot native Sheets dan pengaturan print belum diuji, tidak ada klaim format resmi.

## 1.8.12-dev — 2026-11-04 (provisional approval for Master Sheets 01)

- Mencatat persetujuan sementara pengguna terhadap master harga referensi `di.procurement.price-comparison@1.2.0` dan menaikkan `Template Masters` privat menjadi `READY` untuk penggunaan internal, tanpa mengubah isi atau nama master.
- v1.0.0 tetap `READY` sebagai fallback lama; v1.1.0 `RETIRED`. Pemilihan master tetap harus memakai ID dan versi eksplisit.
- Pemeriksaan UI Google Sheets pada zoom 100%, print A4, dan kepatuhan pengadaan resmi masih NOT_EXECUTED; persetujuan ini bukan klaim PASS untuk semua gate.

## 1.8.13-dev — 2026-11-04 (professional RAB template Excel and Google Sheets)

- Menghasilkan template RAB Excel (.xlsx) profesional atas permintaan pengguna, berisi tiga tab RAB/REKAP/PANDUAN, 100 pos, input yang terpisah dari rumus, subtotal dan pemeriksaan pos belum lengkap. Tidak ada data proyek asli.
- Membuat padanan Google Sheets native secara langsung di folder master privat dengan struktur, rumus dan warna yang selaras; tidak melakukan import XLSX sebagai perantara. Satu salinan QA sintetis menghasilkan total Rp5.150.000 dengan satu pos tidak lengkap dan rekap tahap/kategori yang benar.
- Memperbaiki rumus Google Sheets locale `in_ID` memakai separator `;` dan mengganti repeatCell yang tidak menyesuaikan referensi baris dengan 100 formula eksplisit. Master native tidak mempunyai parse error setelah koreksi.
- Menambahkan blueprint RAB dan kontrak planner B11:I110; sumber K/catatan L masih isi manual. Enam jenis template publik sebelumnya menjadi tujuh, dengan kontrak anggaran baru `di.finance.rab-plan@1.0.0` dalam status NEEDS_REVIEW di Registry privat.
- Delapan tes planner sintetis lulus V8 harness; belum ada uji Node, tampilan browser Google Sheets, pengaturan cetak, atau sertifikasi format resmi.

## 1.8.14-dev — 2026-11-04 (RAB v2.1.0 design and data integrity)

- Merapikan Excel RAB v2.1: 100 pos, rekap vertikal, panduan, kondisi kosong-vs-nol, dan formula pengelompokan tahap serta kategori.
- Membuat Master RAB v2.1 Google Sheets native dari salinan master asli, bukan impor Excel, lalu memperbarui desain dan formula sesuai locale Indonesia. Master lama tetap tersimpan.
- QA sintetis 4 pos: total Rp7.750.000, pagu Rp10.000.000, sisa Rp2.250.000, tahap 1/2/3 Rp3.850.000/Rp3.000.000/Rp900.000. Tanpa frekuensi status PERLU PEMERIKSAAN, setelah dipulihkan SESUAI INPUT.
- Memperbaiki rumus desimal yang tidak diparse locale Indonesia, menghindari frozenColumnCount yang berbenturan dengan judul merged dan menjaga zona input formula tetap terpisah.
- Registry privat baru mencatat v2.1.0 NEEDS_REVIEW dan v2.0.0 RETIRED; UI browser, pengaturan cetak dan kesesuaian format resmi tetap belum diverifikasi. Tidak ada data privat ditambahkan ke Git.

## 1.8.15-dev — 2026-11-04 (LRA & cash reporting template v1)

- Menambah paket LRA/Arus Kas Google Sheets native dan workbook Excel `.xlsx` internal, dengan LRA sebagai sheet pertama, Arus Kas kedua dan Panduan ketiga. Masing-masing mempunyai 100 pos dan 150 transaksi.
- Pengeluaran yang masuk LRA harus berkode RAB cocok, berstatus DIPERIKSA dan tanpa kesalahan bukti; transaksi DRAF dan referensi bermasalah ditahan. Saldo kas awal 0 yang eksplisit dipisah dari tidak ada data.
- QA sintetis pada kedua media: pagu Rp4.000.000, realisasi Rp1.300.000, sisa Rp2.700.000, kas masuk Rp3.000.000, kas keluar Rp1.400.000, saldo akhir Rp1.600.000; voucher duplikat dan kode tidak dikenal diuji.
- Registry privat menandai master baru NEEDS_REVIEW. Tidak ada real transaction/vendor/bank data ditambahkan ke repo; browser/print resmi belum diuji. Referensi pedoman pemerintah 2025 hanya untuk struktur, dengan keberlakuan tahun/kategori kondisional.

## 1.8.16-dev — 2026-11-04 (evidence and change-control masters)

- Membuat master Checklist Pemeriksaan Bukti dan Matriks Revisi Dokumen v1.0.0 sebagai Google Sheets native, masing-masing dengan tab data utama dan PANDUAN; 100/80 baris dan alamat binding sama dengan katalog.
- Menyediakan padanan Excel (.xlsx) secara terpisah. UI dibuat sederhana, satu header, baris selang-seling ringan, freeze/filter dan nilai referensi sebagai teks.
- Checklist memakai dropdown ketat `INCOMPLETE`, `NEEDS_REVIEW`, `CHECKED_INTERNAL`, `NOT_EXECUTED`; matriks perubahan membiarkan kolom referensi keputusan kosong bila belum ada persetujuan.
- Menguji tiga baris sintetis pada salinan terpisah, memeriksa metadata, MIME, format/header dan tidak ada data fiktif pada master. Import Excel ke Google Sheets tidak tersedia; master native ditulis langsung.
- Registry privat menambahkan kedua versi sebagai NEEDS_REVIEW, bukan approval final. Screenshot Google Sheets/print, kelayakan format resmi, dan isi bukti/keputusan nyata belum diverifikasi. [QA](docs/qa/master-evidence-revision-2026-11-04.md).

## 1.8.17-dev — 2026-11-04 (creative and administrative Google Docs masters)

- Menyelesaikan dua master Google Docs native: `di.report.creative-narrative@1.0.0` dan `di.admin.package@1.0.0`, dengan 6 dan 7 placeholder katalog tetap utuh.
- Mengikuti pedoman penulisan formal: A4, Times New Roman, lima heading semantik, status draf tegak, tanpa tabel/italic dekoratif. Naskah contoh bersifat spesifik tetapi sepenuhnya sintetis.
- QA Docs readback dan PDF: master 1 halaman, isi normal 1 halaman, isi panjang 2 halaman pada masing-masing. Halaman tambahan kosong dari paragraf terminal dikoreksi; page break pada uji panjang dibuat hanya pada salinan output.
- Kedua master terdaftar NEEDS_REVIEW dalam Registry privat yang sama. Semua delapan jenis template katalog telah diwujudkan sebagai master native, tetapi tidak seluruhnya READY; data nyata, aturan resmi, PDF/UA dan screen reader belum diverifikasi. [QA](docs/qa/master-docs02-03-2026-11-04.md).
