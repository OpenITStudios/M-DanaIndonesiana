---
id: decision.0004-evidence-procurement
authority: CANONICAL
status: ACTIVE
date: 2026-11-03
---

# Decision 0004 — Evidence and Procurement Without Eighth Agent

## Latar belakang

Sumber pembanding harga, bukti pembayaran, hasil produksi, dan status portal sering disamakan, sehingga laporan bisa terlihat lengkap tanpa membuktikan kegiatan dan transaksi. Pengadaan jasa kreatif juga memerlukan konfirmasi hasil dan lisensi yang tidak bisa dipastikan melalui kuitansi saja.

## Keputusan

1. **Tetap tujuh skill utama.** `evidence-audit` menjadi router untuk bukti; **Procurement** merupakan modul logis di `kits/dana-indonesiana/procurement/` dengan kontrak tugas jelas, bukan skill atau agen kedelapan.
2. Evidence membuktikan klaim sesuai sumber dan jenis bukti; Finance memiliki kas/angka; Administration status dokumen; Regulatory penerapan aturan; Production mutu teknis; Dissemination kepemilikan/izin karya.
3. Struktur satu pembelian: kebutuhan dan izin → spesifikasi → harga pembanding → pemilihan → pesanan/kontrak → hasil/serah terima → pembayaran → paket bukti laporan. Hanya tahap yang benar-benar terjadi boleh dilabeli selesai.
4. Persyaratan survei harga dan ambang tertentu **dipilih menurut pedoman dan kontrak yang berlaku**, bukan angka global otomatis.
5. Ketentuan formal Perpres/PerLKPP tentang pengadaan pemerintah tidak otomatis diterapkan sebagai SOP penerima bantuan; periksa ruang lingkup, jenis entitas, sumber anggaran dan perjanjian. Prinsip kewajaran harga dapat menjadi referensi desain.
6. Dokumen digital/hasil jasa kreatif memerlukan bukti penyerahan dan review; screenshot/kontrak saja tidak cukup untuk mengklaim QA.
7. Dokumen privat yang pengguna beri instruksi "pelajari saja" tetap tidak disimpan, dipublikasikan, atau dijadikan data contoh.
8. **Pengujian ditunda** sesuai arahan pengguna. Dokumen baru adalah desain prosedural, bukan klaim fitur verifikasi otomatis yang telah berjalan.

## Pendekatan yang tidak dipakai

Tidak membangun vendor portal, approval bot, klasifikasi otomatis pajak, daftar vendor fiktif, skor pengadaan generik, folder kosong, duplikasi evidence registry, atau mesin aturan yang memaksa LKPP untuk semua penerima.

## Referensi

- [Pedoman Administrasi Dana Indonesiana 2025](https://erispro-indonesiana.kemenkeu.go.id/upload/DAKB_Pedoman_administrasi_penerima_2025.pdf)
- [LPDP Information Corner](https://erispro-indonesiana.kemenkeu.go.id/information-corner)
- [ANRI — Arsip Dinamis](https://www.anri.go.id/sekitar-arsip/arsip-dinamis)
- [LKPP — Perpres 46/2025](https://jdih.lkpp.go.id/regulation/peraturan-presiden/peraturan-presiden-nomor-46-tahun-2025)
- [LKPP — Peraturan Lembaga 3/2026](https://jdih.lkpp.go.id/regulation/peraturan-lkpp/peraturan-lkpp-nomor-3-tahun-2026)
