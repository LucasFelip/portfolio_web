// Enriquecimento opcional dos repositórios do GitHub, por nome do repo. A lista de projetos continua dinâmica
// (últimos repositórios públicos); aqui só entram descrição curada (PT/EN), tags, imagem e link de demo.
// Repos com entrada aqui aparecem primeiro. Imagens ficam em /public/projects (origem: README de cada repo).
// Fatos extraídos dos READMEs; ao mudar um projeto, atualize aqui. A linguagem principal já aparece no card, então não vai nas tags.
// ana-joiais-dev: sem README; a frase de prova de conceito foi informada pelo próprio Lucas.
export const projectOverrides = {
  'self-stream-deck': {
    description: {
      pt: 'Transforma o celular em painel de controle do PC com Windows: apps, atalhos, som, janelas, desempenho e câmera como webcam. Agente em Rust, painel em React + TypeScript (PWA) e app Android em Kotlin.',
      en: 'Turns a phone into a control panel for a Windows PC: apps, shortcuts, sound, windows, performance and the phone camera as a webcam. Rust agent, React + TypeScript (PWA) panel and a Kotlin Android app.',
    },
    tags: ['React', 'TypeScript', 'Kotlin', 'PWA'],
    image: '/projects/self-stream-deck.png',
    demo: 'https://lucasfelip.github.io/self-stream-deck/',
  },
  'taskbar-battery': {
    description: {
      pt: 'Mostra a bateria de mouse, teclado, fone e celular como ícones na bandeja do Windows 11. Um único .exe em Rust de ~400 KB, sem rede nem telemetria e com ~0% de CPU em repouso.',
      en: 'Shows the battery level of mouse, keyboard, headset and phone as Windows 11 system tray icons. A single ~400 KB Rust .exe, with no network or telemetry and ~0% CPU at idle.',
    },
    tags: ['Windows 11', 'Bluetooth', 'ADB'],
  },
  'ana-joiais-dev': {
    description: {
      pt: 'Site de uma loja de joias para avaliação e compra de ouro. Prova de conceito para um possível cliente.',
      en: 'Website for a jewelry store focused on gold appraisal and purchase. Proof of concept for a prospective client.',
    },
    tags: ['HTML', 'CSS', 'Landing page'],
    image: '/projects/ana-joias.jpg',
    imageFit: 'contain',
  },
  'book-game-dev': {
    description: {
      pt: 'Livro de estudos sobre desenvolvimento de jogos com IA: Unreal Engine 5, C++, Blueprint, Game AI e narrativa. O PDF é gerado automaticamente pela CI a cada push.',
      en: 'Study book on game development with AI: Unreal Engine 5, C++, Blueprint, Game AI and narrative. The PDF is built automatically by CI on every push.',
    },
    tags: ['Unreal Engine 5', 'C++', 'Game AI', 'CI'],
    image: '/projects/book-game-dev.png', // capa do PDF da release v1.0.2 (renderizada da primeira página)
  },
  'kafka-docker': {
    description: {
      pt: 'Ambiente Docker Compose com Kafka, ZooKeeper, Schema Registry e Kafka UI, pronto para estudar e testar mensageria.',
      en: 'Docker Compose environment with Kafka, ZooKeeper, Schema Registry and Kafka UI, ready for studying and testing messaging.',
    },
    tags: ['Kafka', 'ZooKeeper', 'Schema Registry', 'Docker'],
  },
  'zookeeper-demo': {
    description: {
      pt: 'Demonstração de Apache ZooKeeper com Spring Boot: znodes, watchers e coordenação.',
      en: 'Apache ZooKeeper demo with Spring Boot: znodes, watchers and coordination.',
    },
    tags: ['ZooKeeper', 'Spring Boot', 'Java'],
  },
  'cosmos-docker': {
    description: {
      pt: 'Azure Cosmos DB Emulator rodando via Docker Compose, para desenvolver sem conta na nuvem.',
      en: 'Azure Cosmos DB Emulator running through Docker Compose, for developing without a cloud account.',
    },
    tags: ['Azure Cosmos DB', 'Docker'],
  },
  'gateway-mqtt-ws': {
    description: {
      pt: 'Gateway somente leitura que expõe o broker MQTT do LSDi via WebSocket.',
      en: "Read-only gateway that exposes the LSDi's MQTT broker over WebSocket.",
    },
    tags: ['MQTT', 'WebSocket', 'Docker'],
  },
  'py-nas': {
    description: {
      pt: 'Servidor NAS web para Termux: gerencie os arquivos do Android pelo navegador.',
      en: 'Web NAS server for Termux: manage your Android files from the browser.',
    },
    tags: ['Python', 'Termux', 'Android'],
  },
};
