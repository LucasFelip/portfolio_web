import React from 'react';
import { m } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Github, Star, GitFork, ExternalLink } from 'lucide-react';
import { useI18n } from '@/i18n';

// Quando o repo não tem imagem curada, mostra uma "capa" no estilo terminal em vez de um card vazio.
const CoverPlaceholder = ({ name, language }) => (
  <div className="relative flex h-full w-full items-center justify-center bg-black/30">
    <div className="absolute inset-0 bg-grid opacity-60" aria-hidden="true" />
    <p className="relative font-mono text-sm text-foreground/80 px-4 text-center break-all">
      <span className="text-primary-text">$ </span>
      {name}
      {language && <span className="block mt-1 text-xs text-muted-foreground">{language}</span>}
    </p>
  </div>
);

const ProjectCard = ({ repo }) => {
  const { t, tr, lang } = useI18n();
  const { override } = repo;
  const description = override?.description ? tr(override.description) : repo.description || t.projects.noDescription;
  const pushedAt = new Date(repo.pushedAt || repo.pushed_at);

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <div className="dashboard-card !p-0 overflow-hidden h-full flex flex-col hover:border-primary/50 transition-colors">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-black/20">
          <Github aria-hidden="true" className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
          <span className="font-mono text-xs text-foreground/90 truncate">{repo.name}</span>
        </div>

        <div className="aspect-[16/9] border-b border-border bg-black/20 overflow-hidden">
          {override?.image ? (
            <img
              src={override.image}
              alt=""
              loading="lazy"
              className={`h-full w-full ${override.imageFit === 'contain' ? 'object-contain' : 'object-cover'}`}
            />
          ) : (
            <CoverPlaceholder name={repo.name} language={repo.primaryLanguage?.name} />
          )}
        </div>

        <div className="p-5 flex flex-col flex-grow">
          <p className="text-sm text-muted-foreground mb-4">{description}</p>

          {override?.tags?.length > 0 && (
            <ul className="flex flex-wrap gap-2 mb-4" aria-label={t.projects.tagsLabel}>
              {override.tags.map((tag) => (
                <li key={tag} className="border border-border rounded px-2 py-0.5 font-mono text-[0.7rem] text-foreground/80">
                  {tag}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-auto">
            <div className="flex items-center gap-4 font-mono text-xs text-muted-foreground mb-2">
              {repo.primaryLanguage?.name && (
                <span className="flex items-center gap-1.5">
                  <span style={{ backgroundColor: repo.primaryLanguage.color || '#ccc' }} className="w-2 h-2 rounded-full"></span>
                  {repo.primaryLanguage.name}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Star aria-hidden="true" className="w-3 h-3 text-yellow-400" /> {repo.stargazerCount || repo.stargazers_count || 0}
              </span>
              <span className="flex items-center gap-1">
                <GitFork aria-hidden="true" className="w-3 h-3 text-green-400" /> {repo.forkCount || repo.forks_count || 0}
              </span>
            </div>
            <p className="font-mono text-[0.7rem] text-muted-foreground/70 mb-4">
              {t.projects.updatedAt} {pushedAt.toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-GB', { timeZone: 'UTC' })}
            </p>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" asChild className="flex-1 min-w-[9rem]">
                <a href={repo.url || repo.html_url} target="_blank" rel="noopener noreferrer">
                  {t.projects.viewOnGithub} <ExternalLink aria-hidden="true" className="w-4 h-4 ml-2" />
                </a>
              </Button>
              {override?.demo && (
                <Button size="sm" asChild className="flex-1 min-w-[9rem]">
                  <a href={override.demo} target="_blank" rel="noopener noreferrer">
                    {t.projects.demo} <ExternalLink aria-hidden="true" className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </m.div>
  );
};

export default ProjectCard;
