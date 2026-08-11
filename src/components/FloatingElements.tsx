// ============================================================
//  COMPONENTE: FloatingElements
//  Elementos decorativos flutuando suavemente ao redor da tela
// ============================================================

import { motion } from 'framer-motion';
import { HeartIcon, StarSparkle, FlowerOrnament } from './DecorativeElements';

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
  { id: 1,  element: <HeartIcon size={14} color="#E8B7B7" />,   x: '8%',  y: '15%', delay: 0,   duration: 6,  scale: 1 },
  { id: 2,  element: <StarSparkle size={12} color="#C9A86A" />, x: '92%', y: '20%', delay: 1,   duration: 7,  scale: 0.9 },
  { id: 3,  element: <FlowerOrnament size={18} color="#E8B7B7" />, x: '5%', y: '50%', delay: 2, duration: 8, scale: 0.8 },
  { id: 4,  element: <HeartIcon size={10} color="#F2CACA" />,   x: '88%', y: '60%', delay: 0.5, duration: 5, scale: 1 },
  { id: 5,  element: <StarSparkle size={10} color="#C9A86A" />, x: '15%', y: '80%', delay: 3,  duration: 9,  scale: 0.7 },
  { id: 6,  element: <FlowerOrnament size={14} color="#C49A9A" />, x: '95%', y: '80%', delay: 1.5, duration: 7, scale: 0.9 },
  { id: 7,  element: <HeartIcon size={12} color="#E8B7B7" />,   x: '50%', y: '5%', delay: 2.5, duration: 6,  scale: 0.8 },
  { id: 8,  element: <StarSparkle size={8}  color="#C9A86A" />, x: '78%', y: '40%', delay: 4,  duration: 8,  scale: 0.7 },
  { id: 9,  element: <HeartIcon size={8}  color="#F2CACA" />,   x: '22%', y: '35%', delay: 1.2, duration: 7, scale: 0.6 },
  { id: 10, element: <FlowerOrnament size={12} color="#E8B7B7" />, x: '65%', y: '90%', delay: 0.8, duration: 9, scale: 0.7 },
];

export default function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {floatingItems.map((item) => (
        <motion.div
          key={item.id}
          className="absolute opacity-40"
          style={{ left: item.x, top: item.y }}
          animate={{
            y: [0, -14, 0],
            x: [0, 4, 0],
            rotate: [0, 5, -5, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div style={{ transform: `scale(${item.scale})` }}>{item.element}</div>
        </motion.div>
      ))}
    </div>
  );
}
