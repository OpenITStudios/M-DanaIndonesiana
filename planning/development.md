# Development Plan — Current State (v1.7)

**Ini backlog kerja sistem, bukan izin otomatis untuk menjalankan semua item.** Riwayat implementasi v0.1–v1.0 berada di [CHANGELOG](../CHANGELOG.md).

## Agent Rules 2026-11-12 — source-only, testing ditunda

- [x] Mengadopsi disiplin prompt terpilih dari M-LazyDesigner dan sampel sistem prompt publik sebagai **metode**, bukan instruksi vendor.
- [x] Menjadikan root AGENTS.md pemilik utama: goal-first, mode dan otoritas, tujuh skill, trust boundary, progressive context, proof ceiling, STOP.
- [x] Dokumentasi mendalam hanya untuk trigger: `docs/skills/agent-rules.md`; mapping sumber di `docs/research/agent-prompt-patterns-2026-11-12.md`.
- [x] Menetapkan hanya develop untuk source mutation, tidak membuat branch baru atau PR antarbranch, tanpa Local/main.
- [x] Mengubah CI menjadi manual-only selama hold agar tidak memicu tes otomatis.
- [x] Merampingkan jalur wajib AGENTS, merumuskan context-selection dan owner berdasarkan deliverable, serta handoff minimum (source-only, tanpa test).
- [ ] Mengukur kualitas/routing/biaya ke hasil yang diterima setelah tes diizinkan; tidak mengarang persentase peningkatan.
- [ ] Efektivitas pada model/agent nyata: **NOT_EXECUTED / HOLD BY USER**. Jangan melakukan testing sampai ada izin baru.

## Sudah tersedia

- [x] Tujuh skill dengan kontrak domain, aturan sumber, bukti, dan privasi.
- [x] Prosedur keuangan, administrasi, writing, evidence, procurement, produksi, rights dan regulatory.
- [x] Prototipe kalkulasi JSON dan exporter XLSX dua lembar berbasis data sintetis.
- [x] Template kosong dipakai hanya jika ada kebutuhan.
- [x] v1.1: router, konteks, pemilik data dan dokumentasi navigasi diringkas.

- [x] P0/P1 kode Source Resolver read-only dan kontrak registry; satu indeks privat proyek dibuat di Google Drive. Status pengujian: NOT EXECUTED; tidak otomatis menyinkronkan metadata.
- [x] P2 kode Workflow Bridge read-only: rute sumber ketujuh skill, selection ambiguity, status metadata dan handoff terstruktur; dokumentasi operasional serta tes sintetis ditulis tetapi belum dieksekusi.
- [x] P3 change-impact preview: membandingkan metadata, memeriksa ketidakpastian, dan memetakan kandidat review turunan dari dependensi eksplisit. Kolom `derived_from_ids` opsional ditambahkan ke Registry privat; belum ada laporan turunan yang didaftarkan.

- [x] P4 Review Queue: tab privat pada Registry yang sama, deduplikasi event metadata, status manual dan CLI review read-only; wrapper PowerShell untuk pemakaian terjadwal bila disetujui. Tes sintetis ditulis tetapi belum dijalankan.
- [x] Pemeriksaan kandidat laporan proyek: folder pelaporan proyek kosong; contoh format dan KOL di folder terpisah tidak otomatis ditetapkan sebagai laporan turunan resmi.

- [x] P5 `onboard-output` preview untuk laporan nyata: scope folder+root diperiksa, duplikasi dicegah, dependensi hanya dari ID eksplisit, hasil tetap `UNVERIFIED` sampai review. Petunjuk Registry privat dilengkapi.
- [x] Pencarian laporan ulang di folder pelaporan: masih kosong; **tidak** membuat artefak atau hubungan sumber fiktif.

- [x] v1.7: guard validasi Review Queue, scope parent P5 dan ringkasan cakupan baca; skenario regresi sintetis ditambahkan. **Belum dieksekusi** sesuai QA yang ditunda.

## Belum dapat dinyatakan selesai

- [ ] P2 penerapan langsung pada isi dokumen melalui connector/CLI, pengujian OAuth nyata dan review user terhadap output sumber pada satu tugas nyata. **QA ditunda**.
- [ ] Pembaruan metadata private registry pascareview manual atau secara terotorisasi (belum dibuat); jangan menerapkan auto-sync mutasi tanpa izin.
- [ ] Registrasi laporan dan dependensi untuk **laporan nyata** setelah file tersedia dan substansi diperiksa. P5 baru preview, bukan registrasi final.
- [ ] Konfigurasi OAuth lokal yang aman dan jadwal pemeriksaan aktif hanya jika disetujui; `review` tersedia on-demand tetapi belum otomatis berjalan.
- [ ] Pembaruan status/queue secara eksplisit melalui operator yang berwenang; auto-write dan auto-close tetap tidak ada.

