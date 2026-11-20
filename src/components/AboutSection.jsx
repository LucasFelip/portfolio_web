import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Languages } from 'lucide-react';
import { skillGroups } from '@/data/skills';
import { useI18n } from '@/i18n';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5 },
};

const AboutSection = () => {
  const { t, tr } = useI18n();

  return (
    <section id="sobre" className="py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <span className="section-label">{t.about.label}</span>
        </div>
        <motion.h2 {...fadeUp} className="text-4xl md:text-5xl font-bold text-center mb-6">
          {t.about.title}
        </motion.h2>
        <motion.p {...fadeUp} className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
          {t.about.summary}
        </motion.p>

        <div className="grid gap-6 lg:grid-cols-3">
          <motion.div {...fadeUp} className="dashboard-card lg:col-span-2">
            <p className="font-mono text-xs text-muted-foreground mb-4">$ stack --by-category</p>
            <dl className="space-y-4">
              {skillGroups.map((group) => (
                <div key={group.title.pt} className="grid gap-2 sm:grid-cols-[11rem_1fr] sm:items-start">
                  <dt className="font-mono text-xs uppercase tracking-wide text-primary-text pt-0.5">{tr(group.title)}</dt>
                  <dd className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={tr(item)} className="border border-border rounded px-2 py-0.5 text-xs text-foreground/80">
                        {tr(item)}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>

          <div className="flex flex-col gap-6">
            <motion.div {...fadeUp} className="dashboard-card">
              <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-primary-text mb-4">
                <GraduationCap aria-hidden="true" className="w-4 h-4" /> {t.about.educationTitle}
              </h3>
              <ul className="space-y-4">
                {t.about.education.map((edu) => (
                  <li key={edu.school}>
                    <p className="text-sm font-semibold text-foreground">{edu.school}</p>
                    <p className="text-sm text-foreground/80">{edu.degree}</p>
                    <p className="font-mono text-xs text-muted-foreground mt-0.5">{edu.period}</p>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div {...fadeUp} className="dashboard-card">
              <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-primary-text mb-4">
                <Languages aria-hidden="true" className="w-4 h-4" /> {t.about.languagesTitle}
              </h3>
              <ul className="space-y-2">
                {t.about.languages.map((language) => (
                  <li key={language.name} className="text-sm text-foreground/80">
                    <span className="font-semibold text-foreground">{language.name}</span> — {language.level}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
