# Current Context — M-DanaIndonesiana

- **Repo:** OpenITStudios/M-DanaIndonesiana
- **Branch pengembangan:** `develop`; `Local` untuk integrasi ditinjau, `main` untuk baseline stabil.
- **Status:** v1.5 *controlled Drive review-queue implementation*. Terdapat **7 Agent Skills**, kontrak domain dan template umum; Finance memiliki prototipe kalkulasi JSON serta ekspor XLSX draf. **Bukan** aplikasi manajemen proyek end-to-end atau integrasi e-RISPRO.
- **Validasi:** pengguna sedang memprioritaskan pengembangan dan menunda tes/QA. Status itu berlaku pada fase sekarang, bukan aturan permanen. Jangan klaim Node/Python end-to-end, kelayakan hukum atau persetujuan LPDP.
- **Proyek privat:** kontrak, RAB, indikator, bukti, identitas, rekening dan dokumen yang hanya boleh dipelajari **tidak disimpan di Git publik atau tempat lain tanpa izin eksplisit**.
- **Router:** [AGENTS.md](AGENTS.md) → [Skill Router](docs/skills/README.md) → `.agents/skills/<skill>/SKILL.md` → kontrak/prosedur domain yang diperlukan.
- **Integrasi Drive (P0/P1/P2):** resolver metadata read-only, satu Document Registry privat dan pemilihan sumber per workflow ke tujuh skill telah disusun. ChatGPT memakai koneksi Drive untuk tugas berizin; CLI lokal memakai OAuth read-only sendiri. Hanya pemetaan pointer, **belum** verifikasi isi, otomatisasi submit, auto-sync atau acceptance QA.
- **P3:** perubahan metadata Drive ditandai read-only, termasuk sumber tidak dapat diperiksa dan implikasi pada hasil turunan yang dihubungkan eksplisit lewat `derived_from_ids` privat; bukan auto-update, auto-reconciliation atau audit isi. Skema Registry ditambah satu kolom opsional, isi 9 baris sumber lama tidak ditimpa.
- **P4:** satu tab Review Queue ditambahkan ke Registry privat untuk antrean pemeriksaan, status, keputusan manusia dan deduplikasi fingerprint; kode CLI review read-only dan wrapper PowerShell disiapkan. Belum ada laporan proyek asli yang terdaftar sebagai DERIVED_OUTPUT, belum ada jadwal otomatis aktif, dan belum ada QA runtime/OAuth end-to-end.
- **Riwayat:** [CHANGELOG.md](CHANGELOG.md); jangan menumpuk kronologi fitur di berkas ini.

**Batas pekerjaan berikut:** prioritaskan pemakaian praktis dan kejelasan owner. Tidak ada baseline proyek sebenarnya yang boleh ditebak dari dokumen contoh atau ingatan percakapan. Pengujian, promosi branch, ataupun tindakan eksternal memerlukan instruksi sesuai tugasnya.
