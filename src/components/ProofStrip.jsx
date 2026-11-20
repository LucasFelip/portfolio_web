import React from 'react';
import { m } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { experiencesData } from '@/data/experiences';
import { researchProjects } from '@/data/researchProjects';
import { certificationGroups } from '@/data/certifications';
import { useI18n } from '@/i18n';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5 },
};

// Nomes curtos das instituições para a faixa de logos (o nome completo fica no título do link).
const SHORT_NAMES = {
  'Pulse - Grupo Mateus': 'Pulse · Grupo Mateus',
  'LSDI - UFMA': 'LSDI · UFMA',
  'Coreplan Gestão Tecnologia e Serviços': 'Coreplan',
  'Tribunal de Justiça do Maranhão': 'TJMA',
  'Junta Comercial do Estado do Maranhão': 'JUCEMA',
};

const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

// Anos completos desde a primeira experiência (estágios incluídos), calculados dos próprios dados.
function yearsOfExperience() {
  const starts = experiencesData.map((exp) => new Date(Number(exp.inicioAno), MESES.indexOf(exp.inicioMes.toLowerCase()), 1));
  const first = new Date(Math.min(...starts));
  const now = new Date();
  const months = (now.getFullYear() - first.getFullYear()) * 12 + (now.getMonth() - first.getMonth());
  return Math.floor(months / 12);
}

// Faixa de prova logo abaixo do hero: números reais dos dados do site e as instituições onde já atuei.
const ProofStrip = () => {
  const { t } = useI18n();

  const stats = [
    { value: experiencesData.length, label: t.proof.experiences },
    { value: `${yearsOfExperience()}+`, label: t.proof.years },
    { value: certificationGroups.reduce((sum, group) => sum + group.entries.length, 0), label: t.proof.certificates },
    { value: researchProjects.length, label: t.proof.research },
  ];

  return (
    <section aria-label={t.proof.title} className="pb-8 md:pb-12">
      <div className="container mx-auto px-4">
        <m.ul {...fadeUp} className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {stats.map((stat) => (
            <li key={stat.label} className="dashboard-card !py-4 text-center">
              <p className="font-mono text-3xl font-bold text-primary-text md:text-4xl">{stat.value}</p>
              <p className="mt-1 text-xs text-muted-foreground md:text-sm">{stat.label}</p>
            </li>
          ))}
        </m.ul>

        <m.div {...fadeUp} className="mt-8 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">{t.proof.title}</p>
          <ul className="mt-4 flex flex-wrap justify-center gap-x-8 gap-y-4">
            {experiencesData.map((exp) => (
              <li key={exp.instituicao}>
                <a
                  href={exp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={exp.instituicao}
                  className="group flex items-center gap-2.5 rounded-md px-1 py-1 text-sm text-foreground/80 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Avatar className="h-9 w-9 ring-1 ring-border transition-all group-hover:ring-primary/60">
                    <AvatarImage src={exp.imagemLink} alt="" />
                    <AvatarFallback className="bg-primary/20 text-xs text-primary-text">{exp.instituicao.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span>{SHORT_NAMES[exp.instituicao] ?? exp.instituicao}</span>
                  <ExternalLink aria-hidden="true" className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-60 group-focus-visible:opacity-60" />
                </a>
              </li>
            ))}
          </ul>
        </m.div>
      </div>
    </section>
  );
};

export default ProofStrip;
