import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import ExperienceSection from '@/components/ExperienceSection';
import ResearchSection from '@/components/ResearchSection';
import ServicesSection from '@/components/ServicesSection';
import ContactSection from '@/components/ContactSection';
import { Toaster } from '@/components/ui/toaster';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { useI18n } from '@/i18n';

const PortfolioPage = () => {
  const { t } = useI18n();
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-grow"
        >
            <HeroSection />
            <AboutSection />
            <ExperienceSection />
            <ResearchSection />
            <ServicesSection />
            <ProjectsSection />
            <ContactSection />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <Toaster />
    </div>
    </MotionConfig>
  );
};

export default PortfolioPage;