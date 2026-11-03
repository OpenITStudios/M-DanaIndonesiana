# Standar Spreadsheet Profesional — Google Sheets Native

**Status:** \`CANONICAL_INTERNAL\` untuk membuat/edit spreadsheet M-DanaIndonesiana, di bawah [Pedoman Dasar Produksi Dokumen](../../docs/foundation/05-document-production-baseline.md). **Bukan** format resmi pemerintah dan **bukan** berkas Excel: output pengguna hanya Google Sheets native; PDF opsional jika benar-benar diperlukan.

**Tujuan:** hasil seperti lembar kerja administrasi/keuangan profesional yang disusun manual, bukan dashboard dekoratif hasil AI. Tabel harus akurat, dapat ditelusuri, mudah disaring, dan bisa dikembangkan tanpa merusak rumus atau format.

## 1. Urutan kualitas

1. **Sumber dan format sah:** kontrak, RAB, syarat pelaporan dan spesifikasi yang benar-benar berlaku mengungguli default internal.
2. **Jenis data:** tentukan apa yang merupakan teks, ID, tanggal, nominal, persentase, atau formula; jangan menyamakan kosong dengan 0.
3. **Integritas:** satu record satu baris, header satu tingkat, asal angka jelas, formula hanya untuk derivasi yang benar.
4. **Keterbacaan:** nama kolom pendek dan eksplisit, urutan kolom logis, nominal rata kanan, teks rata kiri, pembungkus teks pada kolom panjang, tanggal yang dapat dihitung.
5. **Desain:** putih, teks gelap, satu pembeda tegas untuk header, garis tipis hanya bila membantu; tanpa baris kosong dekoratif dan tanpa kartu KPI yang tidak dibutuhkan.

Panduan Section508 mengenai spreadsheet yang aksesibel menganjurkan rentang data kontigu, heading bermakna, nama tab deskriptif, dan menghindari merge dalam tabel data. Ini **referensi desain**, bukan sertifikasi Section508 atau persyaratan hukum otomatis untuk penerima hibah Indonesia. Sumber: https://www.section508.gov/blog/accessibility-bytes/accessible-spreadsheets/

## 2. Aturan layout default

| Elemen | Standar |
|---|---|
| Tab | Satu fungsi per tab. Nama pendek dan deskriptif (\`Perbandingan\`, \`RAB\`, \`Realisasi\`), bukan \`Sheet1\` atau \`Final\` |
| Judul | Maksimum satu baris di bagian atas, 13–14 pt bold, teks hitam |
| Metadata | Label jelas dan nilai editable terpisah, bukan kartu/kotak |
| Header | Satu baris berisi nama kolom; 10–11 pt bold, garis bawah lebih tegas; hindari merge |
| Body | Arial 10–11 pt, putih, kontras tinggi, rata kiri kecuali angka |
| Sel angka | Rata kanan, **numberValue**, bukan \`"Rp 50.000"\` sebagai teks |
| Format IDR | Nominal numerik dengan pemisah ribuan menurut locale Indonesia; penanda \`Rp\` dicantumkan pada header/satuan |
| Tanggal | Google Sheets \`DATE\` asli, bukan tanggal teks; timeZone ditentukan pada spreadsheet |
| Data panjang | \`WRAP\` pada uraian dan catatan, lebar kolom dibatasi, tinggi baris mengikuti data yang benar-benar diisi |
| Filter/freeze | Aktifkan ketika membantu tabel multi-record; jangan membekukan bagian atas terlalu tinggi untuk tabel padat |
| Warna | Tidak dipakai untuk status tanpa teks; hindari fill kuning/abu dan ornamentasi otomatis bila tidak diminta |
| Margin/cetak | Tidak mengorbankan keterbacaan di layar demi pemaksaan semua kolom ke satu halaman PDF |

Ukuran kolom dan tinggi baris adalah pilihan **per jenis tabel** berdasarkan data aktual, bukan satu skala yang dipaksakan pada semua spreadsheet. Jika contoh resmi memakai format/warna lain, verifikasi sumbernya dan ikuti ketentuan yang berlaku.

## 3. Aturan data dan formula

- **Satu fakta satu sumber.** RAB, realisasi, transaksi, dan bukti memiliki pemilik data. Jangan menyalin total yang berbeda ke beberapa tab secara manual.
- **Jangan buat formula yang tidak diperlukan.** Matriks referensi harga tidak otomatis menghitung pemenang termurah jika spesifikasi, pajak, ongkos, jangka waktu atau jenis bukti tidak sebanding. Kalkulasi keuangan yang bermakna dikerjakan di tab/kolom yang tepat.
- **Formula** ditempatkan pada area turunan, bukan ditulis menimpa data input. Gunakan referensi sel, guard untuk pembagi nol, dan baca kembali \`formulaValue\` serta \`effectiveValue\` setelah perubahan.
- **Nominal** disimpan sebagai angka dengan tipe tepat, sebaiknya integer IDR sampai batas presisi aman. Perencana Google-native membatasi uang maksimum 15 digit, lalu mengirim \`numberValue\`.
- **Tanggal dari generator** harus dikirim sebagai **serial Google Sheets** setelah validasi ISO YYYY-MM-DD. Mengirim tanggal sebagai \`stringValue\` ke sel dengan validasi \`DATE_IS_VALID\` dapat merusak workflow; ini diperbaiki pada planner.
- **Teks berawalan \`=\`** disimpan sebagai \`stringValue\`, jangan sampai ditafsirkan sebagai formula/tautan. Vendor, referensi dan catatan bukan kode yang dieksekusi.
- **Status** menggunakan kata yang jelas (\`DRAFT\`, \`NEEDS_REVIEW\`, \`CHECKED_INTERNAL\`) dan bukti, bukan hanya warna hijau/merah.
- **Kosong vs nol**: kosong berarti data belum tercatat atau tidak berlaku; \`0\` hanya bila nol memang dikonfirmasi. Jangan mengisi nilai palsu untuk tampilan lebih penuh.

Dasar teknis: [Google Sheets CellData](https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets/cells), [Batch update](https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets/batchUpdate), [Pengaturan locale](https://support.google.com/docs/answer/58515).

## 4. Standar bahasa

Label, keterangan, kolom dan catatan harus singkat serta tepat: \`Penyedia / Toko\`, \`Spesifikasi Barang/Jasa\`, \`Harga (Rp)\`, \`Referensi Bukti\`, \`Catatan / Keterbatasan\`. Hindari jargon pemasaran dan kalimat penjelasan panjang dalam sel. Kalimat keterangan mengikuti [pedoman human editorial](../../docs/foundation/05-document-production-baseline.md), tidak boleh mengubah ketidakpastian menjadi kesimpulan.

## 5. Master Sheets 01 — Perbandingan Harga Referensi

Template ID: \`di.procurement.price-comparison@1.0.0\`, native Google Sheets **INTERNAL**, sumber kontrak: [price-comparison.md](../procurement/price-comparison.md). Hanya master ringkas untuk inventarisasi **harga referensi**, bukan keputusan pembelian, total transaksi atau perhitungan perpajakan.

- **Tab:** \`Perbandingan\` — tidak membuat tab tambahan kosong.
- **A1:** judul.
- **A2/B2:** barang/jasa.
- **A3/B3:** referensi RAB.
- **A4/B4:** tanggal penelusuran (DATE).
- **A5/B5:** catatan batas penggunaan harga.
- **A7:E7:** lima header nyata, dengan filter.
- **A8:E67:** 60 baris input calon penawaran; kolom harga C bertipe NUMBER IDR dan divalidasi non-negatif.
- **Di luar area input:** jangan menambahkan kartu ringkasan, ranking vendor, nilai pajak yang diasumsikan, status pembelian atau bukti pengadaan fiktif.

Katalog internal saat ini mempunyai lima kolom; format Markdown domain yang lebih luas juga meminta tipe bukti, ekuivalensi spesifikasi, ongkos/pajak, masa berlaku dan dasar pemilihan. **Kelima kolom tidak cukup untuk mengklaim kepatuhan proses pengadaan penuh**. Data yang tidak tercakup harus dicatat secara terpisah/di kolom keterbatasan; peningkatan skema hanya dilakukan bila ada kebutuhan nyata, bukan penambahan kolom spekulatif.

### Kandidat layout v1.1.0 — matriks harga yang lebih rapi

Pengguna menilai layout v1.0.0 belum layak sebagai standar visual. Kandidat native Google Sheets v1.1.0 mempertahankan input B2:B4 dan tabel A8:E67 yang sama, dengan perbaikan yang benar-benar dilakukan:

- Baris judul A1:E1 **digabung khusus pada bagian judul** agar teks tidak terpotong; metadata B2:E5 digabung dalam setiap baris, dan label "DATA PENAWARAN" berada di A6:E6. **Tidak ada merge pada A7:E67**.
- Judul Arial 15 pt gelap, baris label teratur, input metadata biru sangat muda. Hanya satu pita header navy kusam untuk tabel; data selebihnya putih dengan banding sangat lembut dan garis horizontal tipis. Warna memiliki **fungsi navigasi**, bukan dekorasi.
- Lebar kolom A:E: 212 / 350 / 142 / 232 / 310 piksel, teks panjang di-wrap, nominal rata kanan, validasi dan format Indonesia dipertahankan.
- Sheet memakai satu tab `Perbandingan`, freeze baris 1–7, filter header, gridlines dihilangkan. Pembungkus metadata memisahkan form input dari data harga.
- Tinggi baris input master default 48 piksel, tetapi contoh uji menunjukkan **autoResizeDimensions dapat mengecilkan baris berisi teks panjang ke 21 piksel**. Karena itu hasil auto-resize wajib diperiksa pada rowMetadata/tampilan; salinan uji memakai tinggi 56–72 piksel pada baris berisi uraian panjang.
- Tidak ada grafik, KPI, total semua vendor, atau pemilihan harga termurah otomatis karena komparabilitas vendor/spesifikasi belum dapat diasumsikan.

[Bukti QA visual/teknis](../../docs/qa/master-sheets01-visual-refinement-2026-11-03.md) memverifikasi merge, banding, filter, nilai, format dan tinggi baris dalam Google Sheets API. **Screenshot native 100% masih belum dilihat**. Master v1.1.0 status `NEEDS_REVIEW`, sementara v1.0.0 tetap `READY` sampai keputusan desain.

### Perbaikan profesional v1.2.0 — referensi harga

Setelah review lanjutan, kandidat v1.2.0 memperbaiki masalah v1.1.0 yang terlalu lebar, berwarna berat, dan banyak sel digabung. [Bukti QA](../../docs/qa/master-sheets01-professional-v1.2-2026-11-03.md).

- **Nol merge**, termasuk judul/metadata; area A7:E67 tetap data tanpa sel gabung. Lebar lima kolom 178 / 310 / 128 / 178 / 238 px (total 1.032 px), turun dari 1.246 px pada v1.1.0.
- Tata letak putih, teks hitam/charcoal, header tabel abu-biru sangat muda. Data memakai satu garis bawah ringan per baris dan selang-seling hampir putih, **tanpa kotak KPI/dekorasi**.
- A1 judul polos; A2:A4 label dan B2:B4 sel input; A5 catatan singkat overflow ke sel kosong; A6 judul bagian; A7:E7 header; A8:E67 60 record. Frozen header dan filter tetap dipertahankan.
- 36 px sebagai tinggi dasar input, **bukan** 48 px untuk semua baris kosong. Setelah data diisi, tinggi baris penjelasan panjang perlu dihitung/diukur dengan padding dan diperiksa; autoResize saja sebelumnya terbukti dapat menghasilkan 21 px dan memotong teks.
- Tanggal B4 DATE asli; harga C8:C67 NUMBER angka rupiah dan validasi nonnegatif; referensi sumber disimpan sebagai teks/tautan asli, bukan penanda transaksi.
- Dukungan cetak: pertimbangkan A4 **landscape** dan pengulangan baris header saat mencetak; pengaturan dicheck di menu Google Sheets, bukan dianggap tersimpan otomatis oleh API.

**Catatan sumber resmi:** [Pedoman Administrasi Dana Indonesiana 2025](https://erispro-indonesiana.kemenkeu.go.id/upload/DAKB_Pedoman_administrasi_penerima_2025.pdf) memuat kondisi survei/perbandingan harga untuk pengadaan di atas Rp50 juta dengan sekurangnya dua sumber. **Keberlakuannya harus diverifikasi terhadap tahun dan perjanjian proyek**. Ini tidak menjadikan template internal sebuah formulir resmi. Panduan [Section508 tentang spreadsheet](https://www.section508.gov/blog/accessibility-bytes/accessible-spreadsheets/) juga menekankan header, kontinuitas tabel, dan menghindari merged cells; merupakan rujukan struktur, bukan sertifikasi aksesibilitas.

**Status terkini (4 November 2026):** pengguna menyetujui **sementara** v1.2.0 untuk pemakaian internal. Registry privat mencatat v1.2.0 `READY` (provisional), v1.1.0 `RETIRED`, dan v1.0.0 tetap `READY` sebagai fallback yang lebih lama. **Persetujuan sementara bukan bukti inspeksi browser Google Sheets, pengaturan cetak A4, atau kepatuhan format resmi.** Kedua pemeriksaan pertama tetap terbuka.

## 6. Gerbang QA wajib

| Gate | Pemeriksaan |
|---|---|
| \`STRUCTURE\` | Google Sheets native, tab dan range tepat, judul/header benar, tidak ada merge pada data |
| \`VALUES\` | Sel input kosong di master; contoh terisi hanya data sintetis; nominal numerik; tanggal serial |
| \`VALIDATION\` | Format IDR, validasi harga/tanggal, freeze/filter, tanpa angka atau status palsu |
| \`FORMULAS\` | Tidak ada \`#REF!\`, \`#DIV/0!\`, \`#VALUE!\` atau perubahan formula tanpa sengaja |
| \`SAFETY\` | Sel teks adalah \`stringValue\` (aman dari formula injection); master tidak ditimpa |
| \`VISUAL\` | Judul/metadata/header dan beberapa baris data dapat dibaca tanpa clipping, wrap aneh, kontras lemah atau warna yang tidak perlu; periksa di Google Sheets bila akses tampilan native tersedia |
| \`PROVENANCE\` | Harga referensi bukan kuitansi, listing bukan penawaran resmi, bukan dasar keputusan tanpa analisis lebih lanjut |

**Kejujuran validasi:** pembacaan API untuk nilai/format/validasi bisa lulus walaupun screenshot native Sheets belum diperiksa. Jika pemeriksaan tampilan native tidak tersedia, laporkan \`VISUAL_NOT_EXECUTED\` secara eksplisit; **jangan** mengganti klaim dengan screenshot dari Excel, karena pengguna telah melarang Office.

## 7. Alur satu master per giliran

Baca pedoman dasar → pilih kontrak katalog → buat master Google Sheets langsung di folder privat → lakukan penataan minimal → salin ke folder QA sintetis → isi melalui planner Google-native (tanpa konverter Excel) → cek formula/angka/tanggal/data validation dan tampilan bila mungkin → simpan di tab \`Template Masters\` Registry privat **yang sama** → aktifkan READY INTERNAL setelah QA yang dijalankan, tidak mengklaim format resmi.

**Status implementasi:** Master Sheets 01 telah dibuat dan diuji dengan empat penawaran sintetis. Dua master Sheets lain tetap blueprint sampai dikerjakan satu per satu.
