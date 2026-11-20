import { writeFileSync, readFileSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// Gera, no build, uma cópia dos repositórios públicos do GitHub. A seção "Projetos" usa essa lista na hora e só
// consulta a API do GitHub no navegador para atualizá-la; se a API falhar (limite de 60 requisições/h por IP), o
// visitante continua vendo os projetos. É uma única chamada à API. Se ela falhar no build, o script nunca derruba
// o build: mantém a cópia anterior, se existir, ou grava uma lista vazia (a seção usa só a API ao vivo).
// Sem GITHUB_TOKEN o limite do build é 60 requisições/h por IP (compartilhado no Netlify); com o token, 5000/h.
const GITHUB_USERNAME = 'LucasFelip';

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

    // Cópia enxuta (já ordenada por push); o filtro de repos ocultos e os destaques ficam em githubService.js.
    const projects = (await res.json())
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

    writeFileSync(outFile, JSON.stringify({ projects }, null, 2));
  } catch (err) {
    if (existsSync(outFile) && JSON.parse(readFileSync(outFile, 'utf-8')).projects?.length) {
      console.warn(`[github-projects] ${err.message}; mantendo a cópia anterior`);
    } else {
      console.warn(`[github-projects] ${err.message}; sem cópia anterior, a seção usará só a API ao vivo`);
      writeFileSync(outFile, JSON.stringify({ projects: [] }, null, 2));
    }
  }
}

run();
