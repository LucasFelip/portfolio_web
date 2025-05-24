
import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const name = "Lucas Ferreira";
  const title = "Desenvolvedor Java";
  const bio = "Sou Lucas Ferreira, desenvolvedor especializado em Java com foco no backend, mas com conhecimento em diversas outras linguagens e tecnologias. Possuo formação técnica em Redes de Computadores, bacharelado em Sistemas de Informação e atualmente sou mestrando em Ciência da Computação. Minha trajetória é marcada pela busca contínua por aprendizado, inovação e pelo desejo de contribuir com soluções tecnológicas que impactem positivamente pessoas e organizações.";

  return (
    <section id="principal" className="min-h-screen flex items-center justify-center py-20 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-4xl xs:text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-400 to-sky-300">
            {name}
          </span>
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="text-xl xs:text-2xl md:text-3xl text-muted-foreground mb-6 xs:mb-8"
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-base xs:text-lg md:text-xl px-4 xs:px-0"
        >
          {bio}
        </motion.p>
      </div>
    </section>
  );
};

export default HeroSection;
  