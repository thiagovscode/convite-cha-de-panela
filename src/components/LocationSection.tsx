// ============================================================
//  COMPONENTE: LocationSection
//  Seção de localização — endereço e botão Google Maps
// ============================================================

import { motion } from 'framer-motion';
import { conviteConfig } from '../config/convite';
import { OrnamentalDivider, Crown } from './DecorativeElements';

export default function LocationSection() {
  const cfg = conviteConfig; // ← vem do config/convite.ts

  return (
    <section className="relative py-24 px-4 overflow-hidden" style={{ background: 'linear-gradient(180deg, #F8F1E8 0%, #FDF5F5 50%, #F8F1E8 100%)' }}>

      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 70% 30%, rgba(201,168,106,0.4) 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto text-center">

        {/* Ornamento topo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-6"
        >
          <Crown size={40} color="#C9A86A" />
        </motion.div>

        {/* Título */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-sans text-xs font-semibold tracking-[0.3em] text-dourado uppercase mb-3"
        >
          {cfg.tituloLocalizacao}
        </motion.p>

        <OrnamentalDivider className="mb-8 max-w-xs mx-auto" />

        {/* Card de localização */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative bg-white rounded-3xl shadow-elegant p-10 border border-rosa/20 mx-auto max-w-md"
        >
          {/* Canto decorativo */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-dourado/40 rounded-tl-lg" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-dourado/40 rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-dourado/40 rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-dourado/40 rounded-br-lg" />

          {/* Ícone de localização */}
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ background: 'linear-gradient(135deg, #F2CACA, #E8B7B7)' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                fill="#4A3030"
                opacity="0.8"
              />
            </svg>
          </div>

          {/* Endereço */}
          <h3
            className="font-serif text-2xl font-light text-marrom mb-2 leading-snug"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {cfg.endereco}
          </h3>
          <p className="font-sans text-sm text-marrom/60 font-light tracking-wide mb-8">
            {cfg.enderecoDetalhes}
          </p>

          {/* Botão Google Maps */}
          <motion.a
            href={cfg.linkMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-golden inline-flex items-center gap-2 text-sm"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            VER LOCALIZAÇÃO
          </motion.a>
        </motion.div>

        <OrnamentalDivider className="mt-12 max-w-xs mx-auto" />
      </div>
    </section>
  );
}
