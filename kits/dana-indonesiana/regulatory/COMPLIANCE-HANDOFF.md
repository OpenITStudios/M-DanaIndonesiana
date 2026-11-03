# Compliance Handoff — Satu Aturan, Banyak Domain

**Tujuan:** skill spesialis tidak mengulang penafsiran hukum dan tidak membiarkan ringkasan AI menjadi sumber baru. Regulatory menyampaikan **aturan yang dinilai berlaku**, keterbatasan dan tingkat pembuktiannya, bukan persetujuan tindakan.

## Kontrak handoff minimum

```text
Question:
Rule ID:
Source type / title / version:
Issuer and authoritative source locator:
Clause or page actually inspected:
Applicable subject / category / fiscal or event period:
Norm: OBLIGATION | PROHIBITION | PERMISSION | APPROVAL_REQUIRED | REPORTING_REQUIREMENT | REFERENCE_ONLY
Applicability: DISCOVERED | REVIEWED | APPLICABLE | NOT_APPLICABLE | SUPERSEDED | CONFLICT | UNKNOWN
Conditions / exemptions:
Evidence why rule applies (or does not):
What cannot yet be concluded:
Decision authority / next owner:
Confidentiality limit:
```

Tidak semua field harus diulang pada setiap chat pendek; ambil minimum yang diperlukan untuk satu tindakan. Data proyek privat tidak boleh masuk GitHub/Drive tanpa izin, bahkan jika sudah diketahui AI.

## Domain penerima

| Domain | Yang dikonsumsi dari Regulatory | Tidak boleh disimpulkan |
|---|---|---|
| Finance | aturan batas biaya, pajak, metode perhitungan menurut tanggal/jenis transaksi | izin transaksi atau tarif pajak dari contoh lama |
| Administration | bentuk dokumen, masa perjanjian, tenggat, jalur revisi dan otoritas keputusan | berkas dikirim/disetujui hanya karena lengkap |
| Procurement | izin jenis belanja dan kewajiban pembanding/kontrak | metode formal LKPP pasti berlaku ke semua penerima |
| Evidence | jenis bukti yang benar-benar diperlukan | bukti telah autentik atau kegiatan terjadi |
| Production | kewajiban indikator, output dan perubahan lingkup | progress teknis = capaian resmi |
| Writing | istilah/klausul yang harus tepat dan status aturan | hak menulis capaian di luar sumber |
| Rights | aturan reproduksi/hak cipta, logo program dan syarat platform | kredit atau tujuan edukasi otomatis cukup sebagai izin |

## Wajib eskalasi ketika

- Ada konflik norma/kontrak/keputusan, atau kebijakan tahun berbeda tanpa ketentuan peralihan yang jelas.
- Akan mengubah pagu, masa, kategori biaya, status pajak atau perjanjian.
- Akan menyatakan `SUBMITTED`, `EXTERNAL_CONFIRMED`, `CLEARED`, atau `RECORDED` tanpa bukti sumber.
- Akan mengaktifkan tarif/ambang otomatis untuk jenis entitas/kejadian yang belum dipastikan.
- Akan mengunggah atau mempublikasikan data yang pemilik hanya izinkan untuk dipelajari.

Jika sumber sudah memadai, berikan kesimpulan pendek dengan rujukan dan syaratnya; tidak perlu membuat laporan kepatuhan besar. Jika belum, nyatakan persis `UNKNOWN` yang menghambat.

**Batas:** `APPLICABLE` adalah klasifikasi internal terdukung, bukan keputusan lembaga. `CHECKED_INTERNAL` adalah cakupan peninjauan, bukan bukti patuh 100%.
