import React from 'react';
import { motion } from 'framer-motion';
import { Award, CalendarDays, ExternalLink, FlaskConical, GraduationCap, MapPin } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { experiencesData } from '@/data/experiences';
import { researchProjects } from '@/data/researchProjects';
import { certificationGroups } from '@/data/certifications';
import { nomeDoMes, tempoDesde } from '@/lib/dateUtils';
import { useI18n } from '@/i18n';

const LATTES_URL = 'https://lattes.cnpq.br/1631585272117041';
const ORCID_URL = 'https://orcid.org/0009-0000-8662-9675';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.5 },
};

const Chip = ({ children }) => (
  <span className="rounded border border-border px-2 py-0.5 font-mono text-[0.7rem] text-foreground/80">{children}</span>
);

// Anos citados no período ("2024 — 2025" → [2024, 2025]); usado só para ordenar do mais recente ao mais antigo.
const yearsOf = (periodo) => periodo.match(/\d{4}/g).map(Number);

const WorkItem = ({ exp }) => {
  const { t, tr } = useI18n();
  const current = !exp.terminoAno;
  const start = `${nomeDoMes(exp.inicioMes, t.months)} ${exp.inicioAno}`;
  const when = current
    ? `${start} — ${t.experience.present} · ${tempoDesde(exp.inicioMes, exp.inicioAno, t.time)}`
    : `${start} — ${nomeDoMes(exp.terminoMes, t.months)} ${exp.terminoAno}`;

  return (
    <motion.li {...fadeUp} className="relative">
      <span
        aria-hidden="true"
        className={`absolute -left-[1.65rem] top-6 h-3 w-3 rounded-full border-2 ${
          current ? 'border-primary-text bg-primary-text' : 'border-primary/60 bg-background'
        }`}
      />
      <div className="dashboard-card">
        <div className="flex gap-4">
          <Avatar className="h-12 w-12 shrink-0">
            <AvatarImage src={exp.imagemLink} alt="" />
            <AvatarFallback className="bg-primary/20 text-primary-text">{exp.instituicao.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <h4 className="text-lg font-semibold text-foreground">{tr(exp.cargo)}</h4>
              {current && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wide text-primary-text">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary-text" /> {t.experience.current}
                </span>
              )}
            </div>
            <a href={exp.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-primary-text hover:underline">
              {exp.instituicao} <ExternalLink aria-hidden="true" className="ml-1.5 h-3 w-3" />
            </a>
            <div className="mt-2 flex flex-col gap-1 font-mono text-xs text-muted-foreground sm:flex-row sm:gap-4">
              <span className="flex items-center gap-1"><MapPin aria-hidden="true" className="h-3 w-3" /> {exp.localizacao}</span>
              <span className="flex items-center gap-1"><CalendarDays aria-hidden="true" className="h-3 w-3" /> {when}</span>
            </div>
          </div>
        </div>

        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-foreground/80">
          {tr(exp.destaques).map((text) => (
            <li key={text} className="flex gap-2">
              <span aria-hidden="true" className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary-text" />
              <span>{text}</span>
            </li>
          ))}
        </ul>
        {exp.tecnologias?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {exp.tecnologias.map((tech) => (
              <Chip key={tr(tech)}>{tr(tech)}</Chip>
            ))}
          </div>
        )}
      </div>
    </motion.li>
  );
};

