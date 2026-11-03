# Applicability Matrix — Menentukan Ketentuan yang Berlaku

**Owner:** `regulatory-applicability`. Tidak ada skor AI tunggal atau boolean `compliant=true`. Matriks hanya menyatakan **kecocokan sumber atas pertanyaan tertentu**, bukan sertifikasi pemerintah.

Gunakan [Source Authority](../../../docs/foundation/02-source-authority.md), [Source Intake](SOURCE-INTAKE.md), dan [Temporal & Contract Scope](TEMPORAL-CONTRACT.md).

## Satu aturan dinilai terhadap satu konteks

```text
Pertanyaan / tindakan tertentu
→ sumber dan bagian yang sungguh dibaca
→ subjek, kategori, entitas, jenis belanja
→ tahun program / anggaran / tanggal kejadian / masa kontrak
→ syarat dan pengecualian
→ bukti sumber mengikat proyek (kontrak, pedoman, keputusan)
→ status applicability + alasan
→ owner dan dampak selanjutnya
```

## Enam gerbang sebelum status APPLICABLE

1. **Identity gate:** sumber, versi, judul, penerbit dan bagian relevan dapat diidentifikasi.
2. **Subject gate:** penerima/entitas, jenis pekerjaan/pajak/pengeluaran/kegiatan sesuai lingkup ketentuan.
3. **Temporal gate:** tanggal efektif, tahun program, tahun anggaran dan tanggal peristiwa cocok; tidak menggunakan versi terbaru secara retroaktif tanpa dasar.
4. **Authority gate:** tidak melanggar norma lebih tinggi atau mengira surat informal sebagai addendum; bila konflik hukum perlu review berwenang.
5. **Contract gate:** ketentuan sesuai perjanjian/Juknis/adendum/keputusan yang mengikat proyek, atau ada dasar hukum langsung yang dapat ditunjuk.
6. **Exception gate:** seluruh syarat nilai, waktu, jenis kegiatan, pengecualian dan persetujuan telah diperiksa.

Jika satu gerbang material tidak terbukti, **jangan keluarkan APPLICABLE**. Keluarkan UNKNOWN atau CONFLICT beserta sumber dan data yang diperlukan.

## Status yang tersedia

| Status | Arti |
|---|---|
| DISCOVERED | sumber ditemukan, belum diperiksa cukup |
| REVIEWED | teks/metadata yang relevan diperiksa, keberlakuan proyek belum diputuskan |
| APPLICABLE | bukti konteks mendukung penerapan *aturan spesifik* |
| NOT_APPLICABLE | alasan spesifik menunjukkan sumber tidak mencakup konteks |
| SUPERSEDED | ketentuan tertentu benar-benar digantikan pada ruang/periode yang terbukti |
| CONFLICT | sumber/versi/keputusan saling bertentangan dan belum terselesaikan |
| UNKNOWN | informasi atau dasar yang dibutuhkan belum tersedia |

APPLICABLE adalah keputusan klasifikasi internal berbasis bukti, **bukan** konfirmasi pihak pemerintah. `CHECKED_INTERNAL`, `SUBMITTED` atau `EXTERNAL_CONFIRMED` tetap mengikuti [Proof & Approval](../../../docs/foundation/03-proof-and-approval.md).

## Pemisahan ketentuan

- **OBLIGATION:** wajib melakukan sesuatu menurut dasar berlaku.
- **PROHIBITION:** tindakan dilarang menurut dasar berlaku.
- **PERMISSION:** diperbolehkan pada kondisi tertentu (bukan wajib).
- **APPROVAL_REQUIRED:** memerlukan persetujuan dari pihak berwenang.
- **REPORTING_REQUIREMENT:** apa yang wajib dilaporkan, **tidak otomatis berarti biaya/tindakan diizinkan**.
- **REFERENCE_ONLY:** contoh biaya, formulir atau praktik yang belum mengikat.

Contoh: batas nilai barang yang wajib dilaporkan sebagai aset **bukan** otomatis izin membeli aset. Contoh RAB kategori lain **bukan** dasar plafon kategori ini.

## Output

| Rule ID | Sumber / bagian | Pertanyaan | Lingkup dan waktu | Isi ketentuan / syarat | Status | Alasan/bukti | Dampak/owner |
|---|---|---|---|---|---|---|---|

Berikan hanya baris yang relevan, tanpa membuat rekap panjang. Bila perlu, pakai [template Applicability](../../../templates/regulatory/applicability-matrix.md) di ruang yang benar-benar diizinkan. `NOT_APPLICABLE` perlu dasar sama kuatnya dengan `APPLICABLE`, bukan sekadar ketidaktemuan.
