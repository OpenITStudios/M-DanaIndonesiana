# Private Project Workspace Convention

Folder ini hanya menjelaskan **konvensi**, bukan tempat mengunggah data nyata ke GitHub.

Contoh penempatan pada komputer atau storage privat yang disetujui:

    workspace/
      active/<project-id>/
        sources/       # dokumen asli & inventaris privat
        state/         # baseline, RAB revisi, keputusan
        records/       # aktivitas, transaksi, bukti referensi
        work/          # draf dan hasil review
        output/        # ekspor turunan; regenerable
      archive/<project-id>/

Direktori **active/** dan **archive/** diabaikan oleh Git melalui .gitignore. Untuk kolaborasi daring, gunakan lokasi privat dengan kontrol akses dan pencadangan sesuai [SECURITY.md](../SECURITY.md). Jangan memasukkan KTP, NPWP, rekening, kuitansi, atau kontrak asli ke repository publik, termasuk branch/PR/issue.

Sumber asli tetap merupakan otoritas; state adalah representasi yang dapat ditinjau; output hasil ekspor hanya turunan. Bila koreksi diperlukan, lakukan pada source/state yang berwenang dan dokumentasikan riwayat, bukan menimpa bukti asli.
