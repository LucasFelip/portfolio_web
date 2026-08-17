// Adaptado de posts reais do autor (LinkedIn). Adicionar um novo objeto aqui para publicar outra nota.
export const notes = [
  {
    titulo: 'NAS pessoal num Android aposentado',
    resumo: 'Transformei um Galaxy A31 parado numa gaveta em servidor de arquivos pessoal, acessível remotamente, sem root e sem hardware novo.',
    tags: ['Termux', 'Python', 'Flask', 'Tailscale', 'Homelab'],
    corpo: [
      'Reaproveitei um Galaxy A31 antigo, que estava parado, e transformei num servidor NAS pessoal — acessível remotamente, com interface web e gerenciamento completo de arquivos. Roda direto no Android, sem precisar de root.',
      'Stack: Termux como ambiente de execução, Python + Flask pra interface web, Tailscale garantindo acesso remoto seguro mesmo sob CGNAT, tmux mantendo a execução ativa, e armazenamento local do próprio aparelho.',
      'A interface web é responsiva: upload com barra de progresso (drag and drop), criar/renomear/excluir pastas e arquivos, ordenar por nome/tamanho/data, download direto pelo navegador, navegação entre diretórios. Acesso via SSH configurado na porta 8022.',
    ],
  },
];
