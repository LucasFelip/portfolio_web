import React, { Suspense, lazy, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import JourneySection from '@/components/journey/JourneySection';
import ServicesSection from '@/components/ServicesSection';
import ContactSection from '@/components/ContactSection';
import { Toaster } from '@/components/ui/toaster';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { useI18n } from '@/i18n';
import TerminalLauncher from '@/components/terminal/TerminalLauncher';

// Estudos de caso, diagrama e pipeline ficam abaixo da dobra: carregam à parte, em tempo ocioso.
const loadEngineering = () => import('@/components/engineering/CaseStudiesSection');
const CaseStudiesSection = lazy(loadEngineering);

const PortfolioPage = () => {
  const { t } = useI18n();

  useEffect(() => {
    // Pré-carrega a seção quando o navegador estiver ocioso, para não haver espera ao rolar até ela.
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(loadEngineering, { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(loadEngineering, 1500);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        {t.a11y.skipLink}
      </a>
      <Header />
      <AnimatePresence>
        <motion.main
          id="conteudo"
          tabIndex={-1}
          initial={false}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-grow"
        >
            <HeroSection />
            <AboutSection />
            <JourneySection />
            <Suspense fallback={<section id="engenharia" aria-hidden="true" className="min-h-[100rem]" />}>
              <CaseStudiesSection />
            </Suspense>
            <ProjectsSection />
            <ServicesSection />
            <ContactSection />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <Toaster />
      <TerminalLauncher />
    </div>
    </MotionConfig>
  );
};

export default PortfolioPage;