import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { getProjects, getInitialProjects } from '@/services/githubService';
import ProjectsDisplay from '@/components/projects/ProjectsDisplay';
import ActivityFeed from '@/components/projects/ActivityFeed';
import GithubStatsCard from '@/components/projects/GithubStatsCard';
import { useI18n } from '@/i18n';

const ProjectsSection = () => {
  const { t } = useI18n();
  // A lista gerada no build aparece na hora. A API do GitHub só atualiza os dados; se ela falhar (limite de
  // requisições por IP, por exemplo), o visitante continua vendo a lista do build e nenhum erro é exibido.
  const [projects, setProjects] = useState(getInitialProjects);
  const hadInitialProjects = useRef(projects.length > 0);
  const [loading, setLoading] = useState(!hadInitialProjects.current);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    getProjects()
      .then((fresh) => {
        if (!cancelled && fresh.length > 0) setProjects(fresh);
      })
      .catch((err) => {
        if (!cancelled && !hadInitialProjects.current) setError(err.code || 'network');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="projetos" className="py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <span className="section-label">{t.projects.label}</span>
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-4"
        >
          {t.projects.title}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto"
        >
          {t.projects.subtitle}
        </motion.p>
        <ProjectsDisplay projects={projects} loading={loading} error={error} />
        <ActivityFeed />
        <GithubStatsCard />
      </div>
    </section>
  );
};

export default ProjectsSection;