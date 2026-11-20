import { experiencesData } from '@/data/experiences';
import { researchProjects } from '@/data/researchProjects';
import { certificationGroups } from '@/data/certifications';

// Itens da trajetória (formação, trabalho e pesquisa), montados a partir dos mesmos dados do currículo.
// Datas em anos fracionados: 2024.5 = julho de 2024. `source` aponta para o registro completo exibido no painel.
const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

const toYear = (mes, ano) => Number(ano) + Math.max(0, MESES.indexOf(mes.toLowerCase())) / 12;

// Nomes curtos para caberem nas barras (o nome completo continua no painel de detalhes).
const SHORT_NAMES = {
  'Coreplan Gestão Tecnologia e Serviços': 'Coreplan',
  'Tribunal de Justiça do Maranhão': 'TJMA',
  'Junta Comercial do Estado do Maranhão': 'JUCEMA',
  'LSDI - UFMA': 'LSDI · UFMA',
};

// `educationIndex` aponta para t.about.education (os textos da formação vivem no dicionário).
const education = [
  {
    id: 'education-senai',
    lane: 'education',
    label: { pt: 'SENAI · Redes', en: 'SENAI · Networks' },
    start: 2017,
    end: 2019,
    startLabel: 2017,
    endLabel: 2018,
    educationIndex: 1,
    shortLabel: 'SENAI',
  },
  {
    id: 'education-ifma',
    lane: 'education',
    label: { pt: 'IFMA · Sistemas de Informação', en: 'IFMA · Information Systems' },
    start: 2019,
    end: 2025,
    startLabel: 2019,
    endLabel: 2024,
    educationIndex: 0,
    shortLabel: 'IFMA',
  },
];

// Siglas usadas dentro das barras na versão compacta (celular), onde cada ano ocupa poucos pixels.
const SHORT_WORK = {
  'Pulse - Grupo Mateus': 'Pulse',
  'LSDI - UFMA': 'LSDI',
  'Coreplan Gestão Tecnologia e Serviços': 'Coreplan',
  'Tribunal de Justiça do Maranhão': 'TJMA',
  'Junta Comercial do Estado do Maranhão': 'JUC.',
};
const SHORT_RESEARCH = {
  'Novos Negócios em TIC · iOS': 'IFCE',
  'Tabuleiro BD': 'Tab. BD',
  'Segurança da informação para mobile': 'Seg. info',
  'TIC pra tod@s': 'TIC',
  'Campanha de empreendedorismo em TIC': 'Camp.',
};
const SHORT_COURSES = {
  'udemy-java': 'Udemy',
  'ifma-redes': 'IFMA',
  'alura-sql': 'SQL',
  'alura-agil': 'Ágil',
  'alura-processos': 'Proc.',
  'alura-front': 'Web',
  'alura-postgres': 'PG',
  'alura-java': 'Java',
};

const work = experiencesData.map((exp) => ({
  id: `work-${exp.inicioAno}-${exp.instituicao}`,
  lane: 'work',
  label: SHORT_NAMES[exp.instituicao] ?? exp.instituicao.split(' - ')[0],
  shortLabel: SHORT_WORK[exp.instituicao],
  start: toYear(exp.inicioMes, exp.inicioAno),
  end: exp.terminoAno ? toYear(exp.terminoMes, exp.terminoAno) : null, // null = em andamento
  startLabel: Number(exp.inicioAno),
  endLabel: exp.terminoAno ? Number(exp.terminoAno) : null,
  source: exp,
}));

const research = researchProjects.map((project) => {
  const years = project.periodo.match(/\d{4}/g).map(Number);
  return {
    id: `research-${project.titulo.pt}`,
    lane: 'research',
    label: project.titulo,
    barLabel: project.barLabel,
    shortLabel: SHORT_RESEARCH[project.titulo.pt],
    start: years[0],
    end: (years[1] ?? years[0]) + 1, // fim exclusivo: o projeto ocupa o ano final inteiro
    startLabel: years[0],
    endLabel: years[1] ?? years[0],
    source: project,
  };
});

// Anos fracionados a partir de uma data ISO (AAAA-MM-DD). Fim do mês = início do mês seguinte.
const isoToYear = (iso, endOfMonth) => {
  const [year, month] = iso.split('-').map(Number);
  return year + (endOfMonth ? month : month - 1) / 12;
};

// Cada grupo de certificados vira uma barra; sem start/end explícitos, o período vem das datas dos certificados.
const courses = certificationGroups.map((group) => {
  const dates = group.entries.map((entry) => entry.date).sort();
  const explicit = group.start !== undefined && group.end !== undefined;
  const start = explicit ? group.start : isoToYear(dates[0], false);
  const end = explicit ? group.end : isoToYear(dates.at(-1), true);
  return {
    id: `courses-${group.id}`,
    lane: 'courses',
    label: group.label,
    barLabel: group.barLabel,
    shortLabel: SHORT_COURSES[group.id],
    start,
    end,
    startLabel: explicit ? Math.floor(start) : Number(dates[0].slice(0, 4)),
    endLabel: explicit ? Math.floor(end - 0.001) : Number(dates.at(-1).slice(0, 4)),
    source: group,
  };
});

export const timelineItems = [...education, ...work, ...research, ...courses];
export const timelineLanes = ['work', 'research', 'education', 'courses'];

// Ordem cronológica (do mais antigo ao mais recente) para navegar com anterior/próximo.
export const chronologicalItems = [...timelineItems].sort(
  (a, b) => a.start - b.start || (a.end ?? Infinity) - (b.end ?? Infinity),
);

// Item exibido ao abrir a página: o cargo atual mais recente.
export const defaultItemId =
  timelineItems.filter((item) => item.lane === 'work' && item.end === null).sort((a, b) => b.start - a.start)[0]?.id ??
  chronologicalItems.at(-1).id;
