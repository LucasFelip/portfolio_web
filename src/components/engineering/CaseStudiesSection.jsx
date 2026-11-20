import React from 'react';
import { motion } from 'framer-motion';
import { caseStudies } from '@/data/caseStudies';
import { useI18n } from '@/i18n';
import ArchitectureShowcase from '@/components/engineering/ArchitectureShowcase';
import KafkaSimulation from '@/components/engineering/KafkaSimulation';
import PipelineSection from '@/components/engineering/PipelineSection';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.5 },
};

const CaseStudiesSection = () => {
  const { t, tr } = useI18n();

  return (
    <section id="engenharia" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <span className="section-label">{t.cases.label}</span>
        </div>
        <motion.h2 {...fadeUp} className="text-4xl md:text-5xl font-bold text-center mb-4">
          {t.cases.title}
        </motion.h2>
        <motion.p {...fadeUp} className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          {t.cases.subtitle}
        </motion.p>

        <div className="grid gap-6 lg:grid-cols-3">
          {caseStudies.map((study, index) => (
            <motion.article
              key={study.id}
              {...fadeUp}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="dashboard-card h-full flex flex-col hover:border-primary/50 transition-colors"
            >
              <p className="font-mono text-xs uppercase tracking-wide text-primary-text">{study.organizacao}</p>
              <h3 className="text-xl font-semibold text-foreground mt-1">{tr(study.titulo)}</h3>

              <p className="font-mono text-[0.7rem] uppercase tracking-wide text-muted-foreground mt-4 mb-1">{t.cases.context}</p>
              <p className="text-sm text-foreground/80 leading-relaxed">{tr(study.contexto)}</p>

              <p className="font-mono text-[0.7rem] uppercase tracking-wide text-muted-foreground mt-4 mb-1">{t.cases.actions}</p>
              <ul className="space-y-2 text-sm text-foreground/80 leading-relaxed flex-1">
                {tr(study.acoes).map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden="true" className="mt-1.5 w-1 h-1 shrink-0 rounded-full bg-primary-text" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 rounded-md border border-primary/30 bg-primary/10 p-3">
                <p className="font-mono text-[0.7rem] uppercase tracking-wide text-muted-foreground">{t.cases.result}</p>
                <p className="font-mono text-lg text-primary-text">{tr(study.resultado.metrica)}</p>
                <p className="text-xs text-foreground/80">{tr(study.resultado.descricao)}</p>
              </div>

              <ul className="mt-4 flex flex-wrap gap-2" aria-label={t.projects.tagsLabel}>
                {study.stack.map((tech) => (
                  <li key={tech} className="border border-border rounded px-2 py-0.5 font-mono text-[0.7rem] text-foreground/80">
                    {tech}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        <ArchitectureShowcase />
        <KafkaSimulation />
        <PipelineSection />
      </div>
    </section>
  );
};

export default CaseStudiesSection;
