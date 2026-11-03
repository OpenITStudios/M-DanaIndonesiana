# Paket Administrasi — Pencairan, Kemajuan, dan Pertanggungjawaban

**Pemilik proses:** `grant-administration`. Dokumen ini memberi prosedur **pembuatan paket**, bukan daftar hukum universal. Gunakan bersama [Document Control](DOCUMENT-CONTROL.md), [source authority](../../../docs/foundation/02-source-authority.md), [proof boundary](../../../docs/foundation/03-proof-and-approval.md), dan [shared contract](../OPERATING-CONTRACT.md).

## Pilih satu tujuan, jangan buat semua paket

| Tujuan kerja | Dokumen sumber yang harus ditentukan | Hasil |
|---|---|---|
| Pencairan tahap awal | Perjanjian, lampiran persyaratan, RAB dan rencana penggunaan dana versi sah, ketentuan status perpajakan | Daftar kesiapan dan paket draf yang memang diperlukan |
| Pencairan lanjutan | Ketentuan kontrak per tahap, laporan kemajuan, laporan penggunaan dana periode terdahulu, bukti keputusan pemantauan jika ada | Daftar kekurangan, perbandingan rencana–realisasi, daftar unggah yang perlu review |
| Pelaporan indikator | Indikator dan tahapan disetujui, kegiatan faktual, bukti hasil, format publik/nonpublik yang berlaku | Paket laporan capaian dan daftar bukti, tanpa persentase rekaan |
| Perubahan RAB/linimasa/indikator | Versi yang berlaku, draf perubahan, alasan, ketentuan izin, keputusan pejabat berwenang | Matriks sebelum/sesudah, dampak, surat pengajuan bila diperlukan; baseline tidak berubah sebelum sah |
| Pelaporan akhir/penutupan | Perjanjian, format laporan akhir, seluruh kegiatan, laporan keuangan, HKI/kewajiban lain yang terbukti relevan | Daftar komponen laporan, risiko terbuka, bukti status eksternal |

Tidak menetapkan persentase termin, ambang revisi, batas pelaporan, atau template per tahun dari asumsi. Portal LPDP menyediakan contoh untuk jumlah termin yang berbeda; pilih **berdasarkan proyek dan perjanjian**, bukan kebiasaan atau nama file.

## Workflow paket dari awal sampai akhir

1. **Tujuan & aktor.** Catat kepada siapa dokumen akan diserahkan, untuk periode apa, dan apakah permintaan hanya analisis, penyusunan draf, atau pengiriman. Pengiriman dan perubahan status eksternal tidak diizinkan secara implisit.
2. **Sumber kewajiban.** Ambil dokumen perjanjian/ketentuan yang boleh dibaca; pin kategori, tahun, tanggal, versi, lampiran, halaman/klausul, status berlaku. Jika dua sumber berbeda, tandai `CONFLICT`; jangan memilih berdasarkan tanggal unggah.
3. **Inventaris dokumen yang ada.** Cek isi berkas, bukan nama file; catat tipe, ID aman, versi, status internal, siapa pemilik dokumen, dan referensi lokasi privat jika boleh dicatat.
4. **Checklist kebutuhan.** Tarik satu persyaratan pada satu baris. Statusnya `AVAILABLE`, `MISSING`, `NEEDS_CORRECTION`, `NOT_APPLICABLE`, atau `UNVERIFIED`. `AVAILABLE` tidak berarti autentik/diterima.
5. **Cross-domain minimum.** Hitungan dan selisih diserahkan ke Finance; bukti ke Evidence; narasi kegiatan ke Writing; applicability kepada Regulatory. Jangan menggandakan data sumber.
6. **Perakitan paket draf.** Susun cover/indeks, jenis dokumen sesuai keharusan, versi dan tanggal, daftar lampiran aktual, kolom gap terbuka, catatan reviu. Tidak mengarang nomor surat, keputusan, cap/tanda tangan.
7. **Review dan kesimpulan status.** Pisahkan kesiapan internal, penerimaan portal, keputusan/verifikasi PMO, dan konfirmasi dana bank. Tuliskan sumber yang benar-benar diperiksa.
8. **Handoff.** Keluaran siap ditinjau, bukan otomatis siap diunggah. Setelah persetujuan internal yang nyata, operator berwenang menentukan tindakan selanjutnya.

## Kartu kendali satu persyaratan

```text
Requirement ID:
Kegiatan / termin / indikator:
Dasar ketentuan (ref dan bagian):
Nama dokumen yang diminta:
Dokumen yang ditemukan / versi:
Status kelengkapan: AVAILABLE | MISSING | NEEDS_CORRECTION | NOT_APPLICABLE | UNVERIFIED
Pemeriksaan yang sungguh dilakukan:
Kekurangan / konflik:
Pemilik perbaikan:
Status eksternal (jika bukti ada):
```

## Hasil yang dapat diproduksi

- **Kartu status pengajuan:** apa yang dikirim, apa yang masih draf, apa yang dikembalikan untuk revisi, dan keputusan eksternal yang dapat dibuktikan.
- **Daftar kelengkapan:** satu baris per persyaratan dengan referensi sumber dan penanggung jawab.
- **Ringkasan perbaikan:** isi koreksi yang diminta, file dan versi yang terdampak, batas waktu yang terbukti, serta langkah penanganan.
- **Daftar unggah:** nama dan versi berkas yang benar-benar disetujui untuk diserahkan; catatan `READY_TO_SUBMIT` tidak berarti `SUBMITTED`.

Gunakan [template paket](../../../templates/reporting/administrative-package.md) hanya ketika ada kebutuhan menyusun artefak. Jangan membuat folder atau dokumen kosong untuk semua jenis laporan.

## Larangan mutlak

- Dokumen berbasis permintaan "pelajari saja" **tidak boleh** disalin, diunggah, atau dimaterialisasi untuk paket lain.
- Tanggal penerbitan surat bukan bukti tanggal unggah awal. Jangan menilai keterlambatan tanpa histori pengajuan.
- Perjanjian yang menetapkan perubahan tertulis tidak dapat digantikan perubahan label folder atau file baru.
- Laporan angka yang cocok secara mekanis tidak berarti sudah diverifikasi substantif oleh pemerintah.
- Ketersediaan arsip, rencana kegiatan, dan bukti pembanding harga masing-masing adalah jenis bukti berbeda.
