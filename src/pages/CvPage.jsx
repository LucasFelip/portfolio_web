import React from 'react';
import { ArrowLeft, Printer } from 'lucide-react';
import { useI18n } from '@/i18n';
import LanguageToggle from '@/components/LanguageToggle';
import { skillGroups } from '@/data/skills';
import { experiencesData } from '@/data/experiences';
import { researchProjects } from '@/data/researchProjects';
import { nomeDoMes } from '@/lib/dateUtils';
import { CV_URL, CONTACT } from '@/lib/constants';

// Currículo imprimível gerado a partir dos mesmos dados do site (sem telefone nem endereço).
// Na tela aparece como uma folha clara; ao imprimir (ou salvar em PDF), só a folha é impressa.
const CvPage = () => {
  const { t, tr } = useI18n();

  const period = (exp) => {
    const start = `${nomeDoMes(exp.inicioMes, t.months)} ${exp.inicioAno}`;
    const end = exp.terminoAno ? `${nomeDoMes(exp.terminoMes, t.months)} ${exp.terminoAno}` : t.experience.present;
    return `${start} — ${end}`;
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8 print:bg-white print:p-0">
      <div className="mx-auto mb-6 flex max-w-3xl flex-wrap items-center justify-between gap-3 print:hidden">
        <a href="/" className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-foreground">
          <ArrowLeft aria-hidden="true" className="h-4 w-4" /> {t.cvPage.back}
        </a>
        <div className="flex items-center gap-2">
          <LanguageToggle className="rounded-md border border-border" />
          <a
            href={CV_URL}
            download
            className="rounded-md border border-border px-3 py-1.5 font-mono text-xs text-muted-foreground hover:border-primary hover:text-primary-text"
          >
            {t.cv.download}
          </a>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-1.5 font-mono text-xs text-primary-foreground hover:bg-primary/90"
          >
            <Printer aria-hidden="true" className="h-4 w-4" /> {t.cvPage.print}
          </button>
        </div>
      </div>

      <main className="mx-auto max-w-3xl rounded-md bg-white p-8 text-neutral-900 shadow-2xl shadow-black/40 print:max-w-none print:rounded-none print:p-0 print:shadow-none md:p-12">
        <header className="border-b border-neutral-300 pb-4">
          <h1 className="text-3xl font-bold">Lucas Ferreira</h1>
          <p className="text-lg text-neutral-700">{t.hero.title}</p>
          <p className="mt-2 text-sm text-neutral-600">
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> ·{' '}
            <a href={CONTACT.linkedin}>linkedin.com/in/lucas-ferreira-5247b1221</a> ·{' '}
            <a href={CONTACT.github}>github.com/LucasFelip</a> · <a href={CONTACT.site}>devlucasferreira.netlify.app</a>
          </p>
        </header>

        <section className="mt-5">
          <h2 className="mb-1 text-sm font-bold uppercase tracking-wide text-neutral-800">{t.about.title}</h2>
          <p className="text-sm leading-relaxed text-neutral-800">{t.about.summary}</p>
        </section>

        <section className="mt-5">
          <h2 className="mb-1 text-sm font-bold uppercase tracking-wide text-neutral-800">{t.about.skillsTitle}</h2>
          <ul className="space-y-0.5 text-sm text-neutral-800">
            {skillGroups.map((group) => (
              <li key={group.title.pt}>
                <strong>{tr(group.title)}:</strong> {group.items.map((item) => tr(item)).join(', ')}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-5">
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-neutral-800">{t.experience.title}</h2>
          <div className="space-y-4">
            {experiencesData.map((exp) => (
              <article key={exp.instituicao + exp.inicioAno} className="break-inside-avoid">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="text-sm font-bold">
                    {tr(exp.cargo)} · {exp.instituicao}
                  </h3>
                  <p className="text-xs text-neutral-600">{period(exp)}</p>
                </div>
                <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm text-neutral-800">
                  {tr(exp.destaques).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-5 break-inside-avoid">
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-neutral-800">{t.about.educationTitle}</h2>
          <ul className="space-y-1 text-sm text-neutral-800">
            {t.about.education.map((edu) => (
              <li key={edu.school} className="flex flex-wrap justify-between gap-x-4">
                <span>
                  <strong>{edu.school}</strong> — {edu.degree}
                </span>
                <span className="text-xs text-neutral-600">{edu.period}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-5 break-inside-avoid">
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-neutral-800">{t.research.title}</h2>
          <ul className="space-y-1 text-sm text-neutral-800">
            {researchProjects.map((project) => (
              <li key={project.titulo.pt}>
                <strong>{tr(project.titulo)}</strong> ({tr(project.natureza)}, {tr(project.papel)}, {project.periodo}) — {tr(project.subtitulo)}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-5 break-inside-avoid">
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-neutral-800">{t.about.languagesTitle}</h2>
          <ul className="text-sm text-neutral-800">
            {t.about.languages.map((language) => (
              <li key={language.name}>
                <strong>{language.name}</strong> — {language.level}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default CvPage;
