import React, { useMemo, useState } from 'react';
import { Award, Briefcase, ChevronDown, ExternalLink, FlaskConical, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Detail, period } from '@/components/journey/JourneyDetail';
import { defaultItemId, timelineItems, timelineLanes } from '@/data/timeline';
import { useI18n } from '@/i18n';

const LATTES_URL = 'https://lattes.cnpq.br/1631585272117041';
const ORCID_URL = 'https://orcid.org/0009-0000-8662-9675';

const laneIcons = { work: Briefcase, research: FlaskConical, education: GraduationCap, courses: Award };

// Linha secundária de cada item na lista (cargo, natureza, curso ou resumo dos certificados).
function subtitleOf(item, t, tr) {
  if (item.lane === 'work') return tr(item.source.cargo);
  if (item.lane === 'research') return tr(item.source.natureza);
  if (item.lane === 'education') return t.about.education[item.educationIndex].degree;
  const hours = item.source.entries.reduce((sum, entry) => sum + entry.hours, 0);
  const count = item.source.entries.length;
  return `${count} ${t.journey.certificates(count)} · ${String(hours).replace('.', ',')} h`;
}

// Versão da Trajetória para telas estreitas: o gráfico de barras exigiria rolagem horizontal e esconderia o que
// é mais recente. Aqui é uma linha do tempo vertical, do mais recente ao mais antigo, com filtro por tipo e
// os detalhes abrindo no próprio item.
const JourneyList = () => {
  const { t, tr, lang } = useI18n();
  const [filter, setFilter] = useState('all');
  const [openId, setOpenId] = useState(defaultItemId);

  const items = useMemo(
    () =>
      timelineItems
        .filter((item) => filter === 'all' || item.lane === filter)
        .slice()
        .sort((a, b) => b.start - a.start || (b.end ?? Infinity) - (a.end ?? Infinity)),
    [filter],
  );

  const toggle = (id) => {
    const closing = id === openId;
    setOpenId(closing ? null : id);
    if (!closing) {
      // Deixa a animação assentar e mantém o título do item visível abaixo do menu fixo.
      window.setTimeout(() => document.getElementById(`journey-item-${id}`)?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }), 200);
    }
  };

  const filters = ['all', ...timelineLanes];

  return (
    <div>
      <div role="group" aria-label={t.journey.filterLabel} className="flex flex-wrap justify-center gap-2">
        {filters.map((name) => (
          <button
            key={name}
            type="button"
            aria-pressed={filter === name}
            onClick={() => setFilter(name)}
            className={`rounded-full border px-3 py-1.5 font-mono text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              filter === name ? 'border-primary-text bg-primary text-primary-foreground' : 'border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            {name === 'all' ? t.journey.all : t.timeline.lanes[name]}
          </button>
        ))}
      </div>

      <ol className="relative mt-4 space-y-3 border-l border-border pl-5">
        {items.map((item) => {
          const Icon = laneIcons[item.lane];
          const isOpen = item.id === openId;
          return (
            <li key={item.id} id={`journey-item-${item.id}`} className="relative scroll-mt-20">
              <span
                aria-hidden="true"
                className={`absolute -left-[1.6rem] top-4 h-2.5 w-2.5 rounded-full border-2 ${
                  isOpen ? 'border-primary-text bg-primary-text' : 'border-primary/60 bg-background'
                }`}
              />
              <div className={`dashboard-card !p-0 overflow-hidden transition-colors ${isOpen ? 'border-primary/50' : ''}`}>
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`journey-panel-${item.id}`}
                  className="flex w-full items-center gap-3 p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-primary/30 bg-primary/10 text-primary-text">
                    <Icon aria-hidden="true" className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-[0.7rem] text-primary-text">{period(item, t.timeline.present)}</span>
                    <span className="line-clamp-2 block font-semibold text-foreground">{tr(item.label)}</span>
                    <span className="block truncate text-xs text-muted-foreground">{subtitleOf(item, t, tr)}</span>
                  </span>
                  <ChevronDown aria-hidden="true" className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div id={`journey-panel-${item.id}`} role="region" aria-label={tr(item.label)} className="border-t border-border p-4" lang={lang}>
                    <Detail item={item} />
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
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
  );
};

export default JourneyList;