- [ ] Pengujian Node dan Python pada checkout yang sama; pemeriksaan workbook nyata dan kesesuaian format unggah e-RISPRO.
- [ ] Evaluasi perilaku tujuh skill pada skenario sintetis, penilaian manusia atas tulisan dan ketepatan laporan.
- [ ] Verifikasi penerapan aturan pada transaksi/kegiatan nyata oleh pihak berwenang, menggunakan dokumen berizin.
- [ ] Uji kualitas karya digital, keamanan/aksesibilitas, izin, distribusi dan arsip **jika dan ketika** diminta.
- [ ] Promosi `develop` ke `Local`/ `main` melalui proses review yang benar-benar dilaksanakan.

**Instruksi aktif pengguna:** pengujian/QA masih ditunda; jangan jalankan hanya karena daftar backlog. Tidak ada klaim `PASS`, `compliant` atau `approved` berdasarkan penyusunan dokumen.

## Google-native template T1/T2 (master bertahap)

- [x] Menetapkan Google Docs/Sheets/Slides sebagai master dan output editable, PDF hanya ekspor opsional; tidak memakai Office sebagai perantara.
- [x] Menyusun enam definisi template internal dan planner murni untuk field/versi/Google API requests.
- [x] Menulis tes sintetis T1; eksekusi lokal pada kandidat dilakukan, **bukan** QA Google API atau OAuth end-to-end.
- [x] Dengan instruksi pengguna, membuat folder master di Drive proyek dan tab `Template Masters` **di Registry privat yang sama** tanpa memindahkan sumber asli.
- [x] Membuat master Google Docs pertama untuk laporan indikator, memeriksa sembilan placeholder, struktur A4, metadata dan baris Registry.
- [x] Memperbaiki mutu visual Master 01: struktur tabel native 3×2, heading dan tipografi konsisten, membuang instruksi berlebihan; PDF A4 satu halaman telah dirender dan diperiksa. Timestamp di Registry diselaraskan.
- [x] Menetapkan [Standar Mutu Visual](../templates/google-native/QUALITY-STANDARD.md) sebagai gate wajib untuk master berikutnya; tidak mengklaim uji otomatis pengisian berdata panjang.
- [ ] Membuat dan memeriksa **empat master jenis lain** dari katalog, satu per satu; dua jenis master sudah tersedia (Laporan Indikator dan Perbandingan Harga).
- [ ] Memeriksa dan memperketat izin edit master sesuai kebutuhan pengguna tanpa memutus akses yang diperlukan.
- [ ] Menyiapkan executor Google Drive connector dengan preflight, copy-only, readback, bukti hasil dan status DRAFT.
- [ ] Menghubungkan kalkulator Finance JSON ke master Google Sheets dengan formula + QA tanpa converter XLSX.
- [ ] Menyusun jalur PDF ekspor native + layout/readback; mengerjakan kelayakan master format resmi per tahun/kategori.
## Pedoman kualitas dokumen — riset 3 November 2026

- [x] Membandingkan sumber primer ISO 24495, GOV.UK content design/accessibility, W3C WCAG/WAI, USWDS, Section508, Google Docs/Sheets API, EYD V, dan lingkup ANRI.
- [x] Menyusun aturan wajib, profil Docs/Sheets/Slides, token visual berkontras cukup, pemisahan master QA dari filled-output QA dan kode temuan operasional.
- [ ] Review keputusan desain bersama pengguna; aturan internal adalah default, bukan pengganti format resmi.
- [x] Merevisi Master 01 sebagai v1.1.0 tanpa menimpa v1.0.0; menyalin dan mengisi tiga contoh sintetis melalui Google Docs API, memeriksa struktur, export PDF dan perbaikan pagination per-output. [QA rinci](../docs/qa/master01-fill-layout-2026-11-03.md).
- [ ] Menjalankan pengujian screen reader/PDF/UA dan pekerjaan nyata; uji sintetis bukan bukti kelayakan format resmi.
- [ ] Menyelesaikan executor copy-fill-QA yang dapat diulang tanpa supervisi langkah manual; helper pure Docs QA telah ditulis, unit tests masih perlu dieksekusi.
- [ ] Terapkan profil pada Master 02 satu per satu dengan sumber dan hasil render yang benar-benar diperiksa; jangan melakukan batch generator produksi yang belum tervalidasi.

