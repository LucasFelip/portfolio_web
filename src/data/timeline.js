import { experiencesData } from '@/data/experiences';
import { researchProjects } from '@/data/researchProjects';

// Monta os itens da linha do tempo a partir dos mesmos dados das seções (experiência e pesquisa),
// mais a formação (que vem do currículo). Datas em anos fracionados: 2024.5 = julho de 2024.
const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

const toYear = (mes, ano) => Number(ano) + Math.max(0, MESES.indexOf(mes.toLowerCase())) / 12;

// Nomes curtos para caberem nas barras (o nome completo continua nas seções de experiência).
const SHORT_NAMES = {
  'Coreplan Gestão Tecnologia e Serviços': 'Coreplan',
  'Tribunal de Justiça do Maranhão': 'TJMA',
  'Junta Comercial do Estado do Maranhão': 'JUCEMA',
  'LSDI - UFMA': 'LSDI · UFMA',
};

const education = [
  { lane: 'education', label: { pt: 'SENAI · Redes', en: 'SENAI · Networks' }, start: 2017, end: 2019, startLabel: 2017, endLabel: 2018 },
  { lane: 'education', label: { pt: 'IFMA · Sistemas de Informação', en: 'IFMA · Information Systems' }, start: 2019, end: 2025, startLabel: 2019, endLabel: 2024 },
];

const work = experiencesData.map((exp) => ({
  lane: 'work',
  label: SHORT_NAMES[exp.instituicao] ?? exp.instituicao.split(' - ')[0],
  start: toYear(exp.inicioMes, exp.inicioAno),
  end: exp.terminoAno ? toYear(exp.terminoMes, exp.terminoAno) : null, // null = em andamento
  startLabel: Number(exp.inicioAno),
  endLabel: exp.terminoAno ? Number(exp.terminoAno) : null,
}));

const research = researchProjects.map((project) => {
  const years = project.periodo.match(/\d{4}/g).map(Number);
  return {
    lane: 'research',
    label: project.titulo,
    start: years[0],
    end: (years[1] ?? years[0]) + 1, // fim exclusivo: o projeto ocupa o ano final inteiro
    startLabel: years[0],
    endLabel: years[1] ?? years[0],
  };
});

export const timelineItems = [...education, ...work, ...research];
export const timelineLanes = ['education', 'work', 'research'];
