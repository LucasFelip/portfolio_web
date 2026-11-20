// Certificados de conclusão (Alura, Udemy, IFMA/Huawei). Fonte: PDFs do Lucas; só título, instituição,
// carga horária e data de conclusão entram aqui. Os PDFs não são publicados (contêm dados pessoais).
// Cada grupo vira uma barra na linha "Cursos" da Trajetória (`barLabel` é o texto curto dentro da barra). `start`/`end` (anos fracionados) são opcionais:
// sem eles, o período vem das datas dos certificados. `formacoes` são trilhas concluídas na Alura com certificado
// próprio; ficam só como texto, sem somar horas, para não contar duas vezes os cursos que elas contêm.
export const certificationGroups = [
  {
    id: 'ifma-redes',
    institution: 'IFMA · Huawei ICT Academy',
    label: { pt: 'IFMA · Redes e Hackathon', en: 'IFMA · Networks and Hackathon' },
    barLabel: 'IFMA',
    start: 2021.0,
    end: 2021.33,
    entries: [
      {
        title: 'Capacitação em Routing e Switching (IFMA/Huawei ICT Academy)',
        hours: 40,
        date: '2021-03-11',
        periodLabel: { pt: '25/01/2021 a 11/03/2021', en: '01/25/2021 to 03/11/2021' },
      },
      {
        title: 'Hackathon · Universo IFMA 2020',
        hours: 32,
        date: '2021-04-15',
        periodLabel: { pt: '13 a 15/04/2021', en: '04/13 to 04/15/2021' },
      },
    ],
  },
  {
    id: 'udemy-java',
    institution: 'Udemy',
    label: { pt: 'Udemy · Java', en: 'Udemy · Java' },
    entries: [
      { title: 'Project Development Using JAVA for Beginners - 2021', hours: 45.5, date: '2021-10-19' },
      { title: 'Java 2022 COMPLETO: Do Zero ao Profissional + Projetos', hours: 77, date: '2023-03-18' },
      { title: 'Java COMPLETO 2023: Programação Orientada a Objetos + Projetos', hours: 54.5, date: '2023-08-02' },
    ],
  },
  {
    id: 'alura-sql',
    institution: 'Alura',
    label: {"pt": "Alura · SQL e MySQL", "en": "Alura · SQL and MySQL"},
    barLabel: 'SQL',
    entries: [
          {
                "title": "SQL com MySQL: manipule e consulte dados",
                "hours": 12,
                "date": "2023-12-13"
          },
          {
                "title": "Comandos DML: manipulação de dados com MySQL",
                "hours": 10,
                "date": "2023-12-14"
          },
          {
                "title": "Consultas SQL: avançando no SQL com MySQL",
                "hours": 14,
                "date": "2023-12-14"
          },
          {
                "title": "Procedures SQL: executando código no MySQL",
                "hours": 14,
                "date": "2023-12-20"
          },
          {
                "title": "Administração do MySQL: segurança e otimização do banco",
                "hours": 16,
                "date": "2024-01-02"
          }
    ],
    formacoes: [{"pt": "Formação SQL com MySQL Server da Oracle (66 h)", "en": "SQL with Oracle MySQL Server track (66 h)"}],
  },
  {
    id: 'alura-agil',
    institution: 'Alura',
    label: {"pt": "Alura · Agilidade e gestão", "en": "Alura · Agility and management"},
    barLabel: { pt: 'Ágil', en: 'Agile' },
    entries: [
          {
                "title": "Organização de Equipes Ágeis: os papéis existentes em uma equipe",
                "hours": 6,
                "date": "2023-12-12"
          },
          {
                "title": "Scrum: agilidade em seu projeto",
                "hours": 8,
                "date": "2023-12-12"
          },
          {
                "title": "Cultura e Métodos Ágeis: pilares para uma imersão avançada",
                "hours": 8,
                "date": "2024-04-01"
          },
          {
                "title": "Gestão Ágil: explorando conceitos da agilidade",
                "hours": 8,
                "date": "2024-04-01"
          },
          {
                "title": "Product Management: agilize o desenvolvimento de produtos",
                "hours": 8,
                "date": "2024-07-15"
          },
          {
                "title": "Gestão Ágil: Gestão de Processos para Agilidade",
                "hours": 8,
                "date": "2024-10-15"
          },
          {
                "title": "Liderança transformacional: criando uma cultura de excelência",
                "hours": 8,
                "date": "2024-10-15"
          },
          {
                "title": "Team Building: técnicas e práticas para times ágeis",
                "hours": 10,
                "date": "2024-10-15"
          },
          {
                "title": "Kanban: análises para implementação",
                "hours": 8,
                "date": "2024-10-18"
          },
          {
                "title": "Management 3.0: gerencie o ambiente, não as pessoas",
                "hours": 10,
                "date": "2024-10-18"
          },
          {
                "title": "Ferramentas para agilidade: visão geral sobre controle de projetos e produtos",
                "hours": 8,
                "date": "2024-10-20"
          }
    ],
  },
  {
    id: 'alura-processos',
    institution: 'Alura',
    label: {"pt": "Alura · Processos, governança e comunicação", "en": "Alura · Processes, governance and communication"},
    barLabel: { pt: 'Processos', en: 'Process' },
    entries: [
          {
                "title": "Governança de TI: alinhamento estratégico",
                "hours": 8,
                "date": "2024-07-15"
          },
          {
                "title": "Comunicação não violenta: consciência para agir",
                "hours": 8,
                "date": "2024-12-03"
          },
          {
                "title": "Comunicação: como se expressar bem e ser compreendido",
                "hours": 8,
                "date": "2024-12-03"
          },
          {
                "title": "Estratégias de Customer Success: foco no cliente",
                "hours": 6,
                "date": "2024-12-05"
          },
          {
                "title": "Engenharia de requisitos: como levantar, documentar e validar",
                "hours": 6,
                "date": "2024-12-09"
          },
          {
                "title": "Bizagi: mapeamento de processos com BPMN",
                "hours": 10,
                "date": "2024-12-10"
          },
          {
                "title": "RPA: automatize processos com ferramentas No/Low Code",
                "hours": 8,
                "date": "2024-12-13"
          },
          {
                "title": "Redação: boas práticas para marketing digital",
                "hours": 6,
                "date": "2024-12-17"
          }
    ],
    formacoes: [{"pt": "Formação COBIT 2019 (10 h)", "en": "COBIT 2019 track (10 h)"}],
  },
  {
    id: 'alura-front',
    institution: 'Alura',
    label: {"pt": "Alura · HTML, CSS e JavaScript", "en": "Alura · HTML, CSS and JavaScript"},
    barLabel: 'Web',
    entries: [
          {
                "title": "Lógica de programação: mergulhe em programação com JavaScript",
                "hours": 6,
                "date": "2024-12-17"
          },
          {
                "title": "HTML e CSS: ambientes de desenvolvimento, estrutura de arquivos e tags",
                "hours": 8,
                "date": "2024-12-19"
          },
          {
                "title": "HTML e CSS: Classes, posicionamento e Flexbox",
                "hours": 8,
                "date": "2024-12-30"
          },
          {
                "title": "HTML e CSS: cabeçalho, footer e variáveis CSS",
                "hours": 6,
                "date": "2024-12-30"
          },
          {
                "title": "HTML e CSS: trabalhando com responsividade e publicação de projetos",
                "hours": 6,
                "date": "2024-12-31"
          },
          {
                "title": "HTML e CSS: praticando HTML/CSS",
                "hours": 8,
                "date": "2025-01-02"
          },
          {
                "title": "HTML e CSS: responsividade com mobile-first",
                "hours": 12,
                "date": "2025-01-07"
          }
    ],
  },
  {
    id: 'alura-postgres',
    institution: 'Alura',
    label: {"pt": "Alura · PostgreSQL e Cloud", "en": "Alura · PostgreSQL and Cloud"},
    barLabel: 'PG · Cloud',
    entries: [
          {
                "title": "Cloud Onboarding: trabalhando com os principais provedores",
                "hours": 10,
                "date": "2025-01-09"
          },
          {
                "title": "Cloud Onboarding: conhecendo os principais provedores parte 2",
                "hours": 8,
                "date": "2025-01-10"
          },
          {
                "title": "PostgreSQL: administração e monitoramento",
                "hours": 12,
                "date": "2025-01-15"
          },
          {
                "title": "Administração com PostgreSQL: backup e recuperação",
                "hours": 12,
                "date": "2025-01-17"
          },
          {
                "title": "Administração com PostgreSQL: desempenho e otimização",
                "hours": 12,
                "date": "2025-01-21"
          }
    ],
  },
  {
    id: 'alura-java',
    institution: 'Alura',
    label: {"pt": "Alura · Java e Spring", "en": "Alura · Java and Spring"},
    barLabel: 'Java',
    entries: [
          {
                "title": "Java: criando a sua primeira aplicação",
                "hours": 8,
                "date": "2025-02-11"
          },
          {
                "title": "Java: trabalhando com listas e coleções de dados",
                "hours": 8,
                "date": "2025-02-11"
          },
          {
                "title": "Java: aplicando a Orientação a Objetos",
                "hours": 10,
                "date": "2025-02-13"
          },
          {
                "title": "Java: consumindo API, gravando arquivos e lidando com erros",
                "hours": 10,
                "date": "2025-02-13"
          },
          {
                "title": "Java: trabalhando com lambdas, streams e Spring Framework",
                "hours": 14,
                "date": "2025-03-20"
          },
          {
                "title": "Java: persistência de dados e consultas com Spring Data JPA",
                "hours": 16,
                "date": "2025-03-23"
          },
          {
                "title": "Java: criando sua primeira API e conectando ao front",
                "hours": 10,
                "date": "2025-03-25"
          },
          {
                "title": "Spring Boot 3: desenvolva uma API Rest em Java",
                "hours": 10,
                "date": "2025-03-27"
          }
    ],
    formacoes: [{"pt": "Formação Java com Orientação a Objetos (40 h)", "en": "Java with Object-Oriented Programming track (40 h)"}],
  },
];
