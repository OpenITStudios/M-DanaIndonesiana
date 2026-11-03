# evidence-audit — Domain Contract

**Tanggung jawab:** Mengukur kekuatan dukungan bukti untuk suatu klaim, bukan mengesahkan kegiatan/pembayaran berdasarkan nama berkas.

Patuhi [shared contract](../OPERATING-CONTRACT.md), [source authority](../../../docs/foundation/02-source-authority.md), [proof boundary](../../../docs/foundation/03-proof-and-approval.md) dan [traceability](../../../docs/foundation/04-traceability.md). Domain ini tidak menduplikasi aturan dari pemilik lain.

## Input yang diperlukan (privat bila terkait proyek nyata)

- klaim yang diuji dan pemilik fakta, daftar berkas dengan lokasi privat
- dokumen sumber yang boleh dibaca, foto/tabel pindai jika relevan
- hasil audit lingkup sebelumnya untuk menghindari temuan berulang

Jika sumber yang diminta tidak tersedia, keluarkan UNKNOWN spesifik, bukan mengarang. File sumber yang hanya diizinkan untuk dipelajari adalah read-only dan tidak boleh diekspor atau ditulis ke tempat lain.

## Prosedur

1. Uraikan klaim dan tingkatan pemeriksaan: keberadaan, terbaca, konsistensi, korelasi dengan sumber, peninjauan substantif, konfirmasi eksternal.
2. Bedakan harga pembanding, tagihan, kuitansi/transfer, hasil pekerjaan dan konfirmasi e-RISPRO: tiap jenis membuktikan aspek berbeda.
3. Tautkan EVD ke ACT/IND/RAB/TXN/DEC yang sesuai; pastikan versi dan periode dokumen benar.
4. Periksa halaman pindai/gambar ketika teks tidak lengkap, tanpa mengira tidak terbaca berarti nihil.
5. Jangan membuktikan kehadiran kegiatan hanya dari proposal atau persetujuan hanya dari nama 'FINAL'.
6. Kelompokkan masalah berdasarkan akar: MISSING, CONFLICT, NEEDS_REVIEW, NOT_EXECUTED, atau CHECKED_INTERNAL khusus metode yang sudah dilakukan.
7. Prioritaskan P0/P1/P2 berdasarkan dampak yang benar-benar teridentifikasi; hapus duplikasi temuan, bukan bukti.
8. Redaksi temuan aman untuk privasi; jangan menyalin KTP, rekening, tanda tangan, atau alamat personal ke laporan publik.

## Output contract

Matriks klaim, bukti, metode pemeriksaan, hasil terbatas, dampak, pemilik tindak lanjut.

Sertakan ruang lingkup dan periode, versi sumber/nomor referensi aman, metode yang benar-benar dilakukan, status internal, exception, dan langkah tindak lanjut. Draf/hasil audit bukan bukti pengajuan atau persetujuan eksternal.

## Stop rules

- Kelengkapan berkas bukan bukti pembayaran/pekerjaan sungguh terjadi.
- Internal check tidak berarti lulus audit pemerintah.
- Jangan menebak isi scan yang gagal dibaca.
- Tidak menghapus/mengganti dokumen asli.

## Contoh uji dengan data sintetis

Ada invoice tanpa transfer → nilai tagihan dapat dicatat, status paid tetap INCOMPLETE.

## Referensi operasional

- [Claim-to-Evidence](CLAIM-TO-EVIDENCE.md) untuk jenis klaim, bukti dan cakupan audit.
- [Expenditure Evidence](EXPENDITURE-EVIDENCE.md) untuk data dukung menurut jenis transaksi.
- [Procurement](../procurement/CONTRACT.md) untuk pemilihan dan serah terima; [Digital Deliverables](../production/DIGITAL-DELIVERABLES.md) untuk hasil karya; [Indicator Mapping](../production/INDICATOR-MAPPING.md) untuk klaim capaian.
- [Regulatory](../regulatory/APPLICABILITY-MATRIX.md) untuk memastikan suatu dokumen **memang disyaratkan** pada konteks dan sumber yang berlaku.

Foto, invoice, pembayaran dan keputusan eksternal mempunyai fungsi bukti berbeda. Jangan menulis `CHECKED_INTERNAL` tanpa menyebut lingkup pemeriksaan yang dilakukan.
