// ============================================================
//  DecorativeElements.tsx
//  ============================================================
//  Elementos heráldicos e ornamentais inspirados na estética
//  de realeza europeia de Genovia — "O Diário da Princesa".
//  Estilo VINTAGE e DIÁRIO ANTIGO.
// ============================================================

import React from 'react';

// ── 1. TIARA DA MIA ──────────────────────────────────────────
export const MiaTiara: React.FC<{
  width?: number;
  color?: string;
  gemColor?: string;
  className?: string;
}> = ({
  width = 160,
  color = '#B89947', // Dourado envelhecido
  gemColor = '#FDF9F1', // Pérola / creme
  className = '',
}) => {
  const h = width * 0.32;
  const cx = width / 2;

  return (
    <svg width={width} height={h} viewBox={`0 0 ${width} ${h}`} fill="none" className={className}>
      <defs>
        <linearGradient id="tiaraGoldVintage" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0.8" />
          <stop offset="50%" stopColor="#D4BE7D" stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.8" />
        </linearGradient>
      </defs>
      {/* Bandeau base */}
      <path d={`M 8 ${h - 4} Q ${cx} ${h - 6} ${width - 8} ${h - 4}`} stroke="url(#tiaraGoldVintage)" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.9" />
      {/* Picos */}
      <path d={`M ${cx - 3} ${h - 5} L ${cx} ${h * 0.12} L ${cx + 3} ${h - 5}`} stroke="url(#tiaraGoldVintage)" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
      <ellipse cx={cx} cy={h * 0.12} rx={3} ry={2.5} fill={gemColor} opacity="0.9" />
      
      <path d={`M ${cx - 16} ${h - 5} L ${cx - 14} ${h * 0.32} L ${cx - 10} ${h - 5}`} stroke="url(#tiaraGoldVintage)" strokeWidth="1" fill="none" strokeLinejoin="round" />
      <ellipse cx={cx - 14} cy={h * 0.32} rx={2} ry={1.5} fill={gemColor} opacity="0.9" />
      
      <path d={`M ${cx + 10} ${h - 5} L ${cx + 14} ${h * 0.32} L ${cx + 16} ${h - 5}`} stroke="url(#tiaraGoldVintage)" strokeWidth="1" fill="none" strokeLinejoin="round" />
      <ellipse cx={cx + 14} cy={h * 0.32} rx={2} ry={1.5} fill={gemColor} opacity="0.9" />

      <path d={`M ${cx - 34} ${h - 5} L ${cx - 31} ${h * 0.52} L ${cx - 26} ${h - 5}`} stroke="url(#tiaraGoldVintage)" strokeWidth="0.8" fill="none" strokeLinejoin="round" />
      <ellipse cx={cx - 31} cy={h * 0.52} rx={1.5} ry={1.2} fill={gemColor} opacity="0.8" />
      
      <path d={`M ${cx + 26} ${h - 5} L ${cx + 31} ${h * 0.52} L ${cx + 34} ${h - 5}`} stroke="url(#tiaraGoldVintage)" strokeWidth="0.8" fill="none" strokeLinejoin="round" />
      <ellipse cx={cx + 31} cy={h * 0.52} rx={1.5} ry={1.2} fill={gemColor} opacity="0.8" />

      {/* Ornamentos de base */}
      {[-22, -8, 8, 22].map((dx, i) => <circle key={i} cx={cx + dx} cy={h - 5} r={1} fill={color} opacity="0.7" />)}
    </svg>
  );
};

