// ============================================================
//  COMPONENTE: Schedule
//  Programação do dia — linha do tempo elegante
// ============================================================

import { motion } from 'framer-motion';
import { conviteConfig } from '../config/convite';
import { OrnamentalDivider, HeraldricStar, GenoviaPostageStamp, PotSketch } from './DecorativeElements';

export default function Schedule() {
  const cfg = conviteConfig; // ← vem do config/convite.ts

  return (
    <section
      className="relative py-24 px-4 overflow-hidden bg-diary-page"
    >
      <div className="relative z-10 max-w-4xl mx-auto">

        {/* ── CABEÇALHO ───────────────────────────────────── */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <OrnamentalDivider color="#B89947" className="mx-auto mb-6" />
            
            <p className="font-sans text-xs font-semibold tracking-[0.3em] text-[#B89947] uppercase mb-3">
              O DIA DA CELEBRAÇÃO
            </p>
            
            <h2
              className="font-serif text-4xl sm:text-5xl font-light text-marrom mb-2"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {cfg.tituloProgramacao}
            </h2>
          </motion.div>
          <OrnamentalDivider className="mt-8 max-w-xs mx-auto" />
        </div>

        {/* ── LINHA DO TEMPO ──────────────────────────────── */}
        <div className="relative mt-12">
          {/* Linha vertical central — só desktop */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 opacity-30"
            style={{ background: 'linear-gradient(to bottom, transparent, #3A2626 10%, #3A2626 90%, transparent)' }}
          />

          <div className="space-y-12 md:space-y-0">
            {cfg.programacao.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.8, delay: index * 0.15 }}
                  className={`relative md:flex md:items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} mb-16 md:mb-0`}
                >
                  {/* Card com a Foto */}
                  <div className="md:w-[calc(50%-40px)] w-full max-w-sm mx-auto md:max-w-none">
                    <div
                      className="relative bg-creme overflow-hidden rounded-sm group hover:shadow-xl transition-all duration-500"
                      style={{ 
                        border: '1px solid rgba(184, 153, 71, 0.2)',
                        boxShadow: '4px 8px 30px rgba(58, 38, 38, 0.05)'
                      }}
                    >
                      {/* Fotografia no Topo (35-40% da altura visualmente) */}
                      {item.imagem && (
                        <div className="relative w-full h-48 sm:h-56 overflow-hidden border-b border-[#B89947]/20">
                          {/* Efeito fotográfico sépia/vintage */}
                          <div className="absolute inset-0 z-10 mix-blend-color bg-[#D4B4B4] opacity-10 pointer-events-none" />
                          <div className="absolute inset-0 z-10 mix-blend-multiply bg-[#3A2626] opacity-10 pointer-events-none" />
                          
                          <img 
                            src={item.imagem} 
                            alt={item.titulo} 
                            className="w-full h-full object-cover select-none group-hover:scale-105 transition-transform duration-1000 ease-out"
                            draggable="false"
                            style={{ filter: 'contrast(0.9) sepia(0.2)' }}
                          />
                          
                          {/* Detalhe de "fita/colagem" estilo scrapbook */}
                          <div className="absolute top-2 left-2 w-8 h-2 bg-white/40 rotate-12 backdrop-blur-sm z-20" />
                          <div className="absolute top-3 right-2 w-6 h-2 bg-white/30 -rotate-6 backdrop-blur-sm z-20" />
                        </div>
                      )}

                      {/* Informações de Texto */}
                      <div className="p-6 md:p-8 text-center relative bg-diary-page">
                        
                        {/* Ornamentos de canto discretos na caixa de texto */}
                        <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#B89947]/30" />
                        <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#B89947]/30" />
                        
                        <p className="font-sans text-[10px] font-semibold tracking-[0.25em] text-[#B89947] uppercase mb-2">
                          {item.hora}
                        </p>

                        <h3
                          className="font-serif text-2xl font-light text-marrom mb-3 leading-snug"
                          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                        >
                          {item.titulo}
                        </h3>

                        <p className="font-sans text-sm text-marrom/70 font-light leading-relaxed">
                          {item.descricao}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Ponto central (Estrela Heráldica Discreta) */}
                  <div className="hidden md:flex md:w-20 md:justify-center md:flex-shrink-0 md:relative md:z-10 py-10">
                    <div className="bg-diary-page p-2 rounded-full border border-[#3A2626]/10 shadow-sm">
                      <HeraldricStar size={16} color="#B89947" className="opacity-70" />
                    </div>
                  </div>

                  {/* Espaço do outro lado */}
                  <div className="hidden md:block md:w-[calc(50%-40px)]" />
                </motion.div>
              );
            })}
          </div>
          
          {/* Decorações do filme soltas na linha do tempo */}
          <div className="absolute top-1/3 left-4 md:left-12 opacity-40 z-0">
            <GenoviaPostageStamp size={60} rotation={-15} />
          </div>
          <div className="absolute bottom-1/4 right-4 md:right-12 opacity-30 z-0">
            <PotSketch size={45} color="#B89947" />
          </div>
        </div>
      </div>
    </section>
  );
}
