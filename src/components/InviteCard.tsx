// ============================================================
//  COMPONENTE: InviteCard
//  Cartão de convite no contexto do conto de fadas
//  Aparece após a galeria de história — o "próximo capítulo"
// ============================================================

import { motion } from 'framer-motion';
import { conviteConfig } from '../config/convite';
import { OrnamentalDivider, Crown, FlowerOrnament } from './DecorativeElements';

export default function InviteCard() {
  const cfg = conviteConfig;

  return (
    <section
      className="relative py-20 px-4 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #FCE4EC 0%, #FFF5F7 60%, #FCE4EC 100%)' }}
    >
      {/* Flores decorativas de fundo */}
      <motion.div
        className="absolute top-6 left-4 opacity-15 pointer-events-none"
        animate={{ rotate: [0, 8, -4, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      >
        <FlowerOrnament size={90} color="#F2B8C6" />
      </motion.div>
      <motion.div
        className="absolute bottom-6 right-4 opacity-15 pointer-events-none"
        animate={{ rotate: [0, -6, 4, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      >
        <FlowerOrnament size={110} color="#C9A86A" />
      </motion.div>

      <div className="relative z-10 max-w-2xl mx-auto">

        {/* ── FRASE DE INTRODUÇÃO (contexto da história) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center mb-10"
        >
          <p
            className="font-serif text-xl sm:text-2xl font-light italic text-marrom/70 leading-relaxed"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            "E Deus, que tanto cuida da nossa princesa,
            <br className="hidden sm:block" />
            preparou mais um capítulo especial..."
          </p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-20" style={{ background: 'linear-gradient(to right, transparent, #C9A86A)' }} />
            <span style={{ color: '#F2B8C6', fontSize: '1.2rem' }}>✿</span>
            <div className="h-px w-20" style={{ background: 'linear-gradient(to left, transparent, #C9A86A)' }} />
          </div>
        </motion.div>

        {/* ── CARTÃO DO CONVITE ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative bg-white rounded-2xl p-10 sm:p-14 text-center"
          style={{
            boxShadow: '0 20px 60px rgba(107,45,62,0.10), 0 4px 16px rgba(107,45,62,0.06)',
            border: '1px solid rgba(201,168,106,0.3)',
          }}
        >
          {/* Cantos dourados decorativos */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-dourado/40 rounded-tl" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-dourado/40 rounded-tr" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-dourado/40 rounded-bl" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-dourado/40 rounded-br" />

          {/* Coroa */}
          <Crown size={32} color="#C9A86A" className="mx-auto mb-5" />

          {/* Abertura do convite no estilo conto */}
          <p
            className="font-serif text-base italic text-marrom/50 mb-2 leading-relaxed"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Antes do grande "felizes para sempre"...
          </p>

          <p className="font-sans text-xs font-semibold tracking-[0.35em] uppercase text-dourado mb-4">
            a princesa convida você para
          </p>

          <OrnamentalDivider className="mb-6 max-w-[160px] mx-auto" />

          {/* Nome do evento */}
          <h2
            className="font-serif font-light text-marrom leading-tight mb-2"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2.2rem, 8vw, 3.5rem)',
            }}
          >
            Chá de Panela
          </h2>
          <p
            className="font-serif text-2xl sm:text-3xl font-light italic mb-2"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: '#C9A86A',
            }}
          >
            da {cfg.noiva}
          </p>
          <p
            className="font-serif text-base italic text-marrom/50 mb-8"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            — onde cada presente ajuda a montar o castelo 👑🍽️ —
          </p>

          <OrnamentalDivider className="mb-8 max-w-[160px] mx-auto" />

          {/* Data e hora */}
          <div className="flex flex-col items-center gap-1 mb-6">
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-marrom/40 mb-1">quando</span>
            <p
              className="font-serif text-3xl font-light text-marrom"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {cfg.data}
            </p>
            <p className="font-sans text-sm tracking-widest text-dourado uppercase mt-1">
              às {cfg.horario}
            </p>
          </div>

          {/* Separador floral */}
          <div className="flex items-center justify-center gap-3 my-5">
            <div className="h-px w-12" style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,106,0.5))' }} />
            <span style={{ color: '#F9C5D1', fontSize: '0.9rem' }}>✿</span>
            <div className="h-px w-12" style={{ background: 'linear-gradient(to left, transparent, rgba(201,168,106,0.5))' }} />
          </div>

          {/* Local */}
          <div className="flex flex-col items-center gap-1 mb-8">
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-marrom/40 mb-1">onde fica o castelo</span>
            <p
              className="font-serif text-xl font-light text-marrom leading-snug"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {cfg.endereco}
            </p>
            <p className="font-sans text-sm text-marrom/50 tracking-wide mt-1">
              {cfg.enderecoDetalhes}
            </p>
          </div>

          {/* Botão Maps */}
          <motion.a
            href={cfg.linkMaps}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-8 py-3 rounded text-sm font-sans font-medium tracking-widest uppercase transition-all"
            style={{
              background: 'linear-gradient(135deg, #F9C5D1, #F2B8C6)',
              color: '#6B2D3E',
              border: '1px solid rgba(201,168,106,0.4)',
              boxShadow: '0 4px 16px rgba(107,45,62,0.10)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                fill="#6B2D3E"
              />
            </svg>
            Chegar ao castelo
          </motion.a>
        </motion.div>

        {/* ── FRASE DE ENCERRAMENTO ── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-center mt-10 font-serif text-base italic text-marrom/50"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          "Porque toda boa história fica ainda mais bonita
          <br className="hidden sm:block" />
          quando contada entre amigas." 🤍
        </motion.p>

      </div>
    </section>
  );
}