// ── 2. BRASÃO DE GENOVIA (Estilo Carimbo/Tinta) ─────────────────────────
export const GenoviaCrest: React.FC<{ size?: number; color?: string; className?: string }> = ({ 
  size = 80, color = '#3A2626', className = '' 
}) => {
  const w = size;
  const h = size * 1.2;
  const cx = w / 2;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" className={className}>
      {/* Escudo Base - Apenas linhas finas tipo carimbo */}
      <path
        d={`M ${cx - 16} 12 L ${cx - 16} ${h * 0.52} Q ${cx - 16} ${h * 0.68} ${cx} ${h * 0.78} Q ${cx + 16} ${h * 0.68} ${cx + 16} ${h * 0.52} L ${cx + 16} 12 Z`}
        stroke={color} strokeWidth="1" strokeOpacity="0.8" fill="none"
      />
      <path
        d={`M ${cx - 12} 15 L ${cx - 12} ${h * 0.5} Q ${cx - 12} ${h * 0.63} ${cx} ${h * 0.72} Q ${cx + 12} ${h * 0.63} ${cx + 12} ${h * 0.5} L ${cx + 12} 15 Z`}
        stroke={color} strokeWidth="0.5" strokeOpacity="0.6" fill="none"
      />
      
      {/* Coroa Real simplificada */}
      <rect x={cx - 12} y={4} width={24} height={3} rx={1} fill={color} opacity="0.8" />
      <polygon points={`${cx},1 ${cx - 4},5 ${cx + 4},5`} fill={color} opacity="0.8" />
      <polygon points={`${cx - 10},3 ${cx - 12},5 ${cx - 7},5`} fill={color} opacity="0.8" />
      <polygon points={`${cx + 10},3 ${cx + 7},5 ${cx + 12},5`} fill={color} opacity="0.8" />
      
      {/* Flor-de-lis interna tipo pena */}
      <path d={`M ${cx} ${h * 0.25} Q ${cx - 5} ${h * 0.35} ${cx - 2} ${h * 0.45} Q ${cx} ${h * 0.5} ${cx + 2} ${h * 0.45} Q ${cx + 5} ${h * 0.35} ${cx} ${h * 0.25} Z`} fill={color} opacity="0.85" />
      <path d={`M ${cx} ${h * 0.35} Q ${cx - 10} ${h * 0.32} ${cx - 10} ${h * 0.4} Q ${cx - 10} ${h * 0.45} ${cx} ${h * 0.42} Z`} fill={color} opacity="0.75" />
      <path d={`M ${cx} ${h * 0.35} Q ${cx + 10} ${h * 0.32} ${cx + 10} ${h * 0.4} Q ${cx + 10} ${h * 0.45} ${cx} ${h * 0.42} Z`} fill={color} opacity="0.75" />
      <rect x={cx - 1.5} y={h * 0.42} width={3} height={h * 0.15} fill={color} opacity="0.8" />
      
      {/* Ornamentos externos */}
      <path d={`M ${cx - 16} ${h * 0.3} Q ${cx - 26} ${h * 0.25} ${cx - 26} ${h * 0.35}`} stroke={color} strokeWidth="0.8" fill="none" opacity="0.6" />
      <path d={`M ${cx + 16} ${h * 0.3} Q ${cx + 26} ${h * 0.25} ${cx + 26} ${h * 0.35}`} stroke={color} strokeWidth="0.8" fill="none" opacity="0.6" />
      
      {/* Genovia Banner inferior */}
      <path d={`M ${cx - 22} ${h * 0.85} Q ${cx} ${h * 0.9} ${cx + 22} ${h * 0.85}`} stroke={color} strokeWidth="1" fill="none" opacity="0.7" />
      <path d={`M ${cx - 22} ${h * 0.88} Q ${cx} ${h * 0.93} ${cx + 22} ${h * 0.88}`} stroke={color} strokeWidth="0.5" fill="none" opacity="0.5" />
      <text x={cx} y={h * 0.96} fill={color} fontSize="6" fontFamily="Georgia, serif" opacity="0.8" textAnchor="middle" letterSpacing="1">GENOVIA</text>
    </svg>
  );
};