- [x] Membuat master kandidat v1.2.0 untuk layout laporan formal Indonesia (Times New Roman, monokrom, identitas tiga baris); menguji salinan sintetis pendek/normal/panjang dan contoh narasi fiktif, memeriksa PDF dan mengatur page break pada salinan.
- [x] Pengguna menyetujui layout v1.2.0 dengan syarat italic sesuai kaidah; syarat tersebut diperbaiki dan diperiksa, sehingga v1.2.0 `READY` INTERNAL dan v1.1.0 `RETIRED`.

- [x] Menyusun dan menerapkan aturan italic EYD V dengan pengecualian gaya selingkung terverifikasi; subjudul/status tegak dan heading native Google Docs. [Pedoman ilmiah](../kits/dana-indonesiana/writing/ACADEMIC-REPORT-STYLE.md).
- [x] Meninjau master v1.2.0, memperbaiki Arial fallback text runs, dan memeriksa satu contoh ilmiah sintetis (A4 1 halaman) serta long-content (3 halaman dengan page break pada copy saja); [QA](../docs/qa/master01-scholarly-typography-2026-11-03.md).
- [x] Mengaktifkan `di.report.indicator@1.2.0` sebagai `READY` INTERNAL dalam Registry privat, mengarsipkan v1.1.0 dan v1.0.0 sebagai `RETIRED`.
- [ ] Validasi pengisian laporan proyek nyata beserta sumber/format resmi, dan lakukan audit aksesibilitas jika diperlukan.

- [x] Dengan persetujuan pengguna, menyimpan [Pedoman Dasar Produksi Dokumen](../docs/foundation/05-document-production-baseline.md) sebagai aturan aktif semua dokumen Google-native; versi manusia tersimpan di Google Docs privat dan render 2 halaman A4 diperiksa.
- [x] Menghubungkan baseline + human editorial pass ke router, domain penulisan, katalog/profil template, design tokens dan indeks dokumentasi.
- [ ] Uji penerapan pada dokumen proyek nyata menggunakan sumber yang sah; tidak menyamakan kebijakan tertulis dengan bukti kelulusan semua hasil.

- [x] Membuat Master Sheets 01 (Perbandingan Harga Referensi) langsung sebagai Google Sheets native, mengisi contoh sintetis pada salinan, memeriksa format tanggal/harga, metadata dan baris input; [QA](../docs/qa/master-sheets01-price-comparison-2026-11-03.md).
- [x] Memperbaiki planner untuk nilai DATE serial Google Sheets dan metadata copy `mime_type`, serta menulis satu regresi tambahan; 7/7 tes lulus di V8 harness, belum di runner Node.
- [x] Mendaftarkan master pada tab `Template Masters` dari Registry privat **yang sama** sebagai READY INTERNAL; dua master Sheets lainnya masih belum dibuat.
- [ ] Lakukan pemeriksaan tampilan langsung di Google Sheets pada browser/zoom yang digunakan sebelum mengklaim final visual. Tidak menguji atau memakai Excel sebagai perantara.

- [x] Memperbaiki Master Sheets 01 melalui versi native v1.1.0 (bukan menimpa master v1.0.0): judul/metadata, proporsi lebar kolom, header, banding, filter dan baris input yang lebih tertib.
- [x] QA salinan dengan delapan penawaran sintetis, termasuk nama panjang, catatan panjang, nominal numerik dan string berawalan tanda sama dengan; koreksi tinggi baris setelah `autoResizeDimensions` terpantau menyusutkan konten. [QA](../docs/qa/master-sheets01-visual-refinement-2026-11-03.md).
- [ ] Review tampilan native Google Sheets di browser dan keputusan penerimaan desain; v1.1.0 `NEEDS_REVIEW` dan v1.0.0 tetap `READY`.

