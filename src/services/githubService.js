import { projectOverrides } from '@/data/projectOverrides';
import snapshot from '@/data/githubStats.generated.json';

const GITHUB_USERNAME = 'LucasFelip';
const MAX_PROJECTS_DISPLAY = 9; // Número máximo de projetos a serem exibidos
const FETCH_LIMIT = 100; // busca mais do que exibe, para poder filtrar e priorizar os destaques

// Repositórios que nunca aparecem: o repo de perfil (só o README do GitHub), o código deste próprio portfólio
// e o repositório de um teste técnico de processo seletivo.
const HIDDEN_REPOS = new Set([GITHUB_USERNAME.toLowerCase(), 'portfolio_web', 'teste_pulse']);

// Erro com `code` estável; a UI traduz a mensagem (ver ProjectsDisplay).
const githubError = (code, status) => Object.assign(new Error(`GitHub API: ${code}${status ? ` (${status})` : ''}`), { code });

// Formato comum de repositório: o da cópia gerada no build (scripts/generate-github-stats.js).
const fromApi = (repo) => ({
  id: repo.id,
  name: repo.name,
  description: repo.description,
  url: repo.html_url,
  pushedAt: repo.pushed_at,
  stargazerCount: repo.stargazers_count,
  forkCount: repo.forks_count,
  language: repo.language ?? null,
});

// Aplica filtros, destaques e limite. A entrada já vem ordenada do mais recente para o mais antigo.
const prepare = (repos) => {
  const projects = repos
    .filter((repo) => repo.description && !HIDDEN_REPOS.has(repo.name.toLowerCase()))
    .map((repo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      url: repo.url,
      pushedAt: repo.pushedAt,
      stargazerCount: repo.stargazerCount,
      forkCount: repo.forkCount,
      primaryLanguage: repo.language ? { name: repo.language, color: null } : null,
      override: projectOverrides[repo.name] ?? null,
    }));

  // Destaques curados primeiro; dentro de cada grupo, o mais recente primeiro.
  const featured = projects.filter((p) => p.override);
  const others = projects.filter((p) => !p.override);
  return [...featured, ...others].slice(0, MAX_PROJECTS_DISPLAY);
};

// Lista gerada no build: disponível na hora e sem depender da API do GitHub no navegador.
export const getInitialProjects = () => prepare(snapshot.projects ?? []);

const fetchGitHubData = async () => {
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?type=owner&sort=pushed&direction=desc&per_page=${FETCH_LIMIT}`
  );

  if (!res.ok) throw githubError(res.status === 403 ? 'rate_limit' : 'http', res.status);

  const repos = await res.json();
  return prepare(repos.filter((repo) => !repo.fork && !repo.archived).map(fromApi));
};

// Atualização ao vivo; se falhar, quem chama continua com a lista gerada no build.
export const getProjects = async () => {
  try {
    return await fetchGitHubData();
  } catch (err) {
    console.warn('GitHub API indisponível em getProjects:', err);
    throw err instanceof Error && err.code ? err : githubError('network');
  }
};
