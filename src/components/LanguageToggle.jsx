import React from 'react';
import { Languages } from 'lucide-react';
import { useI18n } from '@/i18n';

// Alterna entre PT e EN. Mostra o idioma de destino, para deixar claro o que o clique faz.
const LanguageToggle = ({ className = '' }) => {
  const { lang, setLang, t } = useI18n();
  const next = lang === 'pt' ? 'en' : 'pt';

  return (
    <button
      type="button"
      onClick={() => setLang(next)}
      aria-label={t.a11y.switchLang}
      lang={next === 'pt' ? 'pt-BR' : 'en'}
      className={`flex items-center gap-1.5 px-1.5 xs:px-3 py-1.5 rounded-md font-mono text-xs uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${className}`}
    >
      <Languages aria-hidden="true" className="w-3.5 h-3.5" />
      <span>{next.toUpperCase()}</span>
    </button>
  );
};

export default LanguageToggle;
