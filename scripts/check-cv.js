import { writeFileSync, appendFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { fetchDoc, DOC_URL } from './lib/cv-doc.js';

// Compara o currículo no Google Docs com os fatos que o site mostra (e-mail, experiências e formação) e
// gera um relatório em Markdown. NÃO altera nada: o objetivo é avisar quando o Doc mudou e o site precisa de
// revisão (o inglês, os detalhes e a Trajetória continuam sendo mantidos à mão).
//
//   node scripts/check-cv.js [--out relatorio.md]
//
// Saída para o GitHub Actions (GITHUB_OUTPUT): has_issue=true quando há divergência ou o Doc não pôde ser lido.
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const load = (path) => import(pathToFileURL(join(root, path)).href);

// Como cada empresa aparece no Doc -> `instituicao` em src/data/experiences.js. Uma experiência nova no Doc
// que não esteja aqui é reportada como "empresa nova", e é aqui que ela deve ser registrada depois de
// adicionada ao site.
const COMPANIES = [
  { match: 'pulse', instituicao: 'Pulse - Grupo Mateus' },
  { match: 'lsdi', instituicao: 'LSDI - UFMA' },
  { match: 'coreplan', instituicao: 'Coreplan Gestão Tecnologia e Serviços' },
  { match: 'tjma', instituicao: 'Tribunal de Justiça do Maranhão' },
  { match: 'jucema', instituicao: 'Junta Comercial do Estado do Maranhão' },
];

const MONTHS = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

const plain = (text) =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();

// "Eng. de Infra. de Software (Voluntário)" e "Engenheiro de Infraestrutura de Software (Voluntário)" são o mesmo cargo.
const ABBREVIATIONS = { eng: 'engenheiro', infra: 'infraestrutura', dev: 'desenvolvedor' };
const roleTokens = (text) =>
  plain(text)
    .replace(/\(.*?\)/g, ' ')
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
    .map((token) => ABBREVIATIONS[token] ?? token)
    .filter((token) => !['de', 'da', 'do', 'e'].includes(token));
// O cargo do Doc costuma ser mais curto que o do site; basta que um contenha o outro.
const sameRole = (a, b) => {
  const [x, y] = [new Set(roleTokens(a)), new Set(roleTokens(b))];
  const contains = (big, small) => [...small].every((token) => big.has(token));
  return contains(x, y) || contains(y, x);
};

const mmYYYY = (month, year) => `${String(month).padStart(2, '0')}/${year}`;

function parseExperiences(text) {
  const line = /^(?<role>.+?)\s*\|\s*(?<org>.+?)\s+(?<start>\d{2}\/\d{4})\s+[–-]\s+(?<end>Presente|\d{2}\/\d{4})\s*$/i;
  return text
    .split('\n')
    .map((l) => l.trim().match(line)?.groups)
    .filter(Boolean)
    .map(({ role, org, start, end }) => ({ role, org, start, end: /presente/i.test(end) ? null : end }));
}

function parseEducation(text) {
  const section = text.split(/^Educa[cç][aã]o\s*$/im)[1]?.split(/^Idiomas\s*$/im)[0] ?? '';
  return section
    .split('\n')
    .map((l) => l.match(/(\d{4})\s*[-–—]\s*(\d{4})\s*$/))
    .filter(Boolean)
    .map((m) => `${m[1]}–${m[2]}`);
}

const siteDate = (month, year) => (year ? mmYYYY(MONTHS.indexOf(month.toLowerCase()) + 1, year) : null);

async function compare(doc) {
  const { experiencesData } = await load('src/data/experiences.js');
  const { CONTACT } = await load('src/lib/constants.js');
  const { pt } = await load('src/i18n/pt.js');
  const findings = [];

  // E-mail
  const docEmail = doc.match(/[\w.+-]+@[\w-]+(?:\.[\w-]+)+/)?.[0];
  if (!docEmail) findings.push('**E-mail**: não encontrei um e-mail no cabeçalho do Doc.');
  else if (docEmail.toLowerCase() !== CONTACT.email.toLowerCase()) {
    findings.push(`**E-mail**: no Doc é \`${docEmail}\` e no site é \`${CONTACT.email}\` (\`src/lib/constants.js\`).`);
  }

  // Experiências
  const docJobs = parseExperiences(doc);
  if (!docJobs.length) findings.push('**Experiências**: não consegui ler nenhuma experiência no Doc (o formato "Cargo | Empresa  MM/AAAA – Presente" mudou?).');
  const seen = new Set();
  for (const job of docJobs) {
    const company = COMPANIES.find((c) => plain(job.org).includes(c.match));
    if (!company) {
      findings.push(`**Empresa nova no Doc**: "${job.org}" (${job.start} – ${job.end ?? 'Presente'}) não existe no site. Adicione em \`src/data/experiences.js\` e registre em \`COMPANIES\` (\`scripts/check-cv.js\`).`);
      continue;
    }
    const site = experiencesData.find((e) => e.instituicao === company.instituicao);
    if (!site) {
      findings.push(`**Configuração**: \`${company.instituicao}\` está em \`COMPANIES\`, mas não existe em \`src/data/experiences.js\`.`);
      continue;
    }
    seen.add(site.instituicao);
    const siteStart = siteDate(site.inicioMes, site.inicioAno);
    const siteEnd = siteDate(site.terminoMes || 'janeiro', site.terminoAno);
    if (job.start !== siteStart) findings.push(`**${job.org}**: início no Doc ${job.start}, no site ${siteStart}.`);
    if ((job.end ?? 'atual') !== (siteEnd ?? 'atual')) {
      findings.push(`**${job.org}**: término no Doc ${job.end ?? 'Presente'}, no site ${siteEnd ?? 'atual'}.`);
    }
    const siteRole = typeof site.cargo === 'string' ? site.cargo : site.cargo.pt;
    if (!sameRole(job.role, siteRole)) findings.push(`**${job.org}**: cargo no Doc "${job.role}", no site "${siteRole}".`);
  }
  for (const site of experiencesData) {
    if (!seen.has(site.instituicao) && docJobs.length) findings.push(`**${site.instituicao}**: está no site, mas não foi encontrada no Doc.`);
  }

  // Formação (períodos)
  const docYears = parseEducation(doc);
  const siteYears = pt.about.education.map((e) => e.period.replace(/\s*[—-]\s*/, '–'));
  const missingInSite = docYears.filter((y) => !siteYears.includes(y));
  const missingInDoc = siteYears.filter((y) => !docYears.includes(y));
  if (!docYears.length) findings.push('**Formação**: não consegui ler os períodos da formação no Doc.');
  for (const y of missingInSite) findings.push(`**Formação**: período ${y} está no Doc e não no site (\`src/i18n/pt.js\`, \`about.education\`).`);
  for (const y of missingInDoc) findings.push(`**Formação**: período ${y} está no site e não no Doc.`);

  return findings;
}

function report(findings, error) {
  const head = `Relatório gerado em ${new Date().toISOString().slice(0, 10)} a partir do [currículo no Google Docs](${DOC_URL}).`;
  if (error) {
    return `${head}\n\n**Não consegui ler o Doc:** ${error}\n\nSe o link deixou de ser público ("qualquer pessoa com o link"), o botão "Baixar CV" também volta a usar a cópia do repositório.\n`;
  }
  if (!findings.length) return `${head}\n\nNenhuma divergência: e-mail, experiências (empresa, início, fim e cargo) e períodos da formação batem com o site.\n`;
  return [
    head,
    '',
    'O Doc e o site divergem nos pontos abaixo. Nada foi alterado automaticamente: confira qual lado está certo e atualize o outro (o inglês e a Trajetória também precisam de revisão manual).',
    '',
    ...findings.map((f) => `- ${f}`),
    '',
    'Verificado: e-mail, experiências (empresa, início, término e cargo) e períodos da formação. Textos, habilidades, certificados e projetos não são comparados.',
    '',
  ].join('\n');
}

async function main() {
  let findings = [];
  let error = null;
  try {
    findings = await compare(await fetchDoc('txt'));
  } catch (err) {
    error = err.message;
  }

  const markdown = report(findings, error);
  const out = process.argv.indexOf('--out');
  if (out > -1) writeFileSync(process.argv[out + 1], markdown);
  console.log(markdown);

  const hasIssue = Boolean(error) || findings.length > 0;
  if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `has_issue=${hasIssue}\n`);
}

main();
