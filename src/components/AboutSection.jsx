import React from 'react';
import { m } from 'framer-motion';
import { Languages } from 'lucide-react';
import { skillGroups } from '@/data/skills';
import { useI18n } from '@/i18n';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5 },
};

// A formação não aparece aqui: ela já está na Trajetória (faixa "Formação"), e repetir deixava a seção longa.
const AboutSection = () => {
  const { t, tr } = useI18n();

  return (
    <section id="sobre" className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <span className="section-label">{t.about.label}</span>
        </div>
        <m.h2 {...fadeUp} className="text-4xl md:text-5xl font-bold text-center mb-4">
          {t.about.title}
        </m.h2>
        <m.p {...fadeUp} className="text-sm sm:text-base md:text-lg text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
          {t.about.summary}
        </m.p>

        <m.div {...fadeUp} className="dashboard-card mx-auto max-w-4xl">
          <p className="font-mono text-xs text-muted-foreground mb-4">$ stack --by-category</p>
          <dl className="grid gap-x-8 gap-y-4 md:grid-cols-2">
            {skillGroups.map((group) => (
              <div key={group.title.pt}>
                <dt className="font-mono text-[0.7rem] uppercase tracking-wide text-primary-text mb-1.5">{tr(group.title)}</dt>
                <dd className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span key={tr(item)} className="border border-border rounded px-1.5 py-0.5 text-xs text-foreground/80">
                      {tr(item)}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-5 flex flex-wrap items-start gap-x-6 gap-y-2 border-t border-border pt-4 text-sm text-foreground/80">
            <span className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-wide text-primary-text">
              <Languages aria-hidden="true" className="h-4 w-4" /> {t.about.languagesTitle}
            </span>
            <ul className="flex flex-wrap gap-x-6 gap-y-1">
              {t.about.languages.map((language) => (
                <li key={language.name}>
                  <span className="font-semibold text-foreground">{language.name}</span> — {language.level}
                </li>
              ))}
            </ul>
          </div>
        </m.div>
      </div>
    </section>
  );
};

export default AboutSection;
