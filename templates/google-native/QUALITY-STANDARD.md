# Standar Kualitas Dokumen Profesional — Google-native (usulan v2.0)

**Owner:** lintas-domain pada lapisan template, **bukan skill kedelapan**. **Ruang lingkup:** Google Docs, Google Sheets, Google Slides dan inspeksi PDF hasil ekspor. **Authority:** INTERNAL DESIGN DEFAULT. Format dan susunan resmi mengesampingkan default ini **hanya jika sumber, kategori, periode, dan keberlakuan telah ditinjau** menurut [Source Authority](../../docs/foundation/02-source-authority.md).

**Sumber pertimbangan:** [riset dan matriks bukti](../../docs/research/google-native-document-design-2026.md). **Nilai default mesin:** [design-tokens.json](design-tokens.json). **Pemilihan struktur:** [DOCUMENT-PROFILES.md](DOCUMENT-PROFILES.md). Versi lama master yang sudah ada tidak otomatis dianggap memenuhi proposal ini; jangan mengubah/migrasi master tanpa review, versi dan metadata baru.

## 0. Definisi lulus

Dokumen **bukan** disebut profesional karena 1 halaman, banyak heading, rapi ketika masih placeholder, atau memiliki warna brand. Hasil dinilai layak jika pembaca dapat dengan cepat:
- Menentukan **dokumen ini untuk apa**, periode/lingkup, dan versi.
- Menemukan fakta utama tanpa membaca paragraf pembuka yang generik.
- Memahami hubungan **rencana → pelaksanaan → hasil → bukti → risiko/tindak lanjut** bila relevan.
- Membedakan rencana, hasil nyata, kalkulasi, pendapat, dan informasi yang belum diketahui.
- Menavigasi teks, tabel dan lampiran tanpa clipping, salah urutan atau kehilangan konteks.

## 1. Prioritas kebijakan (jangan terbalik)

1. **Sumber/format resmi yang terbukti berlaku**: ketentuan lampiran, nama bagian, format kolom, bahasa wajib, identitas/tanda tangan yang sungguh diperlukan. Tidak menebak penerapan satu peraturan ANRI pada semua penerima hibah.
2. **Fakta dan otorisasi**: angka dari Finance, kegiatan dari Production, bukti dari Evidence, versi/status dari Administration, ketentuan dari Regulatory. AI tidak menciptakan tanda tangan, nomor surat, receipt atau status eksternal.
3. **Kemudahan penggunaan dan aksesibilitas**: struktur semantik, urutan baca, label jelas, kontras, teks yang tidak terpotong.
4. **Desain internal**: tipografi, margin, warna, tabel, grid, dan white space.
5. **Preferensi visual**: dekorasi paling rendah prioritasnya; jangan dipakai bila tidak membantu pembaca.

Jika tidak jelas mana format yang wajib, status **NEEDS_FORMAT_REVIEW**, bukan memilih gaya yang paling cantik.

## 2. Document brief: wajib sebelum desain

Untuk setiap artefak, tentukan dalam catatan kerja **bukan di badan dokumen resmi**:

| Pertanyaan | Nilai yang harus diketahui/ditandai |
|---|---|
| Pembaca utama | internal / auditor / PMO / kurator / mitra / publik |
| Tugas pembaca | keputusan, informasi, persetujuan, menelusuri angka, arsip |
| Jenis artefak | surat, laporan, daftar, tabel kerja, lampiran, presentasi |
| Aturan sumber | internal / format resmi terverifikasi / UNKNOWN |
| Data kanonis | source ID dan versi yang benar-benar diperiksa, bukan nama file saja |
| Kedalaman | ringkas / standar / rinci; sesuai informasi sebenarnya |
| Privasi | PUBLIC_SYSTEM / INTERNAL_PROJECT / RESTRICTED dan lokasi yang diizinkan |
| Hasil | native Docs / Sheets / Slides; PDF hanya bila dibutuhkan |
| Status | DRAFT/IN_REVIEW/READY_TO_SUBMIT; eksternal terpisah dan terbukti |

Jangan mengisi "UNKNOWN" dengan fakta fiktif agar layout tampak penuh.

## 3. Struktur dan informasi

