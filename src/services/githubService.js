import { projectOverrides } from '@/data/projectOverrides';

const GITHUB_USERNAME = 'LucasFelip';
const MAX_PROJECTS_DISPLAY = 9; // Número máximo de projetos a serem exibidos
const FETCH_LIMIT = 100; // busca mais do que exibe, para poder filtrar e priorizar os destaques

// Repositórios que nunca aparecem: o repo de perfil (só o README do GitHub), o código deste próprio portfólio
// e o repositório de um teste técnico de processo seletivo.
const HIDDEN_REPOS = new Set([GITHUB_USERNAME.toLowerCase(), 'portfolio_web', 'teste_pulse']);

// Erro com `code` estável; a UI traduz a mensagem (ver ProjectsDisplay).
const githubError = (code, status) => Object.assign(new Error(`GitHub API: ${code}${status ? ` (${status})` : ''}`), { code });

const fetchGitHubData = async () => {
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?type=owner&sort=pushed&direction=desc&per_page=${FETCH_LIMIT}`
  );

  if (!res.ok) throw githubError(res.status === 403 ? 'rate_limit' : 'http', res.status);

  const repos = await res.json();

  const projects = repos
    .filter((repo) => !repo.fork && !repo.archived && !HIDDEN_REPOS.has(repo.name.toLowerCase()) && repo.description)
    .map((repo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      pushedAt: repo.pushed_at,
      stargazerCount: repo.stargazers_count,
      forkCount: repo.forks_count,
      primaryLanguage: repo.language ? { name: repo.language, color: null } : null,
      override: projectOverrides[repo.name] ?? null,
    }));

  // Destaques curados primeiro; dentro de cada grupo, o mais recente primeiro (a API já vem ordenada).
  const featured = projects.filter((p) => p.override);
  const others = projects.filter((p) => !p.override);
  return [...featured, ...others].slice(0, MAX_PROJECTS_DISPLAY);
};

export const getProjects = async () => {
  try {
    return await fetchGitHubData();
  } catch (err) {
    console.error('GitHub API Error in getProjects:', err);
    throw err instanceof Error && err.code ? err : githubError('network');
  }
};
