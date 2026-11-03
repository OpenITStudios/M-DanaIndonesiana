# Document Profiles — Struktur Berdasarkan Fungsi

**Applies to:** master Google-native **internal**. Dokumen resmi menggunakan format, istilah dan susunan yang diwajibkan oleh sumber terverifikasi. Seluruh profil memakai [Quality Standard](QUALITY-STANDARD.md), [Design Tokens](design-tokens.json), [riset](../../docs/research/google-native-document-design-2026.md), serta satu pemilik fakta dari sistem yang ada.

Profil menentukan **blok yang boleh digunakan**, bukan memaksa semua bagian selalu tampil. Jangan mencetak blok kosong atau catatan instruksi AI pada hasil akhir.

## 1. A — Administrative correspondence (Google Docs)

**Untuk:** surat pengantar, surat permohonan, surat klarifikasi, jawaban revisi, nota internal (bila relevan).

**Pembaca perlu:** tahu pengirim/tujuan, konteks, permintaan, tindakan, tenggat yang terbukti, dan lampiran yang benar-benar ada.

**Urutan default:** identitas yang sah → tanggal/nomor (jika benar tersedia) → tujuan → perihal → pembuka satu paragraf → inti permintaan/alasan → tindakan yang diharapkan → penutup singkat → nama/jabatan/tanda tangan hanya bila benar-benar berwenang → lampiran asli.

**Layout:** tidak ada cover tersendiri untuk surat singkat; satu kolom teks, jarak paragraf konsisten, perihal mudah terlihat. Jangan membuat dua kolom halaman dekoratif, tanda tangan palsu, logo pemerintah tanpa ketentuan, atau nomor surat otomatis yang belum terbit. Jika format surat diwajibkan program, ikuti sumber resmi persis.

**QA khusus:** penerima/tanggal benar; lampiran tidak dikarang; bukan halaman dengan tiga blok hias; status DRAFT/approval dibedakan.

## 2. B — Reporting / indicator progress (Google Docs)

**Untuk:** laporan kegiatan, kemajuan karya, indikator dan pertanggungjawaban naratif.

**Pembaca perlu:** tujuan atau indikator yang dijanjikan, capaian yang dapat dibuktikan, celah, tindakan berikut dan periode.

**Urutan default:** judul laporan + periode → metadata kunci → sintesis hasil singkat **jika ada dasar** → rencana/indikator → pelaksanaan faktual → hasil dan kaitan indikator → bukti yang bisa ditelusuri → kendala/tindak lanjut → lampiran jika dibutuhkan. Heading mengikuti kedalaman; dokumen singkat tidak membutuhkan "Ringkasan Eksekutif".

**Layout:** gunakan metadata berpasangan (paragraf atau tabel kecil), satu kolom untuk narasi; tabel dipakai jika banyak indikator yang perlu dibandingkan. Semua bukti/foto harus memiliki caption/izin. Panjang mengikuti isi, **bukan** dipaksa satu halaman atau dibuat dua halaman dengan filler.

**QA khusus:** rencana ≠ pelaksanaan; persentase capaian hanya bila ada kriteria resmi dan sumber; lampiran aktual; slot isi panjang diuji sehingga tidak merusak halaman.

