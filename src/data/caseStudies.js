// Estudos de caso. Fonte: currículo (PDF em /public). Só entram fatos e números que constam no CV;
// ao enriquecer (decisões técnicas, aprendizados), confirme com o Lucas. Campos de texto são { pt, en }.
export const caseStudies = [
  {
    id: 'sapre',
    organizacao: 'Tribunal de Justiça do Maranhão',
    titulo: { pt: 'Pagamento de precatórios (SAPRE)', en: 'Court-ordered payments (SAPRE)' },
    contexto: {
      pt: 'Sistema de gestão de precatórios em Java EE (Java 11), com JSP/XHTML e PostgreSQL, rodando em Wildfly.',
      en: 'Court-ordered payment management system built on Java EE (Java 11), with JSP/XHTML and PostgreSQL, running on Wildfly.',
    },
    acoes: {
      pt: [
        'Estruturei o workflow do projeto no Jira para padronizar os processos internos.',
        'Automatizei a geração de documentos com Jasper Reports, com relatórios dinâmicos e validados.',
        'Integrei DBeaver, Eclipse e Wildfly 17+ em um ambiente Java EE (Java 11) com JSP/XHTML e PostgreSQL.',
      ],
      en: [
        'Structured the project workflow in Jira to standardize internal processes.',
        'Automated document generation with Jasper Reports, producing dynamic, validated reports.',
        'Integrated DBeaver, Eclipse and Wildfly 17+ in a Java EE (Java 11) environment with JSP/XHTML and PostgreSQL.',
      ],
    },
    resultado: {
      metrica: { pt: '7–8 → 2–3 meses', en: '7–8 → 2–3 months' },
      descricao: { pt: 'redução do tempo médio de pagamento de precatórios durante a minha atuação no projeto', en: 'reduction in the average payment time for court-ordered payments during my work on the project' },
    },
    stack: ['Java EE', 'PostgreSQL', 'Jasper Reports', 'Jira'],
  },
  {
    id: 'jucema',
    organizacao: 'Junta Comercial do Maranhão',
    titulo: { pt: 'Modernização da Consulta Empresarial', en: 'Business Lookup modernization' },
    contexto: {
      pt: 'Sistema legado em Java 8, JSP e XHTML sobre banco Oracle PL/SQL.',
      en: 'Legacy system in Java 8, JSP and XHTML on an Oracle PL/SQL database.',
    },
    acoes: {
      pt: [
        'Reestruturei a arquitetura e migrei a base legada de forma gradual.',
        'Reescrevi a estrutura de dados a partir da modelagem de classes, minimizando o impacto para os usuários.',
        'Rodei testes comparativos entre MongoDB e Apache Pinot, mantendo os sistemas legados no ar durante a migração.',
      ],
      en: [
        'Restructured the architecture and migrated the legacy database gradually.',
        'Rewrote the data structure from the class model, minimizing the impact on users.',
        'Ran comparative tests between MongoDB and Apache Pinot while keeping the legacy systems running during the migration.',
      ],
    },
    resultado: {
      metrica: { pt: '40% de melhoria com Pinot', en: '40% improvement with Pinot' },
      descricao: { pt: 'nos testes comparativos de desempenho (MongoDB: 15–20%)', en: 'in the comparative performance tests (MongoDB: 15–20%)' },
    },
    stack: ['Apache Pinot', 'MongoDB', 'Oracle PL/SQL', 'Java EE'],
  },
  {
    id: 'spa',
    organizacao: 'Coreplan',
    titulo: { pt: 'Automação do fluxo de RPV (SPA)', en: 'RPV flow automation (SPA)' },
    contexto: {
      pt: 'Sistema de Processos Automatizado (SPA) usado por procuradorias (PGE-MA e PGM-SLZ).',
      en: 'Automated Process System (SPA) used by attorney offices (PGE-MA and PGM-SLZ).',
    },
    acoes: {
      pt: [
        'Implementei automações em Python e Selenium para o fluxo de RPV.',
        'Documentei os fluxos de processo em Bizagi, padronizando informações e a consistência dos dados.',
        'Criei manuais e treinamentos personalizados, individuais e em grupos de até 10 pessoas, para que cada colaborador resolvesse, em média, 20 chamados por semana.',
      ],
      en: [
        'Implemented Python and Selenium automations for the RPV flow.',
        'Documented process flows in Bizagi, standardizing information and data consistency.',
        'Created manuals and tailored training, individually and in groups of up to 10 people, so each employee could resolve 20 tickets per week on average.',
      ],
    },
    resultado: {
      metrica: { pt: '+40% em pagamentos', en: '+40% in payments' },
      descricao: { pt: 'nos pagamentos pelo fluxo de RPV, com as automações em Python e Selenium', en: 'in payments through the RPV flow, with the Python and Selenium automations' },
    },
    stack: ['Python', 'Selenium', 'Bizagi'],
  },
];
