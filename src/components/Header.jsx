import React from 'react';
import { m } from 'framer-motion';
import { Home, User, Briefcase, Mail, Github, Wrench, Download } from 'lucide-react';
import { navItems, useActiveSection } from '@/hooks/useActiveSection';
import { CV_URL } from '@/lib/constants';
import { useI18n } from '@/i18n';
import LanguageToggle from '@/components/LanguageToggle';

const icons = {
  principal: Home,
  sobre: User,
  trajetoria: Briefcase,
  servicos: Wrench,
  projetos: Github,
  contatos: Mail,
};

const Header = () => {
  const { activeSection, scrollToSection } = useActiveSection();
  const { t } = useI18n();

  return (
    <m.header
      initial={false}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center py-3"
    >
      <nav
        aria-label={t.a11y.mainNav}
        className="flex items-center gap-0.5 xs:gap-1 rounded-lg border border-border bg-card/80 backdrop-blur-md pl-1.5 pr-1.5 py-1.5 shadow-2xl shadow-black/40"
      >
        {navItems.map((item) => {
          const Icon = icons[item.id];
          const isActive = activeSection === item.id;
          return (
            <m.button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              aria-label={t.nav[item.id]}
              aria-current={isActive ? 'location' : undefined}
              className={`relative flex items-center space-x-2 px-1.5 xs:px-3 py-1.5 rounded-md font-mono text-xs uppercase tracking-wide transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                ${isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon aria-hidden="true" className="w-3.5 h-3.5 z-10" />
              <span className="z-10 hidden md:inline">{t.nav[item.id]}</span>
            </m.button>
          );
        })}
        <a
          href={CV_URL}
          download
          aria-label={t.cv.aria}
          className="ml-1 flex items-center gap-2 px-1.5 xs:px-3 py-1.5 rounded-md border border-primary/40 font-mono text-xs uppercase tracking-wide text-primary-text transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Download aria-hidden="true" className="w-3.5 h-3.5" />
          <span className="hidden md:inline">{t.cv.short}</span>
        </a>
        <LanguageToggle />
      </nav>
    </m.header>
  );
};

export default Header;
