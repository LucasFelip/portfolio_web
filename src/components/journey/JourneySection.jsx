import React, { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Award, Briefcase, ChevronLeft, ChevronRight, ExternalLink, FlaskConical, MapPin, CalendarDays, GraduationCap } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { chronologicalItems, defaultItemId, timelineItems, timelineLanes } from '@/data/timeline';
import { nomeDoMes, tempoDesde } from '@/lib/dateUtils';
import { useI18n } from '@/i18n';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const LATTES_URL = 'https://lattes.cnpq.br/1631585272117041';
const ORCID_URL = 'https://orcid.org/0009-0000-8662-9675';
const ROW_HEIGHT = 40; // barras com ~34 px de altura: alvo de toque confortável
const START_YEAR = 2017;
const MIN_SPAN = 0.7; // largura mínima visual de uma barra (em anos), para períodos curtos continuarem clicáveis
const MIN_SPAN_COMPACT = 1; // no celular cada ano tem poucos pixels: barras de períodos curtos ficam mais largas

// Ícone e tom de cada faixa: do mais forte (trabalho) ao mais discreto (cursos), todos na paleta verde do site.
const LANE_ICONS = { work: Briefcase, research: FlaskConical, education: GraduationCap, courses: Award };
const LANE_TONE = {
  work: 'border-primary/60 bg-primary/35',
  research: 'border-primary/45 bg-primary/22',
  education: 'border-foreground/25 bg-foreground/10',
  courses: 'border-primary/30 bg-primary/12',
};

const period = (item, present) =>
  item.endLabel === item.startLabel ? `${item.startLabel}` : `${item.startLabel}–${item.endLabel ?? present}`;

// Distribui as barras de uma faixa em linhas, sem sobreposição.
function packRows(items, endOfTime, minSpan) {
  const rows = [];
  return items
    .slice()
    .sort((a, b) => a.start - b.start)
    .map((item) => {
      const end = Math.max(item.end ?? endOfTime, item.start + minSpan);
      let row = rows.findIndex((rowEnd) => rowEnd <= item.start);
      if (row === -1) row = rows.length;
      rows[row] = end;
      return { ...item, end, row, ongoing: item.end == null };
    });
}

const Chip = ({ children }) => (
  <span className="rounded border border-border px-2 py-0.5 font-mono text-[0.7rem] text-foreground/80">{children}</span>
);

