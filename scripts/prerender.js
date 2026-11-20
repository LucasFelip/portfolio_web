import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

// Pré-gera o HTML das rotas no build: renderiza a página com o bundle de SSR (dist-ssr) e injeta o resultado em
// dist/index.html (/) e dist/cv.html (/cv). O navegador mostra o texto sem esperar o JavaScript; depois o React
// monta a página normalmente (createRoot substitui o conteúdo pré-gerado, sem hidratação).
const dist = resolve('dist');
const { render } = await import(pathToFileURL(resolve('dist-ssr', 'entry-server.js')).href);

const template = readFileSync(resolve(dist, 'index.html'), 'utf-8');
const marker = '<div id="root"></div>';
if (!template.includes(marker)) {
  throw new Error(`Marcador ${marker} não encontrado em dist/index.html`);
}

const routes = [
  { path: '/', file: 'index.html' },
  { path: '/cv', file: 'cv.html' },
];

for (const route of routes) {
  const html = render(route.path);
  writeFileSync(resolve(dist, route.file), template.replace(marker, `<div id="root">${html}</div>`));
  console.log(`[prerender] ${route.path} -> dist/${route.file} (${(html.length / 1024).toFixed(1)} KB de HTML)`);
}
