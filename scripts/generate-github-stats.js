import { writeFileSync, readFileSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// Gera dados do GitHub no build (sem depender de serviços de imagem de terceiros nem da API no navegador):
//  - `stats`: estatísticas do painel (repositórios, estrelas, linguagens, commits por semana);
//  - `projects`: cópia dos repositórios públicos, usada como lista inicial e como alternativa quando a API do
//    GitHub falha no navegador do visitante (limite de 60 requisições/h por IP).
// Sem GITHUB_TOKEN o limite do build é 60 requisições/h por IP (compartilhado no Netlify): cadastre o token como
// variável de ambiente para chegar a 5000/h. Se a API falhar, o script nunca derruba o build: mantém os dados
// anteriores, se existirem, ou grava dados vazios (o card some e a lista usa só a API ao vivo).
const GITHUB_USERNAME = 'LucasFelip';
const WEEKS = 12;
const MAX_REPOS_FOR_ACTIVITY = 15;
const MAX_COMMIT_PAGES = 3;
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'src', 'data');
const outFile = join(outDir, 'githubStats.generated.json');

const headers = { Accept: 'application/vnd.github+json' };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

const readPrevious = () => {
  try {
    return existsSync(outFile) ? JSON.parse(readFileSync(outFile, 'utf-8')) : null;
  } catch {
    return null;
  }
};

// Commits do usuário por semana (últimas 12), nos repos com push recente. Devolve null se nenhuma chamada deu certo.
async function fetchWeeklyCommits(repos) {
  const now = Date.now();
  const since = new Date(now - WEEKS * WEEK_MS).toISOString();
  const weekly = Array.from({ length: WEEKS }, () => 0);
  const recent = repos.filter((r) => r.pushed_at >= since).slice(0, MAX_REPOS_FOR_ACTIVITY);
  let succeeded = 0;

  for (const repo of recent) {
    try {
      for (let page = 1; page <= MAX_COMMIT_PAGES; page += 1) {
        const url = `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/commits?author=${GITHUB_USERNAME}&since=${since}&per_page=100&page=${page}`;
        const res = await fetch(url, { headers });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const commits = await res.json();
        for (const commit of commits) {
          const age = Math.floor((now - new Date(commit.commit.author.date).getTime()) / WEEK_MS);
          if (age >= 0 && age < WEEKS) weekly[WEEKS - 1 - age] += 1;
        }
        if (commits.length < 100) break;
      }
      succeeded += 1;
    } catch (err) {
      console.warn(`[github-stats] commits de ${repo.name} indisponíveis: ${err.message}`);
    }
  }

  // Só aceita o resultado se todas as chamadas funcionaram; dado parcial subconta semanas e engana.
  if (recent.length === 0 || succeeded < recent.length || !weekly.some((n) => n > 0)) return null;
  return weekly;
}

async function run() {
  mkdirSync(outDir, { recursive: true });
  const previous = readPrevious();

  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?type=owner&sort=pushed&direction=desc&per_page=100`,
      { headers },
    );
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    const repos = (await res.json()).filter((r) => !r.fork && !r.archived);

    const languages = {};
    for (const repo of repos) {
      if (repo.language) languages[repo.language] = (languages[repo.language] ?? 0) + 1;
    }

    const weeklyCommits = (await fetchWeeklyCommits(repos)) ?? previous?.stats?.weeklyCommits ?? null;

    const stats = {
      publicRepos: repos.length,
      stars: repos.reduce((sum, r) => sum + r.stargazers_count, 0),
      topLanguages: Object.entries(languages)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name, count]) => ({ name, count })),
      weeklyCommits,
      lastPush: repos.map((r) => r.pushed_at).sort().at(-1)?.slice(0, 10) ?? null,
      generatedAt: new Date().toISOString().slice(0, 10),
    };

    // Cópia enxuta dos repos (já ordenados por push); o filtro de ocultos e os destaques ficam em githubService.
    const projects = repos
      .filter((r) => r.description)
      .map((r) => ({
        id: r.id,
        name: r.name,
        description: r.description,
        url: r.html_url,
        pushedAt: r.pushed_at,
        stargazerCount: r.stargazers_count,
        forkCount: r.forks_count,
        language: r.language ?? null,
      }));

    writeFileSync(outFile, JSON.stringify({ stats, projects }, null, 2));
  } catch (err) {
    if (previous) {
      console.warn(`[github-stats] ${err.message}; mantendo dados anteriores`);
    } else {
      console.warn(`[github-stats] ${err.message}; sem dados anteriores, o card de estatísticas não será exibido`);
      writeFileSync(outFile, JSON.stringify({ stats: null, projects: [] }, null, 2));
    }
  }
}

run();
