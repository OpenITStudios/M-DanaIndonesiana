# creative-production — Domain Contract

**Tanggung jawab:** Menjaga keterhubungan hasil pekerjaan yang benar-benar ada dengan indikator, jadwal dan bukti, tanpa membuat klaim kemajuan berlebihan.

Patuhi [shared contract](../OPERATING-CONTRACT.md), [source authority](../../../docs/foundation/02-source-authority.md), [proof boundary](../../../docs/foundation/03-proof-and-approval.md) dan [traceability](../../../docs/foundation/04-traceability.md). Domain ini tidak menduplikasi aturan dari pemilik lain.

## Input yang diperlukan (privat bila terkait proyek nyata)

- baseline indikator/linimasa yang berlaku
- rencana aktivitas, pemilik tugas, deskripsi hasil dan penerimaan internal
- bukti QA, demo, hasil produksi atau dokumen terkait

Jika sumber yang diminta tidak tersedia, keluarkan UNKNOWN spesifik, bukan mengarang. File sumber yang hanya diizinkan untuk dipelajari adalah read-only dan tidak boleh diekspor atau ditulis ke tempat lain.

## Prosedur

1. Pisahkan keluaran riset, praproduksi, produksi, QA, publikasi dan pengarsipan hanya jika diminta baseline.
2. Setiap ACT memuat target IND, owner, output yang dapat diuji, kriteria penerimaan, dependensi dan rujukan biaya.
3. Status PLANNED / IN_PROGRESS / READY_FOR_REVIEW / ACCEPTED_INTERNAL / DEFERRED harus didukung observasi atau keputusan.
4. Untuk dunia/game digital, nilai konten, ruang/navigasi, mekanik, materi edukasi, aksesibilitas, stabilitas dan hasil QA jika pengujian tersedia.
5. Catat lingkungan, versi, skenario, ekspektasi, hasil aktual dan tangkapan bukti pada uji sungguhan.
6. Jangan menyamakan persentase task internal dengan persentase indikator e-RISPRO tanpa dasar yang disetujui.
7. Sampaikan perubahan waktu/lingkup material ke grant administration dan regulatory untuk ketentuan persetujuan.
8. Berikan hasil nyata ke writing dan evidence-audit untuk pelaporan, tanpa membuat angka baru.

## Output contract

Matriks indikator-aktivitas-kriteria-bukti-status dan daftar risiko produksi yang nyata.

Sertakan ruang lingkup dan periode, versi sumber/nomor referensi aman, metode yang benar-benar dilakukan, status internal, exception, dan langkah tindak lanjut. Draf/hasil audit bukan bukti pengajuan atau persetujuan eksternal.

## Stop rules

- QA belum dieksekusi = NOT_EXECUTED.
- Dokumentasi screenshot tidak otomatis membuktikan seluruh fitur bekerja.
- Milestone internal ≠ persetujuan pemerintah.
- Jangan menciptakan keluaran tambahan sebagai kewajiban kontraktual.

## Contoh uji dengan data sintetis

Game bisa dibuka belum membuktikan QA stabilitas multiuser; status hanya pada skenario yang sudah diuji.

## Rute rinci v0.8

[Workflow](WORKFLOW.md) untuk kerja; [Indicator Mapping](INDICATOR-MAPPING.md) untuk indikator; [Curatorial Records](CURATORIAL-RECORDS.md) untuk sumber konten; [Digital Deliverables](DIGITAL-DELIVERABLES.md) untuk handoff; [Release & Archive](RELEASE-ARCHIVE.md) untuk preservasi. Semua milik satu skill tanpa QA yang dijalankan saat ini.
