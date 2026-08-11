// ============================================================
//  COMPONENTE: Hero
//  Tela inicial — estética "O Diário da Princesa" / Genovia
//  ESTILO DIÁRIO VINTAGE
// ============================================================

import { motion } from 'framer-motion';
import { conviteConfig } from '../config/convite';
import PhotoFrame from './PhotoFrame';
import {
  GenoviaCrest,
  MiaTiara,
  RoyalWaxSeal,
  GenoviaPostageStamp,
  HandwrittenNote,
  PearSketch,
  OrnamentalBorder
} from './DecorativeElements';

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, delay, ease: 'easeOut' as const },
  }),
};

export default function Hero() {
  const cfg = conviteConfig;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-20 bg-diary-page">
      
      {/* ── MOLDURA DA PÁGINA (Vignette e Borda) ──────────── */}
      <div className="vignette-overlay" />
      <OrnamentalBorder className="z-0" />

      {/* ── ELEMENTOS SOLTOS DE DIÁRIO (Scrapbook feel) ────── */}
      
      {/* Selo postal no canto superior direito */}
      <motion.div 
        className="absolute top-8 right-6 md:top-12 md:right-16 z-10 opacity-90"
        initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
        animate={{ opacity: 0.9, rotate: 8, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
      >
        <GenoviaPostageStamp size={70} rotation={0} />
      </motion.div>

      {/* Selo de cera no canto superior esquerdo (fechando uma dobra imaginária) */}
      <motion.div 
        className="absolute top-10 left-8 md:top-14 md:left-20 z-10"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.7, type: 'spring' }}
      >
        <RoyalWaxSeal size={55} />
      </motion.div>

      {/* Anotação manuscrita estilo Mia */}
      <motion.div
        className="absolute top-24 left-12 md:top-32 md:left-32 z-20 hidden sm:block animate-ink"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1.5 }}
      >
        <HandwrittenNote text="Princess lessons..." angle={-10} type="apple" className="text-xl opacity-60" />
      </motion.div>

      {/* ── CONTEÚDO CENTRAL ─────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto mt-16 md:mt-10">

        {/* Brasão central em estilo carimbo (tinta sépia) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 2 }}
          className="mb-8"
        >
          <GenoviaCrest size={65} color="#3A2626" />
        </motion.div>

        {/* Frase introdutória manuscrita */}
        <motion.div
          custom={0.4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-6"
        >
          <HandwrittenNote text={cfg.fraseHero} angle={-3} type="script" className="text-3xl text-marrom" />
        </motion.div>

        {/* Título Principal (Elegante e Serifado) */}
        <motion.h1
          custom={0.65}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="font-serif leading-tight mb-4"
          style={{
            fontSize: 'clamp(3.5rem, 10vw, 5.5rem)',
            color: '#3A2626',
            fontWeight: 400,
            letterSpacing: '0.02em'
          }}
        >
          {cfg.titulo}
        </motion.h1>

        {/* ── FOTO DA NOIVA ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, filter: 'blur(5px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 2, delay: 0.8, ease: 'easeOut' }}
          className="mb-10 mt-8 relative"
        >
          {/* Tiara sobreposta delicadamente no locket */}
          <motion.div className="absolute -top-12 left-1/2 -translate-x-1/2 z-20"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5, duration: 1.5 }}>
            <MiaTiara width={120} />
          </motion.div>

          <PhotoFrame
            src={cfg.fotoNoiva}
            alt={`Foto de ${cfg.noiva}`}
            size="lg"
            shape="oval"
            animate={true}
            withVeil={true}
          />
          
          {/* Fita/Adesivo na borda da foto para dar ar de scrapbook */}
          <div className="absolute -right-4 top-10 w-12 h-4 bg-creme opacity-60 rotate-45 border border-marrom/10" style={{ mixBlendMode: 'multiply' }} />
          <div className="absolute -left-3 bottom-12 w-10 h-4 bg-creme opacity-50 -rotate-12 border border-marrom/10" style={{ mixBlendMode: 'multiply' }} />
        </motion.div>

        {/* Subtítulo estilo texto batido à máquina ou serifado simples */}
        <motion.p
          custom={1.2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="font-serif text-lg font-light tracking-wider mb-10 max-w-sm italic text-marrom/80"
        >
          {cfg.subtitulo}
        </motion.p>

        {/* ── DATA E HORÁRIO (Estilo convite formal vintage) ── */}
        <motion.div
          custom={1.4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-col items-center gap-2 border-y border-[#B89947]/30 py-6 px-12"
        >
          <p className="font-serif text-3xl font-light tracking-widest text-[#3A2626]">
            {cfg.data}
          </p>
          <p className="font-sans text-xs font-medium tracking-[0.3em] mt-1 text-[#B89947] uppercase">
            às {cfg.horario}
          </p>
        </motion.div>

        {/* ── EASTER EGG (Rodapé) ─────────────────────────── */}
        <motion.div
          className="absolute bottom-8 right-8 md:bottom-12 md:right-16 z-20 flex flex-col items-end opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 2, delay: 2 }}
        >
          <HandwrittenNote text="P.S.: Shut up!" angle={-8} type="apple" className="text-sm opacity-70 mb-1" />
          <PearSketch size={30} className="mr-4 opacity-50" />
        </motion.div>

        {/* ── SCROLL CTA ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="mt-16 mb-4 flex flex-col items-center gap-2"
        >
          <p className="font-sans text-[10px] tracking-widest uppercase text-[#3A2626]/50">
            Virar a página
          </p>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
            <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
              <path d="M5 8 L10 13 L15 8" stroke="#3A2626" strokeOpacity="0.5"
                strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
