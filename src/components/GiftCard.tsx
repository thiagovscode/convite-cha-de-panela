// ============================================================
//  COMPONENTE: GiftCard
//  Card individual de presente com status de disponibilidade
// ============================================================

import { motion } from 'framer-motion';
import type { Presente } from '../types';

interface GiftCardProps {
  presente: Presente;
  onClick: (p: Presente) => void;
}

export default function GiftCard({ presente, onClick }: GiftCardProps) {
  const isSoldOut = presente.esgotado;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={!isSoldOut ? { y: -6, scale: 1.02 } : {}}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      onClick={() => onClick(presente)}
      className={`relative rounded-2xl overflow-hidden cursor-pointer bg-white border transition-all duration-300
        ${isSoldOut
          ? 'border-rosa/40 opacity-80'
          : 'border-dourado/20 hover:border-rosa/50 hover:shadow-elegant'
        }`}
      style={{
        boxShadow: isSoldOut
          ? '0 2px 10px rgba(74,48,48,0.06)'
          : '0 4px 20px rgba(74,48,48,0.07)',
      }}
    >
      {/* ── STATUS BADGE ──────────────────────────────────── */}
      {isSoldOut && (
        <div
          className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2 py-1 rounded-full text-white text-xs font-semibold"
          style={{ background: 'linear-gradient(135deg, #C9A86A, #DFC088)', fontSize: '0.65rem' }}
        >
          <svg width="10" height="10" viewBox="0 0 20 20" fill="white">
            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
          </svg>
          Reservado
        </div>
      )}

      {/* ── ÁREA DA IMAGEM ─────────────────────────── */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          height: 160,
          background: isSoldOut
            ? '#EEEEEE'
            : '#FDF0F0',
        }}
      >
        {presente.imagem ? (
          <img 
            src={presente.imagem} 
            alt={presente.nome}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            style={{ 
              filter: isSoldOut ? 'grayscale(100%) opacity(70%)' : 'none',
              transform: isSoldOut ? 'scale(1)' : undefined
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-marrom/20 text-4xl">
            🎁
          </div>
        )}

        {/* Overlay de reservado */}
        {isSoldOut && (
          <div className="absolute inset-0 flex items-center justify-center"
            style={{ background: 'rgba(248,241,232,0.6)' }}>
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(201,168,106,0.15)', border: '2px solid rgba(201,168,106,0.4)' }}
            >
              <span className="text-xl">💗</span>
            </div>
          </div>
        )}
      </div>

      {/* ── INFORMAÇÕES ───────────────────────────────────── */}
      <div className="p-4">
        {/* Categoria */}
        <span className="category-badge">{presente.categoria}</span>

        {/* Nome */}
        <h3
          className="font-serif text-lg font-medium text-marrom mt-2 mb-1 leading-snug"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {presente.nome}
        </h3>

        {/* Cor */}
        <div className="flex items-center gap-1.5 mt-2">
          <div
            className="w-3 h-3 rounded-full border border-dourado/30"
            style={{
              backgroundColor:
                presente.cor === 'Branco' ? '#FAFAFA' :
                presente.cor === 'Rosa' ? '#E8B7B7' :
                presente.cor === 'Rosa Antigo' ? '#C49A9A' :
                presente.cor === 'Dourado' ? '#C9A86A' :
                presente.cor === 'Creme' ? '#F8F1E8' :
                presente.cor === 'Preto' ? '#2D2D2D' :
                '#E8B7B7',
            }}
          />
          <span className="font-sans text-xs text-marrom/50 font-light">{presente.cor}</span>
        </div>

        {/* CTA */}
        <div className="mt-3 pt-3 border-t border-rosa/15">
          {isSoldOut ? (
            <p className="font-sans text-xs text-center text-marrom/40 font-light">
              Este presente já foi reservado 💗
            </p>
          ) : (
            <p className="font-sans text-xs text-center text-dourado font-medium tracking-wide">
              Ver detalhes →
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
