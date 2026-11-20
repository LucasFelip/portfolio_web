import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Github, Star, GitFork, ExternalLink } from 'lucide-react';
import { useI18n } from '@/i18n';

const ProjectCard = ({ repo }) => {
  const { t, lang } = useI18n();
  return (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5 }}
    className="h-full"
  >
    <div className="dashboard-card !p-0 overflow-hidden h-full flex flex-col hover:border-primary/50 transition-colors">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-black/20">
        <Github className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
        <span className="font-mono text-xs text-foreground/90 truncate">{repo.name}</span>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <p className="text-sm text-muted-foreground md:h-16 overflow-hidden text-ellipsis mb-4">
          {repo.description || t.projects.noDescription}
        </p>
        <div className="mt-auto">
          <div className="flex items-center gap-4 font-mono text-xs text-muted-foreground mb-2">
            {repo.primaryLanguage && repo.primaryLanguage.name && (
              <span className="flex items-center gap-1.5">
                <span style={{ backgroundColor: repo.primaryLanguage.color || '#ccc' }} className="w-2 h-2 rounded-full"></span>
                {repo.primaryLanguage.name}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-400" /> {repo.stargazerCount || repo.stargazers_count || 0}
            </span>
            <span className="flex items-center gap-1">
              <GitFork className="w-3 h-3 text-green-400" /> {repo.forkCount || repo.forks_count || 0}
            </span>
          </div>
          <p className="font-mono text-[0.7rem] text-muted-foreground/70 mb-4">
            {t.projects.updatedAt} {new Date(repo.pushedAt || repo.pushed_at).toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US')}
          </p>
          <Button variant="outline" size="sm" asChild className="w-full">
            <a href={repo.url || repo.html_url} target="_blank" rel="noopener noreferrer">
              {t.projects.viewOnGithub} <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  </motion.div>
  );
};

export default ProjectCard;