// ── 3. SELO DE CERA REAL (Wax Seal) ─────────────────────────────────
export const RoyalWaxSeal: React.FC<{ size?: number; className?: string }> = ({ size = 60, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
    <defs>
      <radialGradient id="waxGrad" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#8A2B2B" />
        <stop offset="70%" stopColor="#5E1616" />
        <stop offset="100%" stopColor="#360C0C" />
      </radialGradient>
      <filter id="waxShadow">
        <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#3A2626" floodOpacity="0.4" />
      </filter>
    </defs>
    
    {/* Base da cera derretida (irregular) */}
    <path 
      d="M50 5 C 65 3, 85 15, 92 30 C 98 45, 95 65, 85 78 C 75 92, 55 96, 40 92 C 20 88, 5 70, 4 50 C 3 35, 15 20, 28 10 C 35 5, 42 6, 50 5 Z" 
      fill="url(#waxGrad)" filter="url(#waxShadow)"
    />
    
    {/* Relevo interno (onde o carimbo encostou) */}
    <circle cx="48" cy="48" r="34" fill="#6A1C1C" opacity="0.5" stroke="#4A1212" strokeWidth="2" />
    <circle cx="48" cy="48" r="32" fill="none" stroke="#9E3535" strokeWidth="1" opacity="0.8" />
    
    {/* Flor de lis carimbada na cera */}
    <path 
      d="M48 28 Q44 38 46 45 Q48 48 50 45 Q52 38 48 28 Z" 
      fill="#8A2B2B" stroke="#4A1212" strokeWidth="0.5" 
    />
    <path 
      d="M48 38 Q35 32 35 42 Q35 48 48 44 Z" 
      fill="#8A2B2B" stroke="#4A1212" strokeWidth="0.5" 
    />
    <path 
      d="M48 38 Q61 32 61 42 Q61 48 48 44 Z" 
      fill="#8A2B2B" stroke="#4A1212" strokeWidth="0.5" 
    />
    <rect x="46" y="44" width="4" height="12" fill="#8A2B2B" stroke="#4A1212" strokeWidth="0.5" />
    <path d="M42 56 Q48 54 54 56" stroke="#4A1212" strokeWidth="1.5" fill="none" />
  </svg>
);

// ── 4. SELO POSTAL VINTAGE DE GENOVIA ──────────────────────────────
export const GenoviaPostageStamp: React.FC<{ size?: number; className?: string; rotation?: number }> = ({ 
  size = 80, className = '', rotation = -5 
}) => (
  <svg width={size} height={size * 1.2} viewBox="0 0 100 120" className={className} style={{ transform: `rotate(${rotation}deg)` }}>
    <defs>
      <filter id="paperShadow">
        <feDropShadow dx="1" dy="2" stdDeviation="1" floodColor="#3A2626" floodOpacity="0.2" />
      </filter>
      {/* Borda serrilhada de selo */}
      <pattern id="stampEdgeX" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
        <circle cx="5" cy="0" r="3" fill="#FDF9F1" />
      </pattern>
      <pattern id="stampEdgeY" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
        <circle cx="0" cy="5" r="3" fill="#FDF9F1" />
      </pattern>
    </defs>
    
    <rect x="4" y="4" width="92" height="112" fill="#F4E9D8" filter="url(#paperShadow)" />
    {/* Recortes do serrilhado (simplificado) */}
    <rect x="4" y="4" width="92" height="112" fill="none" stroke="#FDF9F1" strokeWidth="6" strokeDasharray="6 6" />
    
    {/* Frame interno */}
    <rect x="12" y="12" width="76" height="96" fill="none" stroke="#3A2626" strokeWidth="1" opacity="0.6" />
    <rect x="14" y="14" width="72" height="92" fill="none" stroke="#3A2626" strokeWidth="0.5" opacity="0.4" />
    
    <text x="50" y="26" fill="#3A2626" fontSize="10" fontFamily="Georgia, serif" textAnchor="middle" letterSpacing="2" opacity="0.8">POSTAGE</text>
    <text x="50" y="100" fill="#3A2626" fontSize="12" fontFamily="Georgia, serif" fontWeight="bold" textAnchor="middle" letterSpacing="1" opacity="0.9">GENOVIA</text>
    <text x="80" y="100" fill="#3A2626" fontSize="10" fontFamily="Georgia, serif" textAnchor="end" opacity="0.7">1¢</text>
    
    {/* Perfil clássico / Coroa central */}
    <circle cx="50" cy="55" r="22" fill="none" stroke="#3A2626" strokeWidth="0.5" opacity="0.5" />
    <path d="M40 60 L40 50 L45 55 L50 45 L55 55 L60 50 L60 60 Z" fill="#3A2626" opacity="0.7" />
    <rect x="40" y="61" width="20" height="2" fill="#3A2626" opacity="0.7" />
    
    {/* Carimbo dos correios por cima do selo */}
    <circle cx="70" cy="30" r="25" fill="none" stroke="#2a1a1a" strokeWidth="1" opacity="0.4" />
    <circle cx="70" cy="30" r="23" fill="none" stroke="#2a1a1a" strokeWidth="0.5" opacity="0.3" />
    <text x="70" y="30" fill="#2a1a1a" fontSize="6" fontFamily="sans-serif" textAnchor="middle" opacity="0.4" transform="rotate(-15 70 30)">GENOVIA ROYAL MAIL</text>
    <line x1="30" y1="20" x2="90" y2="40" stroke="#2a1a1a" strokeWidth="1.5" opacity="0.3" />
    <line x1="30" y1="25" x2="90" y2="45" stroke="#2a1a1a" strokeWidth="1.5" opacity="0.3" />
  </svg>
);

// ── 5. ANOTAÇÃO MANUAL (Handwritten Note) ──────────────────────────
export const HandwrittenNote: React.FC<{ text: string; className?: string; angle?: number; type?: 'script' | 'apple' }> = ({ 
  text, className = '', angle = -2, type = 'script'
}) => (
  <div 
    className={`text-ink ${type === 'script' ? 'font-script text-2xl' : 'font-script-alt text-xl'} ${className}`}
    style={{ transform: `rotate(${angle}deg)` }}
  >
    {text}
  </div>
);

// ── 6. PANELA ELEGANTE (Sketch) ─────────────────────────────────────
export const PotSketch: React.FC<{ size?: number; color?: string; className?: string }> = ({ size = 40, color = '#6B2D3E', className = '' }) => (
  <svg width={size} height={size * 1.1} viewBox="0 0 60 66" fill="none" className={className}>
    {/* Tampa */}
    <path
      d="M16 20 Q30 14 44 20"
      stroke={color} strokeWidth="1.4" strokeOpacity="0.75" strokeLinecap="round"
    />
    <path
      d="M22 20 Q30 16 38 20"
      stroke={color} strokeWidth="0.6" strokeOpacity="0.4" strokeLinecap="round"
    />
    {/* Puxador da tampa */}
    <path
      d="M27 20 L27 16 Q30 13 33 16 L33 20"
      stroke={color} strokeWidth="1.3" strokeOpacity="0.8" strokeLinecap="round" strokeLinejoin="round"
    />
    {/* Corpo da panela */}
    <path
      d="M14 22 Q12 38 13 48 Q14 56 30 57 Q46 56 47 48 Q48 38 46 22 Z"
      stroke={color} strokeWidth="1.4" strokeOpacity="0.75"
    />
    <path
      d="M17 24 Q15 39 16 48 Q17 54 30 55 Q43 54 44 48 Q45 39 43 24"
      stroke={color} strokeWidth="0.5" strokeOpacity="0.35"
    />
    {/* Alça esquerda */}
    <path
      d="M14 28 Q6 28 6 34 Q6 40 14 40"
      stroke={color} strokeWidth="1.4" strokeOpacity="0.75" strokeLinecap="round"
    />
    {/* Alça direita */}
    <path
      d="M46 28 Q54 28 54 34 Q54 40 46 40"
      stroke={color} strokeWidth="1.4" strokeOpacity="0.75" strokeLinecap="round"
    />
    {/* Sombreamento delicado */}
    <path
      d="M20 30 L20 48 M25 28 L25 50 M35 28 L35 50 M40 30 L40 48"
      stroke={color} strokeWidth="0.4" strokeOpacity="0.18"
    />
    {/* Brilho superior */}
    <path
      d="M20 25 Q25 23 30 24"
      stroke={color} strokeWidth="0.5" strokeOpacity="0.3" strokeLinecap="round"
    />
  </svg>
);

// ── 7. ARABESCOS VINTAGE SIMPLES ──────────────────────────────
export const VintageArabesco: React.FC<{ size?: number; color?: string; className?: string }> = ({ size = 60, color = '#B89947', className = '' }) => (
  <svg width={size} height={size * 0.4} viewBox="0 0 100 40" className={className}>
    <path d="M10 20 Q30 5 50 20 T90 20" fill="none" stroke={color} strokeWidth="1" opacity="0.6" />
    <path d="M30 20 Q40 35 50 20 T70 20" fill="none" stroke={color} strokeWidth="0.5" opacity="0.4" />
    <circle cx="50" cy="20" r="2" fill={color} opacity="0.6" />
    <circle cx="10" cy="20" r="1.5" fill={color} opacity="0.6" />
    <circle cx="90" cy="20" r="1.5" fill={color} opacity="0.6" />
  </svg>
);

// ── COMPONENTES HERDADOS E ADAPTADOS ──────────────────────────
export const HeraldricStar: React.FC<{ size?: number; color?: string; className?: string }> = ({ size = 16, color = '#C9A86A', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
    <path
      d="M10 1 L11.2 7.8 L17 5 L12.2 10 L19 10 L12.2 12.2 L17 17 L11.2 12.2 L10 19 L8.8 12.2 L3 17 L7.8 12.2 L1 10 L7.8 8.8 L3 5 L8.8 7.8 Z"
      fill={color} opacity="0.75"
    />
    <circle cx="10" cy="10" r="2" fill="white" opacity="0.5" />
  </svg>
);

export const HeartIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ size = 16, color = '#E8B7B7', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
    <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
  </svg>
);

export const Crown: React.FC<{ size?: number; color?: string; className?: string }> = ({ size = 24, color = '#C9A86A', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 20h20M4 16l3-9 5 5 5-5 3 9H4z" />
  </svg>
);
export const OrnamentalDivider = VintageArabesco;
export const FlowerOrnament = PotSketch;
export const StarSparkle = HeraldricStar;
export const ArabescoLeft = VintageArabesco;
export const ArabescoRight = VintageArabesco;

export const OrnamentalBorder: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`absolute inset-0 pointer-events-none border-[1px] border-[#B89947] m-4 md:m-6 opacity-30 ${className}`} style={{ borderRadius: '4px' }}>
    <div className="absolute top-1 left-1 w-2 h-2 border-t-[1px] border-l-[1px] border-[#3A2626] opacity-50" />
    <div className="absolute top-1 right-1 w-2 h-2 border-t-[1px] border-r-[1px] border-[#3A2626] opacity-50" />
    <div className="absolute bottom-1 left-1 w-2 h-2 border-b-[1px] border-l-[1px] border-[#3A2626] opacity-50" />
    <div className="absolute bottom-1 right-1 w-2 h-2 border-b-[1px] border-r-[1px] border-[#3A2626] opacity-50" />
  </div>
);
