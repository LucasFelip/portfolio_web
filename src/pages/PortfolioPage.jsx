import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProofStrip from '@/components/ProofStrip';
import ProjectsSection from '@/components/ProjectsSection';
import JourneySection from '@/components/journey/JourneySection';
import ServicesSection from '@/components/ServicesSection';
import ContactSection from '@/components/ContactSection';
import { m, AnimatePresence, MotionConfig, LazyMotion, domAnimation } from 'framer-motion';
import { useI18n } from '@/i18n';
import CaseStudiesSection from '@/components/engineering/CaseStudiesSection';

const PortfolioPage = () => {
  const { t } = useI18n();

  return (
    <LazyMotion features={domAnimation}>
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
        <m.main
          id="conteudo"
          tabIndex={-1}
          initial={false}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-grow"
        >
            <HeroSection />
            <ProofStrip />
            <AboutSection />
            <JourneySection />
            <CaseStudiesSection />
            <ProjectsSection />
            <ServicesSection />
            <ContactSection />
        </m.main>
      </AnimatePresence>
      <Footer />
    </div>
    </MotionConfig>
    </LazyMotion>
  );
};

export default PortfolioPage;