
import React from 'react';
import { motion } from 'framer-motion';
import { Home, Briefcase, Mail, Github } from 'lucide-react';

const navItems = [
  { id: 'principal', label: 'Principal', icon: Home },
  { id: 'experiencias', label: 'Experiências', icon: Briefcase },
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
      <nav className="glassmorphism flex items-center space-x-1 rounded-xl p-2 shadow-2xl">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300
                ${isActive ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isActive && (
                <motion.div
                  layoutId="active-nav-item-header"
                  className="absolute inset-0 bg-primary rounded-lg z-0"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <Icon className={`w-4 h-4 z-10 ${isActive ? 'text-primary-foreground' : ''}`} />
              <span className="z-10 hidden md:inline">{item.label}</span>
            </motion.button>
          );
        })}
      </nav>
    </motion.header>
  );
};

export default Header;
  