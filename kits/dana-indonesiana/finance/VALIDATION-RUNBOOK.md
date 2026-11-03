# Finance Validation Runbook v0.3

Status: **prototype deterministik JSON**, bukan aplikasi akuntansi, kalkulator pajak atau pengajuan e-RISPRO. Tidak boleh memakai berkas yang pengguna minta "pelajari saja" sebagai input tersimpan atau fixture.

## Jalankan dengan data sintetis

```bash
node --test tests/finance-report.test.mjs
node tools/run-finance-report.mjs < tests/fixtures/finance-synthetic.json
```

## Kontrak minimal

Input JSON memakai `project_id`, `rab_ref`, `rab_status`, `currency: IDR`, `period: {start,end}`, `budget_lines`, `funding_plan`, dan `transactions` dengan `kind=RECEIPT|PAYMENT|INVOICE`. Semua nominal wajib string angka rupiah bulat (`"125000"`), bukan float atau teks berformat. Kode RAB dan transaksi harus unik. `prior_realized`, `cash_opening`, `cash_closing_observed` boleh null jika tidak diketahui.

Keluaran berisi `lra`, `cash_flow`, `totals`, `issues`, dan keterbatasan. Invoices tidak menambah arus kas. Rencana termin tidak dihitung sebagai dana diterima. Tanpa realisasi sebelumnya, `remaining` dan `realized_cumulative` tetap null. Jumlah dan saldo diperiksa dengan `BigInt` tanpa presisi float.

## Batas kebenaran

- `rab_status=APPROVED` dan referensinya merupakan **klaim input**, bukan pembuktian otomatis otentisitas dokumen atau status PMO.
- Entri bukti ID adalah pointer, bukan verifikasi isi dokumen. Perhitungan kas belum memverifikasi rekening koran atau dokumen asli.
- Tidak ada ekspor Excel/CSV. Pedoman administrasi 2025 meminta Laporan Realisasi Anggaran pada Sheet 1 dan Laporan Arus Kas pada Sheet 2, lihat [pedoman resmi](https://erispro-indonesiana.kemenkeu.go.id/upload/DAKB_Pedoman_administrasi_penerima_2025.pdf). Hasil JSON **bukan** berkas unggah resmi.
- Tidak ada penentuan pajak, mutasi bank atau pengajuan otomatis.
- Saat eksportir spreadsheet dibuat, lakukan uji risiko formula injection menurut [OWASP](https://owasp.github.io/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/07-Injection/21-CSV_Injection). Tanpa Excel writer, jangan klaim telah menguji keamanan file Excel.

Hanya data sintetis boleh berada di Git publik. Hindari hasil aktual pada stdout CI/log publik. Tinjauan manusia dibutuhkan sebelum memakai laporan apa pun.
