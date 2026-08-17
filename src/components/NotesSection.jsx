import React from 'react';
import { motion } from 'framer-motion';
import { notes } from '@/data/notes';

const NotesSection = () => {
  return (
    <section id="notas" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <span className="section-label">06 — Notas</span>
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-4"
        >
          Notas Técnicas
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto"
        >
          Coisas que construí no tempo livre e valem um relato.
        </motion.p>
        <div className="max-w-2xl mx-auto space-y-6">
          {notes.map((nota) => (
            <motion.article
              key={nota.titulo}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="dashboard-card !p-0 overflow-hidden"
            >
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border bg-black/20">
                <span className="w-2.5 h-2.5 rounded-full bg-destructive/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-primary/70" />
                <span className="ml-3 font-mono text-xs text-muted-foreground">nota.md</span>
              </div>
              <div className="p-6 md:p-8">
                <h3 className="text-xl font-semibold text-foreground mb-2">{nota.titulo}</h3>
                <p className="text-sm text-muted-foreground mb-5">{nota.resumo}</p>
                <div className="space-y-3">
                  {nota.corpo.map((paragrafo, i) => (
                    <p key={i} className="text-sm text-foreground/80 leading-relaxed">{paragrafo}</p>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mt-5">
                  {nota.tags.map((tag) => (
                    <span key={tag} className="font-mono text-xs text-muted-foreground border border-border rounded px-2 py-0.5">
                      {tag}
                    </span>
                  ))}
                </div>
                {/* sem link de repositório: o link original é um encurtador da LinkedIn, não o repo real — adicionar aqui quando tiver a URL */}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NotesSection;
