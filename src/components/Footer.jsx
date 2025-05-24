import React from 'react';
import { motion } from 'framer-motion';
import { Home, Briefcase, Mail, Github } from 'lucide-react';

const navItems = [
  { id: 'principal', label: 'Principal', icon: Home },
  { id: 'experiencias', label: 'Experiências', icon: Briefcase },
  { id: 'projetos', label: 'Projetos', icon: Github },
  { id: 'contatos', label: 'Contatos', icon: Mail },
];

const Footer = () => {
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
      <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="py-12 mt-16 border-t border-border/20"
      >
        <div className="container mx-auto px-4 flex flex-col items-center">
          <nav className="flex items-center space-x-1 rounded-xl p-2 mb-6 shadow-2xl bg-background border border-border/30">
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
                            layoutId="active-nav-item-footer"
                            className="absolute inset-0 bg-primary rounded-lg z-0"
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                    )}
                    <Icon className={`w-4 h-4 z-10 ${isActive ? 'text-primary-foreground' : ''}`} />
                    {/* Alteração para ocultar o texto em mobile */}
                    <span className="z-10 hidden md:inline">{item.label}</span>
                  </motion.button>
              );
            })}
          </nav>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Lucas Ferreira. Todos os direitos reservados.
          </p>
        </div>
      </motion.footer>
  );
};

export default Footer;