
import React from 'react';
import { motion } from 'framer-motion';
import { Home, Briefcase, Mail, Github, Wrench } from 'lucide-react';

const navItems = [
  { id: 'principal', label: 'Principal', icon: Home },
  { id: 'experiencias', label: 'Experiências', icon: Briefcase },
  { id: 'servicos', label: 'Serviços', icon: Wrench },
  { id: 'projetos', label: 'Projetos', icon: Github },
  { id: 'contatos', label: 'Contatos', icon: Mail },
];

const Header = () => {
  const [activeSection, setActiveSection] = React.useState('principal');

  const handleScroll = () => {
    const sections = navItems.map(item => document.getElementById(item.id));
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    for (const section of sections) {
      if (section && section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
        setActiveSection(section.id);
        break;
      }
    }
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center py-3"
    >
      <nav className="flex items-center gap-1 rounded-lg border border-border bg-card/80 backdrop-blur-md pl-3 pr-1.5 py-1.5 shadow-2xl shadow-black/40">
        <div className="hidden xs:flex items-center gap-1.5 pr-3 mr-1 border-r border-border">
          <span className="w-2 h-2 rounded-full bg-destructive/70" />
          <span className="w-2 h-2 rounded-full bg-yellow-500/70" />
          <span className="w-2 h-2 rounded-full bg-primary/70" />
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative flex items-center space-x-2 px-3 py-1.5 rounded-md font-mono text-xs uppercase tracking-wide transition-colors duration-300
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
              <Icon className={`w-3.5 h-3.5 z-10 ${isActive ? 'text-primary-foreground' : ''}`} />
              <span className="z-10 hidden md:inline">{item.label}</span>
            </motion.button>
          );
        })}
      </nav>
    </motion.header>
  );
};

export default Header;
  