- **Judul berbasis fungsi**: "Laporan Kemajuan Karya — Periode ..." lebih baik daripada "Dokumentasi Kegiatan" tanpa konteks. Hindari slogan/eyebrow dekoratif ganda.
- **Informasi penting di awal**: jenis laporan, apa yang dievaluasi, periode, kesimpulan faktual bila ada. Ringkasan eksekutif hanya jika kompleksitas dan pembaca memerlukannya.
- **Heading deskriptif**: gunakan "Realisasi dan bukti pengeluaran" bukan "Pembahasan" jika isinya memang realisasi. Jangan membuat "Latar belakang", "Tujuan", "Metode", "Hasil", "Kesimpulan" secara otomatis pada setiap surat/laporan.
- **Paragraf memiliki satu pekerjaan**: apa, kapan, hasil, asal, batas; jangan membuka dengan "Seiring pesatnya perkembangan...", "langkah strategis", "kontribusi signifikan" atau "berjalan dengan baik" tanpa bukti.
- **Jangan memaksakan struktur simetris**: ada dokumen satu section dan ada laporan 5 section. Template bertindak sebagai kontrak field, bukan tuntutan jumlah paragraf.
- **Laporan ≠ formulir isian**: key-value ringkas untuk metadata, narasi untuk penjelasan, tabel untuk beberapa entri yang memang saling dibandingkan. Placeholder tidak boleh dibiarkan dalam versi yang dibagikan.
- **Lampiran**: daftar dan urutan hanya untuk dokumen yang sungguh ada; lokasi privat/pointer aman, bukan URL atau tanda tangan sensitif yang ikut masuk publik.
- **Instruksi AI/operator**: tidak boleh ikut tercetak di output penerima. Simpan dalam kontrak atau catatan review privat terpisah.

### Pemilihan komponen

| Jenis informasi | Komponen yang dipilih | Hindari |
|---|---|---|
| Satu identitas/tanggal/keputusan | Paragraf/label | Tabel 1 baris yang hanya jadi ornamen |
| Beberapa metadata label–nilai | Key-value ringkas bila lebih mudah dipindai | Tabel dekoratif atau merge rumit |
| Narasi proses/kuratorial | Paragraf dengan heading sesuai kebutuhan | Satu tabel per paragraf |
| Data transaksi, RAB, pembanding | Google Sheets dengan header dan formula terlindungi | Screenshot tabel/angka ketikan ulang |
| Capaian terhadap indikator | Tabel per indikator jika berulang, narasi jika hanya satu kasus | Persentase otomatis dari jumlah task |
| Bukti foto/model/grafik | Visual asli berizin + caption/alt text + sumber | Visual stok tak relevan, foto/angka AI yang tampak sebagai fakta |
| Ringkasan paparan | Google Slides dengan satu pesan utama tiap slide | Memadatkan seluruh laporan Docs dalam satu slide |

## 4. Tata letak Google Docs

Referensi nilai **default** pada [design-tokens.json](design-tokens.json); angka berikut adalah keputusan desain internal, bukan kewajiban pemerintah.

| Elemen | Internal | Publikasi yang mengutamakan aksesibilitas |
|---|---|---|
| Ukuran kertas | A4, portrait | A4, portrait |
| Margin | atas 23 mm, kanan/kiri 25 mm, bawah 22 mm | 25 mm seluruh sisi |
| Font | Arial, satu keluarga | Arial, satu keluarga |
| Judul | 19 pt, bold | 20 pt, bold |
| Heading tingkat 1 | 14 pt, bold | 15 pt, bold |
| Heading tingkat 2 | 12 pt, bold | 13 pt, bold |
| Body | 11,5 pt | 12 pt |
| Metadata | 10,5 pt; hanya label yang perlu | 11 pt bila memungkinkan |
| Footer | 9,5 pt; bukan tubuh utama | 10 pt dan ringkas |
| Spasi baris | 120% | 130% |
| Jarak antarparagraf | 6 pt | 7 pt |
| Perataan | Kiri | Kiri |