// Painel com os detalhes do período selecionado: trabalho, pesquisa/extensão ou formação.
const Detail = ({ item }) => {
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

const JourneySection = () => {
  const { t, tr } = useI18n();
  const compact = !useMediaQuery('(min-width: 768px)'); // celular: tabela compacta, sem rolagem lateral
  const shortNames = !useMediaQuery('(min-width: 1024px)'); // abaixo disso as barras são estreitas demais para nomes longos
  const [selectedId, setSelectedId] = useState(defaultItemId);
  const scrollerRef = useRef(null);
  const detailRef = useRef(null);

  const now = new Date();
  const endOfTime = now.getFullYear() + now.getMonth() / 12;
  const lastYear = Math.ceil(endOfTime);
  const span = lastYear - START_YEAR;
  const years = Array.from({ length: span + 1 }, (_, index) => START_YEAR + index);
  const percent = (year) => `${((year - START_YEAR) / span) * 100}%`;

  const lanes = useMemo(
    () =>
      timelineLanes.map((lane) => {
        const items = packRows(timelineItems.filter((item) => item.lane === lane), endOfTime, compact ? MIN_SPAN_COMPACT : MIN_SPAN);
        return { lane, items, rows: Math.max(1, ...items.map((item) => item.row + 1)) };
      }),
    [endOfTime, compact],
  );
  const labelYears = compact ? years.filter((year) => (year - START_YEAR) % 2 === 0) : years;

  const selected = timelineItems.find((item) => item.id === selectedId) ?? timelineItems[0];
  const index = chronologicalItems.findIndex((item) => item.id === selected.id);

  const select = (id, { reveal = false, showDetail = false } = {}) => {
    setSelectedId(id);
    // Em telas pequenas o painel fica abaixo da dobra: traz os detalhes para a vista ao escolher uma barra.
    if (showDetail && window.innerWidth < 768) {
      window.requestAnimationFrame(() => detailRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }));
    }
    if (reveal) {
      // Em telas estreitas o gráfico rola na horizontal: traz a barra selecionada para a vista.
      window.requestAnimationFrame(() => {
        scrollerRef.current?.querySelector(`[data-item="${CSS.escape(id)}"]`)?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
      });
    }
  };

  return (
    <section id="trajetoria" className="py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <span className="section-label">{t.journey.label}</span>
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-center text-4xl font-bold md:text-5xl"
        >
          {t.journey.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mb-10 max-w-2xl text-center text-lg text-muted-foreground"
        >
          {t.journey.subtitle}
        </motion.p>

        <div className={compact ? 'dashboard-card !p-2' : 'dashboard-card overflow-x-auto'} ref={scrollerRef}>
          <div className={compact ? 'w-full' : 'min-w-[40rem]'}>
            {/* Eixo dos anos, com o marcador de "hoje" */}
            <div className={`relative ${compact ? '' : 'ml-28'} h-8 border-b border-border font-mono text-[0.6rem] text-muted-foreground`} aria-hidden="true">
              {labelYears.map((year, index) => (
                <span
                  key={year}
                  className={`absolute ${index === 0 ? '' : index === labelYears.length - 1 ? '-translate-x-full' : '-translate-x-1/2'}`}
                  style={{ left: percent(year) }}
                >
                  {year}
                </span>
              ))}
              <span
                className="absolute bottom-0.5 -translate-x-1/2 rounded-sm bg-primary px-1 text-[0.5rem] uppercase leading-3 text-primary-foreground"
                style={{ left: percent(endOfTime) }}
              >
                {t.timeline.today}
              </span>
            </div>

            {lanes.map(({ lane, items, rows }) => {
              const LaneIcon = LANE_ICONS[lane];
              const laneActive = selected.lane === lane;
              return (
                <div
                  key={lane}
                  className={`${compact ? '' : 'flex '}border-b border-border/60 transition-colors last:border-b-0 ${laneActive ? 'bg-primary/[0.04]' : ''}`}
                >
                  <p
                    className={`flex items-center gap-1.5 font-mono uppercase transition-colors ${
                      compact ? 'pb-0.5 pt-2 text-[0.55rem]' : 'w-28 shrink-0 self-start py-3 text-[0.65rem] tracking-wide'
                    } ${laneActive ? 'text-primary-text' : 'text-muted-foreground'}`}
                  >
                    <LaneIcon aria-hidden="true" className={compact ? 'h-3 w-3' : 'h-3.5 w-3.5'} />
                    {t.timeline.lanes[lane]}
                  </p>
                  <div className={compact ? 'relative' : 'relative flex-1'} style={{ height: rows * ROW_HEIGHT + 12 }}>
                    {/* faixas alternadas por ano, linhas de ano e a linha de hoje */}
                    {years.slice(0, -1).map((year, yearIndex) =>
                      yearIndex % 2 === 0 ? (
                        <span
                          key={`band-${year}`}
                          aria-hidden="true"
                          className="absolute inset-y-0 bg-foreground/[0.025]"
                          style={{ left: percent(year), width: `calc(${percent(year + 1)} - ${percent(year)})` }}
                        />
                      ) : null,
                    )}
                    {years.map((year) => (
                      <span key={year} aria-hidden="true" className="absolute bottom-0 top-0 w-px bg-border/40" style={{ left: percent(year) }} />
                    ))}
                    <span aria-hidden="true" className="absolute bottom-0 top-0 border-l border-dashed border-primary-text/60" style={{ left: percent(endOfTime) }} />

                    {items.map((item) => {
                      const isSelected = item.id === selected.id;
                      const shown = tr(shortNames ? item.shortLabel ?? item.barLabel ?? item.label : item.barLabel ?? item.label);
                      return (
                        <button
                          key={item.id}
                          type="button"
                          data-item={item.id}
                          onClick={() => select(item.id, { showDetail: true })}
                          aria-pressed={isSelected}
                          aria-label={`${shown === tr(item.label) ? '' : `${shown}: `}${tr(item.label)}, ${period(item, t.timeline.present)}`}
                          title={`${tr(item.label)} · ${period(item, t.timeline.present)}`}
                          className={`absolute flex items-center gap-1 overflow-hidden rounded border ${compact ? 'px-0.5 text-[0.5rem] xs:text-[0.55rem]' : 'px-1.5 text-[0.6rem]'} text-left font-mono transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                            isSelected
                              ? 'z-10 border-primary-text bg-primary text-primary-foreground shadow-[0_0_14px_-4px_hsl(var(--primary))]'
                              : `${LANE_TONE[lane]} text-foreground hover:-translate-y-px hover:border-primary-text hover:bg-primary/50`
                          }`}
                          style={{
                            left: percent(item.start),
                            width: `calc(${percent(item.end)} - ${percent(item.start)})`,
                            top: 6 + item.row * ROW_HEIGHT,
                            height: ROW_HEIGHT - 6,
                          }}
                        >
                          <span className="min-w-0 flex-1 truncate">{shown}</span>
                          {item.ongoing && <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-primary-text" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Anúncio curto para leitores de tela; o painel inteiro não é uma região live. */}
        <p className="sr-only" aria-live="polite">
          {tr(selected.label)}, {period(selected, t.timeline.present)}
        </p>

        <div className="dashboard-card mt-6" ref={detailRef}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <Detail item={selected} />
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                disabled={index <= 0}
                onClick={() => select(chronologicalItems[index - 1].id, { reveal: true })}
              >
                <ChevronLeft aria-hidden="true" className="mr-1 h-4 w-4" /> {t.journey.older}
              </Button>
              <Button
                size="sm"
                variant="outline"
                disabled={index >= chronologicalItems.length - 1}
                onClick={() => select(chronologicalItems[index + 1].id, { reveal: true })}
              >
                {t.journey.newer} <ChevronRight aria-hidden="true" className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="ghost" asChild>
                <a href={LATTES_URL} target="_blank" rel="noopener noreferrer">
                  {t.research.lattes} <ExternalLink aria-hidden="true" className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button size="sm" variant="ghost" asChild>
                <a href={ORCID_URL} target="_blank" rel="noopener noreferrer">
                  {t.research.orcid} <ExternalLink aria-hidden="true" className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
