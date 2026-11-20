import React, { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { chronologicalItems, defaultItemId, timelineItems, timelineLanes } from '@/data/timeline';
import { Detail, period } from '@/components/journey/JourneyDetail';
import JourneyList from '@/components/journey/JourneyList';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useI18n } from '@/i18n';

const LATTES_URL = 'https://lattes.cnpq.br/1631585272117041';
const ORCID_URL = 'https://orcid.org/0009-0000-8662-9675';
const ROW_HEIGHT = 40; // barras com ~34 px de altura: alvo de toque confortável
const START_YEAR = 2017;
const MIN_SPAN = 0.7; // largura mínima visual de uma barra (em anos), para períodos curtos continuarem clicáveis

// Distribui as barras de uma faixa em linhas, sem sobreposição.
function packRows(items, endOfTime) {
  const rows = [];
  return items
    .slice()
    .sort((a, b) => a.start - b.start)
    .map((item) => {
      const end = Math.max(item.end ?? endOfTime, item.start + MIN_SPAN);
      let row = rows.findIndex((rowEnd) => rowEnd <= item.start);
      if (row === -1) row = rows.length;
      rows[row] = end;
      return { ...item, end, row };
    });
}

const JourneySection = () => {
  const { t, tr } = useI18n();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
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
        const items = packRows(timelineItems.filter((item) => item.lane === lane), endOfTime);
        return { lane, items, rows: Math.max(1, ...items.map((item) => item.row + 1)) };
      }),
    [endOfTime],
  );

  const selected = timelineItems.find((item) => item.id === selectedId) ?? timelineItems[0];
  const index = chronologicalItems.findIndex((item) => item.id === selected.id);

  const select = (id, { reveal = false, showDetail = false } = {}) => {
    setSelectedId(id);
    // Em telas pequenas o painel fica abaixo da dobra: traz os detalhes para a vista ao escolher uma barra.
    if (showDetail && window.innerWidth < 1024) {
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

        {isDesktop ? (
          <>
            <div className="dashboard-card overflow-x-auto" ref={scrollerRef}>
              <div className="min-w-[44rem]">
                <div className="relative ml-24 h-6 border-b border-border font-mono text-[0.65rem] text-muted-foreground" aria-hidden="true">
                  {years.map((year) => (
                    <span key={year} className="absolute -translate-x-1/2" style={{ left: percent(year) }}>
                      {year}
                    </span>
                  ))}
                </div>

                {lanes.map(({ lane, items, rows }) => (
                  <div key={lane} className="flex border-b border-border/60 last:border-b-0">
                    <p className="w-24 shrink-0 py-3 font-mono text-[0.65rem] uppercase tracking-wide text-primary-text">{t.timeline.lanes[lane]}</p>
                    <div className="relative flex-1" style={{ height: rows * ROW_HEIGHT + 12 }}>
                      {years.map((year) => (
                        <span key={year} aria-hidden="true" className="absolute bottom-0 top-0 w-px bg-border/40" style={{ left: percent(year) }} />
                      ))}
                      {items.map((item) => {
                        const isSelected = item.id === selected.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            data-item={item.id}
                            onClick={() => select(item.id, { showDetail: true })}
                            aria-pressed={isSelected}
                            aria-label={`${item.barLabel ? `${tr(item.barLabel)}: ` : ''}${tr(item.label)}, ${period(item, t.timeline.present)}`}
                            title={`${tr(item.label)} · ${period(item, t.timeline.present)}`}
                            className={`absolute flex items-center overflow-hidden rounded-sm border px-1.5 text-left font-mono text-[0.6rem] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                              isSelected
                                ? 'border-primary-text bg-primary text-primary-foreground'
                                : 'border-primary/40 bg-primary/25 text-foreground hover:border-primary-text hover:bg-primary/40'
                            }`}
                            style={{
                              left: percent(item.start),
                              width: `calc(${percent(item.end)} - ${percent(item.start)})`,
                              top: 6 + item.row * ROW_HEIGHT,
                              height: ROW_HEIGHT - 6,
                            }}
                          >
                            <span className="truncate">{tr(item.barLabel ?? item.label)}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
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
          </>
        ) : (
          <JourneyList />
        )}
      </div>
    </section>
  );
};

export default JourneySection;
