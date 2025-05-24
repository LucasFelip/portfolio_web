import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, Star, GitFork, ExternalLink, ThumbsUp } from 'lucide-react';

const ProjectCard = ({ repo }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5 }}
  >
    <Card className="h-full flex flex-col bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/50">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <Github className="w-5 h-5 mr-2 text-primary" />
          {repo.name}
        </CardTitle>
        <CardDescription className="text-sm h-16 overflow-hidden text-ellipsis">
          {repo.description || 'Sem descrição disponível.'}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-2">
          {repo.primaryLanguage && repo.primaryLanguage.name && (
            <span className="flex items-center">
              <span style={{ backgroundColor: repo.primaryLanguage.color || '#ccc' }} className="w-2 h-2 rounded-full mr-1.5"></span>
              {repo.primaryLanguage.name}
            </span>
          )}
          <span className="flex items-center">
            <Star className="w-3 h-3 mr-1 text-yellow-400" /> {repo.stargazerCount || repo.stargazers_count || 0}
          </span>
          <span className="flex items-center">
            <GitFork className="w-3 h-3 mr-1 text-green-400" /> {repo.forkCount || repo.forks_count || 0}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Última atualização: {new Date(repo.pushedAt || repo.pushed_at).toLocaleDateString('pt-BR')}
        </p>
        {repo.isPinned && (
          <div className="mt-2 flex items-center text-xs text-amber-400">
            <ThumbsUp className="w-3 h-3 mr-1" />
            <span>Fixado</span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" asChild className="w-full hover:bg-primary/10 hover:text-primary">
          <a href={repo.url || repo.html_url} target="_blank" rel="noopener noreferrer">
            Ver no GitHub <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  </motion.div>
);

export default ProjectCard;