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

  // Animação de balanço suave (sway/pendulum)
  const containerAnimation = animate ? {
    animate: { 
      y: [0, -5, 0],
      rotate: [-2, 2, -2]
    },
    transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' as const }
  } : {};

  // Animação sutil simulando o balanço do véu na imagem (opcional)
  const veilAnimation = withVeil ? {
    animate: { 
      x: [-1, 1, -1]
    },
    transition: { 
      duration: 5, 
      repeat: Infinity, 
      ease: 'easeInOut' as const 
    }
  } : {};

  return (
    <motion.div className={containerClasses} {...containerAnimation}>
      {/* Moldura branca elegante */}
      <div className="absolute inset-0 z-10 pointer-events-none rounded-[50%] border-[8px] border-white shadow-md" />
      
      {/* Container da Imagem */}
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
    </motion.div>
  );
}
