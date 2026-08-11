// ============================================================
//  COMPONENTE: GiftModal
//  Modal elegante para detalhes do presente + reserva
// ============================================================

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Presente } from '../types';
import { HeartIcon } from './DecorativeElements';
import { Crown, FlowerOrnament } from './DecorativeElements';

interface GiftModalProps {
  presente: Presente | null;
  isOpen: boolean;
  isReserved: boolean;
  reserveError?: string | null;
  onClose: () => void;
  onReserve: (id: number, guestName: string) => void;
}

export default function GiftModal({
  presente,
  isOpen,
  isReserved,
  reserveError,
  onClose,
  onReserve,
}: GiftModalProps) {
  const [guestName, setGuestName] = useState('');
  const [showInput, setShowInput] = useState(false);

  // Fecha com ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Reseta estado interno ao abrir/fechar
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setGuestName('');
        setShowInput(false);
      }, 300);
    }
  }, [isOpen]);

  if (!presente && !isOpen) return null;

  const corHex =
    presente?.cor === 'Rosa'      ? '#E8B7B7' :
    presente?.cor === 'Rosa Antigo'? '#C49A9A' :
    presente?.cor === 'Dourado'   ? '#C9A86A' :
    presente?.cor === 'Creme'     ? '#F8F1E8' :
    presente?.cor === 'Preto'     ? '#2D2D2D' :
    '#FAFAFA';

  const handleReserve = () => {
    if (!guestName.trim() || guestName.trim().length < 2) return;
    onReserve(presente!.id, guestName);
  };

  return (
    <AnimatePresence>
      {isOpen && presente && (
        <>
          {/* ── OVERLAY ───────────────────────────────────── */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 modal-overlay"
            style={{ background: 'rgba(74, 48, 48, 0.45)' }}
            onClick={onClose}
          />

          {/* ── MODAL ─────────────────────────────────────── */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden pointer-events-auto flex flex-col"
              style={{ boxShadow: '0 24px 80px rgba(74,48,48,0.25)', maxHeight: '90vh' }}
              onClick={(e) => e.stopPropagation()}
            >

              {/* ── HEADER VINTAGE ───────────────────────── */}
              <div
                className="relative flex flex-col items-center justify-center py-8 px-6 flex-shrink-0 bg-diary-page"
                style={{
                  borderBottom: '1px solid rgba(184, 153, 71, 0.3)',
                }}
              >
                {/* Decoração de canto */}
                <div className="absolute top-3 left-3 opacity-20">
                  <FlowerOrnament size={30} color="#C9A86A" />
                </div>
                <div className="absolute top-3 right-3 opacity-20">
                  <FlowerOrnament size={30} color="#E8B7B7" />
                </div>

                <Crown size={32} color="#C9A86A" className="mb-2 opacity-70" />

                {presente.imagem ? (
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-3 border-2"
                       style={{ borderColor: 'rgba(184, 153, 71, 0.4)', boxShadow: '0 4px 10px rgba(58,38,38,0.1)' }}>
                    <img src={presente.imagem} alt={presente.nome} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-3"
                    style={{
                      backgroundColor: 'var(--creme)',
                      border: '1px solid rgba(184, 153, 71, 0.4)',
                      boxShadow: 'inset 0 0 10px rgba(58,38,38,0.05)'
                    }}
                  >
                    <span style={{ filter: 'sepia(0.3) saturate(0.8)' }}>🎁</span>
                  </div>
                )}

                <span className="category-badge mb-1">{presente.categoria}</span>

                <h2
                  className="font-serif text-2xl font-light text-marrom text-center leading-tight"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {presente.nome}
                </h2>
              </div>

              {/* ── BODY ──────────────────────────────────── */}
              <div className="p-6 overflow-y-auto flex-1 bg-creme relative">
                
                {/* Textura sutil no fundo */}
                <div className="absolute inset-0 pointer-events-none opacity-30" style={{ background: 'radial-gradient(circle at center, transparent 50%, rgba(58,38,38,0.05) 100%)' }} />

                <div className="flex items-center gap-2 mb-3 relative z-10">
                  <div
                    className="w-4 h-4 rounded-full border border-dourado/30 shadow-sm"
                    style={{ backgroundColor: corHex }}
                  />
                  <span className="font-sans text-xs text-marrom/70">
                    Cor: <strong>{presente.cor}</strong>
                  </span>
                </div>

                <div
                  className="h-px mb-4"
                  style={{ background: 'linear-gradient(to right, transparent, rgba(184, 153, 71, 0.4), transparent)' }}
                />

                <p className="font-sans text-sm leading-6 text-marrom/75 font-light mb-6">
                  {presente.descricao}
                </p>

                {/* ── FLUXO DE RESERVA ──────────────────────── */}
                {isReserved || presente.esgotado ? (
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-4 rounded border"
                    style={{ 
                      background: reserveError ? 'rgba(212,180,180,0.1)' : 'rgba(184, 153, 71, 0.05)',
                      borderColor: reserveError ? 'rgba(212,180,180,0.3)' : 'rgba(184, 153, 71, 0.2)'
                    }}
                  >
                    {reserveError ? (
                      <>
                        <p className="font-sans text-sm text-red-600 mb-1 px-4">{reserveError}</p>
                        <button onClick={onClose} className="text-xs text-marrom/60 underline mt-2">Fechar</button>
                      </>
                    ) : (
                      <>
                        <p className="font-serif text-xl text-marrom mb-1">
                          Presente reservado! <HeartIcon size={20} color="#D4B4B4" className="inline ml-1" />
                        </p>
                        <p className="font-sans text-xs text-marrom/50">Obrigada pela sua escolha carinhosa!</p>
                      </>
                    )}
                  </motion.div>
                ) : (
                  <>
                    <AnimatePresence mode="wait">
                      {!showInput ? (
                        <motion.button
                          key="btn-start"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setShowInput(true)}
                          className="btn-primary w-full text-sm justify-center"
                        >
                          <HeartIcon size={20} color="#C9A86A" />
                          VOU DAR ESTE PRESENTE
                        </motion.button>
                      ) : (
                        <motion.div
                          key="form-input"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex flex-col gap-3"
                        >
                          <label className="text-xs font-sans text-marrom/70 uppercase tracking-widest ml-1">Seu nome:</label>
                          <input 
                            type="text" 
                            placeholder="Digite seu nome completo"
                            className="w-full border-b border-dourado/40 px-2 py-2 text-sm focus:outline-none focus:border-dourado bg-transparent text-marrom font-serif italic"
                            value={guestName}
                            onChange={(e) => setGuestName(e.target.value)}
                            autoFocus
                          />
                          <div className="flex gap-2 mt-1">
                            <button 
                              onClick={() => setShowInput(false)}
                              className="flex-1 py-2 border border-marrom/20 text-marrom/60 text-xs font-semibold hover:bg-marrom/5 transition-colors uppercase tracking-widest"
                            >
                              Cancelar
                            </button>
                            <button 
                              onClick={handleReserve}
                              disabled={guestName.trim().length < 2}
                              className="flex-1 btn-primary py-2 text-xs justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Confirmar
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}

                {/* Link de compra */}
                {presente.linkCompra && !presente.esgotado && !isReserved && !showInput && (
                  <a
                    href={presente.linkCompra}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center mt-4 font-sans text-xs text-dourado underline underline-offset-2 hover:text-marrom transition-colors"
                  >
                    Ver onde comprar ↗
                  </a>
                )}
              </div>

              {/* ── BOTÃO FECHAR ──────────────────────────── */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors z-10"
              >
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                  <path d="M15 5L5 15M5 5l10 10" stroke="#4A3030" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
