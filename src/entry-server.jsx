import React from 'react';
import { renderToString } from 'react-dom/server';
import PortfolioPage from '@/pages/PortfolioPage';
import CvPage from '@/pages/CvPage';
import { LanguageProvider } from '@/i18n';

// Usado só no build (scripts/prerender.js): gera o HTML inicial de cada rota para a página aparecer antes do
// JavaScript. O idioma do HTML pré-gerado é sempre o padrão (português); no navegador, o React monta a página
// de novo já com o idioma do visitante.
export function render(path) {
  const Page = path === '/cv' ? CvPage : PortfolioPage;
  return renderToString(
    <LanguageProvider initialLang="pt">
      <Page />
    </LanguageProvider>,
  );
}
