import { experiencesData } from '@/data/experiences';
import { researchProjects } from '@/data/researchProjects';

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
  },
];

const work = experiencesData.map((exp) => ({
  id: `work-${exp.inicioAno}-${exp.instituicao}`,
  lane: 'work',
  label: SHORT_NAMES[exp.instituicao] ?? exp.instituicao.split(' - ')[0],
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
    start: years[0],
    end: (years[1] ?? years[0]) + 1, // fim exclusivo: o projeto ocupa o ano final inteiro
    startLabel: years[0],
    endLabel: years[1] ?? years[0],
    source: project,
  };
});

export const timelineItems = [...education, ...work, ...research];
export const timelineLanes = ['work', 'research', 'education'];

// Ordem cronológica (do mais antigo ao mais recente) para navegar com anterior/próximo.
export const chronologicalItems = [...timelineItems].sort(
  (a, b) => a.start - b.start || (a.end ?? Infinity) - (b.end ?? Infinity),
);

// Item exibido ao abrir a página: o cargo atual mais recente.
export const defaultItemId =
  timelineItems.filter((item) => item.lane === 'work' && item.end === null).sort((a, b) => b.start - a.start)[0]?.id ??
  chronologicalItems.at(-1).id;
