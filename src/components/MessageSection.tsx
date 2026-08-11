// ============================================================
//  COMPONENTE: MessageSection
//  Seção de mensagem — estética de página de diário pessoal
// ============================================================

import { motion } from 'framer-motion';
import { conviteConfig } from '../config/convite';
import PhotoFrame from './PhotoFrame';
import { HeartIcon, OrnamentalDivider, FlowerOrnament, ArabescoLeft, ArabescoRight } from './DecorativeElements';

export default function MessageSection() {
  const cfg = conviteConfig; // ← vem do config/convite.ts

  return (
    <section
      className="relative py-24 px-4 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #FDF0F0 0%, #F8F1E8 50%, #FDF5F5 100%)' }}
    >
      {/* Background texture lines — estilo papel */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #4A3030 0px, #4A3030 1px, transparent 1px, transparent 28px)',
          backgroundSize: '100% 28px',
        }}
      />

      {/* Flor decorativa — canto superior esquerdo */}
      <motion.div
        className="absolute top-8 left-6 opacity-20"
        animate={{ rotate: [0, 10, -5, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      >
        <FlowerOrnament size={60} color="#C9A86A" />
      </motion.div>

      {/* Flor decorativa — canto inferior direito */}
      <motion.div
        className="absolute bottom-8 right-6 opacity-20"
        animate={{ rotate: [0, -8, 5, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      >
        <FlowerOrnament size={80} color="#E8B7B7" />
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto">

        {/* Layout: 2 colunas no desktop, 1 no mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* ── COLUNA DE TEXTO ─────────────────────────────── */}
          <div>
            {/* Arabescos decorativos */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-3 mb-4"
            >
              <ArabescoLeft color="#C9A86A" />
            </motion.div>

            {/* Título da seção */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-4xl sm:text-5xl font-light text-marrom mb-6 leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {cfg.tituloMensagem}
            </motion.h2>

            <OrnamentalDivider className="mb-6 max-w-[200px]" />

            {/* Mensagem — vem do config */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.25 }}
              className="relative"
            >
              {/* Aspas decorativas */}
              <span
                className="absolute -top-4 -left-2 font-serif text-7xl leading-none opacity-15 select-none"
                style={{ color: '#C9A86A', fontFamily: "Georgia, serif" }}
              >
                "
              </span>
              <p
                className="font-sans text-base leading-8 text-marrom/80 font-light pl-4 italic"
                style={{ fontStyle: 'italic' }}
              >
                {cfg.mensagem}
              </p>
              <span
                className="absolute -bottom-8 right-0 font-serif text-7xl leading-none opacity-15 select-none"
                style={{ color: '#C9A86A', fontFamily: "Georgia, serif" }}
              >
                "
              </span>
            </motion.div>

            {/* Assinatura */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-12 font-serif text-2xl text-dourado"
              style={{ fontFamily: "'Dancing Script', 'Cormorant Garamond', cursive" }}
            >
              Com amor, {cfg.noiva} <HeartIcon size={24} color="#D4B4B4" className="inline mb-1 ml-1" />
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <ArabescoRight color="#C9A86A" />
            </motion.div>
          </div>

          {/* ── COLUNA DA FOTO DO CASAL ─────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-col items-center"
          >
            {/* Foto do casal na moldura vintage */}
            <div className="relative">
              {/* Sombra de papel */}
              <div
                className="absolute inset-4 rounded-3xl opacity-20"
                style={{ background: '#4A3030', filter: 'blur(20px)', transform: 'translateY(8px)' }}
              />
              <PhotoFrame
                src={cfg.fotoCasal}
                alt={`${cfg.casal}`}
                size="lg"
                shape="oval"
                animate={false}
              />
            </div>

            {/* Nome do casal abaixo da foto */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-8 font-serif text-2xl font-light text-marrom text-center"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {cfg.casal}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
