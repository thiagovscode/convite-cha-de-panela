// ============================================================
//  COMPONENTE: ColorPalette
//  Paleta de cores dos presentes — organizada por grupos
// ============================================================

import { motion } from 'framer-motion';
import { OrnamentalDivider } from './DecorativeElements';

interface CorItem {
  nome: string;
  hex: string;
}

interface GrupoCor {
  titulo: string;
  subtitulo: string;
  cores: CorItem[];
}

const gruposPaleta: GrupoCor[] = [
  {
    titulo: 'NOSSA PALETA',
    subtitulo: 'Tons para a nossa casa',
    cores: [
      { nome: 'Dourado', hex: '#C9A86A' },
      { nome: 'Branco', hex: '#FFFFFF' },
      { nome: 'Creme', hex: '#F8F1E8' },
      { nome: 'Rosa', hex: '#E8B7B7' },
      { nome: 'Verde', hex: '#9CAF88' },
    ],
  },
  {
    titulo: 'PARA PANELAS E ALGUNS UTENSÍLIOS',
    subtitulo: 'Cores permitidas para panelas e utensílios',
    cores: [
      { nome: 'Preto', hex: '#2D2D2D' },
      { nome: 'Inox', hex: '#A8A9AD' },
    ],
  },
];

export default function ColorPalette() {
  return (
    <section
      className="relative py-16 px-4 overflow-hidden"
      style={{ background: '#FDF5F5' }}
    >
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-sans text-xs font-semibold tracking-[0.3em] text-dourado uppercase mb-2">
            GUIA DE CORES
          </p>
          <h2
            className="font-serif text-3xl sm:text-4xl font-light text-marrom mb-2"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Nossa Paleta de Cores
          </h2>
          <p className="font-sans text-sm text-marrom/70 font-light max-w-md mx-auto mb-6">
            Ideias de tons para nos ajudar a harmonizar cada cantinho do nosso lar!
          </p>
        </motion.div>

        <OrnamentalDivider className="mb-10 max-w-[200px] mx-auto" />

        {/* Grupos de Cores */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {gruposPaleta.map((grupo, idx) => (
            <motion.div
              key={grupo.titulo}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-dourado/20 shadow-sm flex flex-col items-center justify-between"
            >
              <div className="text-center mb-6">
                <h3
                  className="font-serif text-xl font-medium text-marrom mb-1"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {grupo.titulo}
                </h3>
                <p className="font-sans text-xs text-marrom/60 font-light">
                  {grupo.subtitulo}
                </p>
              </div>

              {/* Bolinhas de cores */}
              <div className="flex flex-wrap justify-center gap-5">
                {grupo.cores.map((cor) => (
                  <div key={cor.nome} className="flex flex-col items-center gap-2">
                    <div className="relative" style={{ width: 52, height: 52 }}>
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          border: '1px solid rgba(201,168,106,0.4)',
                          transform: 'scale(1.15)',
                        }}
                      />
                      <div
                        className="w-full h-full rounded-full shadow-md transition-transform hover:scale-105"
                        style={{
                          backgroundColor: cor.hex,
                          border:
                            cor.hex === '#FFFFFF' || cor.hex === '#F8F1E8'
                              ? '2px solid rgba(201,168,106,0.5)'
                              : '2px solid white',
                        }}
                      />
                    </div>
                    <span className="font-sans text-xs text-marrom/80 font-medium">
                      {cor.nome}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
