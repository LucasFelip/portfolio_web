import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { timelineItems, timelineLanes } from '@/data/timeline';
import { useI18n } from '@/i18n';

const ROW_HEIGHT = 30;
const START_YEAR = 2017;

const period = (item, present) =>
  item.endLabel === item.startLabel ? `${item.startLabel}` : `${item.startLabel}–${item.endLabel ?? present}`;

// Distribui as barras de uma faixa em linhas, sem sobreposição.
function packRows(items, endOfTime) {
  const rows = [];
  return items
    .slice()
    .sort((a, b) => a.start - b.start)
    .map((item) => {
      const end = item.end ?? endOfTime;
      let row = rows.findIndex((rowEnd) => rowEnd <= item.start);
      if (row === -1) row = rows.length;
      rows[row] = end;
      return { ...item, end, row };
    });
}

const CareerTimeline = () => {
  const { t, tr } = useI18n();
  const now = new Date();
  const endOfTime = now.getFullYear() + now.getMonth() / 12;
  const lastYear = Math.ceil(endOfTime);
  const span = lastYear - START_YEAR;
  const years = Array.from({ length: span + 1 }, (_, index) => START_YEAR + index);

  const lanes = useMemo(
    () =>
      timelineLanes.map((lane) => {
        const items = packRows(timelineItems.filter((item) => item.lane === lane), endOfTime);
        return { lane, items, rows: Math.max(1, ...items.map((item) => item.row + 1)) };
      }),
    [endOfTime],
  );

  const percent = (year) => `${((year - START_YEAR) / span) * 100}%`;

  const summary = timelineItems
    .map((item) => `${tr(item.label)} (${period(item, t.timeline.present)})`)
    .join('; ');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5 }}
      className="mt-12"
    >
      <h3 className="mb-6 text-center text-2xl font-bold">{t.timeline.title}</h3>
      <div className="dashboard-card overflow-x-auto" tabIndex={0} aria-label={t.timeline.title}>
        <div className="min-w-[44rem]" role="img" aria-label={`${t.timeline.title}: ${summary}`}>
          <div className="relative ml-24 h-6 border-b border-border font-mono text-[0.65rem] text-muted-foreground" aria-hidden="true">
            {years.map((year) => (
              <span key={year} className="absolute -translate-x-1/2" style={{ left: percent(year) }}>
                {year}
              </span>
            ))}
          </div>

          {lanes.map(({ lane, items, rows }) => (
            <div key={lane} className="flex border-b border-border/60 last:border-b-0" aria-hidden="true">
              <p className="w-24 shrink-0 py-3 font-mono text-[0.65rem] uppercase tracking-wide text-primary-text">
                {t.timeline.lanes[lane]}
              </p>
              <div className="relative flex-1" style={{ height: rows * ROW_HEIGHT + 12 }}>
                {years.map((year) => (
                  <span key={year} className="absolute top-0 bottom-0 w-px bg-border/40" style={{ left: percent(year) }} />
                ))}
                {items.map((item) => (
                  <span
                    key={`${lane}-${item.start}-${tr(item.label)}`}
                    title={`${tr(item.label)} · ${period(item, t.timeline.present)}`}
                    className="absolute flex items-center overflow-hidden rounded-sm border border-primary/40 bg-primary/25 px-1.5 font-mono text-[0.6rem] text-foreground"
                    style={{
                      left: percent(item.start),
                      width: `calc(${percent(item.end)} - ${percent(item.start)})`,
                      top: 6 + item.row * ROW_HEIGHT,
                      height: ROW_HEIGHT - 6,
                    }}
                  >
                    <span className="truncate">{tr(item.label)}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CareerTimeline;
