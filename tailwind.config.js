/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ── PALETA DE CORES DO CONVITE ───────────────────────
      colors: {
        rosa: {
          DEFAULT: '#F2B8C6',    // rosa médio delicado
          claro: '#FCE4EC',      // blush clarinho
          petala: '#F9C5D1',     // rosa pétalas
          antigo: '#E48FA5',     // rosa mais saturado
          escuro: '#D4607E',     // rosa escuro
        },
        creme: '#FFF5F7',        // branco rosado
        dourado: {
          DEFAULT: '#C9A86A',
          claro: '#DFC088',
          escuro: '#A8834A',
        },
        marrom: {
          DEFAULT: '#6B2D3E',    // bordô/vinho — agora mais rosado
          claro: '#8B4D5E',
          escuro: '#4A1525',
        },
      },
      // ── FONTES ──────────────────────────────────────────
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Bodoni Moda"', 'Georgia', 'serif'],
        sans: ['"Montserrat"', 'system-ui', 'sans-serif'],
      },
      // ── ANIMAÇÕES PERSONALIZADAS ─────────────────────────
      animation: {
        'sway': 'sway 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-delay': 'float 7s ease-in-out 2s infinite',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
      },
      keyframes: {
        sway: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        sparkle: {
          '0%, 100%': { transform: 'scale(0) rotate(0deg)', opacity: '0' },
          '50%': { transform: 'scale(1) rotate(180deg)', opacity: '1' },
        },
      },
      // ── SOMBRAS ─────────────────────────────────────────
      boxShadow: {
        'elegant': '0 8px 32px rgba(74, 48, 48, 0.12)',
        'card': '0 4px 20px rgba(74, 48, 48, 0.08)',
        'golden': '0 4px 20px rgba(201, 168, 106, 0.3)',
        'soft': '0 2px 12px rgba(74, 48, 48, 0.06)',
      },
      // ── BACKGROUND ──────────────────────────────────────
      backgroundImage: {
        'lace': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E8B7B7' fill-opacity='0.08'%3E%3Cpath d='M30 0C13.4 0 0 13.4 0 30s13.4 30 30 30 30-13.4 30-30S46.6 0 30 0zm0 55C16.2 55 5 43.8 5 30S16.2 5 30 5s25 11.2 25 25S43.8 55 30 55z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}
