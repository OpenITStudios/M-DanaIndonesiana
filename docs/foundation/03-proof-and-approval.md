---
id: foundation.proof-and-approval
authority: CANONICAL
status: ACTIVE
---

# Proof, Validation & Approval Boundary

**Kelengkapan berkas tidak sama dengan keabsahan transaksi.** Suatu laporan yang formatnya benar tidak membuktikan hasil kegiatan telah terjadi atau bahwa otoritas telah menyetujui.

## Tingkat pemeriksaan

| Jenis | Bisa membuktikan | Tidak membuktikan |
|---|---|---|
| STRUCTURAL | field, format, relasi ID, lampiran ada | isi benar/otentik |
| ARITHMETIC | jumlah, saldo, konsistensi perhitungan yang diperiksa | pengeluaran boleh menurut perjanjian |
| DOCUMENTARY | sumber dan bukti terhubung, identitas/versi cocok | barang diterima atau kegiatan terjadi |
| SUBSTANTIVE | hasil yang ditinjau manusia, dokumentasi yang wajar | persetujuan dari LPDP/PMO |
| EXTERNAL | receipt/keputusan resmi yang benar-benar ditemukan | validitas hal lain di luar lingkup keputusan |

Gunakan status terpisah, jangan satu badge "COMPLIANT":

- **NOT_STARTED**: belum diperiksa.
- **INCOMPLETE**: bukti/data wajib untuk klaim belum cukup.
- **CONFLICT**: dua sumber material belum terselesaikan.
- **NEEDS_REVIEW**: butuh penilaian manusia/otoritas.
- **CHECKED_INTERNAL**: pemeriksaan internal yang disebutkan telah dilakukan.
- **SUBMITTED**: tersedia bukti pengajuan pada kanal resmi.
- **EXTERNAL_CONFIRMED**: tersedia keputusan/konfirmasi resmi untuk klaim spesifik.
- **NOT_EXECUTED**: tool/tes/observasi yang diperlukan belum dijalankan.

Label mesin seperti PASS untuk lint/test hanya boleh mengacu pada **tes tepat** yang berjalan, bukan compliance final.

## Pemeriksaan minimum satu klaim

    klaim → sumber yang berlaku → bukti → metode cek
    → siapa yang memeriksa → hasil terbatas → exception

Tunjukkan ketidakpastian, sebut sumber yang belum ditemukan, dan jangan memalsukan approval/signature. Perubahan material pada baseline memerlukan jejak persetujuan manusia.

Untuk prosedur pemeriksaan artefak, gunakan [VALIDATION.md](../../kits/dana-indonesiana/VALIDATION.md).
