import React from 'react';
import { motion } from 'framer-motion';
import { Home, Briefcase, Mail, Github, Wrench, FlaskConical, Download } from 'lucide-react';
import { navItems, useActiveSection } from '@/hooks/useActiveSection';
import { CV_URL } from '@/lib/constants';
import { useI18n } from '@/i18n';
import LanguageToggle from '@/components/LanguageToggle';

const icons = {
  principal: Home,
  experiencias: Briefcase,
  pesquisa: FlaskConical,
  servicos: Wrench,
  projetos: Github,
  contatos: Mail,
};

const Header = () => {
  const { activeSection, scrollToSection } = useActiveSection();
  const { t } = useI18n();

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center py-3"
    >
      <nav
        aria-label={t.a11y.mainNav}
        className="flex items-center gap-1 rounded-lg border border-border bg-card/80 backdrop-blur-md pl-3 pr-1.5 py-1.5 shadow-2xl shadow-black/40"
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
              aria-label={t.nav[item.id]}
              aria-current={isActive ? 'location' : undefined}
              className={`relative flex items-center space-x-2 px-2 xs:px-3 py-1.5 rounded-md font-mono text-xs uppercase tracking-wide transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                ${isActive ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isActive && (
                <motion.div
                  layoutId="active-nav-item-header"
                  className="absolute inset-0 bg-primary rounded-md z-0"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <Icon aria-hidden="true" className="w-3.5 h-3.5 z-10" />
              <span className="z-10 hidden md:inline">{t.nav[item.id]}</span>
            </motion.button>
          );
        })}
        <a
          href={CV_URL}
          download
          aria-label={t.cv.aria}
          className="ml-1 flex items-center gap-2 px-2 xs:px-3 py-1.5 rounded-md border border-primary/40 font-mono text-xs uppercase tracking-wide text-primary transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Download aria-hidden="true" className="w-3.5 h-3.5" />
          <span className="hidden md:inline">{t.cv.short}</span>
        </a>
        <LanguageToggle />
      </nav>
    </motion.header>
  );
};

export default Header;
