import React, { Suspense, lazy, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/i18n';

// A simulação só é carregada (e seus timers só rodam) quando o visitante clica em iniciar.
const KafkaPlayground = lazy(() => import('@/components/engineering/KafkaPlayground'));

const REPOS = [
  { name: 'kafka-docker', href: 'https://github.com/LucasFelip/kafka-docker', key: 'docker' },
  { name: 'zookeeper-demo', href: 'https://github.com/LucasFelip/zookeeper-demo', key: 'zookeeper' },
];

const KafkaSimulation = () => {
  const { t } = useI18n();
  const [started, setStarted] = useState(false);
  const sim = t.sim;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
      className="mt-16"
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-bold">{sim.title}</h3>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">{sim.subtitle}</p>
        <p className="text-sm text-foreground/80 mt-3 max-w-2xl mx-auto">{sim.experience}</p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {REPOS.map((repo) => (
            <Button key={repo.name} size="sm" variant="outline" asChild>
              <a href={repo.href} target="_blank" rel="noopener noreferrer">
                {sim.repos[repo.key]} <ExternalLink aria-hidden="true" className="ml-2 h-4 w-4" />
              </a>
            </Button>
          ))}
        </div>
      </div>

      {started ? (
        <Suspense fallback={<div className="dashboard-card text-center text-sm text-muted-foreground">{sim.loading}</div>}>
          <KafkaPlayground />
        </Suspense>
      ) : (
        <div className="dashboard-card flex flex-col items-center gap-4 py-10 text-center">
          <p className="max-w-md text-sm text-muted-foreground">{sim.startHint}</p>
          <Button onClick={() => setStarted(true)}>
            <Play aria-hidden="true" className="mr-2 h-4 w-4" /> {sim.start}
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default KafkaSimulation;
