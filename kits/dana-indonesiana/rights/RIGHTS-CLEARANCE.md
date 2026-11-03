# Rights Clearance — Reproduksi, Lisensi dan Atribusi

**Owner:** `dissemination-rights` untuk kesiapan izin pemanfaatan; `regulatory-applicability` untuk penerapan hukum; `creative-documentation` untuk atribusi/naskah; `creative-production` untuk daftar artefak. Prosedur ini **bukan putusan legal atau lisensi yang sudah diberikan**.

## Empat hal yang selalu dipisahkan

1. **Pencipta**: orang/pihak yang menciptakan; tidak otomatis identik dengan pemegang hak ekonomi.
2. **Pemegang hak / pemberi lisensi yang berwenang**: berdasarkan hukum/kontrak/bukti pengalihan yang relevan.
3. **Objek ciptaan/elemen hak**: karya seni, foto, musik, rekaman, arsip, teks, suara, model, kode game, brand/logo atau karya turunan. Hak dan pemilik tiap elemen dapat berbeda.
4. **Izin penggunaan spesifik**: memperbanyak, mengadaptasi menjadi voxel/3D, memajang, menyiarkan, menyediakan untuk unduhan, menyimpan di arsip digital, atau penggunaan komersial/nonkomersial menurut izin yang benar-benar ada.

DJKI menjelaskan perlindungan hak cipta yang timbul otomatis berdasarkan prinsip deklaratif; ini **tidak membebaskan pengguna karya pihak lain dari pemeriksaan izin**. [DJKI pengenalan](https://dgip.go.id/menu-utama/hak-cipta/pengenalan) dan [UU 28/2014](https://www.peraturan.go.id/files/uu28-2014bt.pdf) menjadi rujukan umum.

## Matriks per artefak jika digunakan

| Aspek | Pertanyaan | Jika belum terbukti |
|---|---|---|
| Identitas | karya dan versi mana, sumbernya dari mana, dibuat oleh siapa | `SOURCE_UNKNOWN` |
| Pemegang hak | siapa berwenang memberi izin, adakah kontrak/assignment | `RIGHTSHOLDER_UNKNOWN` |
| Jenis pemanfaatan | gambar di museum, model 3D, NPC, website, poster, video, distribusi map | `USE_SCOPE_UNVERIFIED` |
| Lisensi | hak, batas wilayah/kanal/periode, kewajiban kredit, izin adaptasi/redistribusi | `NEEDS_RIGHTS_REVIEW` |
| Bukti | sumber perjanjian, korespondensi, terms, bukti atribusi, keputusan reviewer | `NOT_CLEARED` |
| Berakhir/berubah | apakah izin dicabut, expired atau memiliki larangan modifikasi | periksa ulang sebelum rilis |

Satu aset bisa punya banyak penggunaan: izin menampilkan foto **tidak otomatis** memberi izin mengubahnya menjadi model 3D yang diunduh publik. Teks kuratorial, hasil screenshot game, suara narator dan artwork dapat memiliki hak yang berbeda.

## Pekerjaan kolaboratif dan vendor

- Dari kontrak jasa, periksa siapa pencipta, siapa pemegang hak ekonomi, ruang lingkup lisensi/pengalihan, hak moral, izin modifikasi dan redistribusi, format artefak serta masa penggunaan. **Pembayaran honor tidak otomatis membuktikan pengalihan seluruh hak.**
- Hasil tim dapat memuat aset berlisensi pihak ketiga; minta daftar sumber dan penggunaan yang diizinkan dalam batas pekerjaan.
- Untuk materi budaya/tradisi atau koleksi institusi, hak cipta, hak akses arsip, persetujuan komunitas dan etika representasi dapat menjadi pertimbangan yang **berbeda**. Jangan menyimpulkan bebas pakai hanya karena konten bersejarah atau tersedia di internet.
- Penyebutan sumber/kredit adalah penting tetapi **tidak selalu menggantikan izin** yang diperlukan.

## Status clearance per penggunaan, bukan global

`DISCOVERED` → `NEEDS_RIGHTS_REVIEW` → `CLEARED_FOR_SPECIFIC_USE` (dengan bukti) / `RESTRICTED` / `NOT_CLEARED`.

Keputusan internal `CLEARED_FOR_SPECIFIC_USE` menyatakan hasil pemeriksaan pada pemanfaatan tertentu, **bukan jaminan hukum menyeluruh**. Simpan bukti di lokasi privat yang disetujui; jangan menggandakan perjanjian dalam Git publik. Bila tidak jelas, pilih representasi alternatif yang memang memiliki dasar hak atau hentikan penggunaan publik sampai diklarifikasi.

Gunakan [Rights Matrix](../../../templates/rights/rights-clearance.md) hanya ketika ada materi yang perlu dievaluasi.
