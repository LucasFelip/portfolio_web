import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { pt } from './pt';
import { en } from './en';

const dictionaries = { pt, en };
const STORAGE_KEY = 'portfolio-lang';

function detectInitialLang() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'pt' || saved === 'en') return saved;
  } catch {
    // localStorage indisponível (modo privado, etc.): segue para a detecção do navegador
  }
  const browser = (typeof navigator !== 'undefined' && navigator.language) || 'pt';
  return browser.toLowerCase().startsWith('pt') ? 'pt' : 'en';
}

const I18nContext = createContext(null);

export const LanguageProvider = ({ children, initialLang }) => {
  const [lang, setLangState] = useState(initialLang ?? 'pt');
  const t = dictionaries[lang];

  // A hidratação exige a mesma saída do HTML pré-gerado (pt). Só depois de hidratar troca para o idioma salvo/do navegador.
  useEffect(() => {
    if (initialLang) return;
    const detected = detectInitialLang();
    if (detected !== 'pt') setLangState(detected);
  }, [initialLang]);

  const setLang = useCallback((next) => {
    if (next !== 'pt' && next !== 'en') return;
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // sem persistência, a escolha vale só nesta sessão
    }
  }, []);

  // Atualiza <html lang>, título e meta description conforme o idioma.
  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    const isCv = window.location.pathname.replace(/\/+$/, '') === '/cv';
    document.title = isCv ? `Lucas Ferreira — ${t.cvPage.docTitle}` : t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description);
  }, [lang, t]);

  const value = useMemo(
    () => ({
      lang,
      t,
      setLang,
      // escolhe o texto no idioma atual em campos do tipo { pt, en }
      tr: (field) => (field && typeof field === 'object' ? field[lang] ?? field.pt : field),
    }),
    [lang, t, setLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n precisa estar dentro de <LanguageProvider>');
  return ctx;
};
