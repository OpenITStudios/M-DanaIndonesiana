# Validation Contract — Foundation v0.2

Pemeriksaan otomatis hanya mencakup struktur repository dan unit test sintetis (node tools/verify-repository.mjs dan node --test tests/*.test.mjs). Workflow PR read-only tidak membaca Drive privat, tidak menjalankan exporter Python berbasis artifact_tool, dan tidak membuktikan kepatuhan hukum atau penerimaan eksternal. Preflight agent bersifat advisory, bukan pengawas tool tepercaya. [Protokol evaluasi agent](../../docs/skills/agent-quality-evals.md) membedakan data sumber, pemeriksaan mesin, observasi model, dan keputusan manusia.

## Kelompok pemeriksaan

| Gate | Input | Pertanyaan utama |
|---|---|---|
| SOURCE | sumber + baseline | adakah asal, kategori, tahun, versi, ketentuan berlaku, dan konflik? |
| STRUCTURE | template/artefak | apakah dokumen lengkap dan format sesuai contoh yang valid? |
| TRACE | aktivitas/RAB/transaksi/bukti | apakah ID dan tujuan terhubung? |
| FINANCE | nominal dan catatan kas | apakah perhitungan konsisten dan didukung bukti pembayaran? |
| SUBSTANCE | keluaran kegiatan/karya | apakah klaim hasil didukung inspeksi/kegiatan nyata? |
| APPROVAL | keputusan formal | adakah persetujuan internal atau eksternal yang benar-benar sah? |
| DELIVERY | paket laporan | apakah versi, format, daftar lampiran, dan status pengajuan tepat? |
| SECURITY | payload/repository | adakah data privat/secrets yang hendak dipublikasikan? |

## Format hasil pemeriksaan

    Claim:
    Scope:
    Source/ref:
    Method performed:
    Result: CHECKED_INTERNAL | INCOMPLETE | CONFLICT | NEEDS_REVIEW | NOT_EXECUTED
    Evidence:
    Limitation:
    Next owner:

Untuk hasil pengajuan gunakan status terpisah **SUBMITTED** atau **EXTERNAL_CONFIRMED** beserta bukti dari portal/surat terkait. Tidak ada auto-approval berdasarkan seluruh gate di atas.

## Stop conditions

Hentikan klaim positif yang memerlukan sumber belum tersedia, verifikasi dokumen asli, observasi fisik, keputusan pajak profesional, atau persetujuan otoritas. Tetap selesaikan audit independen yang dapat diverifikasi dan tampilkan risiko yang tersisa.
