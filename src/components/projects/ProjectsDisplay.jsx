import React from 'react';
import ProjectCard from './ProjectCard';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Github, AlertTriangle } from 'lucide-react';

const GITHUB_USERNAME = 'LucasFelip';

const ProjectsDisplay = ({ projects, loading, error }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-destructive py-10 bg-destructive/10 rounded-lg flex flex-col items-center">
        <AlertTriangle className="w-12 h-12 mb-4"/>
        <p className="text-xl font-semibold">Oops! Algo deu errado.</p>
        <p>{error}</p>
        <p className="mt-2 text-sm">Por favor, tente novamente mais tarde. Se o erro persistir, pode ser necessário configurar um token de acesso do GitHub (VITE_GITHUB_TOKEN) no arquivo .env para evitar limites de taxa ou acessar repositórios fixados.</p>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-10">
        <Github className="w-16 h-16 mx-auto mb-4 opacity-50"/>
        <p className="text-xl">Nenhum projeto para exibir no momento.</p>
        <p>Verifique mais tarde ou visite meu perfil no GitHub.</p>
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Button size="lg" variant="outline" className="hover:bg-primary hover:text-primary-foreground">
              <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer">
                Visitar meu GitHub
              </a>
            </Button>
          </motion.div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 px-4 xs:px-0">
        {projects.map((repo) => (
          <ProjectCard key={repo.id} repo={repo} />
        ))}
      </div>
      {projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Button size="lg" variant="outline" className="hover:bg-primary hover:text-primary-foreground">
              <a href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`} target="_blank" rel="noopener noreferrer">
                Ver todos os repositórios no GitHub
              </a>
            </Button>
          </motion.div>
        )}
    </>
  );
};

export default ProjectsDisplay;