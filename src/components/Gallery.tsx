// ============================================================
//  COMPONENTE: Gallery
//  Galeria estilo conto de fadas — cada foto é um capítulo da história
// ============================================================

import { motion } from 'framer-motion';
import { conviteConfig } from '../config/convite';
import type { GaleriaItem } from '../types';
import { OrnamentalDivider, Crown } from './DecorativeElements';

// ── FOTO COM MOLDURA POLAROID ────────────────────────────────
interface StoryPhotoProps {
  item: GaleriaItem;
  index: number;
}

function StoryPhoto({ item, index }: StoryPhotoProps) {
  const isEven = index % 2 === 0;
  const rotate = isEven ? -2 : 2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-10 md:gap-16`}
    >
      {/* ── FOTO / POLAROID ── */}
      <motion.div
        whileHover={{ rotate: 0, scale: 1.04, transition: { duration: 0.3 } }}
        style={{ rotate }}
        className="flex-shrink-0 cursor-pointer"
      >
        <div
          className="bg-white p-3 pb-12 relative"
          style={{
            boxShadow: '0 12px 40px rgba(74,48,48,0.18)',
            borderRadius: '4px',
          }}
        >
          {/* Pino dourado */}
          <div
            className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-2 border-white z-10"
            style={{
              background: 'linear-gradient(135deg, #C9A86A, #DFC088)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            }}
          />

          <div className="overflow-hidden" style={{ width: 220, height: 270 }}>
            <img
              src={item.src}
              alt={item.capitulo}
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                const t = e.target as HTMLImageElement;
                t.style.display = 'none';
                const p = t.parentElement!;
                p.style.background = 'linear-gradient(135deg, #F2CACA 0%, #F8F1E8 100%)';
                p.innerHTML = `<div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px"><span style="font-size:3rem">📷</span><span style="font-size:0.7rem;color:#C49A9A;font-style:italic">${item.capitulo}</span></div>`;
              }}
            />
          </div>

          {/* Label manuscrito */}
          <p
            className="absolute bottom-3 left-0 right-0 text-center text-dourado"
            style={{ fontSize: '0.72rem', fontStyle: 'italic', fontFamily: "'Dancing Script', cursive" }}
          >
            {item.capitulo}
          </p>
        </div>
      </motion.div>

      {/* ── TEXTO DO CAPÍTULO ── */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 30 : -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.25 }}
        className="flex-1 max-w-md text-center md:text-left"
      >
        {/* Número do capítulo */}
        <p
          className="font-sans text-xs font-semibold tracking-[0.35em] uppercase mb-2"
          style={{ color: '#C9A86A' }}
        >
          {item.capitulo}
        </p>

        {/* Linha decorativa */}
        <OrnamentalDivider className="mb-5 max-w-[160px] mx-auto md:mx-0" />

        {/* Aspas de abertura */}
        <span
          className="block font-serif text-5xl leading-none opacity-20 select-none mb-1"
          style={{ color: '#C9A86A', fontFamily: 'Georgia, serif' }}
        >
          "
        </span>

        {/* Texto do conto */}
        <p
          className="font-serif text-lg md:text-xl leading-relaxed text-marrom/80 font-light italic"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {item.texto}
        </p>

        {/* Frase de transição */}
        {item.transicao && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-5 font-sans text-xs tracking-widest uppercase"
            style={{ color: '#C9A86A', letterSpacing: '0.2em' }}
          >
            — {item.transicao}
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
}

// ── SEPARADOR ENTRE CAPÍTULOS ────────────────────────────────
function ChapterSeparator() {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="flex items-center justify-center gap-4 py-4"
    >
      <div className="h-px flex-1 max-w-[120px]" style={{ background: 'linear-gradient(to right, transparent, #C9A86A)' }} />
      <div className="text-dourado opacity-60">✦</div>
      <div className="h-px flex-1 max-w-[120px]" style={{ background: 'linear-gradient(to left, transparent, #C9A86A)' }} />
    </motion.div>
  );
}

// ── COMPONENTE PRINCIPAL ─────────────────────────────────────
export default function Gallery() {
  const { galeria } = conviteConfig;

  return (
    <section
      className="relative py-24 px-4 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FDF5F5 0%, #F8F1E8 100%)' }}
    >
      {/* Flores de fundo decorativas foram removidas para usar apenas FloatingElements */}

      <div className="relative z-10 max-w-4xl mx-auto">

        {/* ── CABEÇALHO ── */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Crown size={36} color="#C9A86A" className="mx-auto mb-3" />
            <p className="font-sans text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ color: '#C9A86A' }}>
              A NOSSA HISTÓRIA
            </p>
            <h2
              className="font-serif text-4xl sm:text-5xl font-light text-marrom"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Era uma vez...
            </h2>
            <p
              className="mt-3 font-serif text-base text-marrom/50 italic"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              uma história escrita pelas mãos de Deus
            </p>
          </motion.div>
          <OrnamentalDivider className="mt-6 max-w-xs mx-auto" />
        </div>

        {/* ── CAPÍTULOS ── */}
        <div className="flex flex-col gap-16">
          {galeria.map((item, i) => (
            <div key={i}>
              <StoryPhoto item={item} index={i} />
              {i < galeria.length - 1 && <ChapterSeparator />}
            </div>
          ))}
        </div>

        {/* ── ENCERRAMENTO ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="text-center mt-20 px-4"
        >
          <OrnamentalDivider className="mb-8 max-w-xs mx-auto" />
          <p
            className="font-serif text-2xl md:text-3xl font-light text-marrom/80 italic leading-relaxed"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            "E assim, a princesa começou a preparar seu castelo
            <br className="hidden md:block" />
            para viver o seu tão esperado{' '}
            <span style={{ color: '#C9A86A' }}>felizes para sempre</span>."
          </p>
          <Crown size={28} color="#C9A86A" className="mx-auto mt-6 opacity-60" />
        </motion.div>

      </div>
    </section>
  );
}
