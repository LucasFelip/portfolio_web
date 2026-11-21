// Acesso ao currículo mantido no Google Docs (documento público: "qualquer pessoa com o link").
// Usado por scripts/sync-cv.js (PDF do site) e scripts/check-cv.js (alerta de divergências).
// O ID pode ser trocado com a variável de ambiente CV_DOC_ID.
export const DOC_ID = process.env.CV_DOC_ID || '1x2byxJB42dP7lgQzwATxuLwRxAHFlwT83v6HTfdeVl4';
export const DOC_URL = `https://docs.google.com/document/d/${DOC_ID}/edit`;

const exportUrl = (format) => `https://docs.google.com/document/d/${DOC_ID}/export?format=${format}`;

// Baixa o documento em `format` ('pdf' ou 'txt') e valida a resposta: se o documento deixar de ser público, o
// Google devolve uma página de login em HTML com status 200, então o tipo do conteúdo é conferido.
export async function fetchDoc(format) {
  const res = await fetch(exportUrl(format), { redirect: 'follow', signal: AbortSignal.timeout(30_000) });
  if (!res.ok) throw new Error(`o Google respondeu ${res.status}`);

  const type = res.headers.get('content-type') ?? '';
  const body = Buffer.from(await res.arrayBuffer());

  if (format === 'pdf') {
    if (!type.includes('pdf') || body.subarray(0, 5).toString() !== '%PDF-') {
      throw new Error('a resposta não é um PDF (o documento ainda está com o link público?)');
    }
    if (body.length < 20_000 || body.length > 5_000_000) {
      throw new Error(`tamanho do PDF suspeito (${(body.length / 1024).toFixed(0)} KB)`);
    }
    return body;
  }

  if (!type.includes('text/plain')) throw new Error('a resposta não é texto (o documento ainda está com o link público?)');
  return body.toString('utf-8').replace(/^﻿/, '').replace(/\r\n/g, '\n').replace(/ /g, ' ');
}
