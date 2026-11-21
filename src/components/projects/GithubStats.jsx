import React from 'react';
import { m } from 'framer-motion';
import { getGithubStats } from '@/services/githubService';
import { useI18n } from '@/i18n';

// Cores de linguagem no padrão do GitHub; as demais usam um cinza neutro.
const LANGUAGE_COLORS = {
  Java: '#b07219',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Dart: '#00B4AB',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Go: '#00ADD8',
  Shell: '#89e051',
  HTML: '#e34c26',
  CSS: '#563d7c',
  C: '#555555',
  'C++': '#f34b7d',
  'C#': '#178600',
  PowerShell: '#012456',
  Dockerfile: '#384d54',
};
const FALLBACK_COLOR = '#8b949e';

// Bloco "GitHub em números": dados reais gerados no build (scripts/generate-github-projects.js).
// Some quando não há dados (API do GitHub indisponível no build e sem cópia anterior).
const GithubStats = () => {
  const { t, lang } = useI18n();
  const stats = getGithubStats();
  if (!stats || !stats.repos) return null;

  const total = stats.languages.reduce((sum, language) => sum + language.count, 0);
  const lastPush = stats.lastPush
    ? new Date(stats.lastPush).toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' })
    : null;
  const items = [
    { value: stats.repos, label: t.projects.stats.repos },
    { value: stats.languages.length, label: t.projects.stats.languages },
    ...(lastPush ? [{ value: lastPush, label: t.projects.stats.lastActivity }] : []),
  ];

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="dashboard-card mx-auto mb-10 max-w-4xl"
    >
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">{t.projects.stats.title}</p>

      <dl className="grid grid-cols-3 gap-3 text-center">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col-reverse">
            <dt className="mt-1 text-xs text-muted-foreground md:text-sm">{item.label}</dt>
            <dd className="font-mono text-xl font-bold text-primary-text md:text-3xl">{item.value}</dd>
          </div>
        ))}
      </dl>

      {total > 0 && (
        <div className="mt-6">
          <div
            role="img"
            aria-label={`${t.projects.stats.byLanguage}: ${stats.languages.map((l) => `${l.name} ${l.count}`).join(', ')}`}
            className="flex h-2.5 w-full overflow-hidden rounded-full bg-black/30"
          >
            {stats.languages.map((language) => (
              <span
                key={language.name}
                style={{ width: `${(language.count / total) * 100}%`, backgroundColor: LANGUAGE_COLORS[language.name] ?? FALLBACK_COLOR }}
              />
            ))}
          </div>
          <ul className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1.5 font-mono text-xs text-muted-foreground">
            {stats.languages.map((language) => (
              <li key={language.name} className="flex items-center gap-1.5">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: LANGUAGE_COLORS[language.name] ?? FALLBACK_COLOR }}
                />
                {language.name} <span className="text-muted-foreground/70">{language.count}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-center text-[0.7rem] text-muted-foreground/70">{t.projects.stats.byLanguage}</p>
        </div>
      )}
    </m.div>
  );
};

export default GithubStats;
