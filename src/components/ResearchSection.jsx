import React from 'react';
import { motion } from 'framer-motion';
import { FlaskConical } from 'lucide-react';
import { researchProjects } from '@/data/researchProjects';
import { useI18n } from '@/i18n';

const ResearchSection = () => {
  const { t, tr } = useI18n();
  return (
    <section id="pesquisa" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <span className="section-label">{t.research.label}</span>
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-4"
        >
          {t.research.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto"
        >
          {t.research.subtitle}
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {researchProjects.map((proj, index) => (
            <motion.div
              key={proj.titulo.pt}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="dashboard-card h-full flex flex-col hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="w-9 h-9 shrink-0 rounded-md border border-primary/30 bg-primary/10 text-primary flex items-center justify-center">
                  <FlaskConical className="w-4 h-4" />
                </div>
                <span className="font-mono text-[0.65rem] uppercase tracking-wide text-muted-foreground border border-border rounded-full px-2 py-0.5">
                  {tr(proj.natureza)}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-foreground">{tr(proj.titulo)}</h3>
              <p className="font-mono text-xs text-muted-foreground mt-1">{tr(proj.subtitulo)}</p>
              <p className="text-sm text-foreground/80 leading-relaxed mt-3 flex-1">{tr(proj.descricao)}</p>
              <div className="font-mono text-[0.7rem] text-muted-foreground/70 mt-4 pt-3 border-t border-border">
                {proj.periodo} · {tr(proj.papel)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
