// ============================================================
//  COMPONENTE: GiftList
//  Lista de presentes com filtros por categoria
// ============================================================

import { motion, AnimatePresence } from 'framer-motion';
import { conviteConfig } from '../config/convite';
import { useGifts } from '../hooks/useGifts';
import GiftCard from './GiftCard';
import GiftModal from './GiftModal';
import { OrnamentalDivider, Crown } from './DecorativeElements';
import type { Categoria } from '../types';

// ── CATEGORIAS DE FILTRO — altere no config/convite.ts se quiser adicionar mais
const CATEGORIES: Categoria[] = [
  'Todos',
  'Panelas',
  'Utensílios',
  'Eletrodomésticos',
  'Mesa posta',
  'Casa',
];

export default function GiftList() {
  const {
    filteredGifts,
    selectedGift,
    isModalOpen,
    isReserved,
    filterCategory,
    setFilterCategory,
    openModal,
    closeModal,
    reserveGift,
    isLoading,
    error,
    reserveError,
  } = useGifts();

  const cfg = conviteConfig;

  // Contagem de disponíveis
  const disponiveis = filteredGifts.filter((p) => !p.esgotado).length;

  return (
    <section
      id="presentes"
      className="relative py-24 px-4 overflow-hidden bg-diary-page"
    >
      <div className="relative z-10 max-w-5xl mx-auto">

        {/* ── CABEÇALHO ───────────────────────────────────── */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Crown size={40} color="#C9A86A" className="mx-auto mb-3" />
            <p className="font-sans text-xs font-semibold tracking-[0.3em] text-dourado uppercase mb-3">
              LISTA DE PRESENTES
            </p>
            <h2
              className="font-serif text-4xl sm:text-5xl font-light text-marrom mb-3"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {cfg.tituloPresentes}
            </h2>
            <p className="font-sans text-sm text-marrom/60 font-light">
              {disponiveis} {disponiveis === 1 ? 'presente disponível' : 'presentes disponíveis'}
            </p>
          </motion.div>

          <OrnamentalDivider className="mt-6 mb-8 max-w-xs mx-auto" />

          {/* ── FILTROS DE CATEGORIA ──────────────────────── */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilterCategory(cat)}
                className={`category-badge px-4 py-2 rounded transition-all duration-300 ${
                  filterCategory === cat
                    ? 'border-[#B89947] bg-[#B89947]/10'
                    : 'border-transparent hover:border-[#B89947]/40'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>

        {/* ── ESTADO DE CARREGAMENTO ─────────────────────── */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white border border-rosa/10 overflow-hidden"
                style={{ boxShadow: '0 2px 8px rgba(74,48,48,0.05)' }}
              >
                <div
                  className="h-32 animate-pulse"
                  style={{ background: 'linear-gradient(90deg, #F8F1E8, #F2CACA30, #F8F1E8)', backgroundSize: '200% 100%', animation: 'pulse-soft 1.5s ease-in-out infinite' }}
                />
                <div className="p-4 space-y-2">
                  <div className="h-3 rounded-full bg-rosa/20 w-1/3 animate-pulse" />
                  <div className="h-4 rounded-full bg-marrom/10 w-2/3 animate-pulse" />
                  <div className="h-3 rounded-full bg-rosa/10 w-1/4 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── ESTADO DE ERRO ────────────────────────────────── */}
        {error && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 px-4"
          >
            <div
              className="inline-flex flex-col items-center gap-4 p-8 rounded-3xl"
              style={{ background: 'rgba(232,183,183,0.15)', border: '1px solid rgba(232,183,183,0.4)' }}
            >
              <span className="text-4xl">🌸</span>
              <p className="font-serif text-xl text-marrom/70">Não foi possível carregar os presentes</p>
              <p className="font-sans text-xs text-marrom/50 max-w-xs">{error}</p>
              <p className="font-sans text-xs text-dourado">Certifique-se que o servidor está rodando: <code className="bg-rosa/20 px-1 rounded">npm run server</code></p>
            </div>
          </motion.div>
        )}

        {/* ── GRID DE PRESENTES ────────────────────────────── */}
        {!isLoading && !error && (
          <>
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
            >
              <AnimatePresence mode="popLayout">
                {filteredGifts.map((presente) => (
                  <GiftCard
                    key={presente.id}
                    presente={presente}
                    onClick={openModal}
                  />
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Estado vazio */}
            {filteredGifts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <p className="font-serif text-2xl text-marrom/40">Nenhum presente nessa categoria</p>
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* ── MODAL ────────────────────────────────────────── */}
      <GiftModal
        presente={selectedGift}
        isOpen={isModalOpen}
        isReserved={isReserved}
        reserveError={reserveError}
        onClose={closeModal}
        onReserve={reserveGift}
      />
    </section>
  );
}