**Aturan tidak boleh dikompromikan:**
- Gunakan **named styles** Google Docs: \`TITLE\` untuk judul tampilan, \`HEADING_1\` untuk bagian utama, \`HEADING_2\` untuk subbagian. Heading semantik harus berurutan, tidak hanya dibold. Jika kebutuhan aksesibilitas khusus meminta H1 judul utama, ikuti struktur heading yang bisa diaudit; jangan menciptakan dua judul yang menyesatkan.
- Maksimal satu keluarga font aktif dalam body. Italic untuk istilah khusus, bukan paragraf panjang. Hindari huruf kapital semua untuk bagian besar.
- Teks isi dan tabel left-aligned; jumlah/right-aligned untuk kolom angka. Jangan \`JUSTIFIED\` sebagai default.
- Gunakan whitespace sebagai pengelompokan; **tidak menambahkan paragraf kosong berkali-kali** sebagai spacer.
- Heading memakai \`keepWithNext\`; paragraf panjang mengutamakan \`avoidWidowAndOrphan\`; caption ditempatkan dekat gambar/tabel. Periksa apakah sifat tersebut berlaku pada lokasi Docs yang dipakai.
- Tidak ada **aturan wajib satu halaman**. Jika teks panjang, pemisahan halaman semestinya natural, tidak mengecilkan seluruh font atau menghapus bukti agar muat.
- Header/footer hanya memuat informasi yang diperlukan (identitas, versi, halaman). Kode template internal, tautan raw dan petunjuk AI disimpan di metadata sistem, tidak harus muncul dalam isi penerima.

### Warna dan kontras

Palet default: \`#1B3043\` (teks utama), \`#465D6E\` (sekunder), \`#286580\` (aksen), \`#FFFFFF\` (kertas), \`#F2F6F8\` (latar lembut), \`#D7E1E7\` (border). Nilai kontras hitungan terhadap putih: 13,54:1, 6,88:1 dan 6,44:1 untuk tiga warna teks. Target minimum **4,5:1 untuk semua teks**, warna/border tidak boleh satu-satunya pembawa status. Jangan gunakan palet ini jika dokumen resmi meminta warna berbeda; lakukan pemeriksaan kontras sendiri.

**Batas penggunaan warna**: 1 warna aksen + teks netral; jangan membuat kotak warna untuk setiap bagian, gradient, badge atau dashboard card di laporan formal. Garis pemisah hanya ketika memperjelas struktur.

## 5. Tabel Google Docs

- Hanya untuk informasi yang benar-benar punya hubungan baris/kolom atau metadata label–nilai yang membantu pembaca.
- Gunakan **native table** dan header jelas untuk tabel data. Kolom diberi nama yang tidak ambigu; tidak membuat header dengan gambar.
- 2–4 kolom ideal untuk teks; bila lebih dari 5 kolom atau perlu filter/kalkulasi, **pertimbangkan Google Sheets** lalu masukkan ringkasan singkat ke laporan.
- Jangan merge/nest secara default; jangan memaksa baris tinggi berisi beberapa record.
- Angka rata kanan, teks rata kiri, satuan dan periode terlihat. Semua nilai \`0\`, \`UNKNOWN\` dan \`NOT_APPLICABLE\` dibedakan.
- Hindari tabel pecah tak bermakna melintasi halaman. Bila tabel harus panjang, berikan heading dan lakukan review page break serta hubungan header; fitur tampilan tidak membuktikan tagging aksesibilitas PDF.
- Batasi penggunaan tabel untuk layout. **Tabel metadata key-value singkat di Master 01** adalah pengecualian yang perlu diperiksa sebagai data berpasangan, bukan aturan untuk membangun seluruh halaman memakai tabel.

## 6. Struktur Google Sheets

**Tiga lapisan, satu dokumen Google-native**:
1. **Input atau Source Map:** field sumber, periode, status verifikasi, ID pos/kegiatan/bukti yang memang ada.
2. **Data utama:** satu record per baris; nama kolom satu baris header, tidak ada merge, pemisahan record yang tidak jelas, atau nilai rumus ditaruh di kolom input.
3. **Ringkasan hasil:** total/selisih/temuan dari **formula atau sumber perhitungan kanonis**, tidak diketik kedua kali.

Aturan:
- Satu tujuan per tab; nama tab deskriptif, bukan \`Sheet1\`/\`Final\`. Jangan membuat tab kosong untuk fungsi yang tidak diperlukan.
- Header kolom lengkap, freeze baris bila daftar panjang, filter bila dibutuhkan; hindari merge dalam rentang data, warna berlebihan, row kosong dekoratif, dan border berat.
- Kolom sumber input dan formula terpisah; **sel formula dilindungi bila memungkinkan** dan output generator tidak menimpa sel formula.
- Nilai nominal disimpan sebagai angka asli (atau integer-string terverifikasi sebelum API write) dan ditampilkan dengan format IDR/locale yang benar, tanpa menggabungkan label \`Rp\` ke nilai numerik. Tampilkan periode dan unit di header.
- Data kosong berarti tidak diketahui jika memang demikian; \`0\` hanya jika sumber menyatakan nol. Untuk pilihan enumerasi gunakan dropdown/validasi.
- Ringkasan formula wajib mengatasi pembagi nol, tanggal tidak valid, kunci duplikat, \`#REF!\`, \`#DIV/0!\`, \`#VALUE!\` dan selisih sumber.
- Beri catatan singkat tentang asumsi, revisi data, dan arti setiap status; jangan berikan tabel dengan angka tanpa konteks.

## 7. Google Slides

- Kanvas 16:9 sebagai default internal, tanpa slide dekoratif yang hanya mengulang judul.
- Setiap slide satu pesan utama yang terbukti; judul menjelaskan temuan atau tindakan.
- Dua tingkat hierarki cukup pada sebagian besar deck; angka utama jelas, sumber di kaki slide bila diperlukan.
- Default internal: judul sekitar 32 pt, judul seksi 28 pt, body 20 pt, caption 14 pt. Jika padat, **kurangi konten/split slide** lebih dulu daripada mengurangi font menjadi kecil.
- Grafik hanya jika menambah pemahaman; label dan data asli harus tetap tersedia. Foto atau karya hanya dari sumber dengan izin jelas.
- Dokumen resmi yang mensyaratkan format slide khusus tetap mengikuti format itu.

## 8. QA yang menentukan READY vs BLOCKED

Perlu dua **jenis** QA berbeda: **master struktur** dan **output yang sudah diisi**. Jangan menyatukan keduanya menjadi satu PASS.

| Gate | Master | Output setelah diisi | Status jika tidak diuji |
|---|---|---|---|
| SOURCE / AUTHORITY | Kontrak dan format dipilih sesuai referensi | Versi sumber/validitas fakta dicek | NOT_EXECUTED / NEEDS_REVIEW |
| STRUCTURE | Native, heading, tabel, slot/placeholder tepat | Semua slot terganti, halaman dan lampiran lengkap | NOT_EXECUTED |
| DATA / FORMULAS | Schema, tipe dan range valid | Rincian dan total cocok, error formula tidak ada | NOT_EXECUTED |
| EDITORIAL | Heading/label bermakna, tanpa boilerplate AI | Paragraf nyata faktual, alami dan relevan | NOT_EXECUTED |
| ACCESSIBILITY | Kontras, reading order dan elemen semantik diperiksa | Alt text/tabel/tautan/ekspor relevan diperiksa | NOT_EXECUTED |
| VISUAL | PDF master (Docs) atau tampilan native Sheets/Slides benar-benar ditinjau | Render dengan isi **pendek, normal, panjang**; cek seluruh halaman yang terdampak | NOT_EXECUTED |
| SECURITY / VERSION | Master privat dan metadata cocok Registry | Salinan di folder izin; reviewer/status eksternal benar | NEEDS_REVIEW |

### Skenario beban isi (fixture sintetis)

- **Docs:** pendek (1–2 kalimat), normal (± 2 paragraf), panjang (± 4–6 paragraf di satu slot); judul 90+ karakter; bullet; tautan; bukti yang memerlukan lampiran; potensi tabel pindah halaman.
- **Sheets:** 0 / 1 / 25 / batas \`max_rows\` record; string panjang; nominal 0 dan batas presisi; formula sensitif; tanggal/tz; row hidden atau filter; tab berisi data lama.
- **Slides:** headline panjang, grafik label banyak, caption sumber panjang, beragam rasio visual.

Jumlah di atas **desain kasus uji internal**, bukan ketentuan ISO/Google. QA harus benar-benar dijalankan sebelum menyebut \`MASTER_READY\` atau \`FILLED_OUTPUT_VISUAL_CHECKED\`.

### Kode temuan yang dapat ditindak

- \`SOURCE_UNVERIFIED\`: format/angka/klaim tidak punya sumber yang benar.
- \`STRUCTURE_MISMATCH\`: heading, tabel, field, tab atau token rusak.
- \`CONTENT_GENERIC\`: filler, klaim terlalu luas atau pengulangan.
- \`VISUAL_CLIPPED\`: teks/grafik terpotong.
- \`VISUAL_PAGINATION\`: heading sendirian, tabel kehilangan konteks, halaman kosong tidak wajar.
- \`ACCESSIBILITY_UNVERIFIED\`: kontras/tag/urutan baca belum dapat dibuktikan.
- \`FORMULA_MISMATCH\`: total, formula atau angka asal tidak cocok.
- \`REGISTRY_STALE\`: timestamp master berbeda dengan Registry.
- \`OUTPUT_NOT_REVIEWED\`: master valid tetapi salinan terisi belum diperiksa.

**Hard block**: sumber/versi resmi salah, bukti atau nominal dikarang, formula inti rusak, placeholder tertinggal di hasil, data RESTRICTED bocor, tab/file master ditimpa, atau klaim external-approval tanpa bukti. Untuk soal estetika minor, kembalikan \`NEEDS_DESIGN_REVIEW\`; jangan menyembunyikan isu hanya agar PASS.

## 9. Kaidah redaksi anti-AI-slop

- **Berbasis tindakan dan bukti.** Hindari kata semacam "sangat strategis", "memberikan dampak luar biasa", "optimal", "inovatif", "berjalan lancar" bila hanya untuk mengisi ruang.
- **Dari pertanyaan pembaca.** Paragraf membuka dengan kegiatan/temuan, bukan latar umum tentang perkembangan teknologi atau pentingnya kebudayaan.
- **Tidak simetris buatan.** Hindari tiga kalimat per paragraf secara mekanis, bullet berjumlah sama setiap section, atau kesimpulan berisi parafrasa pembuka.
- **Tandai asal pernyataan.** SOURCE_FACT, CALCULATED, INTERPRETATION, PROPOSAL, UNKNOWN menurut [Operating Contract](../../kits/dana-indonesiana/OPERATING-CONTRACT.md).
- **Bahasa Indonesia jelas dan konsisten** berdasarkan [EYD V](https://ejaan.kemendikdasmen.go.id/eyd/); nama resmi, judul karya dan kata teknis yang relevan dipertahankan.
- **Satu angka satu pemilik.** Nilai kas/realisasi bersumber dari Finance, bukan diciptakan ulang dari paragraf editorial.
- **Jangan menyembunyikan ketidakpastian.** Kalimat "belum diverifikasi" lebih baik daripada merapikan asumsi menjadi laporan keberhasilan.

### Contoh sintetik

**Ditolak:** "Program ini sukses mewujudkan transformasi budaya yang bermakna melalui sinergi kolaboratif dan inovasi berkelanjutan."

**Lebih jelas bila ada data sumber:** "Dalam periode pelaporan, tim menyelesaikan rancangan ruang pamer dan menghubungkan tiga artefak digital ke sistem navigasi. Pengujian bersama pengguna belum dilaksanakan." **Ini hanya contoh fiktif, bukan fakta proyek.**

## 10. Handoff dan pemeliharaan

1. AI membaca katalog + satu template profile + sumber/versi yang berlaku.
2. Buat rencana struktur dan pemeriksaan sumber, **bukan langsung mengisi layout generik**.
3. Salin Google-native master ke lokasi yang diizinkan; jangan menimpa master.
4. Isi via Docs/Sheets/Slides API secara terbatas; cek readback.
5. Jalankan QA fungsional, editorial, visual, dan aksesibilitas pada output berisi data.
6. Daftarkan laporan nyata di P5 hanya setelah review yang memang dilakukan; P3/P4 memberi sinyal perubahan, tidak melakukan approval/regenerasi diam-diam.
7. Revisi desain → versi master baru dan perbarui Registry; tidak mengubah versi pengajuan/arsip yang sudah final tanpa proses resmi.

## 11. Keterbatasan dan status

- Ini **rancangan standar internal v2.0** berdasarkan sumber publik; belum menjadi standar hukum/penilaian pemerintah dan belum diuji pada semua jenis dokumen.
- Master Google Docs \`di.report.indicator@1.0.0\` telah diperiksa secara struktural dan render placeholder, tetapi **belum diuji dengan pengisian panjang** serta belum dinyatakan sepenuhnya memenuhi profil baru. Jangan diam-diam memindahkan status Registry atau membuat v1.1 tanpa perubahan nyata.
- Kontrol rendering tidak menjamin tag PDF, screen-reader correctness, validitas narasi atau persetujuan eksternal. Laporkan keterbatasan tes dengan jelas.