**Master awal:** \`di.report.indicator@1.0.0\`. Ada sembilan placeholder katalog; master versi ini masih memerlukan pengujian copy-fill isi panjang sebelum QA produksi.

## 3. C — Finance / RAB / cash (Google Sheets)

**Untuk:** RAB, realisasi, arus kas, rekonsiliasi, proyeksi dan audit nominal.

**Pembaca perlu:** sumber pagu, periode, pos biaya, satuan dan kuantitas jika memang tersedia, angka realisasi, selisih, bukti serta temuan.

**Tab default bila perlu:**
- \`Petunjuk dan Sumber\`: periode, sumber, definisi status/angka, jenis laporan. Tanpa mengulang rahasia yang tidak diperlukan.
- \`Rincian\`: satu record per baris, kode RAB, uraian, kategori, volume/satuan, pagu, realisasi, sisa dan referensi.
- \`Arus Kas\`: tanggal, tipe, ID, bukti, penerimaan, pengeluaran, saldo jika data lengkap.
- \`Ringkasan\`: total dan temuan dari perhitungan kanonis. Hanya jika pembaca memerlukan agregasi terpisah.

**Layout:** header yang dapat dipindai dan dibekukan, angka rata kanan, IDR terbaca sesuai \`id_ID\`, nilai asli tetap numerik, border ringan, kolom nama/uraian cukup lebar. Jangan gabungkan header beberapa tingkat dalam data range, merge baris transaksi, atau menaruh subtotal di tengah satu tabel yang perlu diproses.

**QA khusus:** duplicate ID, cross-tab totals, missing balances, diferensiasi kosong/0, formula errors, aturan 15 digit presisi, status invoice ≠ pembayaran, source-registry dan formula provenance. **Kalkulator Finance yang sudah ada tetap pemilik angka.** XLSX lokal bukan prasyarat.

## 4. D — Procurement / price comparison (Google Sheets + Docs opsional)

**Untuk:** kebutuhan pengadaan, pembanding harga, keputusan pilihan dan serah terima penyedia.

**Pembaca perlu:** spesifikasi ekuivalen, sumber harga, waktu pengambilan, total comparable, keterbatasan dan dasar pemilihan.

**Tab utama:** deskripsi kebutuhan + sumber RAB → matriks per vendor/item dengan 1 baris/penawaran independen → catatan ekuivalensi dan biaya tambahan yang benar-benar diketahui → keputusan draf dengan penanggung jawab.

**Layout:** jangan memaksa screenshot marketplace ke sel atau menampilkan setiap penawaran sebagai "kartu produk". Tautan referensi dan tanggal harus jelas; kolom harga numerik, denominasi mata uang disebut. Bukti tangkapan layar disimpan sesuai hak/izin, tidak di-commit.

**QA khusus:** listing pasar bukan penawaran resmi atau kuitansi; harga estimasi bukan transaksi; spesifikasi berbeda tidak otomatis dibandingkan; pemilihan vendor belum berarti izin belanja.

## 5. E — Editorial / curatorial / creative process (Google Docs)

**Untuk:** naskah kuratorial, uraian karya, latar gagasan, dokumentasi proses, katalog singkat.

**Pembaca perlu:** pertanyaan utama karya, keputusan artistik, proses dan konteks yang valid, pengalaman audiens yang dimaksud, hasil yang benar-benar ada.

**Urutan alami:** gagasan spesifik → konteks yang diperiksa → pilihan media/metode → proses dan keputusan penting → pengalaman/karya yang ada → batas/refleksi bila relevan. Susunan bebas disesuaikan naskah; **jangan memaksakan tabel narasi atau section konstan**.

**Layout:** lebih banyak ruang teks utuh, heading hanya pada pergeseran subtopik yang nyata, gambar karya di dekat uraian dengan caption/credit/sumber jika dibolehkan, tidak memasang gambar stok untuk mengisi ruang.

**QA khusus:** atribusi sejarah/seniman dan hak gambar, kutipan, keterangan proses nyata, pembeda fakta/interpretasi dan masa lampau/rencana. Nada khas karya, bukan promosi generik.

## 6. F — Evidence / checklists / review (Google Sheets)

**Untuk:** daftar kelengkapan, checklist bukti, review output, temuan dan perbaikan.

**Pembaca perlu:** apa yang diminta, apa yang tersedia, status setiap item, alasan, pemilik tindak lanjut dan referensi bukti.

**Layout:** header \`Persyaratan | Sumber/klausul | Bukti tersedia | Status | Kekurangan | Penanggung jawab\` hanya ketika benar-benar diperlukan. Status ditulis sebagai teks enum, warna opsional tidak menggantikan label; freeze/filter, sedikit kolom penting pada tampilan utama.

**QA khusus:** \`AVAILABLE\` ≠ sah, \`CHECKED_INTERNAL\` ≠ approval pemerintah; tidak membuat baris terselesaikan hanya karena kolom terisi.

## 7. G — Presentation / executive review (Google Slides)

**Untuk:** rapat progres, pembaruan pemangku kepentingan, review keuangan/indikator, kuratorial publik.

**Pembaca perlu:** satu pesan utama per slide, fakta pendukung, keputusan yang dibutuhkan, serta sumber ringkas.

**Struktur default:** judul/agenda bila perlu → posisi terakhir → capaian per kategori → risiko/selisih → keputusan/tindak lanjut → rujukan bila relevan.

**Layout:** 16:9, headline hasil bukan label generik, teks pendek dan terbaca, grafik hanya bila berfungsi, foto karya terverifikasi. Jangan mengganti memo rinci dengan slide penuh paragraf.

**QA khusus:** tidak ada klaim "100% selesai" dari persentase task; tidak ada label performa/ratings rekaan; setiap grafik cocok data sumber.

## Pemilihan lintas format

| Kondisi | Output utama | Pendamping hanya bila diperlukan |
|---|---|---|
| Menjelaskan kegiatan/keputusan | Docs | PDF untuk serah-terima/cetak |
| Data transaksi atau tabel dinamis | Sheets | Ringkasan Docs |
| Rapat yang perlu keputusan cepat | Slides | Docs/Sheets sumber |
| Formulir resmi dengan format terverifikasi | Google-native copy dari master resmi yang tepat bila konversi diizinkan; atau file sumber asli sesuai kanal | Tidak melakukan redesain tanpa dasar |
| Informasi belum cukup | Draf terbatas + daftar kekurangan | Jangan keluarkan dokumen yang mengarang fakta |

## Layout blocks yang boleh digunakan

- \`document_title\`: satu kali, jelas dan singkat.
- \`document_metadata\`: ringkas, langsung terkait pembaca, bukan tabel dekoratif sepanjang halaman.
- \`lead_summary\`: hanya untuk dokumen yang kompleks dan klaim utamanya tersedia.
- \`section_heading\`: pembeda topik yang nyata, native heading.
- \`narrative\`: paragraf yang mengikuti alur sebab–tindakan–hasil atau fakta.
- \`simple_data_table\`: hubungan beberapa item dalam grid, label/heading data jelas.
- \`figure_with_caption\`: gambar berizin beserta caption atau penjelasan fungsi.
- \`evidence_reference\`: pointer aman ke bukti nyata.
- \`decision_and_actions\`: masalah, pilihan, tanggung jawab, waktu bila terbukti.
- \`closing_or_signoff\`: hanya ketika fungsi dokumen memerlukannya dan informasinya sah.

Bukan semua blok wajib ada. **Penentu final adalah kebutuhan pembaca dan sumber.**
