import React from 'react';
import { Star, FolderGit2, GitCommit } from 'lucide-react';
import { useI18n } from '@/i18n';
import githubStats from '@/data/githubStats.generated.json';

// Painel com dados reais do GitHub, gerados no build (scripts/generate-github-stats.js). Sem dados, não aparece.
const formatDate = (isoDate, lang) =>
  new Date(`${isoDate}T12:00:00`).toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-GB');

const GithubStatsCard = () => {
  const { t, lang } = useI18n();
  const { stats } = githubStats;
  if (!stats) return null;

  const maxWeekly = Math.max(1, ...(stats.weeklyCommits ?? [0]));
  const maxLanguage = Math.max(1, ...stats.topLanguages.map((language) => language.count));

  return (
    <div className="dashboard-card max-w-3xl mx-auto mt-6">
      <p className="font-mono text-xs text-muted-foreground mb-4">$ gh stats --user LucasFelip</p>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-3">
          <FolderGit2 aria-hidden="true" className="w-5 h-5 text-primary-text" />
          <div>
            <p className="font-mono text-xl text-foreground">{stats.publicRepos}</p>
            <p className="text-xs text-muted-foreground">{t.projects.stats.repos}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Star aria-hidden="true" className="w-5 h-5 text-primary-text" />
          <div>
            <p className="font-mono text-xl text-foreground">{stats.stars}</p>
            <p className="text-xs text-muted-foreground">{t.projects.stats.stars}</p>
          </div>
        </div>
        {stats.lastPush && (
          <div className="flex items-center gap-3">
            <GitCommit aria-hidden="true" className="w-5 h-5 text-primary-text" />
            <div>
              <p className="font-mono text-xl text-foreground">{formatDate(stats.lastPush, lang)}</p>
              <p className="text-xs text-muted-foreground">{t.projects.stats.lastPush}</p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div>
          <p className="text-xs text-muted-foreground mb-3">{t.projects.stats.languages}</p>
          <ul className="space-y-2">
            {stats.topLanguages.map((language) => (
              <li key={language.name} className="flex items-center gap-3 font-mono text-xs">
                <span className="w-20 shrink-0 text-foreground/80">{language.name}</span>
                <span className="h-2 flex-1 rounded bg-border" aria-hidden="true">
                  <span
                    className="block h-2 rounded bg-primary-text"
                    style={{ width: `${(language.count / maxLanguage) * 100}%` }}
                  />
                </span>
                <span className="w-5 text-right text-muted-foreground">{language.count}</span>
              </li>
            ))}
          </ul>
        </div>

        {stats.weeklyCommits && (
          <div>
            <p className="text-xs text-muted-foreground mb-3">{t.projects.stats.activity}</p>
            <ul className="flex h-24 items-end gap-1.5" role="img" aria-label={`${t.projects.stats.activity}: ${stats.weeklyCommits.join(', ')}`}>
              {stats.weeklyCommits.map((count, index) => (
                <li
                  key={index}
                  title={String(count)}
                  className="flex-1 rounded-sm bg-primary-text/80"
                  style={{ height: `${Math.max(count > 0 ? 8 : 3, (count / maxWeekly) * 100)}%`, opacity: count > 0 ? 1 : 0.25 }}
                />
              ))}
            </ul>
          </div>
        )}
      </div>

      <p className="mt-4 font-mono text-[0.65rem] text-muted-foreground/60">
        {t.projects.stats.updated} {formatDate(stats.generatedAt, lang)}
      </p>
    </div>
  );
};

export default GithubStatsCard;
