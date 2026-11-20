import { useCallback, useEffect, useState } from 'react';

// Seções navegáveis do site. Fonte única para Header e Footer.
export const navItems = [
  { id: 'principal', label: 'Principal' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'experiencias', label: 'Experiências' },
  { id: 'pesquisa', label: 'Pesquisa' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'contatos', label: 'Contatos' },
];

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}

// Marca como ativa a seção que cruza o meio da janela e expõe scrollToSection.
export function useActiveSection() {
  const [activeSection, setActiveSection] = useState(navItems[0].id);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const position = window.scrollY + window.innerHeight / 2;
      for (const { id } of navItems) {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= position && section.offsetTop + section.offsetHeight > position) {
          setActiveSection(id);
          break;
        }
      }
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const scrollTo = useCallback((id) => {
    scrollToSection(id);
    setActiveSection(id);
  }, []);

  return { activeSection, scrollToSection: scrollTo };
}
