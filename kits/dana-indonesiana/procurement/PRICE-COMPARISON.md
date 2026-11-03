# Price Comparison & Market Evidence

**Owner metode:** Procurement. Penerapan ambang hukum dan keputusan "wajib minimal dua penyedia" tetap milik [Regulatory](../regulatory/CONTRACT.md), sesuai kategori, perjanjian dan Pedoman Administrasi yang berlaku.

## Prinsip perbandingan yang layak

Pembanding hanya bermanfaat bila objek, volume, layanan, kualitas dan konteks harga dapat dibandingkan.

| Elemen | Yang perlu terlihat dalam sumber | Jika tidak ada |
|---|---|---|
| Objek / scope | jasa/produk, spesifikasi, hasil, batas revisi | tulis `NOT_COMPARABLE` / jelaskan gap |
| Volume | jumlah, satuan, periode sewa/layanan, lokasi | jangan samakan harga per-item dan per-paket |
| Harga | nominal, mata uang, apa yang termasuk/di luar harga | jangan menambahkan pajak/ongkir dari dugaan |
| Sumber | identitas penjual/katalog, URL atau bukti privat yang terotorisasi, tanggal penawaran | tandai `SOURCE_UNVERIFIED` |
| Waktu | masa berlaku penawaran, tanggal tangkapan harga, versi produk | jangan anggap harga historis masih berlaku |
| Kualitas penyedia | kecocokan portofolio dan kemampuan kerja | tidak otomatis terganti oleh harga terendah |
| Kemandirian | apakah pembanding memang sumber/penyedia berbeda | jumlah tautan belum membuktikan penyedia independen |

## Jenis referensi yang dibedakan

- `MARKET_LISTING`: tangkapan katalog/listing; berguna untuk survei, tidak otomatis merupakan penawaran berkomitmen.
- `QUOTATION`: penawaran dari pihak penyedia dengan rincian dan masa berlaku, jika benar ada.
- `PRIOR_CONTRACT`: bukti harga historis; jangan disamakan dengan penawaran saat ini.
- `PUBLIC_TARIFF`: tarif yang dipublikasikan dan relevan jika mekanisme/sumber berlaku.
- `INTERNAL_ESTIMATE`: estimasi internal, hanya sebagai referensi awal; bukan vendor independen.

## Cara bekerja

1. Pastikan jenis dan **izin** belanja di RAB/Juknis lebih dahulu. Harga yang wajar tidak menghalalkan komponen yang dilarang.
2. Tentukan spesifikasi minimal dan hasil yang diminta, termasuk mata uang, pajak, biaya tambahan, hak penggunaan, waktu, serta periode layanan.
3. Ambil sumber yang relevan dan berkualitas; catat tanggal penelusuran. Jika dua sumber berisi produk/scope berbeda, jangan menghitungnya sebagai perbandingan ekuivalen.
4. Catat nilai dan batasan satu per satu. Jika belum bisa dibandingkan, gunakan `NOT_COMPARABLE`; jangan menormalisasi harga atau menyusun skor dengan angka rekaan.
5. Jelaskan pilihan dan trade-off berbasis kebutuhan; dukungan harga bukan tanda vendor sudah dipesan.
6. Tandai `NEEDS_AUTHORITY_REVIEW` bila syarat jumlah pembanding belum jelas atau penawaran yang diwajibkan belum lengkap.

**Catatan aturan spesifik 2025:** Pedoman Administrasi Dana Indonesiana menyatakan untuk **pembelian barang/jasa di atas Rp50 juta** diperlukan dokumentasi survei harga pasar **atau** perbandingan harga minimal dua penyedia. Teks lengkap, keberlakuan kontrak, perubahan tahun, dan pengelompokan pembelian harus diperiksa sebelum dijadikan gerbang administratif.

## Integritas dan privasi

- Jangan membuat listing palsu, tanggal katalog yang tidak ada, pemasok fiktif, atau screenshot yang terlihat asli.
- Jangan menciptakan vendor kedua hanya untuk melengkapi angka perbandingan.
- Jangan menempelkan rincian rahasia penyedia atau bukti kontrak pribadi ke repo publik.
- Penawaran hasil AI adalah **estimasi/usulan**, bukan penawaran resmi yang dapat dipakai sebagai dokumen vendor.

Hasilnya adalah [matriks perbandingan](../../../templates/procurement/price-comparison.md) bila dibutuhkan, bukan surat keputusan pembelian.
