// Os dados guardam o mês em português (ex.: 'Junho'); aqui ele vira índice para cálculo e tradução.
const MESES = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
];

function indiceDoMes(mes) {
  return MESES.indexOf(mes.toLowerCase());
}

function mesAnoParaData(mes, ano) {
  return new Date(Number(ano), indiceDoMes(mes), 1);
}

// Nome do mês no idioma atual. `months` vem do dicionário (t.months).
export function nomeDoMes(mes, months) {
  const idx = indiceDoMes(mes);
  return idx >= 0 ? months[idx] : mes;
}

// `time` vem do dicionário (t.time) e define as frases do idioma atual.
export function tempoDesde(mes, ano, time) {
  const inicio = mesAnoParaData(mes, ano);
  const agora = new Date();
  const meses = (agora.getFullYear() - inicio.getFullYear()) * 12 + (agora.getMonth() - inicio.getMonth());

  if (meses < 1) return time.lessThanMonth;
  if (meses < 12) return time.months(meses);

  const anos = Math.floor(meses / 12);
  const restoMeses = meses % 12;
  if (restoMeses === 0) return time.years(anos);
  return time.yearsAndMonths(anos, restoMeses);
}
