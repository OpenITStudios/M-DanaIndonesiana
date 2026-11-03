# Source Intake — Identifikasi Dokumen dan Provenance

**Owner:** `regulatory-applicability` untuk identifikasi sumber peraturan/pedoman. Pemilik prinsip otoritas tetap [Source Authority](../../../docs/foundation/02-source-authority.md); metadata bukan bukti bahwa aturan mengikat satu proyek.

## Masukan dan akses

Pertama pastikan izin pengguna: dokumen **"pelajari saja"** hanya boleh dibaca untuk analisis saat itu, tanpa diunggah ke Drive, GitHub, fixture, indeks permanen atau berkas turunan. Untuk sumber publik gunakan portal asli penerbit/JDIH dan periksa tautan serta versi, bukan mengambil judul dari snippet sebagai keseluruhan ketentuan.

## Satu sumber, satu profil

| Metadata | Cara memperoleh | Bila tidak terbukti |
|---|---|---|
| Sumber/jenis | LEGAL / PROGRAM / PROJECT / DECISION / SUPPORTING / DERIVED (lihat Source Authority) | UNKNOWN |
| Judul, penerbit, identitas dokumen | halaman judul dan metadata asli | SOURCE_UNVERIFIED |
| Nomor dan tahun | identitas yang benar dalam dokumen | UNKNOWN |
| Versi/revisi dan tanggal publikasi | halaman pengesahan, daftar perubahan, metadata resmi | UNKNOWN |
| Tanggal mulai berlaku | pasal berlakunya / keputusan resmi, **bukan tanggal unggah** | UNKNOWN |
| Tahun anggaran / tahun program / periode | masing-masing field terpisah | UNKNOWN |
| Kategori/entitas/jenis transaksi | lingkup eksplisit sumber | SCOPE_UNVERIFIED |
| Bagian/pasal/halaman | teks atau halaman yang sungguh diperiksa | UNVERIFIED |
| Perubahan/pencabutan/pengecualian | rujukan berwenang dan tanggal | CONFLICT / UNKNOWN |
| Lokasi asal dan bukti review | URL resmi atau pointer privat yang diizinkan, reviewer dan tanggal nyata | NOT_EXECUTED |

Jangan membuat hash berkas, nomor keputusan, halaman, tanggal atau timestamp review secara fiktif. Hash hanya menegaskan kesamaan byte, **bukan keaslian atau legalitas dokumen**.

## Tahap pembacaan

1. **Cari sumber primer.** Mulai dari penerbit (LPDP/e-RISPRO, Kementerian Kebudayaan, JDIH Kemenkeu, peraturan.go.id atau sumber hukum resmi terkait); bahan presentasi, ringkasan dan contoh bukan pengganti.
2. **Cek artefak asli** bila ada: sampul, daftar isi, ruang lingkup, versi, dasar hukum, pengecualian dan bagian relevan. PDF yang berupa pindai mungkin memerlukan pemeriksaan visual; tidak terbaca berarti belum diperiksa, bukan "tidak diatur".
3. **Ekstraksi ketentuan sempit.** Tulis klaim parafrasa lengkap dengan nomor bagian dan kondisi: subjek, aksi, nilai, jangka waktu, pengecualian, pihak pemberi persetujuan.
4. **Cek sumber pendukung** seperlunya untuk perbedaan redaksi, perubahan/ketentuan lain yang mungkin berlaku; jangan mengumpulkan referensi tanpa pertanyaan.
5. **Jaga versi:** pisahkan dokumen administrasi umum 2025, kategori/panduan teknis 2025, pedoman 2026, perjanjian dan addendum proyek. Nama file "terbaru" atau "terkirim" bukan bukti persetujuan.
6. **Serahkan ke [Applicability Matrix](APPLICABILITY-MATRIX.md)** untuk menilai aturan pada satu tindakan. Dokumen REVIEWED belum menjadi APPLICABLE tanpa kecocokan proyek.

## Catatan integritas

- Bila dua salinan resmi bertentangan, tulis konflik persis pada pasal/bagian yang relevan, bukan merapikan redaksi dengan asumsi.
- Kutipan tidak diambil melebihi kebutuhan dan ketentuan hak cipta; parafrasa harus mempertahankan arti, angka, penyangkalan dan pengecualian.
- JDIH yang menampilkan regulasi terkait bukan berarti regulasi terbaru **mencabut** versi sebelumnya; verifikasi ketentuan peralihan/ruang waktu.
- Jangan memakai sumber privat untuk contoh publik, walaupun rincian sudah diketahui melalui percakapan.

Jika diminta membuat inventaris, gunakan [Source Card](../../../templates/regulatory/source-card.md) di lokasi berizin; jangan membuat folder atau dokumen kosong hanya karena prosedur ada.
