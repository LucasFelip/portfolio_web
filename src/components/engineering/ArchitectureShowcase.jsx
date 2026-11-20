import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Network, Cpu, Monitor, ExternalLink, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/i18n';

const REPO_URL = 'https://github.com/LucasFelip/self-stream-deck';
const DEMO_URL = 'https://lucasfelip.github.io/self-stream-deck/';

// Ícones por nó, na ordem de t.architecture.nodes (celular → rede → agente → Windows).
const nodeIcons = [Smartphone, Network, Cpu, Monitor];

// Abaixo desse ponto a demonstração embutida ficaria pequena demais para usar: abre em nova aba.
const MOBILE_QUERY = '(max-width: 639px)';

const ArchitectureShowcase = () => {
  const { t } = useI18n();
  const [selected, setSelected] = useState(2);
  const [demoLoaded, setDemoLoaded] = useState(false);
  const nodes = t.architecture.nodes;
  const current = nodes[selected];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
      className="mt-16"
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-bold">{t.architecture.title}</h3>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">{t.architecture.subtitle}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="dashboard-card min-w-0 lg:col-span-3">
          <p className="font-mono text-xs text-muted-foreground mb-4">$ ssd --architecture</p>
          <div role="group" className="grid gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] sm:items-stretch" aria-label={t.architecture.title}>
            {nodes.map((node, index) => {
              const Icon = nodeIcons[index];
              const isActive = selected === index;
              return (
                <React.Fragment key={node.title}>
                    <button
                      type="button"
                      onClick={() => setSelected(index)}
                      aria-pressed={isActive}
                      className={`flex flex-col items-center gap-1.5 rounded-lg border p-3 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                        isActive
                          ? 'border-primary bg-primary/15 text-foreground'
                          : 'border-border bg-background/40 text-muted-foreground hover:border-primary/50 hover:text-foreground'
                      }`}
                    >
                      <Icon aria-hidden="true" className={`h-6 w-6 ${isActive ? 'text-primary-text' : ''}`} />
                      <span className="text-sm font-semibold">{node.title}</span>
                      <span className="font-mono text-[0.65rem] leading-tight">{node.subtitle}</span>
                    </button>
                  {index < nodes.length - 1 && (
                    <div aria-hidden="true" className="flex items-center justify-center font-mono text-primary-text sm:px-1">
                      <span className="sm:hidden">↓</span>
                      <span className="hidden sm:inline">→</span>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          <div className="mt-5 rounded-md border border-border bg-black/20 p-4" aria-live="polite" aria-atomic="true">
            <p className="font-mono text-xs uppercase tracking-wide text-primary-text mb-2">{current.title}</p>
            <ul className="space-y-2 text-sm text-foreground/80 leading-relaxed">
              {current.details.map((detail) => (
                <li key={detail} className="flex gap-2">
                  <span aria-hidden="true" className="mt-1.5 w-1 h-1 shrink-0 rounded-full bg-primary-text" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">{t.architecture.hint}</p>
          <Button variant="outline" size="sm" asChild className="mt-3">
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
              {t.projects.viewOnGithub} <ExternalLink aria-hidden="true" className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>

        <div className="dashboard-card min-w-0 lg:col-span-2 flex flex-col">
          <p className="font-mono text-xs text-muted-foreground mb-4">$ ssd --demo</p>
          {demoLoaded ? (
            <>
              <iframe
                src={DEMO_URL}
                title={t.architecture.demoFrameTitle}
                referrerPolicy="no-referrer"
                sandbox="allow-scripts allow-same-origin"
                className="h-[34rem] w-full rounded-md border border-border bg-black"
              />
              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 self-start font-mono text-xs text-primary-text hover:underline"
              >
                {t.architecture.openDemo} <ExternalLink aria-hidden="true" className="w-3 h-3" />
              </a>
            </>
          ) : (
            <div className="flex flex-1 min-h-[16rem] flex-col items-center justify-center gap-4 rounded-md border border-dashed border-border bg-black/20 p-6 text-center">
              <p className="text-sm text-muted-foreground max-w-xs">{t.architecture.demoNote}</p>
              <Button
                onClick={() => {
                  if (window.matchMedia(MOBILE_QUERY).matches) {
                    window.open(DEMO_URL, '_blank', 'noopener,noreferrer');
                  } else {
                    setDemoLoaded(true);
                  }
                }}
              >
                <Play aria-hidden="true" className="w-4 h-4 mr-2" />
                <span className="sm:hidden">{t.architecture.openDemo}</span>
                <span className="hidden sm:inline">{t.architecture.loadDemo}</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ArchitectureShowcase;
