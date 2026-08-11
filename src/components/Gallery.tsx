// ============================================================
//  COMPONENTE: Gallery
//  Galeria de fotos com molduras variadas
// ============================================================

import { motion } from 'framer-motion';
import { conviteConfig } from '../config/convite';
import { OrnamentalDivider, Crown, FlowerOrnament } from './DecorativeElements';

// Configuração das molduras para cada foto
const frameStyles = [
  { type: 'oval',     rotate: -4, label: 'Nossa história' },
  { type: 'polaroid', rotate: 3,  label: 'Momentos felizes' },
  { type: 'oval',     rotate: 2,  label: 'Com amor' },
  { type: 'polaroid', rotate: -3, label: 'Para sempre' },
];

interface GalleryPhotoProps {
  src: string;
  style: typeof frameStyles[0];
  index: number;
}

function GalleryPhoto({ src, style, index }: GalleryPhotoProps) {
  const isPolaroid = style.type === 'polaroid';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: style.rotate * 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: style.rotate }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{
        rotate: 0,
        scale: 1.06,
        zIndex: 10,
        transition: { duration: 0.35 },
      }}
      className="cursor-pointer"
      style={{ transformOrigin: 'center bottom' }}
    >
      {isPolaroid ? (
        /* Estilo polaroid */
        <div
          className="bg-white p-3 pb-10 relative"
          style={{
            boxShadow: '0 8px 32px rgba(74,48,48,0.18)',
            borderRadius: '4px',
          }}
        >
          <div
            className="overflow-hidden"
            style={{ width: 180, height: 220 }}
          >
            <img
              src={src}
              alt={style.label}
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                const t = e.target as HTMLImageElement;
                t.style.display = 'none';
                const p = t.parentElement!;
                p.style.background = 'linear-gradient(135deg, #F2CACA, #F8F1E8)';
                p.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:2.5rem">📷</div>`;
              }}
            />
          </div>
          {/* Texto manuscrito embaixo — estilo polaroid */}
          <p
            className="absolute bottom-2 left-0 right-0 text-center font-sans text-xs text-marrom/50"
            style={{ fontSize: '0.7rem', fontStyle: 'italic' }}
          >
            {style.label}
          </p>
          {/* Pino decorativo */}
          <div
            className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-white"
            style={{ background: 'linear-gradient(135deg, #C9A86A, #DFC088)', boxShadow: '0 2px 6px rgba(0,0,0,0.15)' }}
          />
        </div>
      ) : (
        /* Estilo oval */
        <div className="relative" style={{ padding: 12 }}>
          {/* Anel externo */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50% / 45%',
              border: '1px solid rgba(201,168,106,0.3)',
            }}
          />
          {/* Imagem oval */}
          <div
            style={{
              width: 180,
              height: 220,
              borderRadius: '50% / 45%',
              overflow: 'hidden',
              border: '3px solid #C9A86A',
              boxShadow: '0 8px 30px rgba(74,48,48,0.15)',
            }}
          >
            <img
              src={src}
              alt={style.label}
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                const t = e.target as HTMLImageElement;
                t.style.display = 'none';
                const p = t.parentElement!;
                p.style.background = 'linear-gradient(135deg, #F2CACA, #F8F1E8)';
                p.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:2.5rem">💕</div>`;
              }}
            />
          </div>
          {/* Ponto dourado central superior */}
          <div
            className="absolute top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
            style={{ background: '#C9A86A' }}
          />
        </div>
      )}
    </motion.div>
  );
}

export default function Gallery() {
  const { galeria, casal } = conviteConfig; // ← vem do config/convite.ts

  // Preenche com fotos da galeria, repetindo se necessário
  const photos = frameStyles.map((_, i) => galeria[i % galeria.length] || '/images/foto1.jpg');

  return (
    <section
      className="relative py-24 px-4 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FDF5F5 0%, #F8F1E8 100%)' }}
    >
      {/* Flores de fundo */}
      <div className="absolute left-4 top-8 opacity-8">
        <FlowerOrnament size={100} color="#E8B7B7" />
      </div>
      <div className="absolute right-4 bottom-8 opacity-8">
        <FlowerOrnament size={80} color="#C9A86A" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">

        {/* Cabeçalho */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Crown size={36} color="#C9A86A" className="mx-auto mb-3" />
            <p className="font-sans text-xs font-semibold tracking-[0.3em] text-dourado uppercase mb-3">
              MEMÓRIAS
            </p>
            <h2
              className="font-serif text-4xl sm:text-5xl font-light text-marrom"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {casal}
            </h2>
          </motion.div>
          <OrnamentalDivider className="mt-6 max-w-xs mx-auto" />
        </div>

        {/* Grid de fotos com efeito de bagunça organizada */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {photos.map((src, i) => (
            <GalleryPhoto
              key={i}
              src={src}
              style={frameStyles[i]}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