const ResearchItem = ({ project }) => {
  const { tr } = useI18n();
  return (
    <motion.li {...fadeUp} className="dashboard-card flex flex-col">
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-primary/30 bg-primary/10 text-primary-text">
          <FlaskConical aria-hidden="true" className="h-4 w-4" />
        </span>
        <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wide text-muted-foreground">
          {tr(project.natureza)}
        </span>
      </div>
      <h4 className="mt-3 text-base font-semibold text-foreground">{tr(project.titulo)}</h4>
      <p className="mt-1 font-mono text-xs text-muted-foreground">{tr(project.subtitulo)}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/80">{tr(project.descricao)}</p>
      {project.links?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {project.links.map((link) => (
            <Button key={link.href} size="sm" variant="outline" asChild>
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {tr(link.label)} <ExternalLink aria-hidden="true" className="ml-2 h-4 w-4" />
              </a>
            </Button>
          ))}
        </div>
      )}
      <p className="mt-4 border-t border-border pt-3 font-mono text-[0.7rem] text-muted-foreground">
        {[project.periodo, project.papel && tr(project.papel)].filter(Boolean).join(' · ')}
      </p>
    </motion.li>
  );
};

const JourneySection = () => {
  const { t, tr, lang } = useI18n();

  const research = researchProjects
    .slice()
    .sort((a, b) => Math.max(...yearsOf(b.periodo)) - Math.max(...yearsOf(a.periodo)) || yearsOf(b.periodo)[0] - yearsOf(a.periodo)[0]);

  const certificates = certificationGroups.reduce((sum, group) => sum + group.entries.length, 0);
  const hours = certificationGroups.reduce((sum, group) => sum + group.entries.reduce((s, entry) => s + entry.hours, 0), 0);
  const formatHours = (value) => String(value).replace('.', lang === 'pt' ? ',' : '.');

  return (
    <section id="trajetoria" className="py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <span className="section-label">{t.journey.label}</span>
        </div>
        <motion.h2 {...fadeUp} className="mb-4 text-center text-4xl font-bold md:text-5xl">
          {t.journey.title}
        </motion.h2>
        <motion.p {...fadeUp} className="mx-auto mb-12 max-w-2xl text-center text-lg text-muted-foreground">
          {t.journey.subtitle}
        </motion.p>

        <div className="mx-auto max-w-3xl">
          <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-primary-text">{t.journey.work}</h3>
          <ol className="relative space-y-6 border-l border-border pl-6">
            {experiencesData.map((exp) => (
              <WorkItem key={exp.inicioAno + exp.instituicao} exp={exp} />
            ))}
          </ol>
        </div>

        <div className="mt-14">
          <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-primary-text">{t.journey.research}</h3>
          <ul className="grid gap-6 md:grid-cols-2">
            {research.map((project) => (
              <ResearchItem key={project.titulo.pt} project={project} />
            ))}
          </ul>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <motion.div {...fadeUp} className="dashboard-card">
            <h3 className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-primary-text">
              <GraduationCap aria-hidden="true" className="h-4 w-4" /> {t.journey.education}
            </h3>
            <ul className="space-y-4">
              {t.about.education.map((edu) => (
                <li key={edu.school}>
                  <p className="text-sm font-semibold text-foreground">{edu.school}</p>
                  <p className="text-sm text-foreground/80">{edu.degree}</p>
                  <p className="mt-0.5 font-mono text-xs text-muted-foreground">{edu.period}</p>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div {...fadeUp} className="dashboard-card">
            <h3 className="mb-2 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-primary-text">
              <Award aria-hidden="true" className="h-4 w-4" /> {t.journey.courses}
            </h3>
            <p className="mb-4 text-sm text-foreground/80">{t.journey.coursesSummary(certificates, formatHours(hours))}</p>
            <div className="flex flex-wrap gap-2">
              {certificationGroups.map((group) => {
                const groupHours = group.entries.reduce((sum, entry) => sum + entry.hours, 0);
                return (
                  <Chip key={group.id}>
                    {tr(group.label)} · {formatHours(groupHours)} h
                  </Chip>
                );
              })}
            </div>
          </motion.div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button size="sm" variant="outline" asChild>
            <a href={LATTES_URL} target="_blank" rel="noopener noreferrer">
              {t.research.lattes} <ExternalLink aria-hidden="true" className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button size="sm" variant="outline" asChild>
            <a href={ORCID_URL} target="_blank" rel="noopener noreferrer">
              {t.research.orcid} <ExternalLink aria-hidden="true" className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
