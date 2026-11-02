# GitHub Operating Rules

Gunakan standar sederhana yang konsisten dengan M-PRD-Creator, disesuaikan untuk repository baru. Dokumen ini mengatur **mutasi repository**, bukan hukum pengelolaan bantuan.

## Urutan kerja

    PIN → READ MINIMUM → IDENTIFY OWNER → PREPARE
    → WRITE ONCE → VERIFY → REPORT → STOP

1. **Pin** repository, branch/HEAD aktual, izin, dan sasaran perubahan; jangan fallback diam-diam ke main.
2. **Read minimum**: AGENTS.md, CONTEXT.md, router dan owner yang relevan; hindari broad scan tanpa alasan.
3. **Identify first wrong owner**: perbaiki sumber yang bertanggung jawab, bukan output turunan.
4. **Prepare before writing**: lengkapi isi, cek konflik, path, izin, dan data sensitif; pastikan seluruh paket logis dapat ditransfer.
5. **Write once**: satu perubahan logis per commit; update file utuh memakai SHA blob yang benar; multi-file koheren diutamakan atomik.
6. **Verify**: bukti sesuai lingkup; SOURCE_REVIEWED bukan CI PASS atau audit nyata.
7. **Report & STOP**: sebut branch, SHA, file, jenis pemeriksaan, batas yang belum diuji.

## Branch

| Branch | Tujuan | Aturan |
|---|---|---|
| develop | pengembangan aktif | commit terbatas setelah diperiksa |
| Local | baseline integrasi | promosi dari develop setelah review; tidak untuk eksperimen |
| main | riwayat stabil | promosi dari Local hanya setelah persetujuan eksplisit |

Bootstrap repository kosong boleh menyiapkan fondasi awal pada main lalu membuat kedua branch dari baseline yang sama. Setelah itu perubahan rutin hanya pada develop. Jangan langsung melewati urutan promosi, force push, menghapus history, atau membuat tag/release otomatis. Jika belum ada CI atau perlindungan branch, **nyatakan belum ada**, bukan berpura-pura gate aktif. Ketentuan squash/merge detail untuk promosi ditetapkan ketika mekanisme PR/CI benar-benar dibangun.

## Commit material

Gunakan subject Conventional Commits:

    docs(foundation): establish grant management operating policy

Lanjutkan dengan metadata secara ringkas:

    Work: topik dan owner
    State: ACTIVE | BLOCKED | PAUSED | DONE
    Proof: sumber/tes yang benar-benar diperiksa; NOT EXECUTED bila belum
    Unresolved: persoalan spesifik bila ada
    Next: hanya satu tindakan lanjutan bila relevan

Tidak perlu commit laporan kemajuan tanpa perubahan nyata.

## Bukti dan kegagalan

- Static review membuktikan isi file dapat dibaca/terhubung, bukan kemampuan berjalan atau validitas legal.
- Tes yang belum dijalankan tidak boleh ditulis PASS.
- Saat update gagal karena konflik, baca HEAD baru sebelum mencoba ulang. Jangan force sebagai jalan pintas.
- Bila kapabilitas transfer tidak aman atau tak tersedia, hentikan mutasi parsial dan berikan handoff jelas.
- Jangan membuka PR, issue, automation, workflow, branch ekstra, atau aplikasi tanpa kebutuhan yang diminta.

## Keamanan

Sebelum commit, lihat [SECURITY.md](SECURITY.md). Git history publik mungkin tetap menyimpan isi meskipun file dihapus; hindari sejak awal. Verifikasi apakah ada rahasia, identitas personal, nomor rekening, dokumen kontrak, atau bukti transaksi asli.
