// ============================================================
//  ⭐ ARQUIVO CENTRAL DE CONFIGURAÇÃO DO CONVITE
//  ============================================================
//  TODAS as informações exibidas no site vêm daqui.
//  Edite este arquivo para personalizar o convite sem precisar
//  tocar em nenhum componente.
// ============================================================

import type { ConviteConfig, GaleriaItem } from '../types';

// ────────────────────────────────────────────────────────────
//  ALTERE AQUI AS INFORMAÇÕES DO CONVITE
// ────────────────────────────────────────────────────────────
export const conviteConfig: ConviteConfig = {

  // ── INFORMAÇÕES PESSOAIS ────────────────────────────────
  noiva: 'Tai',
  casal: 'Tai & Amor',
  titulo: 'O Diário da Princesa',
  subtitulo: '"Uma história escrita por Deus"',

  // ── DATA E HORÁRIO ──────────────────────────────────────
  data: 'XX de XXXXX de 2026',
  horario: 'XXhXX',

  // ── LOCALIZAÇÃO ─────────────────────────────────────────
  endereco: 'Rua das Flores, 123 — Salão de Festas',
  enderecoDetalhes: 'Bairro Jardim, Sua Cidade — SP',
  linkMaps: 'https://maps.google.com/',

  // ── FOTOS ───────────────────────────────────────────────
  //  Coloque as fotos em: public./images/
  //  e atualize os caminhos abaixo
  fotoNoiva: './images/noiva.jpg',
  fotoCasal: './images/casal.jpg',
  galeria: [
    {
      src: './images/foto1.jpg',
      capitulo: 'Capítulo I',
      texto: 'Era uma vez uma princesa que vivia em um pequeno vilarejo no estado de Minas Gerais, onde nasceu, cresceu e viveu os primeiros capítulos de sua história. 👑',
      transicao: 'Mas Deus já tinha preparado o próximo capítulo...',
    },
    {
      src: './images/foto2.jpg',
      capitulo: 'Capítulo II',
      texto: 'Deus decidiu escrever um novo capítulo e levou a princesa, junto de sua família, para uma grande cidade chamada São Paulo. ✨',
      transicao: 'Porque algumas histórias são escritas antes mesmo de serem vividas...',
    },
    {
      src: './images/foto3.jpg',
      capitulo: 'Capítulo III',
      texto: 'E o que a princesa ainda não sabia era que, naquela nova terra, Deus já havia preparado alguém muito especial para ela. Tudo estava escrito. Só faltava o momento certo. 🤍',
      transicao: 'E pelas mãos de Deus, dois caminhos se encontraram...',
    },
    {
      src: './images/foto4.jpg',
      capitulo: 'Capítulo IV',
      texto: 'E então, no tempo perfeito de Deus, o príncipe encontrou sua princesa e lhe fez a mais importante das perguntas. Ela, com o coração cheio de alegria, respondeu: SIM! 💍',
      transicao: 'E assim começou um novo capítulo dessa história...',
    },
    {
      src: './images/foto5.jpg',
      capitulo: 'Capítulo V',
      texto: 'Depois do "felizes para sempre" começar a tomar forma, veio um novo tempo: o tempo dos preparativos. E a princesa descobriu que planejar um casamento é quase tão mágico quanto o próprio conto. 🌸',
      transicao: 'Mas Deus ainda guardava uma surpresa...',
    },
    {
      src: './images/foto6.jpg',
      capitulo: 'Capítulo VI',
      texto: 'Foi durante os preparativos que a princesa descobriu que existem coisas muito mais importantes do que vestidos e sapatos... 👀',
      transicao: 'Como, por exemplo...',
    },
    {
      src: './images/foto7.jpg',
      capitulo: 'Capítulo VII',
      texto: '...escolher as louças reais para o seu futuro castelo! 👑🍽️ E assim, entre sonhos e muitas panelas, a princesa começou a preparar o lar onde viveria o seu tão esperado "felizes para sempre".',
    },
  ],

  // ── TEXTOS ──────────────────────────────────────────────
  fraseHero: 'Era uma vez...',
  mensagem:
    'Deus é um escritor muito criativo. Cada capítulo da nossa história foi escrito por Ele com tanto cuidado, tanto amor... que só nos resta virar a página e descobrir o que vem a seguir. ✨',
  tituloMensagem: 'Querido Diário...',
  tituloLocalizacao: 'ONDE VAMOS NOS ENCONTRAR?',
  tituloPresentes: 'Presentes para a nova casa',
  tituloProgramacao: 'Programação do dia',

  // ── CORES DO TEMA ───────────────────────────────────────
  cores: {
    principal: '#F2B8C6',   // rosa médio delicado
    rosaClaro: '#FCE4EC',   // blush clarinho
    creme: '#FFF5F7',       // branco rosado
    branco: '#FFFFFF',
    dourado: '#C9A86A',
    texto: '#6B2D3E',       // bordô/vinho para textos
  },

  // ── PALETA DE CORES DOS PRESENTES ───────────────────────
  //  Adicione ou remova cores conforme necessário
  coresPresentes: [
    { nome: 'Rosa', hex: '#E8B7B7' },
    { nome: 'Creme', hex: '#F8F1E8' },
    { nome: 'Branco', hex: '#FAFAFA' },
    { nome: 'Dourado', hex: '#C9A86A' },
    { nome: 'Rosa Antigo', hex: '#C49A9A' },
    { nome: 'Preto', hex: '#2D2D2D' },
  ],

  // ────────────────────────────────────────────────────────
  //  ADICIONE OS PRESENTES AQUI
  //  escolhido: false → disponível | escolhido: true → reservado
  // ────────────────────────────────────────────────────────
  presentes: [
    // ── COZINHA ──
    { id: 1, nome: 'Jogo de Panelas', imagem: 'https://image.pollinations.ai/prompt/vintage%20pastel%20pink%20and%20gold%20cooking%20pots%20with%20a%20pastel%20wall%20background,%20elegant%20kitchen%20aesthetic,%20Princess%20Diaries?width=600&height=600&nologo=true', categoria: 'Panelas', cor: 'Rosa Antigo', descricao: 'Jogo de panelas antiaderentes para equipar a cozinha.', linkCompra: '', maxQuantity: 1 },
    { id: 2, nome: 'Air Fryer', imagem: 'https://image.pollinations.ai/prompt/vintage%20pastel%20pink%20air%20fryer%20with%20a%20pastel%20wall%20background,%20elegant%20kitchen?width=600&height=600&nologo=true', categoria: 'Eletrodomésticos', cor: 'Preto', descricao: 'Fritadeira sem óleo para refeições práticas no dia a dia.', linkCompra: '', maxQuantity: 1 },
    { id: 3, nome: 'Panela de Pressão', imagem: 'https://image.pollinations.ai/prompt/vintage%20pressure%20cooker%20pot%20with%20a%20pastel%20wall%20background,%20elegant%20kitchen?width=600&height=600&nologo=true', categoria: 'Panelas', cor: 'Creme', descricao: 'Panela de pressão para cozimentos rápidos.', linkCompra: '', maxQuantity: 1 },
    { id: 4, nome: 'Frigideira Antiaderente', imagem: 'https://image.pollinations.ai/prompt/vintage%20pastel%20pink%20frying%20pan%20with%20a%20pastel%20wall%20background,%20elegant%20kitchen?width=600&height=600&nologo=true', categoria: 'Panelas', cor: 'Rosa', descricao: 'Frigideira versátil para o dia a dia.', linkCompra: '', maxQuantity: 1 },
    { id: 5, nome: 'Liquidificador', imagem: 'https://image.pollinations.ai/prompt/vintage%20retro%20pastel%20blender%20with%20a%20pastel%20wall%20background,%20elegant?width=600&height=600&nologo=true', categoria: 'Eletrodomésticos', cor: 'Branco', descricao: 'Para sucos, vitaminas e receitas maravilhosas.', linkCompra: '', maxQuantity: 1 },
    { id: 6, nome: 'Chaleira Elétrica', imagem: 'https://image.pollinations.ai/prompt/vintage%20pastel%20tea%20kettle%20with%20a%20pastel%20wall%20background,%20elegant?width=600&height=600&nologo=true', categoria: 'Eletrodomésticos', cor: 'Rosa', descricao: 'Praticidade para preparar chás.', linkCompra: '', maxQuantity: 1 },
    { id: 7, nome: 'Sanduicheira', imagem: 'https://image.pollinations.ai/prompt/vintage%20sandwich%20maker%20grill%20with%20a%20pastel%20wall%20background?width=600&height=600&nologo=true', categoria: 'Eletrodomésticos', cor: 'Preto', descricao: 'Para lanches rápidos e deliciosos.', linkCompra: '', maxQuantity: 1 },
    { id: 8, nome: 'Jogo de Facas', imagem: 'https://image.pollinations.ai/prompt/elegant%20kitchen%20knives%20set%20with%20a%20pastel%20wall%20background?width=600&height=600&nologo=true', categoria: 'Utensílios', cor: 'Preto', descricao: 'Kit de facas essenciais para cortes precisos.', linkCompra: '', maxQuantity: 1 },
    { id: 9, nome: 'Tábua de Corte', imagem: 'https://image.pollinations.ai/prompt/elegant%20wooden%20cutting%20board%20with%20a%20pastel%20wall%20background?width=600&height=600&nologo=true', categoria: 'Utensílios', cor: 'Dourado', descricao: 'Tábua resistente para preparar alimentos.', linkCompra: '', maxQuantity: 1 },
    { id: 10, nome: 'Kit de Utensílios', imagem: 'https://image.pollinations.ai/prompt/pastel%20silicone%20kitchen%20utensils%20in%20a%20jar%20with%20a%20pastel%20wall%20background?width=600&height=600&nologo=true', categoria: 'Utensílios', cor: 'Creme', descricao: 'Conjunto de colheres e espátulas.', linkCompra: '', maxQuantity: 2 },
    { id: 11, nome: 'Potes Herméticos', imagem: 'https://image.pollinations.ai/prompt/elegant%20glass%20food%20storage%20jars%20with%20a%20pastel%20wall%20background?width=600&height=600&nologo=true', categoria: 'Casa', cor: 'Branco', descricao: 'Conjunto de potes de vidro para organizar mantimentos.', linkCompra: '', maxQuantity: 2 },
    { id: 12, nome: 'Assadeiras', imagem: 'https://image.pollinations.ai/prompt/ceramic%20baking%20dishes%20with%20a%20pastel%20wall%20background?width=600&height=600&nologo=true', categoria: 'Utensílios', cor: 'Rosa', descricao: 'Kit de assadeiras para forno.', linkCompra: '', maxQuantity: 2 },
    { id: 13, nome: 'Escorredor de Louça', imagem: 'https://image.pollinations.ai/prompt/elegant%20gold%20dish%20drying%20rack%20with%20a%20pastel%20wall%20background?width=600&height=600&nologo=true', categoria: 'Utensílios', cor: 'Branco', descricao: 'Para manter a bancada sempre organizada e linda.', linkCompra: '', maxQuantity: 1 },
    { id: 14, nome: 'Escorredor de Massa', imagem: 'https://image.pollinations.ai/prompt/gold%20colander%20pasta%20strainer%20with%20a%20pastel%20wall%20background?width=600&height=600&nologo=true', categoria: 'Utensílios', cor: 'Dourado', descricao: 'Item indispensável para os dias de macarronada.', linkCompra: '', maxQuantity: 1 },
    { id: 15, nome: 'Porta-Temperos', imagem: 'https://image.pollinations.ai/prompt/elegant%20spice%20rack%20glass%20jars%20with%20a%20pastel%20wall%20background?width=600&height=600&nologo=true', categoria: 'Casa', cor: 'Branco', descricao: 'Kit de potinhos para os temperos mais usados.', linkCompra: '', maxQuantity: 1 },
    
    // ── MESA ──
    { id: 16, nome: 'Aparelho de Jantar', imagem: 'https://image.pollinations.ai/prompt/elegant%20porcelain%20dinnerware%20set%20with%20a%20pastel%20wall%20background?width=600&height=600&nologo=true', categoria: 'Mesa posta', cor: 'Branco', descricao: 'Conjunto de pratos elegantes para receber convidados.', linkCompra: '', maxQuantity: 1 },
    { id: 17, nome: 'Faqueiro', imagem: 'https://image.pollinations.ai/prompt/gold%20cutlery%20set%20with%20a%20pastel%20wall%20background?width=600&height=600&nologo=true', categoria: 'Mesa posta', cor: 'Dourado', descricao: 'Conjunto completo de talheres para a mesa posta.', linkCompra: '', maxQuantity: 1 },
    { id: 18, nome: 'Jogo de Taças', imagem: 'https://image.pollinations.ai/prompt/crystal%20wine%20glasses%20set%20with%20a%20pastel%20wall%20background?width=600&height=600&nologo=true', categoria: 'Mesa posta', cor: 'Creme', descricao: 'Taças de cristal para brindar os momentos felizes.', linkCompra: '', maxQuantity: 2 },
    { id: 19, nome: 'Jogo de Copos', imagem: 'https://image.pollinations.ai/prompt/elegant%20drinking%20glasses%20with%20a%20pastel%20wall%20background?width=600&height=600&nologo=true', categoria: 'Mesa posta', cor: 'Branco', descricao: 'Copos práticos e elegantes para o uso diário.', linkCompra: '', maxQuantity: 2 },
    { id: 20, nome: 'Jogo de Xícaras', imagem: 'https://image.pollinations.ai/prompt/vintage%20pastel%20tea%20cups%20set%20with%20a%20pastel%20wall%20background?width=600&height=600&nologo=true', categoria: 'Mesa posta', cor: 'Rosa Antigo', descricao: 'Xícaras para o café da manhã a dois.', linkCompra: '', maxQuantity: 1 },
    { id: 21, nome: 'Travessa / Petisqueira', imagem: 'https://image.pollinations.ai/prompt/elegant%20ceramic%20serving%20tray%20with%20a%20pastel%20wall%20background?width=600&height=600&nologo=true', categoria: 'Mesa posta', cor: 'Branco', descricao: 'Peça versátil para servir petiscos e entradinhas.', linkCompra: '', maxQuantity: 2 },
    
    // ── CASA ──
    { id: 22, nome: 'Jogo de Toalhas', imagem: 'https://image.pollinations.ai/prompt/soft%20fluffy%20white%20bath%20towels%20folded%20with%20a%20pastel%20wall%20background?width=600&height=600&nologo=true', categoria: 'Casa', cor: 'Branco', descricao: 'Toalhas de banho macias e aconchegantes.', linkCompra: '', maxQuantity: 2 },
    { id: 23, nome: 'Panos de Prato', imagem: 'https://image.pollinations.ai/prompt/cute%20folded%20kitchen%20tea%20towels%20with%20a%20pastel%20wall%20background?width=600&height=600&nologo=true', categoria: 'Casa', cor: 'Creme', descricao: 'Panos de prato charmosos e absorventes.', linkCompra: '', maxQuantity: 3 },
    { id: 24, nome: 'Luvas Térmicas', imagem: 'https://image.pollinations.ai/prompt/cute%20pastel%20pink%20oven%20mitts%20with%20a%20pastel%20wall%20background?width=600&height=600&nologo=true', categoria: 'Utensílios', cor: 'Rosa', descricao: 'Para cozinhar com estilo e segurança.', linkCompra: '', maxQuantity: 1 },
    { id: 25, nome: 'Organizadores de Armário', imagem: 'https://image.pollinations.ai/prompt/elegant%20kitchen%20organization%20baskets%20with%20a%20pastel%20wall%20background?width=600&height=600&nologo=true', categoria: 'Casa', cor: 'Branco', descricao: 'Cestos organizadores para manter a despensa impecável.', linkCompra: '', maxQuantity: 2 },
  ],

  // ────────────────────────────────────────────────────────
  //  PROGRAMAÇÃO DO DIA — edite os itens abaixo
  // ────────────────────────────────────────────────────────
  programacao: [
    {
      id: 1,
      hora: 'A partir das XXhXX',
      titulo: 'A Chegada da Realeza',
      descricao: 'As convidadas chegam e são recebidas com todo o glamour de Genovia',
      imagem: './images/schedule_arrival.jpg',
      imageType: 'default',
    },
    {
      id: 2,
      hora: 'XXhXX',
      titulo: 'Chá com a Rainha Clarisse',
      descricao: 'Um banquete especial (sem sorvete que congele o cérebro)',
      imagem: './images/schedule_tea.jpg',
      imageType: 'default',
    },
    {
      id: 3,
      hora: 'XXhXX',
      titulo: 'Abertura dos Presentes',
      descricao: 'Momento especial de abrir cada presente para a nova casa',
      imagem: './images/schedule_gifts.jpg',
      imageType: 'default',
    },
    {
      id: 4,
      hora: 'XXhXX',
      titulo: 'Aulas de Princesa',
      descricao: 'Muita diversão, gargalhadas e (talvez) treinamento de postura!',
      imagem: './images/schedule_makeover.jpg',
      imageType: 'default',
    },
    {
      id: 5,
      hora: 'XXhXX',
      titulo: 'Fotos & Memórias',
      descricao: 'Registros no melhor estilo "Antes e Depois" da Mia',
      imagem: './images/schedule_photos.jpg',
      imageType: 'default',
    },
    {
      id: 6,
      hora: 'XXhXX',
      titulo: 'Baile de Genovia (Brinde)',
      descricao: 'Um brinde especial para a noiva e sua nova vida feliz para sempre!',
      imagem: './images/schedule_toast.jpg',
      imageType: 'default',
    },
  ],
};
