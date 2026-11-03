# regulatory-applicability — Domain Contract

**Tanggung jawab:** Memutuskan applicability setiap aturan berdasarkan bukti, dengan sumber otoritas tetap di docs/foundation/02-source-authority.md.

Patuhi [shared contract](../OPERATING-CONTRACT.md), [source authority](../../../docs/foundation/02-source-authority.md), [proof boundary](../../../docs/foundation/03-proof-and-approval.md) dan [traceability](../../../docs/foundation/04-traceability.md). Domain ini tidak menduplikasi aturan dari pemilik lain.

## Input yang diperlukan (privat bila terkait proyek nyata)

- pertanyaan spesifik, sumber peraturan, pedoman kategori, tanggal kejadian
- versi perjanjian dan keputusan resmi yang boleh diperiksa
- konteks kegiatan/transaksi, tahun dan pihak terkait

Jika sumber yang diminta tidak tersedia, keluarkan UNKNOWN spesifik, bukan mengarang. File sumber yang hanya diizinkan untuk dipelajari adalah read-only dan tidak boleh diekspor atau ditulis ke tempat lain.

## Prosedur

1. Ambil pertanyaan sempit yang akan memengaruhi tindakan nyata.
2. Pin identitas setiap sumber: instansi, judul, versi, tahun, tanggal efektif, klausul/halaman, dan tautan resmi.
3. Pisahkan peraturan umum, Juknis, pedoman administrasi, klausul kontrak, keputusan PMO, serta contoh non-otoritatif.
4. Periksa kecocokan kategori, tahun pelaksanaan dan kejadian. Versi terbaru tidak otomatis mengubah perjanjian lama.
5. Periksa isu khusus: izin belanja versus kewajiban lapor aset, tarif dan status pajak, batas pengajuan/revisi, jenis bukti dan format.
6. Klasifikasikan APPLICABLE / NOT_APPLICABLE / CONFLICT / UNKNOWN dengan alasan dan bukti berlaku.
7. Jika konflik substantif, tampilkan dua sumber dan minta keputusan otoritas yang benar tanpa memilih sesuka hati.
8. Rute ke finance/admin/rights hanya butir aturan yang benar-benar terverifikasi.

## Output contract

Matriks aturan → sumber/klausul → ruang lingkup → status berlaku → dampak → langkah klarifikasi.

Sertakan ruang lingkup dan periode, versi sumber/nomor referensi aman, metode yang benar-benar dilakukan, status internal, exception, dan langkah tindak lanjut. Draf/hasil audit bukan bukti pengajuan atau persetujuan eksternal.

## Stop rules

- Jangan mengarang nomor pasal/halaman atau memakai snippet web sebagai teks lengkap.
- Contoh historis tidak menjadi perintah.
- Jangan memberi putusan legal final ketika sumber masih konflik.
- Hindari hardcoded angka peraturan lintas tahun sebagai konstanta universal.

## Contoh uji dengan data sintetis

Batas pelaporan aset tertentu ditemukan dalam pedoman → tidak berarti izin membeli aset telah terbit.

## Referensi operasional

- [Source Intake](SOURCE-INTAKE.md) untuk provenance/versi; [Applicability Matrix](APPLICABILITY-MATRIX.md) untuk kecocokan aturan.
- [Temporal & Contract](TEMPORAL-CONTRACT.md) untuk tahun/tanggal/perjanjian; [Conflict Escalation](CONFLICT-ESCALATION.md) ketika sumber berbeda.
- [Compliance Handoff](COMPLIANCE-HANDOFF.md) untuk meneruskan butir aturan yang telah dinilai ke skill yang membutuhkan.

Source Authority tetap satu pemilik definisi kelas sumber. Tidak membuat compliance score, tidak meng-hardcode aturan lintas tahun, dan tidak menyatakan APPLICABLE sebagai approval pemerintah.
