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
  { id: 1,  element: <FlowerOrnament size={32} color="#8A5A68" />, x: '5%', y: '-10%', delay: 0,   duration: 22, scale: 1 },
  { id: 2,  element: <UtensilsSketch size={32} color="#C9A86A" />, x: '90%', y: '-20%', delay: 2,   duration: 22, scale: 1 },
  { id: 3,  element: <CuttingBoardSketch size={32} color="#B4838D" />, x: '8%', y: '-5%', delay: 5, duration: 22, scale: 1 },
  { id: 4,  element: <SpoonSketch size={32} color="#C9A86A" />,    x: '92%', y: '-15%', delay: 8,   duration: 22, scale: 1 },
  { id: 5,  element: <FlowerOrnament size={32} color="#B4838D" />, x: '88%', y: '-5%', delay: 12,  duration: 22, scale: 1 },
  { id: 6,  element: <UtensilsSketch size={32} color="#8A5A68" />, x: '12%', y: '-25%', delay: 10,  duration: 22, scale: 1 },
  { id: 7,  element: <CuttingBoardSketch size={32} color="#C9A86A" />, x: '85%', y: '-10%', delay: 15, duration: 22, scale: 1 },
  { id: 8,  element: <SpoonSketch size={32} color="#8A5A68" />,    x: '4%', y: '-20%', delay: 3,   duration: 22, scale: 1 },
  { id: 9,  element: <FlowerOrnament size={32} color="#C9A86A" />, x: '95%', y: '-5%',  delay: 18,  duration: 22, scale: 1 },
  { id: 10, element: <UtensilsSketch size={32} color="#B4838D" />, x: '10%', y: '-15%', delay: 7,   duration: 22, scale: 1 },
];

export default function FloatingElements() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {floatingItems.map((item) => (
        <motion.div
          key={item.id}
          className="absolute"
          style={{ left: item.x, top: 0 }}
          animate={{
            y: ['-10%', '110%'],
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
