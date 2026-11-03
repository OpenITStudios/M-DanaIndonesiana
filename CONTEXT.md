# Context — M-DanaIndonesiana

- **Repo:** OpenITStudios/M-DanaIndonesiana.
- **Status produk:** Skill System v1.0 pada `develop`: pedoman modular, kalkulator JSON dan eksportir Excel prototipe; belum aplikasi produksi.
- **Tujuan:** membantu proyek pendanaan kebudayaan 2025–2026 dalam pengelolaan karya, RAB, administrasi, transaksi, bukti, dan pelaporan.
- **Branch:** develop (development), Local (reviewed integration), main (stable).
- **Model:** reusable public system + data proyek sebenarnya di tempat privat terotorisasi.
- **Sumber eksternal:** regulasi dan pedoman resmi dicatat sebagai kandidat sampai kontrak/kategori diverifikasi.
- **Validasi:** pemeriksaan struktur/sumber tidak membuktikan transaksi nyata, persetujuan PMO, status e-RISPRO, atau kepatuhan final.

## Data proyek privat

Nama penerima, identitas pribadi, perjanjian, RAB, indikator, termin, dan keputusan spesifik proyek tidak disimpan pada repo publik. Fakta dari sumber privat boleh dipakai untuk analisis dalam izin pengguna, namun tidak boleh dipersistenkan jika pengguna meminta hanya dipelajari.

## Fokus lanjutan

Untuk pekerjaan proyek nyata, gunakan Project Intake dan sumber berizin; prototipe hanya memakai fixture sintetis di Git publik. Data dan ketentuan spesifik tetap harus diverifikasi sebelum digunakan sebagai dasar laporan.

## Pemisahan sumber

- **docs/**: standar sistem dan rujukan publik.
- **templates/**: formulir kosong; bukan bukti.
- **kits/**: prosedur produksi/validasi.
- **workspace/active/** dan **workspace/archive/**: data proyek nyata privat, tidak dilacak Git.
- **planning/**: pengembangan sistem yang masih relevan, bukan daftar otomatis yang harus dieksekusi.

Buka [README.md](README.md) untuk navigasi dan [AGENTS.md](AGENTS.md) untuk routing.

## Skill system v0.2

Skill tersedia di `.agents/skills/`, kontrak pada `kits/dana-indonesiana/`, rute di `docs/skills/README.md`. Detail kontrak dan data pribadi proyek tertentu tetap sengaja tidak dicatat di repo, meskipun telah diketahui dalam percakapan rahasia.


## Skill pengelolaan pelaporan v0.6 (dokumenter)

Pendalaman `grant-administration` dan `creative-documentation` ditambah sebagai kontrak dan template reusable. Router mengacu [docs/skills/README.md](docs/skills/README.md); tidak ada skill kedelapan, aplikasi submission, basis data baru, maupun pengujian yang dijalankan dalam tahap ini. Status spesifik proyek tetap tidak dipersistenkan.


## Evidence & procurement v0.7 (pedoman sistem)

`evidence-audit` diperkuat untuk pembuktian klaim dan bukti belanja. Domain procurement ditambahkan sebagai [kontrak modul](kits/dana-indonesiana/procurement/CONTRACT.md), bukan skill terpisah. Alur dan template tidak mengubah tujuh skill maupun sistem fakta tunggal. Tidak ada data proyek rahasia, pengadaan nyata, atau tes runtime yang diproses pada commit ini.

## Routing produksi v0.8

Skill `creative-production` sekarang memiliki lima pedoman di `kits/dana-indonesiana/production/`. Data dokumen proyek privat tetap tidak diabadikan pada GitHub. Tahap ini pengembangan dokumenter; tes/QA sengaja ditunda.

## Dissemination & Rights v0.9

Satu skill `dissemination-rights` kini memiliki lima pedoman domain: acara publik, hak karya, kebijakan Minecraft, identitas pendanaan, dan administrasi DJKI. Sumber regulasi/platform dipilih berdasarkan konteksnya. Tidak ada hak, izin, surat pencatatan atau kegiatan yang dinyatakan telah ada tanpa dokumen resmi; pengujian tetap ditunda.

## Regulatory Intelligence v1.0

Lima kontrak di domain `regulatory` mengelola source provenance, applicability, periode/kontrak, konflik, dan handoff. Source Authority tetap menjadi pemilik prinsip sumber. Status pada Git publik hanya berisi sistem dan referensi resmi; dokumen rahasia yang diminta untuk dipelajari saja **tidak disimpan**. Skill utama masih tujuh. Tidak ada tes/QA pada fase ini.
