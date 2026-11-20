import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// Gera estatísticas do GitHub no build (sem depender de serviços de imagem de terceiros).
// Se a API falhar (limite de taxa, offline), mantém o arquivo anterior ou grava `stats: null` (o card some).
const GITHUB_USERNAME = 'LucasFelip';
const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'src', 'data');
const outFile = join(outDir, 'githubStats.generated.json');

async function run() {
  mkdirSync(outDir, { recursive: true });
  try {
    const headers = { Accept: 'application/vnd.github+json' };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?type=owner&per_page=100`, { headers });
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    const repos = (await res.json()).filter((r) => !r.fork && !r.archived);

    const languages = {};
    for (const repo of repos) {
      if (repo.language) languages[repo.language] = (languages[repo.language] ?? 0) + 1;
    }

    const stats = {
      publicRepos: repos.length,
      stars: repos.reduce((sum, r) => sum + r.stargazers_count, 0),
      topLanguages: Object.entries(languages)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name, count]) => ({ name, count })),
      generatedAt: new Date().toISOString().slice(0, 10),
    };
    writeFileSync(outFile, JSON.stringify({ stats }, null, 2));
  } catch (err) {
    if (existsSync(outFile)) {
      console.warn(`[github-stats] ${err.message}; mantendo dados anteriores`);
    } else {
      console.warn(`[github-stats] ${err.message}; sem dados anteriores, o card de estatísticas não será exibido`);
      writeFileSync(outFile, JSON.stringify({ stats: null }, null, 2));
    }
  }
}

run();
