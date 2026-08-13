// ============================================================
//  COMPONENTE: FloatingElements
//  Elementos decorativos flutuando suavemente ao redor da tela
// ============================================================

import { motion } from 'framer-motion';
import { FlowerOrnament, SpoonSketch, CuttingBoardSketch, UtensilsSketch } from './DecorativeElements';

interface FloatingItem {
  id: number;
  element: React.ReactNode;
  x: string;
  y: string;
  delay: number;
  duration: number;
  scale: number;
}

const floatingItems: FloatingItem[] = [
  // Cores mais visíveis: #8A5A68 (Marrom rosé escuro), #C9A86A (Dourado forte), #B4838D (Rosé mais fechado)
  { id: 1,  element: <FlowerOrnament size={35} color="#8A5A68" />, x: '10%', y: '-10vh', delay: 0,   duration: 18, scale: 1 },
  { id: 2,  element: <UtensilsSketch size={30} color="#C9A86A" />, x: '85%', y: '-20vh', delay: 2,   duration: 22, scale: 0.9 },
  { id: 3,  element: <CuttingBoardSketch size={35} color="#B4838D" />, x: '25%', y: '-5vh', delay: 5, duration: 25, scale: 0.8 },
  { id: 4,  element: <SpoonSketch size={28} color="#C9A86A" />,    x: '75%', y: '-15vh', delay: 8,   duration: 20, scale: 0.9 },
  { id: 5,  element: <FlowerOrnament size={25} color="#B4838D" />, x: '90%', y: '-5vh', delay: 12,  duration: 19, scale: 0.7 },
  { id: 6,  element: <UtensilsSketch size={40} color="#8A5A68" />, x: '15%', y: '-25vh', delay: 10,  duration: 26, scale: 1 },
  { id: 7,  element: <CuttingBoardSketch size={30} color="#C9A86A" />, x: '60%', y: '-10vh', delay: 15, duration: 21, scale: 0.8 },
  { id: 8,  element: <SpoonSketch size={35} color="#8A5A68" />,    x: '40%', y: '-20vh', delay: 3,   duration: 24, scale: 1 },
  { id: 9,  element: <FlowerOrnament size={30} color="#C9A86A" />, x: '50%', y: '-5vh',  delay: 18,  duration: 20, scale: 0.8 },
  { id: 10, element: <UtensilsSketch size={25} color="#B4838D" />, x: '80%', y: '-15vh', delay: 7,   duration: 23, scale: 0.9 },
];

export default function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {floatingItems.map((item) => (
        <motion.div
          key={item.id}
          className="absolute"
          style={{ left: item.x, top: 0 }}
          animate={{
            y: ['-10vh', '110vh'],
            x: [0, 30, -30, 0],
            rotate: [0, 15, -15, 10, 0],
            opacity: [0, 0.7, 0.7, 0],
          }}
          transition={{
            y: { duration: item.duration, repeat: Infinity, ease: 'linear', delay: item.delay },
            x: { duration: item.duration * 0.7, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: item.duration * 0.9, repeat: Infinity, ease: 'easeInOut' },
            opacity: { duration: item.duration, repeat: Infinity, ease: 'linear', delay: item.delay },
          }}
        >
          <div style={{ transform: `scale(${item.scale})` }}>{item.element}</div>
        </motion.div>
      ))}
    </div>
  );
}
