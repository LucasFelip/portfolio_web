const MESES = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
];

function mesAnoParaData(mes, ano) {
  const idx = MESES.indexOf(mes.toLowerCase());
  return new Date(Number(ano), idx, 1);
}

export function tempoDesde(mes, ano) {
  const inicio = mesAnoParaData(mes, ano);
  const agora = new Date();
  const meses = (agora.getFullYear() - inicio.getFullYear()) * 12 + (agora.getMonth() - inicio.getMonth());

  if (meses < 1) return 'há menos de 1 mês';
  if (meses < 12) return `há ${meses} ${meses === 1 ? 'mês' : 'meses'}`;

  const anos = Math.floor(meses / 12);
  const restoMeses = meses % 12;
  if (restoMeses === 0) return `há ${anos} ${anos === 1 ? 'ano' : 'anos'}`;
  return `há ${anos} ${anos === 1 ? 'ano' : 'anos'} e ${restoMeses} ${restoMeses === 1 ? 'mês' : 'meses'}`;
}
