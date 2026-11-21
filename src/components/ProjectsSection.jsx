import React, { useState, useEffect, useRef } from 'react';
import { m } from 'framer-motion';
import { getProjects, getInitialProjects } from '@/services/githubService';
import ProjectsDisplay from '@/components/projects/ProjectsDisplay';
import GithubStats from '@/components/projects/GithubStats';
import { useI18n } from '@/i18n';

const ProjectsSection = () => {
  const { t } = useI18n();
  // A lista gerada no build aparece na hora. A API do GitHub só atualiza os dados; se ela falhar (limite de
  // requisições por IP, por exemplo), o visitante continua vendo a lista do build e nenhum erro é exibido.
  const [projects, setProjects] = useState(getInitialProjects);
  const hadInitialProjects = useRef(projects.length > 0);
  const [loading, setLoading] = useState(!hadInitialProjects.current);
  const [error, setError] = useState(null);

  const sectionRef = useRef(null);
  const [nearViewport, setNearViewport] = useState(false);

  // A lista do build já está na tela; a API do GitHub só é consultada (e só gasta o limite de requisições do
  // visitante) quando a seção chega perto da área visível.
  useEffect(() => {
    const element = sectionRef.current;
    if (!element || !('IntersectionObserver' in window)) {
      setNearViewport(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: '600px 0px' },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!nearViewport) return undefined;
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
  }, [nearViewport]);

  return (
    <section id="projetos" ref={sectionRef} className="py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <span className="section-label">{t.projects.label}</span>
        </div>
        <m.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-4"
        >
          {t.projects.title}
        </m.h2>
        <m.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto"
        >
          {t.projects.subtitle}
        </m.p>
        <GithubStats />
        <ProjectsDisplay projects={projects} loading={loading} error={error} />
      </div>
    </section>
  );
};

export default ProjectsSection;