import { toast } from '@/components/ui/use-toast';

const GITHUB_USERNAME = 'LucasFelip';
const MAX_PROJECTS_DISPLAY = 9; // Número máximo de projetos a serem exibidos

const fetchGitHubData = async () => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const query = `
    query GetUserRepositories($username: String!) {
      user(login: $username) {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              id
              name
              description
              url
              pushedAt
              stargazerCount
              forkCount
              primaryLanguage {
                name
                color
              }
            }
          }
        }
        repositories(orderBy: {field: PUSHED_AT, direction: DESC}, first: 20, privacy: PUBLIC, isFork: false) {
          nodes {
            id
            name
            description
            url
            pushedAt
            stargazerCount
            forkCount
            primaryLanguage {
              name
              color
            }
            isArchived
          }
        }
      }
    }
  `;
  
  const githubToken = import.meta.env.VITE_GITHUB_TOKEN;
  let headers = { 'Content-Type': 'application/json' };
  if (githubToken) {
    headers['Authorization'] = `bearer ${githubToken}`;
  } else {
     console.warn("VITE_GITHUB_TOKEN não está configurado no arquivo .env. A API do GitHub pode ter limites de taxa mais rígidos ou falhar ao buscar itens fixados.");
  }

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      query,
      variables: { username: GITHUB_USERNAME },
    }),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({ message: res.statusText }));
    if (res.status === 401 && !githubToken) {
       throw new Error('Token do GitHub não fornecido ou inválido. Necessário para buscar repositórios fixados. Configure VITE_GITHUB_TOKEN no arquivo .env.');
    }
    if (res.status === 403) throw new Error(`Limite de taxa da API do GitHub atingido. Detalhes: ${errorBody.message}`);
    throw new Error(`Erro ao buscar dados do GitHub: ${res.status} ${errorBody.message || res.statusText}`);
  }
  
  const data = await res.json();

  if (data.errors) {
    console.error("GraphQL Errors:", data.errors);
    throw new Error(data.errors.map(e => e.message).join(", "));
  }
  
  const pinnedRepos = data.data.user.pinnedItems.nodes.map(repo => ({ ...repo, isPinned: true })) || [];
  const recentPushedRepos = data.data.user.repositories.nodes || [];

  const recentRepos = recentPushedRepos.filter(repo => 
    new Date(repo.pushedAt) > thirtyDaysAgo && !repo.isArchived
  );
  
  let combinedProjects = [...pinnedRepos];

  recentRepos.forEach(recentRepo => {
    if (!pinnedRepos.find(pinnedRepo => pinnedRepo.id === recentRepo.id)) {
      combinedProjects.push({ ...recentRepo, isPinned: false });
    }
  });
  
  const uniqueProjectsMap = new Map();
  combinedProjects.forEach(repo => {
    if (!uniqueProjectsMap.has(repo.id)) {
      uniqueProjectsMap.set(repo.id, repo);
    } else {
      const existingRepo = uniqueProjectsMap.get(repo.id);
      if (repo.isPinned && !existingRepo.isPinned) {
        uniqueProjectsMap.set(repo.id, repo); 
      }
    }
  });
  
  let uniqueProjects = Array.from(uniqueProjectsMap.values());
  
  uniqueProjects.sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.pushedAt) - new Date(a.pushedAt);
  });

  return uniqueProjects.slice(0, MAX_PROJECTS_DISPLAY);
};


export const getProjects = async () => {
  try {
    const projects = await fetchGitHubData();
    if (projects.length === 0) {
      toast({
        title: "Nenhum projeto encontrado",
        description: "Não foram encontrados projetos recentes ou fixados no GitHub.",
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