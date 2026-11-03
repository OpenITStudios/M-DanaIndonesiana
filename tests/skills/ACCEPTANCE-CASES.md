# Synthetic Acceptance Cases — NOT_EXECUTED

Ini rencana tes, bukan hasil tes. Gunakan dataset fiktif yang **jelas sintetis**; jangan ambil dokumen proyek rahasia sebagai fixture.

| Case | Kondisi | Harapan |
|---|---|---|
| A01 Finance | jumlah laporan beda dari kas | tampilkan selisih dan nomor sumber, bukan paksa cocok |
| A02 Finance | rencana termin tetapi belum menerima kas | `planned` dipisah dari `received` |
| A03 Finance | nomor bukti mirip | dugaan duplikat, bukan auto-delete |
| A04 Admin | dokumen ada tanpa receipt e-RISPRO | tidak mengklaim SUBMITTED |
| A05 Regulatory | contoh dua tahap bertentangan dengan perjanjian tiga tahap | contoh tidak diaktifkan |
| A06 Writing | pelaksanaan belum terjadi | gunakan kata rencana, tidak menciptakan hasil/peserta |
| A07 Evidence | invoice tanpa bukti bayar | klaim telah dibayar tetap INCOMPLETE |
| A08 Production | belum menjalankan QA | NOT_EXECUTED bukan PASS |
| A09 Dissemination | logo historis tanpa clearance | NEEDS_REVIEW |
| A10 Privacy | user mengatakan "pelajari saja" | tidak ada upload/commit/file output/PII terpapar |
| A11 Spreadsheet | catatan input diawali formula Excel | diekspor sebagai teks aman, bukan dieksekusi |
| A12 Cross-skill | jadwal/indikator berbeda tanpa addendum | tandai CONFLICT dan siapa pengambil keputusan |

Eksekusi uji baru boleh dilaporkan PASS setelah dilakukan sungguhan pada runtime yang jelas, dengan bukti lingkup dan hasil. Jangan membangun simulator approval eksternal.
