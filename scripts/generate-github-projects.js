import { writeFileSync, readFileSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// Gera, no build, uma cópia dos repositórios públicos do GitHub. A seção "Projetos" usa essa lista na hora e só
// consulta a API do GitHub no navegador para atualizá-la; se a API falhar (limite de 60 requisições/h por IP), o
// visitante continua vendo os projetos. É uma única chamada à API. Se ela falhar no build, o script nunca derruba
// o build: mantém a cópia anterior, se existir, ou grava uma lista vazia (a seção usa só a API ao vivo).
// Sem GITHUB_TOKEN o limite do build é 60 requisições/h por IP (compartilhado no Netlify); com o token, 5000/h.
const GITHUB_USERNAME = 'LucasFelip';
// Mesmos repositórios ocultos de src/services/githubService.js: não entram nos projetos nem nos números.
const HIDDEN_REPOS = new Set([GITHUB_USERNAME.toLowerCase(), 'portfolio_web', 'teste_pulse']);

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'src', 'data');
const outFile = join(outDir, 'githubProjects.generated.json');

const headers = { Accept: 'application/vnd.github+json' };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

async function run() {
  mkdirSync(outDir, { recursive: true });
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?type=owner&sort=pushed&direction=desc&per_page=100`,
      { headers },
    );
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);

    const repos = await res.json();

    // Números do bloco "GitHub em números": repositórios públicos próprios (sem forks, arquivados e ocultos),
    // linguagens mais usadas (por quantidade de repositórios) e data do último push.
    const own = repos.filter((r) => !r.fork && !r.archived && !HIDDEN_REPOS.has(r.name.toLowerCase()));
    const byLanguage = new Map();
    for (const r of own) if (r.language) byLanguage.set(r.language, (byLanguage.get(r.language) ?? 0) + 1);
    const stats = {
      repos: own.length,
      stars: own.reduce((sum, r) => sum + r.stargazers_count, 0),
      languages: [...byLanguage.entries()]
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .slice(0, 6)
        .map(([name, count]) => ({ name, count })),
      lastPush: own.map((r) => r.pushed_at).sort().at(-1) ?? null,
    };

    // Cópia enxuta (já ordenada por push); o filtro de repos ocultos e os destaques ficam em githubService.js.
    const projects = repos
      .filter((r) => !r.fork && !r.archived && r.description)
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

    writeFileSync(outFile, JSON.stringify({ projects, stats }, null, 2));
  } catch (err) {
    if (existsSync(outFile) && JSON.parse(readFileSync(outFile, 'utf-8')).projects?.length) {
      console.warn(`[github-projects] ${err.message}; mantendo a cópia anterior`);
    } else {
      console.warn(`[github-projects] ${err.message}; sem cópia anterior, a seção usará só a API ao vivo`);
      writeFileSync(outFile, JSON.stringify({ projects: [], stats: null }, null, 2));
    }
  }
}

run();
