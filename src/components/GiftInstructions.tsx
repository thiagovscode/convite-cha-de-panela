// ============================================================
//  COMPONENTE: GiftInstructions
//  Passo a passo elegante de como escolher o presente
// ============================================================

import { motion } from 'framer-motion';
import { OrnamentalDivider, Crown } from './DecorativeElements';
import { Gift, Palette, MousePointerClick, CheckCircle } from 'lucide-react';

// ── PASSOS — podem ser movidos para config/convite.ts se necessário
const steps = [
  {
    number: '01',
    icon: <Gift size={32} color="#C9A86A" strokeWidth={1.5} />,
    title: 'Escolha um presente',
    description: 'Navegue pela nossa lista de presentes e encontre o que mais combina com você!',
  },
  {
    number: '02',
    icon: <Palette size={32} color="#C9A86A" strokeWidth={1.5} />,
    title: 'Confira a cor disponível',
    description: 'Cada presente tem uma cor indicada. Verifique se está disponível na paleta.',
  },
  {
    number: '03',
    icon: <MousePointerClick size={32} color="#C9A86A" strokeWidth={1.5} />,
    title: 'Clique no presente',
    description: 'Clique no card do presente para ver todos os detalhes e informações.',
  },
  {
    number: '04',
    icon: <CheckCircle size={32} color="#C9A86A" strokeWidth={1.5} />,
    title: 'Confirme sua escolha',
    description: 'Clique em "Quero este presente" para reservar e garantir o seu!',
  },
];

export default function GiftInstructions() {
  return (
    <section
      className="relative py-24 px-4 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #F8F1E8 0%, #FDF0F0 100%)' }}
    >
      <div className="relative z-10 max-w-4xl mx-auto text-center">

        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-2"
        >
          <Crown size={36} color="#C9A86A" className="mx-auto mb-3" />
          <p className="font-sans text-xs font-semibold tracking-[0.3em] text-dourado uppercase mb-2">
            PRESENTEIE COM AMOR
          </p>
          <h2
            className="font-serif text-4xl sm:text-5xl font-light text-marrom mb-4"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Como escolher o seu presente
          </h2>
        </motion.div>

        <OrnamentalDivider className="mb-14 max-w-xs mx-auto" />

        {/* Steps */}
        <div className="relative">
          {/* Linha conectora — só desktop */}
          <div className="hidden md:block absolute top-12 left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-px"
            style={{ background: 'linear-gradient(to right, #E8B7B7, #C9A86A, #E8B7B7)' }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="flex flex-col items-center text-center"
              >
                {/* Número + ícone */}
                <div className="relative mb-5">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-3xl shadow-card border-2 border-dourado/30 bg-white relative z-10"
                    style={{ boxShadow: '0 4px 20px rgba(201,168,106,0.2)' }}
                  >
                    {step.icon}
                  </div>
                  {/* Número sobreposto */}
                  <div
                    className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white z-20"
                    style={{ background: 'linear-gradient(135deg, #C9A86A, #DFC088)' }}
                  >
                    {step.number}
                  </div>
                </div>

                {/* Texto */}
                <h3
                  className="font-serif text-xl font-medium text-marrom mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {step.title}
                </h3>
                <p className="font-sans text-xs leading-relaxed text-marrom/65 font-light max-w-[180px]">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
