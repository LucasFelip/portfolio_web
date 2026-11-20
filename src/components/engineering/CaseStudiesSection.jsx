import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
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

// Em telas largas o cartão mostra tudo; em telas estreitas, só título e resultado, com botão para os detalhes
// (os três cartões empilhados deixavam a seção enorme no celular).
const CaseCard = ({ study, index, collapsible }) => {
  const { t, tr } = useI18n();
  const [open, setOpen] = useState(false);
  const showBody = !collapsible || open;

  const result = (
    <div className="mt-5 rounded-md border border-primary/30 bg-primary/10 p-3">
      <p className="font-mono text-[0.7rem] uppercase tracking-wide text-muted-foreground">{t.cases.result}</p>
      <p className="font-mono text-lg text-primary-text">{tr(study.resultado.metrica)}</p>
      <p className="text-xs text-foreground/80">{tr(study.resultado.descricao)}</p>
    </div>
  );

  return (
    <motion.article
      {...fadeUp}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="dashboard-card h-full flex flex-col hover:border-primary/50 transition-colors"
    >
      <p className="font-mono text-xs uppercase tracking-wide text-primary-text">{study.organizacao}</p>
      <h3 className="text-xl font-semibold text-foreground mt-1">{tr(study.titulo)}</h3>

      {collapsible && result}
      {collapsible && (
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={`case-${study.id}`}
          className="mt-3 inline-flex items-center gap-1.5 self-start font-mono text-xs text-primary-text hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {open ? t.cases.hideDetails : t.cases.showDetails}
          <ChevronDown aria-hidden="true" className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      )}

      {showBody && (
        <div id={`case-${study.id}`} className="flex flex-1 flex-col">
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

          {!collapsible && result}

          <ul className="mt-4 flex flex-wrap gap-2" aria-label={t.projects.tagsLabel}>
            {study.stack.map((tech) => (
              <li key={tech} className="border border-border rounded px-2 py-0.5 font-mono text-[0.7rem] text-foreground/80">
                {tech}
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.article>
  );
};

const CaseStudiesSection = () => {
  const { t } = useI18n();
  const isWide = useMediaQuery('(min-width: 1024px)');

  return (
    <section id="engenharia" className="py-12 md:py-24">
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
            <CaseCard key={study.id} study={study} index={index} collapsible={!isWide} />
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
