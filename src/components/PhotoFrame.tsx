// ============================================================
//  COMPONENTE: PhotoFrame
//  Moldura da fotografia no estilo Locket/Camafeu Vintage
// ============================================================

import { motion } from 'framer-motion';

interface PhotoFrameProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  shape?: 'circle' | 'oval';
  animate?: boolean;
  withVeil?: boolean;
  className?: string;
}

export default function PhotoFrame({
  src,
  alt,
  size = 'md',
  shape = 'oval',
  animate = true,
  withVeil = true,
  className = '',
}: PhotoFrameProps) {
  
  const sizeClasses = {
    sm: 'w-24 h-32',
    md: 'w-40 h-56',
    lg: 'w-64 h-80 sm:w-72 sm:h-96',
  };

  const containerClasses = `
    relative 
    ${sizeClasses[size]} 
    ${shape === 'circle' ? 'rounded-full' : 'rounded-[50%]'} 
    ${className}
  `;

  // Animação de respiração (float) para o container inteiro
  const containerAnimation = animate ? {
    animate: { y: [0, -6, 0] },
    transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' as const }
  } : {};

  // Animação sutil simulando o balanço do véu na imagem
  const veilAnimation = withVeil ? {
    animate: { 
      x: [-1, 1, -1],
      rotate: [-0.3, 0.3, -0.3]
    },
    transition: { 
      duration: 5, 
      repeat: Infinity, 
      ease: 'easeInOut' as const 
    }
  } : {};

  return (
    <motion.div className={containerClasses} {...containerAnimation}>
      {/* Moldura de Camafeu (Locket) */}
      <div className="absolute inset-0 z-10 pointer-events-none rounded-[50%] oval-locket" />
      
      {/* Container da Imagem sem efeito envelhecido para manter cores originais */}
      <div className="absolute inset-0 rounded-[50%] overflow-hidden bg-creme">
        <motion.img
          src={src}
          alt={alt}
          className="w-full h-full object-cover select-none"
          draggable="false"
          style={{ objectPosition: 'center 20%' }}
          {...veilAnimation}
        />
      </div>

      {/* Pequeno ornamento heráldico no topo do locket */}
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-20 pointer-events-none opacity-80">
        <svg width="24" height="8" viewBox="0 0 24 8" fill="none">
          <path d="M12 0 C 15 4, 18 2, 24 4 C 18 6, 15 4, 12 8 C 9 4, 6 6, 0 4 C 6 2, 9 4, 12 0 Z" fill="#B89947" opacity="0.8" />
        </svg>
      </div>

      {/* Pequeno ornamento heráldico na base do locket */}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 z-20 pointer-events-none opacity-80">
        <svg width="24" height="8" viewBox="0 0 24 8" fill="none">
          <path d="M12 8 C 15 4, 18 6, 24 4 C 18 2, 15 4, 12 0 C 9 4, 6 2, 0 4 C 6 6, 9 4, 12 8 Z" fill="#B89947" opacity="0.8" />
        </svg>
      </div>
    </motion.div>
  );
}
