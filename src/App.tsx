// ============================================================
//  APP.TSX — Convite Digital Chá de Panela
//  ============================================================
//  Monta todas as seções do convite em ordem.
//  Para editar as informações, acesse:
//    src/config/convite.ts
// ============================================================

import FloatingElements from './components/FloatingElements';
import Hero from './components/Hero';
import InviteCard from './components/InviteCard';

import MessageSection from './components/MessageSection';
import GiftInstructions from './components/GiftInstructions';
import ColorPalette from './components/ColorPalette';
import GiftList from './components/GiftList';

import Gallery from './components/Gallery';
import Footer from './components/Footer';

import AdminPanel from './components/AdminPanel';

import RsvpForm from './components/RsvpForm';

import { SpoonSketch, PotSketch, CuttingBoardSketch, UtensilsSketch } from './components/DecorativeElements';

// Separador entre seções
function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-2 px-8">
      <div
        className="h-px flex-1 max-w-xs"
        style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,106,0.3), transparent)' }}
      />
      <div className="mx-4 text-xs text-dourado opacity-50">✦</div>
      <div
        className="h-px flex-1 max-w-xs"
        style={{ background: 'linear-gradient(to left, transparent, rgba(201,168,106,0.3), transparent)' }}
      />
    </div>
  );
}

function App() {
  const isAdmin = typeof window !== 'undefined' && window.location.search.includes('admin=true');

  if (isAdmin) {
    return <AdminPanel />;
  }

  return (
    <div className="relative min-h-screen bg-creme overflow-x-hidden">

      {/* Elementos flutuantes ao fundo (discretos) */}
      <FloatingElements />

      {/* ── SEÇÃO 1: HERO ──────────────────────────────────── */}
      <Hero />

      <SectionDivider />

      {/* ── SEÇÃO 2: MENSAGEM ──────────────────────────────── */}
      <MessageSection />

      <SectionDivider />

      {/* ── SEÇÃO 3: HISTÓRIA (CONTO DE FADAS) ─────────────── */}
      <Gallery />

      <SectionDivider />

      {/* ── SEÇÃO 4: CARTÃO DE CONVITE (após a história) ───── */}
      <InviteCard />

      <SectionDivider />

      {/* ── SEÇÃO 5: RSVP ───────────────────────────────────── */}
      <RsvpForm />

      <SectionDivider />

      {/* ── SEÇÃO 6: COMO ESCOLHER O PRESENTE ─────────────── */}
      <GiftInstructions />

      <SectionDivider />

      {/* ── SEÇÃO 7: PALETA DE CORES ───────────────────────── */}
      <ColorPalette />

      <SectionDivider />

      {/* ── SEÇÃO 8: LISTA DE PRESENTES ────────────────────── */}
      <GiftList />

      <SectionDivider />

      {/* ── SEÇÃO 9: RODAPÉ ────────────────────────────────── */}
      <Footer />
    </div>
  );
}

export default App;
