import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getProjects } from '@/services/githubService';
import ProjectsDisplay from '@/components/projects/ProjectsDisplay';

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedProjects = await getProjects();
        setProjects(fetchedProjects);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return (
    <section id="projetos" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-4"
        >
          Projetos em Destaque
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto"
        >
          Uma seleção dos meus projetos fixados e mais recentes no GitHub.
        </motion.p>
        <ProjectsDisplay projects={projects} loading={loading} error={error} />
      </div>
    </section>
  );
};

export default ProjectsSection;