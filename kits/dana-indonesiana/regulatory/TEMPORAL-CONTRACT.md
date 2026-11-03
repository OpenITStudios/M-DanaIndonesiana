# Temporal & Contract Scope — Tahun Berbeda, Aturan Berbeda

**Masalah:** "Dana Indonesiana 2025–2026" tidak berarti satu tahun aturan, dan dokumen tahun 2026 tidak otomatis menggantikan seluruh syarat pendanaan 2025. Periksa ruang waktu **per klausul dan per tindakan**.

## Lima tanggal/masa yang berbeda

| Field | Peran | Larangan inferensi |
|---|---|---|
| `program_year` | periode program seleksi/penetapan | bukan otomatis periode belanja |
| `contract_start/end` | masa perjanjian/adendum sebenarnya | bukan tanggal hasil baca atau unggah |
| `fiscal_year` | tahun anggaran/standar biaya yang dituju | tidak otomatis sama tahun kontrak |
| `event_date` | tanggal transaksi, pekerjaan, pengajuan atau pelaporan | tidak otomatis tanggal jatuh tempo |
| `rule_effective_date` | tanggal ketentuan mulai berlaku dan ketentuan peralihannya | tidak boleh diambil dari timestamp download |

Untuk pertanyaan batas waktu: identifikasi apakah redaksi menggunakan **hari kalender, hari kerja, bulan atau jangka waktu lain**, titik awal hitung, inklusivitas batas, perubahan resmi, dan jika relevan aturan hari libur. Jangan menghitung secara otomatis dari asumsi atau menyamakan tanggal dokumen dan tanggal submit e-RISPRO.

## Ilustrasi publik — bukan ketentuan proyek

- Pedoman Administrasi Dana Indonesiana **2025** memuat perubahan RAB paling banyak dua kali dan batas pengajuan 60 hari sebelum masa kegiatan perjanjian berakhir; sumber: [Pedoman LPDP 2025 bagian Administrasi Perubahan Data](https://erispro-indonesiana.kemenkeu.go.id/upload/DAKB_Pedoman_administrasi_penerima_2025.pdf). Kapan hal tersebut **mengikat proyek tertentu** tetap harus dievaluasi.
- [PMK 39/2024](https://jdih.kemenkeu.go.id/dok/pmk-39-tahun-2024) berjudul Standar Biaya Masukan **Tahun Anggaran 2025**; [PMK 32/2025](https://jdih.kemenkeu.go.id/dok/pmk-32-tahun-2025) berjudul SBM **TA 2026**.
- [PMK 54/2026](https://jdih.kemenkeu.go.id/dok/pmk-54-tahun-2026) berjudul SBM dan menurut penjelasan JDIH digunakan dalam penyusunan rencana kerja dan anggaran mulai **TA 2027**. Jangan menyimpulkan ia otomatis mencabut seluruh batas biaya pada kontrak 2025/2026.
- Pusat dokumen [LPDP e-RISPRO](https://erispro-indonesiana.kemenkeu.go.id/information-corner) menyediakan pedoman/format yang berbeda; kemunculan file baru di portal belum menentukan kesepakatan sumber kontrak.

**Pemisahan hukum:** peraturan yang lebih tinggi dan mengikat secara umum dapat berlaku independen dari perjanjian; kebijakan program/kontrak menjabarkan kewajiban spesifik. Periksa keduanya menurut lingkup, bukan otomatis menempatkan dokumen terbaru sebagai hukum tertinggi.

## Revisi, persetujuan dan snapshot

- Saat ada perubahan perjanjian atau RAB: pertahankan **versi sebelum**, **versi usulan**, bukti pengajuan, keputusan persetujuan, dan tanggal efektif bila ada.
- Jika versi usulan tidak memiliki bukti persetujuan, pertahankan baseline lama dan status proposal `PENDING` atau `UNKNOWN`, kecuali ada dasar lain yang sah.
- Peraturan baru hanya memicu **impact review** pada aturan/tindakan yang terkena, bukan perubahan diam-diam atas seluruh transaksi historis.
- Tanggal yang belum diketahui tetap `UNKNOWN`. Jangan menggunakan akhir tahun program sebagai akhir perjanjian.

Gunakan [Change Impact](../../../templates/regulatory/change-impact.md) hanya jika ada sumber berubah atau perubahan regulasi yang benar-benar relevan.
