import { toast } from '@/components/ui/use-toast';

const GITHUB_USERNAME = 'LucasFelip';
const MAX_PROJECTS_DISPLAY = 9; // Número máximo de projetos a serem exibidos

const fetchGitHubData = async () => {
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?type=owner&sort=pushed&direction=desc&per_page=${MAX_PROJECTS_DISPLAY}`
  );

  if (!res.ok) {
    if (res.status === 403) throw new Error('Limite de taxa da API pública do GitHub atingido. Tente novamente em alguns minutos.');
    throw new Error(`Erro ao buscar dados do GitHub: ${res.status} ${res.statusText}`);
  }

  const repos = await res.json();

  return repos
    .filter((repo) => !repo.fork && !repo.archived)
    .map((repo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      pushedAt: repo.pushed_at,
      stargazerCount: repo.stargazers_count,
      forkCount: repo.forks_count,
      primaryLanguage: repo.language ? { name: repo.language, color: null } : null,
    }));
};

export const getProjects = async () => {
  try {
    const projects = await fetchGitHubData();
    if (projects.length === 0) {
      toast({
        title: "Nenhum projeto encontrado",
        description: "Não foram encontrados projetos recentes no GitHub.",
        variant: "default",
      });
    }
    return projects;
  } catch (err) {
    console.error("GitHub API Error in getProjects:", err);
    toast({
      title: "Erro ao buscar projetos",
      description: err.message || "Não foi possível carregar os projetos do GitHub.",
      variant: "destructive",
    });
    throw err;
  }
};
