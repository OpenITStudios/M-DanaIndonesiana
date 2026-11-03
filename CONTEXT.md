# Context — M-DanaIndonesiana

- **Repo:** OpenITStudios/M-DanaIndonesiana.
- **Status produk:** Foundation v0.1; pedoman sistem saja, belum aplikasi produksi.
- **Tujuan:** membantu proyek pendanaan kebudayaan 2025–2026 dalam pengelolaan karya, RAB, administrasi, transaksi, bukti, dan pelaporan.
- **Branch:** develop (development), Local (reviewed integration), main (stable).
- **Model:** reusable public system + data proyek sebenarnya di tempat privat terotorisasi.
- **Sumber eksternal:** regulasi dan pedoman resmi dicatat sebagai kandidat sampai kontrak/kategori diverifikasi.
- **Validasi:** pemeriksaan struktur/sumber tidak membuktikan transaksi nyata, persetujuan PMO, status e-RISPRO, atau kepatuhan final.

## Masih UNKNOWN

Nama dan identitas penerima manfaat, kategori program, isi perjanjian, tanggal berlaku, termin, RAB final, indikator, perubahan yang disetujui, serta format laporan spesifik proyek. Jangan mengisi dari memory atau pengalaman proyek sebelumnya.

## Fokus lanjutan

Setelah pemilik menjelaskan proyek atau memberikan dokumen sah, lakukan Project Intake, matriks sumber berlaku, dan baseline yang dapat ditelusuri. Tidak membuat aplikasi/fitur finansial sebelum kebutuhan dan bentuk data teruji.

## Pemisahan sumber

- **docs/**: standar sistem dan rujukan publik.
- **templates/**: formulir kosong; bukan bukti.
- **kits/**: prosedur produksi/validasi.
- **workspace/active/** dan **workspace/archive/**: data proyek nyata privat, tidak dilacak Git.
- **planning/**: pengembangan sistem yang masih relevan, bukan daftar otomatis yang harus dieksekusi.

Buka [README.md](README.md) untuk navigasi dan [AGENTS.md](AGENTS.md) untuk routing.

## Skill system v0.2

Skill tersedia di `.agents/skills/`, kontrak pada `kits/dana-indonesiana/`, rute di `docs/skills/README.md`. Detail kontrak dan data pribadi proyek tertentu tetap sengaja tidak dicatat di repo, meskipun telah diketahui dalam percakapan rahasia.
