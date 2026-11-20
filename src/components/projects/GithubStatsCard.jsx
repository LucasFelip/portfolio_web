import React from 'react';
import { Star, FolderGit2 } from 'lucide-react';
import { useI18n } from '@/i18n';
import githubStats from '@/data/githubStats.generated.json';

// Estatísticas geradas no build (scripts/generate-github-stats.js). Sem dados, o card não aparece.
const GithubStatsCard = () => {
  const { t } = useI18n();
  const { stats } = githubStats;
  if (!stats) return null;

  return (
    <div className="dashboard-card max-w-2xl mx-auto mt-6">
      <p className="font-mono text-xs text-muted-foreground mb-4">$ gh stats --user LucasFelip</p>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-3">
          <FolderGit2 aria-hidden="true" className="w-5 h-5 text-primary" />
          <div>
            <p className="font-mono text-xl text-foreground">{stats.publicRepos}</p>
            <p className="text-xs text-muted-foreground">{t.projects.stats.repos}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Star aria-hidden="true" className="w-5 h-5 text-primary" />
          <div>
            <p className="font-mono text-xl text-foreground">{stats.stars}</p>
            <p className="text-xs text-muted-foreground">{t.projects.stats.stars}</p>
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-2">{t.projects.stats.languages}</p>
          <ul className="flex flex-wrap gap-2">
            {stats.topLanguages.map((language) => (
              <li key={language.name} className="border border-border rounded px-2 py-0.5 font-mono text-[0.7rem] text-foreground/80">
                {language.name} <span className="text-muted-foreground">{language.count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GithubStatsCard;
