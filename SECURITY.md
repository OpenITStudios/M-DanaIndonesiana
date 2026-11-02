# Data Security & Responsible Handling

Repository ini **public**; tidak dirancang sebagai arsip transaksi pemerintah atau penyimpanan dokumen finansial asli.

## Klasifikasi

| Kelas | Contoh | Lokasi |
|---|---|---|
| PUBLIC SYSTEM | kode, SOP umum, template kosong, referensi publik | repository |
| INTERNAL PROJECT | rincian kegiatan dan anggaran non-publik, keputusan internal | storage privat terotorisasi |
| RESTRICTED | KTP, NPWP, nomor rekening, rekening koran, kontrak personal, tanda tangan, slip honor, bukti pembayaran, credential, token | storage privat dengan akses paling terbatas |

Jangan unggah data INTERNAL/RESTRICTED ke repo publik, issue, PR, Actions log, atau contoh pengujian. Menambahkan ke .gitignore **tidak menggantikan** kebijakan akses.

## Aturan dasar

1. Minimalkan data pribadi; simpan hanya yang diperlukan dan memiliki dasar pemrosesan yang sesuai.
2. Gunakan ruang penyimpanan privat yang disetujui, akses berbasis peran, dan backup teruji.
3. Jangan memasukkan password, token, cookie, API key, atau URL berisi rahasia ke Git.
4. Data uji harus sintetis; jangan menguji parser, UI, atau generator pada data asli tanpa izin dan perlindungan.
5. Catat asal/versi dokumen dan pengendali akses, tetapi jangan membocorkan isi sensitif dalam ringkasan publik.
6. Perubahan dan koreksi keuangan harus mempertahankan jejak audit; jangan memalsukan atau menimpa bukti.
7. Retensi, penghapusan, dan permintaan akses data pribadi harus mengikuti dasar hukum dan ketentuan penyimpanan yang berlaku; jangan menetapkan angka tahun tanpa sumber.
8. Jika terjadi paparan, hentikan penyebaran, batasi akses, amankan kredensial terkait, dan eskalasi melalui proses penanganan insiden yang disetujui. Penghapusan file dari commit terbaru **tidak** menghapus history.

Rujukan umum: UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi. Penerapannya pada kegiatan spesifik memerlukan peninjauan lebih lanjut.

## Pelaporan kerentanan

Jangan mempublikasikan rahasia atau data personal untuk membuktikan bug. Laporkan masalah secara privat kepada pengelola repository/proyek melalui kanal yang disepakati.
