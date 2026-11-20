import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import { m } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Github, AlertTriangle, ChevronDown } from 'lucide-react';
import { useI18n } from '@/i18n';

const GITHUB_USERNAME = 'LucasFelip';
const MOBILE_VISIBLE_COUNT = 2;

const ProjectsDisplay = ({ projects, loading, error }) => {
  const [expanded, setExpanded] = useState(false);
  const { t } = useI18n();
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-300 py-10 bg-destructive/10 rounded-lg flex flex-col items-center">
        <AlertTriangle className="w-12 h-12 mb-4"/>
        <p className="text-xl font-semibold">{t.projects.errorTitle}</p>
        <p>{t.projects.errors[error] ?? t.projects.errors.network}</p>
        <p className="mt-2 text-sm">{t.projects.errorHint}</p>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-10">
        <Github className="w-16 h-16 mx-auto mb-4 opacity-50"/>
        <p className="text-xl">{t.projects.emptyTitle}</p>
        <p>{t.projects.emptyHint}</p>
         <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Button size="lg" variant="outline" className="hover:bg-primary hover:text-primary-foreground">
              <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer">
                {t.projects.visitGithub}
              </a>
            </Button>
          </m.div>
      </div>
    );
  }

  const hasMore = projects.length > MOBILE_VISIBLE_COUNT;

  return (
    <>
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 px-4 xs:px-0">
        {projects.map((repo, index) => (
          <div
            key={repo.id}
            className={!expanded && index >= MOBILE_VISIBLE_COUNT ? 'hidden md:block' : ''}
          >
            <ProjectCard repo={repo} />
          </div>
        ))}
      </div>
      {hasMore && (
        <div className="md:hidden text-center mt-6 px-4">
          <Button variant="outline" size="sm" onClick={() => setExpanded(!expanded)}>
            {expanded ? t.projects.showLess : t.projects.showMore(projects.length - MOBILE_VISIBLE_COUNT)}
            <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </Button>
        </div>
      )}
      {projects.length > 0 && (
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Button size="lg" variant="outline" className="hover:bg-primary hover:text-primary-foreground">
              <a href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`} target="_blank" rel="noopener noreferrer">
                {t.projects.viewAll}
              </a>
            </Button>
          </m.div>
        )}
    </>
  );
};

export default ProjectsDisplay;