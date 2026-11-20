import React from 'react';
import ReactDOM from 'react-dom/client';
import PortfolioPage from '@/pages/PortfolioPage';
import '@fontsource-variable/inter';
import '@fontsource-variable/jetbrains-mono';
import '@/index.css';
import { initAnalytics } from '@/lib/analytics';
import { LanguageProvider } from '@/i18n';
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "@/dev/index.js";

initAnalytics();

// Sem biblioteca de rotas: o site só tem duas telas (o Netlify serve /cv com o cv.html pré-gerado). A página do currículo só é baixada em /cv,
// e é carregada antes de hidratar para a árvore ser idêntica à do HTML pré-gerado (sem fronteira de Suspense).
async function start() {
    const isCv = window.location.pathname.replace(/\/+$/, '') === '/cv';
    const Page = isCv ? (await import('@/pages/CvPage')).default : PortfolioPage;

    const app = (
        <LanguageProvider>
            <Page/>
        </LanguageProvider>
    );

    // DevSupport (previews do IDE) só no modo dev: em produção a árvore precisa ser igual ao HTML pré-gerado.
    const tree = (
        <React.StrictMode>
            {import.meta.env.DEV ? (
                <DevSupport ComponentPreviews={ComponentPreviews} useInitialHook={useInitial}>
                    {app}
                </DevSupport>
            ) : app}
        </React.StrictMode>
    );

    const root = document.getElementById('root');
    // O build já deixa o HTML da página dentro do #root: hidrata em vez de montar tudo de novo (menos trabalho no carregamento).
    if (root.hasChildNodes()) {
        ReactDOM.hydrateRoot(root, tree);
    } else {
        ReactDOM.createRoot(root).render(tree);
    }
}

start();
