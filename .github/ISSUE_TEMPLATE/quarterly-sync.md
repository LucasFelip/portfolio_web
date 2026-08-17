---
title: "Lembrete trimestral: sincronizar Lattes/LinkedIn"
labels: content, automated
---

Lembrete automático (`.github/workflows/quarterly-sync-reminder.yml`).

Sem API pública nem no Lattes nem no LinkedIn — isso não sincroniza sozinho, só avisa. Checar manualmente:

- [ ] Novos projetos de pesquisa/extensão no Lattes → `src/data/researchProjects.js`
- [ ] Mudou cargo/empresa/status → `src/data/experiences.js`
- [ ] Headline do LinkedIn mudou → `src/components/HeroSection.jsx`
- [ ] Algum projeto do `researchProjects.js` mudou de situação (em andamento → concluído)
