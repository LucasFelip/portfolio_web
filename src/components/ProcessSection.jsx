import React from 'react';
import { m } from 'framer-motion';
import { MessagesSquare, FileText, Layers, PackageCheck, Bot, UserCheck, Check } from 'lucide-react';
import { useI18n } from '@/i18n';

const stepIcons = [MessagesSquare, FileText, Layers, PackageCheck];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.5 },
};

const Checklist = ({ items }) => (
  <ul className="space-y-2.5">
    {items.map((item) => (
      <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/85">
        <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-primary-text" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

// Como o trabalho acontece (4 passos) e o papel da IA no desenvolvimento.
const ProcessSection = () => {
  const { t } = useI18n();
  const { process } = t;

  return (
    <section id="processo" className="py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <span className="section-label">{process.label}</span>
        </div>
        <m.h2 {...fadeUp} className="mb-4 text-center text-4xl font-bold md:text-5xl">
          {process.title}
        </m.h2>
        <m.p {...fadeUp} className="mx-auto mb-12 max-w-2xl text-center text-lg text-muted-foreground">
          {process.subtitle}
        </m.p>

        <ol className="relative grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <li aria-hidden="true" className="absolute left-[12.5%] right-[12.5%] top-[3.4rem] hidden h-px bg-border lg:block" />
          {process.steps.map((step, index) => {
            const Icon = stepIcons[index];
            return (
              <m.li
                key={step.title}
                {...fadeUp}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="dashboard-card relative flex h-full flex-col !bg-card"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-md border border-primary/30 bg-card text-primary-text">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </m.li>
            );
          })}
        </ol>

        <m.div
          {...fadeUp}
          className="mt-12 overflow-hidden rounded-lg border border-primary/30 bg-card/60 shadow-2xl shadow-black/40 backdrop-blur-sm"
        >
          <div className="flex items-center gap-1.5 border-b border-border bg-black/20 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
            <span className="ml-3 font-mono text-xs text-muted-foreground">{process.ai.file}</span>
          </div>
          <div className="p-6 md:p-10">
            <h3 className="mb-2 text-2xl font-bold md:text-3xl">{process.ai.title}</h3>
            <p className="mb-8 max-w-2xl text-muted-foreground">{process.ai.subtitle}</p>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-border bg-background/40 p-5">
                <div className="mb-4 flex items-center gap-2.5">
                  <Bot aria-hidden="true" className="h-5 w-5 text-primary-text" />
                  <h4 className="font-mono text-sm uppercase tracking-wide text-foreground">{process.ai.helps.title}</h4>
                </div>
                <Checklist items={process.ai.helps.items} />
              </div>
              <div className="rounded-lg border border-border bg-background/40 p-5">
                <div className="mb-4 flex items-center gap-2.5">
                  <UserCheck aria-hidden="true" className="h-5 w-5 text-primary-text" />
                  <h4 className="font-mono text-sm uppercase tracking-wide text-foreground">{process.ai.mine.title}</h4>
                </div>
                <Checklist items={process.ai.mine.items} />
              </div>
            </div>
            <p className="mt-6 font-mono text-xs text-muted-foreground">
              <span className="text-primary-text">$ </span>
              {process.ai.note}
            </p>
          </div>
        </m.div>
      </div>
    </section>
  );
};

export default ProcessSection;
