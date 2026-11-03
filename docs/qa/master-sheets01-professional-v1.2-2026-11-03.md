# QA tata letak profesional — Master Sheets 01 v1.2.0

**Tanggal pemeriksaan:** 3 November 2026. **Status:** INTERNAL / NEEDS_REVIEW (menunggu inspeksi tampilan langsung). **Jenis artefak:** Google Sheets native, katalog \`di.procurement.price-comparison@1.2.0\`. **Tidak menggunakan data proyek asli.** Template dan salinan QA berada dalam Google Drive privat; ID/tautan privat tidak dikomit ke GitHub.

## Alasan revisi

Pengguna menilai v1.0.0 dan v1.1.0 belum terlihat sebagai lembar kerja administrasi yang disusun profesional. v1.1.0 memiliki **enam merge non-data**, lebar total kolom **1.246 px**, header navy gelap, bidang metadata dekoratif, serta tinggi kosong awal **48 px/baris** pada tabel. Desain tersebut cukup terbaca secara struktural, tetapi terlalu lebar dan menyerupai form visual AI.

**Tujuan v1.2.0:** satu lembar kerja bersih, kompak, minim warna, tetap cukup ruang untuk penawaran nyata, serta **tidak menambah kolom/rumus/status asumtif** di luar kontrak lima kolom katalog.

## Rujukan desain dan aturan

- [Pedoman Dasar Produksi Dokumen](../foundation/05-document-production-baseline.md): kebutuhan pembaca dan fakta diprioritaskan daripada ornamen.
- [Standar Spreadsheet](../../templates/google-native/SPREADSHEET-STYLE.md): angka, tanggal dan tipe sumber dapat diperiksa.
- [Section508 — Accessible Spreadsheets](https://www.section508.gov/blog/accessibility-bytes/accessible-spreadsheets/): tabel sederhana, header jelas, data tanpa merged cells atau spacer internal. Ini referensi internasional, bukan sertifikasi terhadap Sheet.
- [Google Sheets print](https://support.google.com/docs/answer/7663148?hl=id): dapat mengatur kertas, orientasi, header/footer dan repeat frozen rows secara manual lewat UI ketika akan dicetak.
- [Google Sheets CellData](https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets/cells): tipe number/date, wrap strategy, alignment, padding, dan number format.
- [Pedoman Administrasi Dana Indonesiana 2025](https://erispro-indonesiana.kemenkeu.go.id/upload/DAKB_Pedoman_administrasi_penerima_2025.pdf): menyebut survei/perbandingan harga dari sedikitnya dua penyedia untuk pembelian barang/jasa di atas Rp50 juta. **Kewajiban tahun 2025 tersebut tidak otomatis mengesahkan layout ini atau berlaku untuk setiap proyek/perjanjian tahun lain.** Periksa tahun, kategori dan Juknis sebelum menyimpulkan kepatuhan.

## Revisi langsung pada master baru

| Komponen | v1.1.0 | v1.2.0 |
|---|---|---|
| Penggabungan sel | 6 merge pada judul/metadata | **0 merge**, termasuk di header dan area data |
| Lebar A:E | 212, 350, 142, 232, 310 px = **1.246 px** | **178, 310, 128, 178, 238 px = 1.032 px** |
| Judul | 15pt/nuansa navy | 14pt, gelap, tanpa blok dekoratif |
| Metadata | bidang warna biru muda memanjang | label sederhana A2:A4; input B2:B4 putih/garis bawah ringan |
| Catatan | baris metadata berwarna dan digabung | satu catatan singkat di A5, melimpas ke sel kosong di kanan; tidak merupakan data transaksi |
| Header | pita navy solid dan teks putih | **abu-biru sangat muda**, teks gelap bold, satu garis pemisah |
| Isi tabel | baris kosong 48 px | **36 px** default; tinggi salinan terisi disesuaikan saat memuat uraian panjang |
| Data | 60 baris input A8:E67 | **tetap 60 baris**, filter dan freeze 7 baris, alternatif baris putih/sangat pucat |

Teks selain judul/heading memakai Arial 10 pt, tegak tanpa italic dekoratif. Harga bertipe NUMBER, diratakan ke kanan dengan pattern ribuan \`#,##0\`; tanggal adalah \`DATE\` asli; warna tidak digunakan untuk menandakan status tanpa teks. Jumlah kolom **tetap lima** sesuai kontrak \`offers\` dan posisi scalar B2:B4 tidak berubah.

## Uji salinan berisi delapan penawaran fiktif

- Salinan berbeda dari master, disimpan di folder QA sintetis.
- Berisi delapan penyedia fiktif, termasuk merek/gramatur/satuan berbeda, nama penyedia panjang, catatan panjang, dan teks yang dimulai \`=100+1\` untuk uji formula injection.
- Harga disimpan sebagai delapan \`numberValue\` **58.000, 61.000, 55.000, 63.500, 59.650, 64.000, 62.500, 120.000**. Format tampilan menggunakan ribuan Indonesia.
- Tanggal survei uji tampil **03 November 2026**, nilai serial Sheets **46329**, bukan string.
- Tidak ada \`errorValue\` pada delapan baris. Teks berawalan \`=\` tetap berupa \`stringValue\`, bukan formula.
- Pengaturan tinggi baris menggunakan pengukuran perkiraan lebar string dengan font Arial-compatible; tinggi baris 8–15 diperiksa ulang menjadi **46, 63, 46, 46, 114, 63, 63, 97 px**. Baris metadata RAB pada contoh disesuaikan menjadi 46 px.
- Pembacaan native Google Sheets memastikan **0 merge**, basic filter pada A7:E67, alternating banding dengan kontras halus, row freeze 7, ukuran kolom, validasi harga nonnegatif, dan semua sel input **master kosong**.

## Cakupan QA dan batas

| Gate | Temuan/status |
|---|---|
| Struktur native, input/rentang/headers | VERIFIED |
| Nilai 8 harga numerik dan DATE | VERIFIED |
| Formula injection dan error sel | VERIFIED pada 8 contoh sintetis |
| Ukuran kolom/baris dan format sel | VERIFIED dari GridData/CellData |
| Metadata Registry dan versi | NEEDS_REVIEW hingga selesai sinkronisasi |
| Tampilan nyata pada browser Google Sheets 100% | **NOT_EXECUTED** (akses visual terautentikasi tidak tersedia) |
| Halaman cetak A4 landscape, repeat frozen row, footer halaman | **NOT_EXECUTED** (pengaturan UI Google Sheets belum dijalankan) |
| Kepatuhan format administrasi/kelayakan harga | **NOT_EXECUTED** (contoh fiktif, applicability belum ditinjau) |

**Keputusan:** pertahankan v1.2.0 sebagai **kandidat NEEDS_REVIEW**, tandai v1.1.0 \`RETIRED\` karena desain ditolak pengguna, dan simpan v1.0.0 sebagai fallback \`READY\` internal lama. Perubahan versi master hanya dimungkinkan setelah review visual manusia—jangan mengklaim "final menurut standar pemerintah" dari penataan sel saja.

## Catatan produksi

Saat mengisi salinan berikutnya, periksa tinggi baris terhadap panjang uraian/spesifikasi. \`autoResizeDimensions\` tidak boleh dianggap pasti memadai: pada QA terdahulu pernah mengecilkan baris panjang menjadi 21 px. Periksa hasil \`rowMetadata\` lalu tampilan UI jika dapat diakses. Kriteria untuk master setelah ini: **kejelasan sebelum dekorasi, tipe data sebelum font, sumber sebelum angka**.

## Addendum status — 4 November 2026

Pengguna telah memberi **persetujuan sementara** atas desain v1.2.0. Registry privat telah dinaikkan menjadi `READY` untuk **penggunaan internal yang bersifat provisional**; v1.0.0 tetap READY sebagai fallback lama dan v1.1.0 RETIRED. Ini merupakan keputusan penggunaan template, **bukan** penggantian hasil QA sejarah pada 3 November atau klaim bahwa screenshot native dan pengaturan cetak sudah diverifikasi. Dua pemeriksaan tersebut tetap `NOT_EXECUTED` dan diperlukan sebelum persetujuan desain final. Tidak ada perubahan materi proyek, data transaksi, atau approval pengadaan resmi.
