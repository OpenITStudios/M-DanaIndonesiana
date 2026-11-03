# Document Control — Satu Riwayat, Bukan Banyak "Final"

**Owner:** kendali dokumen administrasi. Kerangka ini diadaptasi dari prinsip tata arsip fungsi, metadata, klasifikasi akses dan riwayat perubahan. Bukan klaim bahwa penerima pendanaan tunduk pada seluruh prosedur internal ANRI.

## Tiga dimensi yang tidak boleh digabung

| Dimensi | Nilai contoh | Prinsip |
|---|---|---|
| **Fungsi** | pengajuan, keuangan, produksi, pelaporan, referensi, riwayat | Menentukan lokasi klasifikasi dokumen secara stabil |
| **Status kerja internal** | DRAFT, IN_REVIEW, READY_TO_SUBMIT, SUPERSEDED | Menjelaskan proses penyuntingan/penggunaan internal |
| **Status eksternal** | UNKNOWN, SUBMITTED, REVISION_REQUESTED, EXTERNAL_CONFIRMED | Harus didukung tanda terima/surat/putusan sesuai lingkup |

Sebuah dokumen dapat berada di folder pengajuan, punya status internal `READY_TO_SUBMIT`, tetapi eksternal `UNKNOWN`. Jangan menambahkan kata `DISETUJUI` ke filename tanpa dasar keputusan. Untuk bukti verifikasi eksternal, gunakan kontrak [Proof & Approval](../../../docs/foundation/03-proof-and-approval.md).

## Minimum metadata saat diperlukan

| Field | Makna |
|---|---|
| `document_id` | kode internal aman; jangan gunakan NIK/nomor rekening |
| `document_type` / `purpose` | proposal, RAB, indikator, surat, laporan, bukti, dll. |
| `source_ref` / `source_version` | asal dan versi dokumen yang dirujuk |
| `effective_as_of` | tanggal berlaku jika **benar-benar** diketahui |
| `owner` / `reviewer` | penanggung jawab dan pemeriksa |
| `internal_status` / `external_status` | dua dimensi status yang terpisah |
| `supersedes` / `decision_ref` | relasi revisi dan bukti persetujuan, jika ada |
| `access_class` | PUBLIC_SYSTEM / INTERNAL_PROJECT / RESTRICTED |
| `allowed_storage` | tempat yang secara eksplisit diizinkan oleh pemilik |
| `last_reviewed_at` | waktu pemeriksaan nyata, bukan tanggal fabrikasi |

Tidak harus membuat database metadata. Daftar kendali sederhana di tempat privat sudah cukup untuk sedikit berkas; bila tugas hanya membaca dokumen, jangan membuat daftar tersebut sama sekali.

## Nama dan navigasi

- Folder fungsi stabil: `NN - Nama Fungsi`, misalnya `01 - Pengajuan dan Persetujuan`. Jangan memberi nama `Aktif Sekarang`, `Revisi Terbaru`, atau `Final Baru` kepada folder root.
- File kerja yang perlu versi: `YYYY-MM-DD - Jenis - Topik - vNN - STATUS.ext`, hanya bila tanggal/versi benar. Jangan mengarang v02.
- Paket yang sudah diajukan dibekukan sebagai riwayat. Revisi ditulis sebagai **versi baru**, bukan overwrite silent.
- Arsip riwayat tetap dapat ditemukan, tetapi tidak ditempatkan seolah kandidat pengajuan terbaru.
- Folder baru dibuat **hanya** ketika ada berkas; jangan membuat folder korespondensi atau draf kosong.
- Dokumen ganda identik boleh ditandai sebagai duplikat, tetapi tidak otomatis dihapus bila perlu sebagai bukti rangkap/tanda tangan berbeda.
- Data pribadi dan berkas berisi identitas tidak ditempatkan di repository publik, issue, atau tangkapan layar dokumentasi sistem.

## Transisi

```text
DRAFT → IN_REVIEW → READY_TO_SUBMIT
                    |
                    +→ SUBMITTED (jika receipt portal tersedia)
                         |
                         +→ REVISION_REQUESTED (jika keputusan ada)
                         +→ EXTERNAL_CONFIRMED (jika keputusan ada)
```

Ini peta konseptual; tidak memaksa pengguna mengisi semua status. Dokumen eksternal yang mengalami revisi harus mempertahankan hubungan versi serta hasil keputusan resminya. Surat pembaruan tidak otomatis menjadi addendum yang berlaku.

## Pencegahan kesalahan umum

- `Terbaru` pada filename ≠ disetujui.
- Folder `Arsip` ≠ bukti bahwa dokumen tidak lagi mengikat.
- File `Terkirim` ≠ bukti e-RISPRO telah menerima/memverifikasi.
- Tanggal file dimodifikasi ≠ tanggal surat atau tanggal penerimaan portal.
- Jumlah lampiran sesuai ≠ substansi dan autentisitas memenuhi persyaratan.

Gunakan [template kendali perubahan](../../../templates/reporting/revision-decision.md) jika revisi sungguhan diperlukan. Tidak menggandakan aturan status di skill writing/finance.
