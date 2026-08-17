const GITHUB_USERNAME = 'LucasFelip';
const MAX_EVENTS = 6;

const SUPPORTED_TYPES = new Set(['PushEvent', 'ReleaseEvent', 'CreateEvent', 'PublicEvent']);

function describeEvent(event) {
  const repo = event.repo.name.replace(`${GITHUB_USERNAME}/`, '');

  switch (event.type) {
    case 'PushEvent': {
      const count = event.payload.commits?.length || 0;
      const lastMessage = event.payload.commits?.[count - 1]?.message?.split('\n')[0];
      return {
        label: count > 1 ? `${count} commits em` : 'commit em',
        repo,
        detail: lastMessage,
      };
    }
    case 'ReleaseEvent':
      return { label: 'release em', repo, detail: event.payload.release?.tag_name };
    case 'CreateEvent':
      if (event.payload.ref_type !== 'repository') return null;
      return { label: 'novo repositório', repo, detail: null };
    case 'PublicEvent':
      return { label: 'tornou público', repo, detail: null };
    default:
      return null;
  }
}

export const getRecentActivity = async () => {
  const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=30`);
  if (!res.ok) throw new Error(`Erro ao buscar atividade do GitHub: ${res.status}`);

  const events = await res.json();

  return events
    .filter((e) => SUPPORTED_TYPES.has(e.type))
    .map((e) => {
      const described = describeEvent(e);
      if (!described) return null;
      return { id: e.id, createdAt: e.created_at, ...described };
    })
    .filter(Boolean)
    .slice(0, MAX_EVENTS);
};
