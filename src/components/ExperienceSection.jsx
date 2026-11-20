
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MapPin, CalendarDays, ExternalLink, ChevronDown } from 'lucide-react';
import { experiencesData } from '@/data/experiences';
import { tempoDesde, nomeDoMes } from '@/lib/dateUtils';
import { useI18n } from '@/i18n';

const MOBILE_VISIBLE_COUNT = 2;

const ExperienceCard = ({ experience, index, isLast }) => {
  const { t, tr } = useI18n();
  const { imagemLink, instituicao, localizacao, inicioMes, inicioAno, terminoMes, terminoAno, cargo, destaques, tecnologias, link } = experience;
  const fallbackText = instituicao.substring(0, 2).toUpperCase();
  const isCurrent = !terminoAno;
  const inicio = `${nomeDoMes(inicioMes, t.months)} ${inicioAno}`;
  const periodo = isCurrent
    ? `${inicio} — ${t.experience.present} · ${tempoDesde(inicioMes, inicioAno, t.time)}`
    : `${inicio} — ${nomeDoMes(terminoMes, t.months)} ${terminoAno}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`relative pl-16 xs:pl-20 ${isLast ? 'pb-0' : 'pb-8'}`}
    >
      <Avatar className="absolute left-0 top-0 h-12 w-12 xs:h-16 xs:w-16 ring-4 ring-background">
        <AvatarImage src={imagemLink} alt={instituicao} />
        <AvatarFallback className="text-lg bg-primary/20 text-primary-text">{fallbackText}</AvatarFallback>
      </Avatar>

      <div className="dashboard-card hover:border-primary/50 transition-colors">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-1">
          <h3 className="text-xl font-semibold text-foreground">{tr(cargo)}</h3>
          {isCurrent && (
            <span className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-wide text-primary-text border border-primary/30 rounded-full px-2 py-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> {t.experience.current}
            </span>
          )}
        </div>
        <a href={link} target="_blank" rel="noopener noreferrer" className="text-primary-text hover:underline inline-flex items-center">
          {instituicao} <ExternalLink className="w-3 h-3 ml-1.5" />
        </a>
        <div className="font-mono text-xs text-muted-foreground mt-2 flex flex-col sm:flex-row sm:gap-4">
          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {localizacao}</span>
          <span className="flex items-center gap-1"><CalendarDays className="w-3 h-3" /> {periodo}</span>
        </div>
        <ul className="mt-3 space-y-2 text-sm text-foreground/80 leading-relaxed">
          {tr(destaques).map((item) => (
            <li key={item} className="flex gap-2">
              <span aria-hidden="true" className="text-primary-text mt-1.5 w-1 h-1 shrink-0 rounded-full bg-current" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        {tecnologias?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tecnologias.map((tech) => (
              <span key={tr(tech)} className="border border-border rounded px-2 py-0.5 font-mono text-[0.7rem] text-foreground/80">
                {tr(tech)}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};


const ExperienceSection = () => {
  const { t } = useI18n();
  const [expanded, setExpanded] = useState(false);
  const hasMore = experiencesData.length > MOBILE_VISIBLE_COUNT;

  return (
    <section id="experiencias" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <span className="section-label">{t.experience.label}</span>
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-4"
        >
          {t.experience.title}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto"
        >
          {t.experience.subtitle}
        </motion.p>
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-6 xs:left-8 top-6 xs:top-8 bottom-6 xs:bottom-8 w-px bg-border" />
          {experiencesData.map((exp, index) => (
            <div
              key={index}
              className={!expanded && index >= MOBILE_VISIBLE_COUNT ? 'hidden md:block' : ''}
            >
              <ExperienceCard experience={exp} index={index} isLast={index === experiencesData.length - 1} />
            </div>
          ))}
        </div>
        {hasMore && (
          <div className="md:hidden text-center mt-6">
            <Button variant="outline" size="sm" onClick={() => setExpanded(!expanded)}>
              {expanded ? t.experience.showLess : t.experience.showMore(experiencesData.length - MOBILE_VISIBLE_COUNT)}
              <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${expanded ? 'rotate-180' : ''}`} />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ExperienceSection;
  