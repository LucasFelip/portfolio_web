import React from 'react';
import { motion } from 'framer-motion';
import { Home, Briefcase, Mail, Github, Wrench, FlaskConical } from 'lucide-react';
import changelog from '@/data/changelog.generated.json';
import { navItems, useActiveSection } from '@/hooks/useActiveSection';

const icons = {
  principal: Home,
  experiencias: Briefcase,
  pesquisa: FlaskConical,
  servicos: Wrench,
  projetos: Github,
  contatos: Mail,
};

const Footer = () => {
  const { activeSection, scrollToSection } = useActiveSection();

  return (
      <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="relative overflow-hidden py-12 mt-16 border-t border-border/20"
      >
        <div className="absolute inset-0 bg-grid" />
        <div className="container relative mx-auto px-4 flex flex-col items-center">
          <nav
            aria-label="Navegação do rodapé"
            className="flex items-center gap-1 rounded-lg border border-border bg-card/80 backdrop-blur-md pl-3 pr-1.5 py-1.5 mb-6 shadow-2xl shadow-black/40"
          >
            <div className="hidden xs:flex items-center gap-1.5 pr-3 mr-1 border-r border-border" aria-hidden="true">
              <span className="w-2 h-2 rounded-full bg-destructive/70" />
              <span className="w-2 h-2 rounded-full bg-yellow-500/70" />
              <span className="w-2 h-2 rounded-full bg-primary/70" />
            </div>
            {navItems.map((item) => {
              const Icon = icons[item.id];
              const isActive = activeSection === item.id;
              return (
                  <motion.button
                      key={item.id}
                      type="button"
                      onClick={() => scrollToSection(item.id)}
                      aria-label={item.label}
                      aria-current={isActive ? 'location' : undefined}
                      className={`relative flex items-center space-x-2 px-2 xs:px-3 py-1.5 rounded-md font-mono text-xs uppercase tracking-wide transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                  ${isActive ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                  >
                    {isActive && (
                        <motion.div
                            layoutId="active-nav-item-footer"
                            className="absolute inset-0 bg-primary rounded-md z-0"
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                    )}
                    <Icon aria-hidden="true" className="w-3.5 h-3.5 z-10" />
                    <span className="z-10 hidden md:inline">{item.label}</span>
                  </motion.button>
              );
            })}
          </nav>
          <div className="flex flex-col items-center gap-2 font-mono text-xs text-muted-foreground text-center">
            <p>&copy; {new Date().getFullYear()} Lucas Ferreira. Todos os direitos reservados.</p>
            <p className="flex items-center gap-1.5 text-muted-foreground/70">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> built with React · Vite · Tailwind
            </p>
            {changelog.lastUpdated && (
              <p
                className="text-muted-foreground/50"
                title={changelog.entries.map((e) => `${e.date} — ${e.message}`).join('\n')}
              >
                site atualizado em {changelog.lastUpdated.split('-').reverse().join('/')}
              </p>
            )}
          </div>
        </div>
      </motion.footer>
  );
};

export default Footer;
