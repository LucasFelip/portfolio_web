import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { fetchDoc, DOC_URL } from './lib/cv-doc.js';

// Roda no fim do build (depois do prerender): baixa o PDF do currículo direto do Google Docs e o coloca em
// dist/, no lugar da cópia que está no repositório (public/curriculo-lucas-ferreira.pdf). Assim o botão
// "Baixar CV" sempre entrega a versão atual do documento, sem commit. A cópia do repositório é só o plano B:
// se o Google estiver fora do ar, o documento ficar privado ou a resposta não for um PDF válido, o build continua
// com ela. Este script nunca derruba o build.
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const FILE = 'curriculo-lucas-ferreira.pdf';
const fallback = join(root, 'public', FILE);
const target = join(root, 'dist', FILE);

const sha = (buffer) => createHash('sha256').update(buffer).digest('hex').slice(0, 12);

async function run() {
  if (!existsSync(join(root, 'dist'))) {
    console.warn('[sync-cv] dist/ não existe (rode depois do build); nada a fazer');
    return;
  }
  try {
    const pdf = await fetchDoc('pdf');
    writeFileSync(target, pdf);
    const same = existsSync(fallback) && sha(readFileSync(fallback)) === sha(pdf);
    console.log(`[sync-cv] PDF baixado do Google Docs (${(pdf.length / 1024).toFixed(0)} KB, ${same ? 'igual' : 'diferente'} da cópia do repositório)`);
  } catch (err) {
    console.warn(`[sync-cv] ${err.message}; mantendo a cópia do repositório (${DOC_URL})`);
    if (existsSync(fallback)) copyFileSync(fallback, target);
  }
}

run();
