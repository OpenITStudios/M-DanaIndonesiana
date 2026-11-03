# Claim-to-Evidence Workflow — Bukti untuk Keuangan dan Karya

**Owner:** skill `evidence-audit`. Pertanyaan yang dijawab adalah: **apa tepatnya klaim yang ingin dibuktikan, apa sumbernya, dan batas pemeriksaan apa yang benar-benar telah dilakukan?** Ini bukan sertifikasi audit, pembuktian keaslian tanda tangan, ataupun persetujuan LPDP.

Gunakan [Proof & Approval](../../../docs/foundation/03-proof-and-approval.md) sebagai pemilik tunggal status, [Traceability](../../../docs/foundation/04-traceability.md) untuk hubungan ID, dan [Shared Contract](../OPERATING-CONTRACT.md) untuk privasi. Jangan membuat registry kedua apabila catatan proyek sudah memuat bukti dengan jelas.

## Mulai dari klaim, bukan dari nama file

| Klaim yang muncul | Bukti yang dapat menunjang | Hal yang belum terbukti hanya dari bukti tersebut |
|---|---|---|
| Harga kebutuhan wajar untuk perencanaan | tangkapan harga, penawaran, spesifikasi, tanggal dan sumber pasar | barang dibeli, penyedia terpilih atau harga telah disetujui |
| Jasa sudah dipesan | surat pesanan/kontrak dan lingkup kerja | pekerjaan selesai atau uang dibayar |
| Jasa sudah dikerjakan | artefak hasil, catatan penyerahan dan pemeriksaan penerimaan | transfer telah dilakukan atau kualitas semua fitur telah diuji |
| Dana telah dibayar | bukti pembayaran dan kecocokan kas/bank, kuitansi yang tepat | pekerjaan memenuhi mutu atau pajak telah disetor |
| Acara telah dilaksanakan | dokumentasi relevan, materi, notula/kehadiran sesuai syarat | jumlah peserta, dampak, atau kepuasan tanpa pengukuran |
| Laporan telah dikirim | tanda terima/status kanal resmi yang terbaca | disetujui atau pembayaran tahap berikutnya sudah cair |
| Perubahan RAB disetujui | surat/keputusan resmi yang mengidentifikasi versi dan lingkup | semua revisi lain juga disetujui |

## Tangga pembuktian

1. **Identitas sumber:** klasifikasi dokumen, asal, penerbit, versi, tanggal (dibuat/diterima), proyek, dan batas akses; untuk berkas privat cukup ID aman.
2. **Ketersediaan:** berkas ada atau tidak. File bernama `FINAL` tidak otomatis menjadi dokumen final yang berlaku.
3. **Keterbacaan:** teks dan tabel dapat diperiksa; untuk pindai termasuk halaman gambar. Bila tidak terbaca, catat keterbatasannya; jangan menebak.
4. **Kesesuaian isi:** nilai, tanggal, pekerjaan, pihak, periode dan kode RAB/indikator benar-benar konsisten dengan bukti yang dibandingkan.
5. **Dukungan lintas sumber:** kontrak, keluaran, pembayaran dan persetujuan berkaitan untuk klaim **yang sama**, bukan sekadar berkas yang kebetulan dalam satu folder.
6. **Pemeriksaan substansi:** apakah hasil karya atau barang/jasa sungguh diterima? Jika membutuhkan inspeksi manusia/teknis dan belum dilakukan, berikan `NEEDS_REVIEW` atau `NOT_EXECUTED`.
7. **Konfirmasi eksternal:** hanya dokumen/receipt resmi dapat mendukung klaim pengajuan atau keputusan pihak luar, sesuai lingkupnya.

Jangan mengubah seluruh tangga menjadi satu skor `100% aman`. Pelaporan harus menunjukkan **jenis pemeriksaan** yang dilakukan dan yang belum.

## Jalur satu transaksi/bukti

```text
OBL / IND (kewajiban)
→ ACT (pekerjaan)
→ RAB (pos dan versi sah)
→ PRC (pengadaan bila relevan)
→ TXN (tagihan/pembayaran tercatat)
→ EVD (bukti spesifik)
→ RPT (klaim dalam laporan)
```

Setiap panah harus ditopang sumber atau diberi gap; bukan asumsi hubungan berdasarkan nama berkas. Bukti pembayaran tidak sama dengan referensi harga; bukti screenshot tidak sama dengan hasil QA menyeluruh.

## Temuan dan prioritas

- `MISSING`: dokumen atau relasi yang **terbukti wajib** untuk klaim ini belum ditemukan.
- `CONFLICT`: dua sumber relevan memiliki fakta atau versi yang bertentangan.
- `NEEDS_REVIEW`: perlu keputusan/inspeksi manusia atau otoritas.
- `NOT_EXECUTED`: pemeriksaan alat, akses atau inspeksi belum dilakukan.
- `CHECKED_INTERNAL`: **hanya metode yang disebut** telah dilaksanakan; bukan sertifikasi pemerintah.

Gunakan P0 untuk persoalan yang dapat mengubah izin belanja, bukti pembayaran, kewajiban perjanjian, atau status pengajuan. P1 untuk celah yang menghambat mutu laporan/penelusuran. P2 untuk keterbacaan dan penamaan yang tidak mengubah substansi. Prioritas bukan skor kepastian statistik.

## Duplikat dan keutuhan

- Kesamaan byte/hash dapat mendukung bahwa dua berkas identik, tetapi **tidak membuktikan keaslian dokumen**.
- File yang visualnya mirip bisa memiliki lembar tanda tangan atau lampiran berbeda; jangan otomatis menghapus atau menyatukannya.
- Pertahankan asli, versi revisi, dan alasan pemakaian jika akses pemilik mengizinkan. Perubahan catatan harus terlacak, bukan menimpa bukti.
- Link yang putus tidak berarti kegiatan tidak terjadi; identifikasi sumber fisik atau privat lain yang berwenang.

## Handoff

Gunakan [template telaah bukti](../../../templates/evidence/evidence-review.md) hanya ketika benar-benar dibutuhkan. Ringkasan harus menyebut klaim, bukti, metode pemeriksaan, hasil, risiko, dan siapa yang harus bertindak. Gunakan redaksi **terbatas**: "bukti transfer tersedia dan nominal cocok", bukan "pekerjaan dan kewajiban perpajakan telah memenuhi semua aturan".

**Privasi:** jangan menyalin KTP/NPWP/rekening/tanda tangan, folder privat, atau isi dokumen dengan izin "pelajari saja" ke repository, dokumen hasil, atau Drive lain.
