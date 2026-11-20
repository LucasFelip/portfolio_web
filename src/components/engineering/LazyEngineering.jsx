import React, { Suspense, forwardRef, lazy, useEffect, useRef, useState } from 'react';

// Estudos de caso, diagrama e pipeline ficam bem abaixo da dobra. O código só é baixado e montado depois que o
// visitante interage (rola, toca ou usa o teclado) e chega perto da seção. Nada é carregado em tempo ocioso nem
// só pela posição: esse trabalho cairia depois da primeira pintura e entraria na conta do tempo de bloqueio da
// página (TBT), sem benefício para quem não rola até aqui. Em telas pequenas a seção já estaria "perto" no início.
const load = () => import('@/components/engineering/CaseStudiesSection');
const CaseStudiesSection = lazy(load);

// Espaço reservado com o mesmo id (menu e `goto` continuam funcionando) e altura próxima da real (medida em
// 375 px e ~1000 px de largura), para a página não "pular" quando o conteúdo entrar.
const Placeholder = forwardRef(function Placeholder(_, ref) {
  return <section id="engenharia" ref={ref} aria-hidden="true" className="min-h-[368rem] md:min-h-[247rem]" />;
});

const INTERACTION_EVENTS = ['scroll', 'pointerdown', 'touchstart', 'keydown', 'wheel'];

const LazyEngineering = () => {
  const [wanted, setWanted] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const sentinelRef = useRef(null);

  // Só começa a observar depois da primeira interação do visitante.
  useEffect(() => {
    if (interacted) return undefined;
    const onInteract = () => setInteracted(true);
    INTERACTION_EVENTS.forEach((name) => window.addEventListener(name, onInteract, { passive: true, once: true }));
    return () => INTERACTION_EVENTS.forEach((name) => window.removeEventListener(name, onInteract));
  }, [interacted]);

  useEffect(() => {
    const element = sentinelRef.current;
    if (wanted || !interacted || !element) return undefined;
    if (!('IntersectionObserver' in window)) {
      setWanted(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWanted(true);
          load(); // começa o download já; o React usa o mesmo módulo
          observer.disconnect();
        }
      },
      { rootMargin: '1500px 0px' },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [wanted, interacted]);

  if (!wanted) return <Placeholder ref={sentinelRef} />;
  return (
    <Suspense fallback={<Placeholder />}>
      <CaseStudiesSection />
    </Suspense>
  );
};

export default LazyEngineering;
