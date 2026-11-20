// Campos de texto são { pt, en }. Fonte do conteúdo e das datas: currículo (PDF em /public).
// statusLabel só existe pra experiências atuais (sem terminoAno) — usado no Hero pra montar o "$ status --current".
// Meses ficam em português (usados no cálculo de tempo). `destaques` são os bullets exibidos no card.
export const experiencesData = [
  {
    imagemLink: '/logos/pulse.jpg',
    instituicao: 'Pulse - Grupo Mateus',
    localizacao: 'São Luís, MA',
    inicioMes: 'Junho',
    inicioAno: '2025',
    terminoMes: '',
    terminoAno: '',
    cargo: {
      pt: 'Programador Pleno - Engenheiro de Software',
      en: 'Mid-level Developer - Software Engineer',
    },
    statusLabel: { pt: 'Em produção', en: 'In production' },
    destaques: {
      pt: [
        'Engenharia de software na frente de pesquisa e inovação: projetos internos que ampliam a capacidade dos demais times, como ferramentas de engenharia e arquitetura e bibliotecas compartilhadas.',
        'Full stack com front-end em Angular e arquitetura de micro frontends (MFE) e back-end em microsserviços.',
        'Diagnóstico de falhas em serviços de outros times a partir de logs e evidências, com correção quando o problema está nas soluções da equipe.',
        'Contribuição na definição de boas práticas de desenvolvimento e arquitetura.',
      ],
      en: [
        'Software engineering on the research and innovation front: internal projects that expand other teams\' capabilities, such as engineering and architecture tooling and shared libraries.',
        'Full stack work with Angular front-ends in a micro frontends (MFE) architecture and microservices back-ends.',
        'Diagnosing failures in other teams\' services from logs and evidence, fixing them when the issue lies in our own solutions.',
        'Contributing to the definition of development and architecture best practices.',
      ],
    },
    tecnologias: ['Angular', 'Micro Frontends', { pt: 'Microsserviços', en: 'Microservices' }, 'Java', 'Spring Boot', 'Kafka'],
    link: 'https://www.grupomateus.com.br/inovacao/',
  },
  {
    imagemLink: '/logos/lsdi.png',
    instituicao: 'LSDI - UFMA',
    localizacao: 'São Luís, MA',
    inicioMes: 'Abril',
    inicioAno: '2025',
    terminoMes: '',
    terminoAno: '',
    cargo: {
      pt: 'Voluntário em Administração de Laboratório',
      en: 'Laboratory Administration Volunteer',
    },
    statusLabel: { pt: 'Pesquisa voluntária', en: 'Volunteer research' },
    destaques: {
      pt: [
        'Administração do GitLab institucional do laboratório: repositórios, automações de pipeline e políticas de versionamento.',
        'Participação na definição da arquitetura de infraestrutura para armazenamento de dados brutos e eventos de Gêmeos Digitais Humanos (HDTs), contribuindo para escalabilidade e segurança.',
        'Suporte técnico a pesquisadores e desenvolvedores em boas práticas DevOps, provisionamento de ambientes e integração de ferramentas.',
      ],
      en: [
        "Administration of the lab's institutional GitLab: repositories, pipeline automation and versioning policies.",
        'Contributing to the definition of the infrastructure architecture for raw data and event storage for Human Digital Twins (HDTs), supporting scalability and security.',
        'Technical support for researchers and developers on DevOps best practices, environment provisioning and tool integration.',
      ],
    },
    tecnologias: ['GitLab CI/CD', 'DevOps', { pt: 'Armazenamento distribuído', en: 'Distributed storage' }],
    link: 'https://ufma.br',
  },
  {
    imagemLink: '/logos/coreplan.png',
    instituicao: 'Coreplan Gestão Tecnologia e Serviços',
    localizacao: 'Fortaleza, CE',
    inicioMes: 'Outubro',
    inicioAno: '2023',
    terminoMes: 'Junho',
    terminoAno: '2025',
    cargo: { pt: 'Analista de Suporte de TI', en: 'IT Support Analyst' },
    destaques: {
      pt: [
        'Otimização da tramitação de demandas e integração de sistemas complexos em procuradorias (PGE-MA e PGM-SLZ), garantindo a continuidade do Sistema de Processos Automatizado (SPA).',
        'Automações em Python e Selenium que aumentaram em 40% os pagamentos pelo fluxo de RPV.',
        'Manuais, tutoriais e treinamentos personalizados que levaram cada colaborador a resolver, em média, 20 chamados por semana.',
        'Documentação de fluxos de processos em Bizagi, padronizando informações e a consistência dos dados.',
      ],
      en: [
        'Optimized demand handling and integrated complex systems at state and municipal attorney offices (PGE-MA and PGM-SLZ), ensuring continuity of the Automated Process System (SPA).',
        'Python and Selenium automations that increased payments through the RPV flow by 40%.',
        'Manuals, tutorials and tailored training that led each employee to resolve 20 tickets per week on average.',
        'Process flow documentation in Bizagi, standardizing information and data consistency.',
      ],
    },
    tecnologias: ['Python', 'Selenium', 'Bizagi'],
    link: 'https://www.coreplan.com.br/',
  },
  {
    imagemLink: '/logos/tjma.png',
    instituicao: 'Tribunal de Justiça do Maranhão',
    localizacao: 'São Luís, MA',
    inicioMes: 'Agosto',
    inicioAno: '2022',
    terminoMes: 'Outubro',
    terminoAno: '2023',
    cargo: { pt: 'Estagiário de Desenvolvimento de Software', en: 'Software Development Intern' },
    destaques: {
      pt: [
        'Redução do tempo médio de pagamento de precatórios de 7–8 meses para 2–3 meses, no sistema SAPRE.',
        'Workflow estruturado no Jira para padronizar os processos internos do projeto.',
        'Geração automatizada de documentos com Jasper Reports, com relatórios dinâmicos e validados.',
        'Integração de ferramentas (DBeaver, Eclipse, Wildfly 17+) em ambiente Java EE (Java 11) com JSP/XHTML e PostgreSQL.',
      ],
      en: [
        'Cut the average payment time for court-ordered payments from 7–8 months to 2–3 months in the SAPRE system.',
        "Structured a Jira workflow to standardize the project's internal processes.",
        'Automated document generation with Jasper Reports, producing dynamic, validated reports.',
        'Integrated tools (DBeaver, Eclipse, Wildfly 17+) in a Java EE (Java 11) environment with JSP/XHTML and PostgreSQL.',
      ],
    },
    tecnologias: ['Java EE', 'PostgreSQL', 'Jasper Reports', 'Jira'],
    link: 'https://www.tjma.jus.br/',
  },
  {
    imagemLink: '/logos/jucema.png',
    instituicao: 'Junta Comercial do Estado do Maranhão',
    localizacao: 'São Luís, MA',
    inicioMes: 'Setembro',
    inicioAno: '2021',
    terminoMes: 'Agosto',
    terminoAno: '2022',
    cargo: { pt: 'Estagiário de Desenvolvimento de Software', en: 'Software Development Intern' },
    destaques: {
      pt: [
        'Modernização do sistema de Consulta Empresarial: reestruturação da arquitetura e migração gradual da base legada (PL/SQL no Oracle).',
        'Testes comparativos com melhoria de 15–20% usando MongoDB e de 40% com Apache Pinot.',
        'Continuidade dos sistemas legados em Java 8, JSP e XHTML durante a migração.',
      ],
      en: [
        'Modernized the Business Lookup system: restructured the architecture and gradually migrated the legacy database (PL/SQL on Oracle).',
        'Comparative tests showing 15–20% improvement with MongoDB and 40% with Apache Pinot.',
        'Kept legacy Java 8, JSP and XHTML systems running throughout the migration.',
      ],
    },
    tecnologias: ['Apache Pinot', 'MongoDB', 'Oracle PL/SQL', 'Java EE'],
    link: 'https://www.jucema.ma.gov.br/',
  },
];
