// ============================================================
//  COMPONENTE: ColorPalette
//  Paleta de cores dos presentes — círculos elegantes
// ============================================================

import { motion } from 'framer-motion';
import { conviteConfig } from '../config/convite';
import { OrnamentalDivider } from './DecorativeElements';

export default function ColorPalette() {
  const { coresPresentes } = conviteConfig; // ← vem do config/convite.ts

  return (
    <section
      className="relative py-16 px-4 overflow-hidden"
      style={{ background: '#FDF5F5' }}
    >
      <div className="relative z-10 max-w-2xl mx-auto text-center">

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
            Escolha a sua cor
          </h2>
          <p className="font-sans text-sm text-marrom/60 font-light max-w-xs mx-auto mb-6">
            Cada presente pode possuir uma cor disponível. Verifique no card do presente.
          </p>
        </motion.div>

        <OrnamentalDivider className="mb-10 max-w-[200px] mx-auto" />

        {/* Círculos de cores */}
        <div className="flex flex-wrap justify-center gap-6">
          {coresPresentes.map((cor, i) => (
            <motion.div
              key={cor.nome}
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col items-center gap-2"
            >
              {/* Círculo de cor com borda dourada */}
              <div
                className="relative"
                style={{ width: 60, height: 60 }}
              >
                {/* Anel externo */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    border: '1px solid rgba(201,168,106,0.4)',
                    transform: 'scale(1.15)',
                  }}
                />
                {/* Círculo principal */}
                <div
                  className="w-full h-full rounded-full border-2 border-white shadow-md"
                  style={{
                    backgroundColor: cor.hex,
                    boxShadow: `0 4px 16px ${cor.hex}60`,
                    border: cor.hex === '#FAFAFA' || cor.hex === '#FFFFFF'
                      ? '2px solid rgba(201,168,106,0.5)'
                      : '2px solid white',
                  }}
                />
              </div>
              {/* Nome da cor */}
              <span className="font-sans text-xs text-marrom/70 font-medium tracking-wide">
                {cor.nome}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
