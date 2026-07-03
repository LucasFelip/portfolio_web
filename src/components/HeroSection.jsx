
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const statusItems = [
  'Em produção @ Pulse - Grupo Mateus',
  'Pesquisa voluntária @ LSDI-UFMA',
];

const stack = ['Java', 'Spring', 'Angular', 'Flutter', 'Docker', 'Azure', 'Go'];

const HeroSection = () => {
  const name = "Lucas Ferreira";
  const title = "Engenheiro de Software";
  const bio = "Engenheiro de software especializado em Java e sistemas backend, com experiência em arquitetura de software, sistemas distribuídos e um leque amplo de outras tecnologias. Formação técnica em Redes de Computadores e bacharelado em Sistemas de Informação. Minha trajetória é marcada pela busca contínua por aprendizado, inovação e pelo desejo de contribuir com soluções tecnológicas que impactem positivamente pessoas e organizações.";

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="principal" className="relative min-h-screen flex items-center justify-center py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid" />
      <div className="container relative mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground border border-border rounded-full px-4 py-1.5 mb-6"
          >
            <span className="text-primary">●</span> engenheiro_software --backend
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-4xl xs:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-foreground"
          >
            {name}
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="text-xl xs:text-2xl md:text-3xl text-primary mb-6 xs:mb-8"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            className="max-w-xl mx-auto md:mx-0 text-base xs:text-lg md:text-xl"
          >
            {bio}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
            className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-8 xs:mt-10"
          >
            <Button size="lg" onClick={() => scrollToSection('projetos')}>
              Ver projetos
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollToSection('contatos')}>
              Contato
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="flex flex-col gap-4"
        >
          <div className="rounded-lg border border-border bg-card/60 backdrop-blur-sm overflow-hidden font-mono text-sm shadow-2xl shadow-black/40">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border bg-black/20">
              <span className="w-2.5 h-2.5 rounded-full bg-destructive/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-primary/70" />
              <span className="ml-3 text-xs text-muted-foreground">lucas@portfolio — zsh</span>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <p className="text-muted-foreground">$ status --current</p>
                <ul className="mt-2 space-y-1.5">
                  {statusItems.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-foreground/90">
                      <span className="text-primary animate-pulse">●</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-muted-foreground">$ stack --list</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {stack.map((tech) => (
                    <span
                      key={tech}
                      className="border border-border rounded px-2 py-0.5 text-xs text-foreground/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-foreground/90">$ <span className="blink-cursor" /></p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
  