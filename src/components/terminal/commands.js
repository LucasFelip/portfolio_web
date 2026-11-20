import { skillGroups } from '@/data/skills';
import { experiencesData } from '@/data/experiences';
import { projectOverrides } from '@/data/projectOverrides';
import { navItems, scrollToSection } from '@/hooks/useActiveSection';
import { CV_URL, CONTACT } from '@/lib/constants';
import { nomeDoMes } from '@/lib/dateUtils';

export const COMMAND_NAMES = ['help', 'about', 'skills', 'experience', 'projects', 'contact', 'cv', 'goto', 'lang', 'clear', 'exit'];

const text = (value) => ({ text: value });
const link = (value, href) => ({ text: value, href });

// Executa um comando do terminal. Devolve as linhas a exibir e, quando houver, efeitos (fechar, limpar, idioma).
// `t` e `lang` vêm do contexto de i18n; os textos fixos ficam em t.terminal.
export function runCommand(input, { t, lang }) {
  const [rawName, ...args] = input.trim().split(/\s+/);
  const name = rawName.toLowerCase();

  switch (name) {
    case 'help':
      return { lines: t.terminal.help.map(text) };

    case 'about':
      return { lines: [text(t.hero.bio), text(t.about.summary)] };

    case 'skills':
      return { lines: skillGroups.map((group) => text(`${group.title[lang]}: ${group.items.map((item) => (typeof item === 'string' ? item : item[lang])).join(', ')}`)) };

    case 'experience':
      return {
        lines: experiencesData.map((exp) => {
          const start = `${nomeDoMes(exp.inicioMes, t.months)} ${exp.inicioAno}`;
          const end = exp.terminoAno ? `${nomeDoMes(exp.terminoMes, t.months)} ${exp.terminoAno}` : t.experience.present;
          return text(`${exp.cargo[lang]} @ ${exp.instituicao} (${start} — ${end})`);
        }),
      };

    case 'projects':
      return {
        lines: [
          ...Object.entries(projectOverrides).map(([repo, info]) => link(`${repo}: ${info.tags.join(', ')}`, `https://github.com/LucasFelip/${repo}`)),
          link(t.terminal.allRepos, `${CONTACT.github}?tab=repositories`),
        ],
      };

    case 'contact':
      return {
        lines: [
          link(`email: ${CONTACT.email}`, `mailto:${CONTACT.email}`),
          link(`linkedin: ${CONTACT.linkedin}`, CONTACT.linkedin),
          link(`github: ${CONTACT.github}`, CONTACT.github),
        ],
      };

    case 'cv':
      window.open(CV_URL, '_blank', 'noopener,noreferrer');
      return { lines: [text(t.terminal.cvOpened)] };

    case 'goto': {
      const target = navItems.find((item) => item.id === args[0]?.toLowerCase() || t.nav[item.id]?.toLowerCase() === args[0]?.toLowerCase());
      if (!target && args[0]?.toLowerCase() !== 'engenharia') {
        return { lines: [text(t.terminal.gotoUsage(navItems.map((item) => item.id).join(', ')))] };
      }
      const id = target ? target.id : 'engenharia';
      scrollToSection(id);
      return { lines: [text(t.terminal.going(id))], close: true };
    }

    case 'lang': {
      const next = args[0]?.toLowerCase();
      if (next !== 'pt' && next !== 'en') return { lines: [text(t.terminal.langUsage)] };
      return { lines: [text(t.terminal.langChanged(next))], setLang: next };
    }

    case 'clear':
      return { lines: [], clear: true };

    case 'exit':
      return { lines: [], close: true };

    default:
      return { lines: [text(t.terminal.unknown(name))] };
  }
}
