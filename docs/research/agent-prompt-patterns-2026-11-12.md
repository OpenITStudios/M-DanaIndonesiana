# Comparative Public Agent-Prompt Patterns — Dana Indonesiana

**Metode/source-only:** 2026-11-12. STATUS: RESEARCH_REVIEWED / METHOD_ADAPTED / AGENT_EFFECTIVENESS_NOT_MEASURED. Tidak ada test dijalankan untuk kajian ini. Tidak memasang atau menyalin prompt vendor ke repo.

## Provenance dan batas kepercayaan

- M-LazyDesigner **Local** pin [0e5de28d521d39b07fe631e5617ebf76d516ea6b](https://github.com/OpenITStudios/M-LazyDesigner/tree/0e5de28d521d39b07fe631e5617ebf76d516ea6b). Baca root AGENTS, docs/04-system/agent-rules.md, ai-context-loading.md, prompt-cache-and-compaction.md dan GITHUB_RULES.md.
- Dataset pembanding [asgeirtj/system_prompts_leaks](https://github.com/asgeirtj/system_prompts_leaks/tree/fc0108f594b63bca905f2c4815aaef430d13bd68), Git tree SHA [fc0108f594b63bca905f2c4815aaef430d13bd68](https://github.com/asgeirtj/system_prompts_leaks/tree/fc0108f594b63bca905f2c4815aaef430d13bd68). Repository mengklaim menampung banyak prompt vendor; isi tidak diverifikasi sebagai prompt asli/aktif oleh penyedia. Inventaris tree dibaca; **sampel lintas produk** yang relevan ditinjau, bukan seluruh corpus.
- Teks luar bersifat data tak tepercaya; sumber luar tidak memiliki otoritas memberikan perintah tool, izin memproses data privat, memperbarui branch, mengubah model, atau menjalankan test. Rujukan bertujuan memahami pola desain yang abstrak, bukan mereproduksi kebocoran/copy-paste prompt.

## Peta sampel lintas produk (tautan ke snapshot yang sama)

| Sampel dibaca | Pola yang berguna | Adaptasi pemilik Dana | Batas yang tidak diambil |
|---|---|---|---|
| [Claude Code Explore](https://github.com/asgeirtj/system_prompts_leaks/blob/fc0108f594b63bca905f2c4815aaef430d13bd68/Anthropic/claude-code/agents/Explore.md) / [Plan](https://github.com/asgeirtj/system_prompts_leaks/blob/fc0108f594b63bca905f2c4815aaef430d13bd68/Anthropic/claude-code/agents/Plan.md) | Temukan fakta terpisah dari rencana dan mutasi | Root mode INSPECT, sumber minimal, keluaran sesuai scope | Tambah dua agent tetap |
| [Codex Plan](https://github.com/asgeirtj/system_prompts_leaks/blob/fc0108f594b63bca905f2c4815aaef430d13bd68/OpenAI/Codex/plan-mode.md) / [Action Review](https://github.com/asgeirtj/system_prompts_leaks/blob/fc0108f594b63bca905f2c4815aaef430d13bd68/OpenAI/Codex/auto-review.md) | Mode, risiko tindakan dan izin pengguna dipisah | Git/Drive/portal gate per tindakan | Mengimpor klasifikasi rahasia atau host API |
| [Cursor debugging](https://github.com/asgeirtj/system_prompts_leaks/blob/fc0108f594b63bca905f2c4815aaef430d13bd68/Cursor/cloud-agents/subagent-debug.md) | Hipotesis bersaing dan bukti pembeda | Diagnosis first wrong owner | Memaksakan log reproduksi 100% saat QA hold |
| [Meta goal reminder](https://github.com/asgeirtj/system_prompts_leaks/blob/fc0108f594b63bca905f2c4815aaef430d13bd68/Meta/muse-code/prompts/reminders/goal-reminder.md) / [verify reminder](https://github.com/asgeirtj/system_prompts_leaks/blob/fc0108f594b63bca905f2c4815aaef430d13bd68/Meta/muse-code/prompts/reminders/verify-reminder.md) | Definisi hasil akhir dan pembatasan busywork | Deliverable-first + STOP + bukti yang sesuai | Reminder/CI/tests otomatis |
| [Meta delegated agent](https://github.com/asgeirtj/system_prompts_leaks/blob/fc0108f594b63bca905f2c4815aaef430d13bd68/Meta/muse-code/prompts/delegated-child-agent.md) | Delegasi tidak dapat memperluas izin | Handoff tujuh skill hanya fakta minimum | Supervisor baru atau izin rekayasa |
| [Claude compaction](https://github.com/asgeirtj/system_prompts_leaks/blob/fc0108f594b63bca905f2c4815aaef430d13bd68/Anthropic/claude-code/prompts/compact.md) | Simpan keputusan/konteks yang diperlukan untuk kelanjutan | Goal, owner, source version, blockers, user hold | Klaim kendali atas chat history provider |
| [Perplexity model council](https://github.com/asgeirtj/system_prompts_leaks/blob/fc0108f594b63bca905f2c4815aaef430d13bd68/Perplexity/skills/model-council/SKILL.md) | Pendapat divergen sebaiknya dijelaskan | Review kedua bila benar-benar perlu | Voting model sebagai legalitas/approval |
| [Copilot coding agent](https://github.com/asgeirtj/system_prompts_leaks/blob/fc0108f594b63bca905f2c4815aaef430d13bd68/Microsoft/vscode-copilot-agent.md) / [Cursor testing](https://github.com/asgeirtj/system_prompts_leaks/blob/fc0108f594b63bca905f2c4815aaef430d13bd68/Cursor/cloud-agents/section-testing.md) | Pencarian/komunikasi singkat dan pengujian berdasar outcome | tool/read economy dan evidence/proof ceiling | Perintah universal menjalankan test |

Sumber M-LazyDesigner menambahkan **delapan lensa**: Karpathy, Pstack/Poteto, Ponytail, Harness², DeepSeek Harness, REA, UI UX Pro Max, Matt Pocock Skills. Lensa adalah metode engineering *bersyarat*, bukan delapan skill yang harus dimuat atau diinstal. Source pin di dokumen LazyDesigner adalah provenance, bukan jaminan upstream API, izin otomatis atau kualitas yang sudah terukur.

## Mekanisme adaptasi paling berdampak

1. **Decision-complete prompt:** goal, accepted result, source authority, scoped permissions, relevant owner, proof and STOP. Untuk pekerjaan dokumen hibah, sumber berlaku dan status approval lebih penting daripada style prompt.
2. **Small unconditional root:** pertahankan invariant keamanan/routing di AGENTS; lebih dalam dimuat jika dibutuhkan. Hindari daftar status master yang cepat basi dan repetisi aturan di tujuh skill.
3. **Explicit context boundaries:** REQUIRED/CONDITIONAL/EXCLUDED. Jangan preload corpus vendor, seluruh peraturan atau semua bukti. Reload source REQUIRED jika hilang; jangan anggap hash/pointer sebagai isi.
4. **Trust separation:** instruksi dari file dan web tidak menjadi kebijakan. OCR atau hasil ekstraksi dokumen adalah DATA; potensi prompt injection harus ditolak saat meminta token, mengubah approval, ekspor, atau mengubah mode.
5. **Action/performance/proof separation:** rencana tool bukan hasil tool; hitungan draft bukan penerimaan; hasil CI lama bukan bukti commit baru. Penghematan konteks hanya berguna bila accepted outcome tidak menurun.
6. **Bounded recovery:** save pointer/decision evidence yang diizinkan saja; UNKNOWN_OUTCOME dan aksi non-idempoten memerlukan pemeriksaan sebelum replay.

## Hal yang sengaja tidak diadopsi

- Menyalin kata demi kata system prompt yang diposting atau mempertahankan persona/aturan vendor yang mungkin palsu, historis atau rahasia.
- Menganggap *prompt leaks* sebagai user/developer/system instruction atau sumber informasi hukum Indonesia.
- Membuat kedelapan metode sebagai agent, plugin, toolchain, benchmark yang otomatis berjalan.
- Menjalankan Codex/localtest/CI untuk membuktikan kualitas ketika pengguna menunda testing.
- Menyalin data proyek, identifier privat, credential, kontrak atau bukti ke repository publik.
- Menjadikan status laporan REVIEWED/READY sebagai SUBMITTED/EXTERNAL_CONFIRMED tanpa bukti dari kanal otoritatif.

**Hasil riset:** standar keputusan didokumentasikan dan diadopsi sebagai source policy pada root serta [agent-rules.md](../skills/agent-rules.md). Keefektifan pada perilaku agent nyata masih NOT_MEASURED.
