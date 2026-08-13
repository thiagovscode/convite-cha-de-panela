// ============================================================
//  COMPONENTE: Footer
//  Rodapé elegante com assinatura e ornamentos
// ============================================================

import { motion } from 'framer-motion';
import { conviteConfig } from '../config/convite';
import { Crown, OrnamentalDivider, HeartIcon, StarSparkle } from './DecorativeElements';

export default function Footer() {
  const cfg = conviteConfig; // ← vem do config/convite.ts

  return (
    <footer
      className="relative py-20 px-4 overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #F8F1E8 0%, #FDF0F0 40%, #F2CACA 100%)',
        borderTop: '1px solid rgba(201,168,106,0.2)',
      }}
    >
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-0 right-0 opacity-10 pointer-events-none overflow-hidden">
      </div>

      {/* Flutuantes */}
      <motion.div
        className="absolute top-8 left-1/4 opacity-30"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <HeartIcon size={14} color="#E8B7B7" />
      </motion.div>
      <motion.div
        className="absolute top-12 right-1/4 opacity-30"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, delay: 1, repeat: Infinity }}
      >
        <StarSparkle size={12} color="#C9A86A" />
      </motion.div>

      <div className="relative z-10 max-w-lg mx-auto text-center">

        <OrnamentalDivider className="mb-10" />

        {/* Coroa */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Crown size={56} color="#C9A86A" className="mx-auto mb-6" />
        </motion.div>

        {/* Assinatura */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <p className="font-sans text-xs font-light tracking-[0.3em] text-dourado uppercase mb-3">
            Com muito carinho
          </p>
          <h2
            className="font-serif text-5xl sm:text-6xl font-light text-marrom mb-2"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {cfg.noiva}
          </h2>
          <p className="font-serif text-2xl text-rosa" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            <HeartIcon size={12} color="#D4B4B4" />
          </p>
        </motion.div>

        {/* Frase final */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-sans text-sm font-light text-marrom/60 mt-6 max-w-xs mx-auto leading-relaxed"
          style={{ fontStyle: 'italic' }}
        >
          "Cada detalhe foi pensado com amor para que esse dia seja inesquecível."
        </motion.p>

        <OrnamentalDivider className="mt-10 mb-8" />

        {/* Info de data e local */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="space-y-1"
        >
          <p className="font-sans text-xs text-marrom/50 font-light tracking-wide">
            {cfg.data} · {cfg.horario}
          </p>
          <p className="font-sans text-xs text-marrom/40 font-light">
            {cfg.endereco}
          </p>
        </motion.div>

        {/* Copyright discreto */}
        <p className="font-sans text-xs text-marrom/25 font-light mt-10 tracking-wider">
          Convite Digital — {cfg.titulo}
        </p>
      </div>
    </footer>
  );
}
