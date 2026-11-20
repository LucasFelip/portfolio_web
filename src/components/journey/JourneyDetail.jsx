import React from 'react';
import { Award, ExternalLink, MapPin, CalendarDays, GraduationCap } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { nomeDoMes, tempoDesde } from '@/lib/dateUtils';
import { useI18n } from '@/i18n';

// Texto do período de um item (ex.: 2023–2025, 2024 ou 2025–atual).
export const period = (item, present) =>
  item.endLabel === item.startLabel ? `${item.startLabel}` : `${item.startLabel}–${item.endLabel ?? present}`;

export const Chip = ({ children }) => (
  <span className="rounded border border-border px-2 py-0.5 font-mono text-[0.7rem] text-foreground/80">{children}</span>
);

// Painel com os detalhes do período selecionado: trabalho, pesquisa/extensão ou formação.
export const Detail = ({ item }) => {
  const { t, tr, lang } = useI18n();
  const locale = lang === 'pt' ? 'pt-BR' : 'en-GB';
  const formatHours = (hours) => `${String(hours).replace('.', lang === 'pt' ? ',' : '.')} h`;
  const formatMonth = (iso) => new Date(`${iso}T12:00:00`).toLocaleDateString(locale, { month: 'short', year: 'numeric' });

  if (item.lane === 'work') {
    const exp = item.source;
    const current = !exp.terminoAno;
    const start = `${nomeDoMes(exp.inicioMes, t.months)} ${exp.inicioAno}`;
    const when = current
      ? `${start} — ${t.experience.present} · ${tempoDesde(exp.inicioMes, exp.inicioAno, t.time)}`
      : `${start} — ${nomeDoMes(exp.terminoMes, t.months)} ${exp.terminoAno}`;
    return (
      <div className="flex gap-4">
        <Avatar className="h-10 w-10 shrink-0 sm:h-14 sm:w-14">
          <AvatarImage src={exp.imagemLink} alt="" />
          <AvatarFallback className="bg-primary/20 text-primary-text">{exp.instituicao.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <h3 className="text-xl font-semibold text-foreground">{tr(exp.cargo)}</h3>
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
      </div>
    );
  }

  if (item.lane === 'research') {
    const project = item.source;
    return (
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-xl font-semibold text-foreground">{tr(project.titulo)}</h3>
          <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wide text-muted-foreground">
            {tr(project.natureza)}
          </span>
        </div>
        <p className="mt-1 font-mono text-xs text-muted-foreground">{tr(project.subtitulo)}</p>
        <p className="mt-4 text-sm leading-relaxed text-foreground/80">{tr(project.descricao)}</p>
        <p className="mt-4 flex items-center gap-1 font-mono text-xs text-muted-foreground">
          <CalendarDays aria-hidden="true" className="h-3 w-3" /> {[project.periodo, project.papel && tr(project.papel)].filter(Boolean).join(' · ')}
        </p>
        {project.links?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.links.map((link) => (
              <Button key={link.href} size="sm" variant="outline" asChild>
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {tr(link.label)} <ExternalLink aria-hidden="true" className="ml-2 h-4 w-4" />
                </a>
              </Button>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (item.lane === 'courses') {
    const group = item.source;
    const totalHours = group.entries.reduce((sum, entry) => sum + entry.hours, 0);
    const dates = group.entries.map((entry) => entry.date).sort();
    const first = formatMonth(dates[0]);
    const last = formatMonth(dates.at(-1));
    // Quando cada certificado já traz o próprio período (ex.: semestre letivo), o resumo não repete a data de emissão.
    const allHavePeriodLabel = group.entries.every((entry) => entry.periodLabel);
    return (
      <div>
        <h3 className="flex items-center gap-2 text-xl font-semibold text-foreground">
          <Award aria-hidden="true" className="h-5 w-5 shrink-0 text-primary-text" /> {tr(group.label)}
        </h3>
        <p className="mt-1 font-mono text-xs text-muted-foreground">
          {group.institution} · {group.entries.length} {t.journey.certificates(group.entries.length)} · {formatHours(totalHours)}
          {allHavePeriodLabel ? '' : first === last ? ` · ${first}` : ` · ${first} — ${last}`}
        </p>
        <ul className="mt-4 divide-y divide-border text-sm">
          {group.entries.map((entry) => (
            <li key={entry.title} className="flex flex-col gap-0.5 py-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
              <span className="text-foreground/90">{entry.title}</span>
              <span className="shrink-0 font-mono text-xs text-muted-foreground">
                {formatHours(entry.hours)} · {entry.periodLabel ? tr(entry.periodLabel) : formatMonth(entry.date)}
              </span>
            </li>
          ))}
        </ul>
        {group.formacoes?.length > 0 && (
          <div className="mt-4">
            <p className="font-mono text-[0.7rem] uppercase tracking-wide text-muted-foreground">{t.journey.tracks}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {group.formacoes.map((track) => (
                <Chip key={tr(track)}>{tr(track)}</Chip>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  const edu = t.about.education[item.educationIndex];
  return (
    <div>
      <h3 className="flex items-center gap-2 text-xl font-semibold text-foreground">
        <GraduationCap aria-hidden="true" className="h-5 w-5 text-primary-text" /> {edu.school}
      </h3>
      <p className="mt-1 text-foreground/80">{edu.degree}</p>
      <p className="mt-3 flex items-center gap-1 font-mono text-xs text-muted-foreground">
        <CalendarDays aria-hidden="true" className="h-3 w-3" /> {edu.period}
      </p>
    </div>
  );
};