- [x] Merevisi master Perbandingan Harga sebagai v1.2.0 Google Sheets native: 0 merge, 5 kolom lebih ringkas, header minimal, baris tidak berlebihan, 60 input tetap kompatibel. [QA](../docs/qa/master-sheets01-professional-v1.2-2026-11-03.md).
- [x] Menguji salinan dengan 8 penawaran sintetis: tanggal/angka sebagai tipe asli, catatan `=...` literal, pembungkusan teks dan row heights terukur; master tetap kosong.
- [x] Pengguna menyetujui **sementara** v1.2.0 (4 November 2026); status `READY` berlaku untuk pemakaian **internal provisional**, v1.0 tetap fallback READY.
- [ ] Tetap periksa tampilan native Sheets pada zoom 100% dan uji cetak A4 landscape sebelum persetujuan visual final; dua gate ini belum dijalankan.

- [x] Membuat template RAB profesional tiga tab untuk Excel (.xlsx) dan Google Sheets native, dengan 100 baris input serta kalkulasi/rekap otomatis. [Blueprint](../templates/finance/rab-plan.md).
- [x] Melakukan QA data sintetis dengan 3 pos lengkap + 1 pos frekuensi belum diisi; total Rp5.150.000 dan status `PERLU PEMERIKSAAN` cocok pada Excel dan native Sheets, tanpa input contoh pada master.
- [x] Menyesuaikan formula Sheets locale Indonesia (separator `;`) dan menulis 100 formula dengan referensi baris eksplisit, memperbaiki ulang parsing error.
- [ ] Review visual Google Sheets pada zoom 100%, pengujian hasil cetak, dan kesesuaian template RAB menurut pedoman tahun/kategori yang benar-benar berlaku. Status master native `NEEDS_REVIEW`.

- [x] Merapikan Excel RAB v2.1 dengan nilai kosong-vs-nol yang konsisten, tanpa mengubah 100 pos; uji normal, frekuensi kosong, dan kategori tidak dikenal dilakukan dengan contoh sintetis.
- [x] Membuat master RAB Google Sheets native v2.1 dari copy master lama, menyelaraskan rekap vertikal/rumus/panduan dan menguji empat pos serta kasus frekuensi belum diisi. [QA v2.1](../docs/qa/master-rab-v2-1-2026-11-04.md).
- [x] Mendaftarkan RAB v2.1.0 sebagai NEEDS_REVIEW pada Registry privat yang sama; versi v2.0.0 historis RETIRED.
- [ ] Periksa tampilan browser Google Sheets dan Print Preview RAB A3 landscape / REKAP A4; uji kesesuaian format resmi menurut tahun dan kategori sebelum mengesahkan template.

- [x] Membuat master LRA dan Arus Kas internal v1.0 di Excel serta native Google Sheets, dengan satu workbook yang memisahkan pagu RAB disetujui dan transaksi kas; [QA](../docs/qa/master-lra-cash-2026-11-04.md).
- [x] Menguji empat transaksi sintetis, status DRAF tidak masuk LRA, saldo awal Rp0 valid, kode yang tidak ada dan bukti ganda ditahan; Registry privat mencatat master NEEDS_REVIEW.
- [ ] Pemeriksaan browser Google Sheets dan cetak, referensi sumber RAB yang benar-benar disetujui, serta persyaratan format laporan tahun/kategori program sebelum digunakan untuk pelaporan nyata.
- [x] Master Checklist Pemeriksaan Bukti v1.0.0 dan Matriks Revisi Dokumen v1.0.0 dibuat sebagai Google Sheets native dan Excel, dengan dua tab per master, validasi status Bukti, contoh sintetis pada salinan terpisah dan Registry NEEDS_REVIEW. [QA](../docs/qa/master-evidence-revision-2026-11-04.md).
- [ ] Evaluasi visual Google Sheets/hasil cetak dan persyaratan bukti/perubahan menurut tahun/kategori sebelum promosi READY.
- [x] Mewujudkan dua blueprint tersisa sebagai Google Docs native: `di.report.creative-narrative@1.0.0` dan `di.admin.package@1.0.0`. Uji token katalog, PDF A4 1 halaman master, salinan normal 1 halaman dan panjang 2 halaman. [QA](../docs/qa/master-docs02-03-2026-11-04.md).
- [ ] Tinjau isi dan layout dari data proyek nyata serta format resmi menurut perjanjian/kategori/tahun sebelum mengubah status master baru dari NEEDS_REVIEW.

## Prioritas desain berikutnya

Gunakan hasil pekerjaan nyata untuk menentukan apakah perlu alat tambahan. Hindari registry paralel, dashboard, skema pajak universal, automation submit, atau agen kedelapan tanpa kegagalan konkret yang hendak diselesaikan.
