// ============================================================
//  TIPOS TYPESCRIPT — CONVITE CHÁ DE PANELA
// ============================================================

export interface Presente {
  id: number;
  nome: string;
  imagem?: string;       // URL da imagem real
  categoria: Categoria;
  cor: string;
  descricao: string;
  linkCompra: string;
  maxQuantity?: number; // Quantidade máxima permitida. Se undefined, assume 1.
  esgotado?: boolean;   // Calculado no backend para o frontend não expor números.
}

export interface Reservation {
  id: string; // Gerado no backend (UUID ou string do ObjectId)
  giftId: number;
  guestName: string;
  status: 'RESERVED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
}

export type Categoria =
  | 'Todos'
  | 'Panelas'
  | 'Utensílios'
  | 'Eletrodomésticos'
  | 'Mesa posta'
  | 'Casa';

export interface ProgramacaoItem {
  id: number;
  hora: string;
  titulo: string;
  descricao: string;
  imagem?: string;
  imageType?: 'default' | 'custom';
}

export interface CorPresente {
  nome: string;
  hex: string;
}

export interface GaleriaItem {
  src: string;
  capitulo: string;   // ex: "Capítulo I"
  texto: string;      // frase narrativa do conto
  transicao?: string; // frase de transição entre fotos (opcional)
}

export interface ConviteConfig {
  // Informações pessoais
  noiva: string;
  casal: string;
  titulo: string;
  subtitulo: string;

  // Data e horário
  data: string;
  horario: string;

  // Localização
  endereco: string;
  enderecoDetalhes: string;
  linkMaps: string;

  // Fotos
  fotoNoiva: string;
  fotoCasal: string;
  galeria: GaleriaItem[];

  // Textos
  mensagem: string;
  fraseHero: string;
  tituloMensagem: string;
  tituloLocalizacao: string;
  tituloPresentes: string;
  tituloProgramacao: string;

  // Cores
  cores: {
    principal: string;
    rosaClaro: string;
    creme: string;
    branco: string;
    dourado: string;
    texto: string;
  };

  // Paleta de cores dos presentes
  coresPresentes: CorPresente[];

  // Dados
  presentes: Presente[];
  programacao: ProgramacaoItem[];
}
