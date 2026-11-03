# grant-administration — Domain Contract

**Tanggung jawab:** Menyusun dan mengendalikan paket administrasi menurut jenis kegiatan dan perjanjian aktual. Tidak membuat status persetujuan eksternal.

Patuhi [shared contract](../OPERATING-CONTRACT.md), [source authority](../../../docs/foundation/02-source-authority.md), [proof boundary](../../../docs/foundation/03-proof-and-approval.md) dan [traceability](../../../docs/foundation/04-traceability.md). Domain ini tidak menduplikasi aturan dari pemilik lain.

## Input yang diperlukan (privat bila terkait proyek nyata)

- perjanjian dan lampiran yang berlaku, keputusan/addendum apabila ada
- dokumen pengajuan dalam versi sebenarnya, format resmi yang terverifikasi
- riwayat status e-RISPRO dan surat verifikator jika tersedia

Jika sumber yang diminta tidak tersedia, keluarkan UNKNOWN spesifik, bukan mengarang. File sumber yang hanya diizinkan untuk dipelajari adalah read-only dan tidak boleh diekspor atau ditulis ke tempat lain.

## Prosedur

1. Tentukan satu proses konkret: pencairan, laporan berkala, perubahan, monitoring, atau penutupan.
2. Bentuk checklist persyaratan dari perjanjian/kategori/tahun, bukan contoh lama; tandai dasar tiap persyaratan.
3. Catat status per berkas AVAILABLE, MISSING, NEEDS_CORRECTION, NOT_APPLICABLE atau UNVERIFIED.
4. Pisahkan status internal DRAFT / READY_FOR_REVIEW / READY_TO_SUBMIT dari status eksternal SUBMITTED / REVISION_REQUESTED / EXTERNAL_CONFIRMED yang memerlukan receipt resmi.
5. Hitung tenggat dari tanggal resmi dan rumus yang berlaku serta pertimbangkan perubahan tertulis; tampilkan cara hitung dan ketidakpastian.
6. Jika ada perubahan RAB/indikator/linimasa, buat perbandingan before/after, alasan, dampak dan sumber persetujuan; jangan timpa naskah pengajuan lama.
7. Siapkan surat dengan fakta yang ada dan lampiran nyata, review tata naskah serta tujuan; nomor/tanda tangan yang belum ada tetap kosong.
8. Rutekan bagian angka ke finance dan bukti ke evidence-audit; hanya susun paket jika kebutuhan aktual ada.

## Output contract

Checklist dokumen per proses, daftar versi/riwayat, catatan revisi, draf surat dan ringkasan kesiapan INTERNAL_REVIEW.

Sertakan ruang lingkup dan periode, versi sumber/nomor referensi aman, metode yang benar-benar dilakukan, status internal, exception, dan langkah tindak lanjut. Draf/hasil audit bukan bukti pengajuan atau persetujuan eksternal.

## Stop rules

- Penyaluran 2 atau 3 tahap tergantung perjanjian; jangan menyalin contoh 80–20 secara otomatis.
- Belum ada receipt e-RISPRO ≠ sudah diajukan.
- Tidak membuat folder korespondensi/draf kosong bila belum ada dokumen.
- Tidak mengunggah/men-submit ke kanal pemerintah tanpa otorisasi eksplisit.

## Contoh uji dengan data sintetis

Surat dan RAB ada tetapi bukti submit portal tidak ada → READY_TO_SUBMIT/UNKNOWN, bukan SUBMITTED.

## Handoff finance v0.3

Hasil perhitungan JSON adalah masukan DRAFT. Periksa masalah selisih, pos tak terpetakan, periode dan sumber bukti sebelum merancang checklist. Jangan menyimpulkan status e-RISPRO dari `status` kalkulator.

 ## Finance handoff v0.5

 Gunakan `tools/finance-handoff.mjs` untuk menerima ringkasan kuantitatif berlabel DRAFT. Kolom `calculation_consistent` berarti perhitungan internal tidak mempunyai temuan tingkat ERROR, **bukan** bukti laporan telah disetujui. Status pencairan dan penerimaan harus tetap dibuktikan sendiri melalui sumber portal/bank.


## Cara kerja rinci v0.6

- [Package Workflow](PACKAGE-WORKFLOW.md) — pelaksanaan satu paket pencairan, laporan indikator, perubahan, atau penutupan.
- [Document Control](DOCUMENT-CONTROL.md) — folder fungsi, identitas versi dan pemisahan status internal/eksternal.

Dua dokumen tersebut merupakan detail kerja dari skill **yang sama**, bukan database, tracker, atau agen kedua. Gunakan template kosong [Administrative Package](../../../templates/reporting/administrative-package.md) bila benar-benar diminta membuat dokumen.


## Paket pengadaan sebagai lampiran pelaporan (v0.7)

Administration hanya menyiapkan paket bukti yang **diwajibkan oleh pedoman/perjanjian yang berlaku**. Gunakan [Procurement Contract](../procurement/CONTRACT.md) dan [Evidence](../evidence/EXPENDITURE-EVIDENCE.md) untuk memeriksa jenis dokumen, bukan membuat kontrak/penawaran seolah asli atau mengesahkan pemilihan vendor. Status laporan eksternal tidak berubah karena checklist lengkap.

## Handoff DJKI dan kegiatan publik v0.9

[Recordation DJKI](../rights/DJKI-RECORDATION.md) menetapkan informasi/dokumen yang perlu dipersiapkan, bukan bukti permohonan telah diajukan. [Event & Dissemination](../rights/EVENT-DISSEMINATION.md) memberi bukti kegiatan publik; Administration memilih format laporan yang berlaku. Hak cipta lahir dan surat pencatatan merupakan status berbeda. Jangan meminta/menyimpan KTP atau NPWP dari pemilik tanpa dasar izin dan tempat yang disetujui.
