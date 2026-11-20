import React from 'react';
import { motion } from 'framer-motion';
import { GitCommit, GitPullRequest, Hammer, Rocket, Activity } from 'lucide-react';
import changelog from '@/data/changelog.generated.json';
import { useI18n } from '@/i18n';

const REPO_URL = 'https://github.com/LucasFelip/portfolio_web';
const icons = [GitCommit, GitPullRequest, Hammer, Rocket, Activity];

// Mostra o caminho real do código deste site até o ar. Os textos descrevem os workflows que existem em
// .github/workflows e o fluxo de deploy do Netlify; os dados de commit vêm do build (generate-changelog.js).
const PipelineSection = () => {
  const { t, lang } = useI18n();
  const last = changelog.entries?.[0];
  const stages = t.pipeline.stages;

  const formatDate = (isoDate) =>
    new Date(`${isoDate}T12:00:00`).toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-GB');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
      className="mt-16"
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-bold">{t.pipeline.title}</h3>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">{t.pipeline.subtitle}</p>
      </div>

      <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {stages.map((stage, index) => {
          const Icon = icons[index];
          return (
            <li key={stage.title} className="dashboard-card flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-md border border-primary/30 bg-primary/10 text-primary-text">
                  <Icon aria-hidden="true" className="h-4 w-4" />
                </span>
                <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
              </div>
              <h4 className="text-base font-semibold text-foreground">{stage.title}</h4>
              <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed">{stage.description}</p>
              <p className="mt-3 border-t border-border pt-3 font-mono text-[0.7rem] text-foreground/80">{stage.detail}</p>
            </li>
          );
        })}
      </ol>

      {last && (
        <p className="mt-4 text-center font-mono text-xs text-muted-foreground">
          {t.pipeline.lastCommit}:{' '}
          <a href={`${REPO_URL}/commit/${last.hash}`} target="_blank" rel="noopener noreferrer" className="text-primary-text hover:underline">
            {last.hash}
          </a>{' '}
          · {formatDate(last.date)} · {last.message}
        </p>
      )}
    </motion.div>
  );
};

export default PipelineSection;
