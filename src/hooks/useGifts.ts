// ============================================================
//  HOOK — ESTADO DOS PRESENTES COM MONGODB ATLAS
//  ============================================================
//  Conecta com o backend Express (porta 3001) que por sua vez
//  usa o MongoDB Atlas para persistir as reservas.
//
//  Endpoints usados:
//    GET  /api/presentes          → carrega todos os presentes
//    POST /api/presentes/:id/reservar → reserva um presente
// ============================================================

import { useState, useCallback, useEffect } from 'react';
import type { Presente } from '../types';
import type { Categoria } from '../types';

// URL base da API
const API_BASE = import.meta.env.VITE_API_URL || '';

interface UseGiftsReturn {
  presentes: Presente[];
  selectedGift: Presente | null;
  isModalOpen: boolean;
  isReserved: boolean;
  isLoading: boolean;
  error: string | null;
  reserveError: string | null;
  openModal: (gift: Presente) => void;
  closeModal: () => void;
  reserveGift: (id: number, guestName: string) => Promise<void>;
  filterCategory: string;
  setFilterCategory: (cat: Categoria | 'Todos') => void;
  filteredGifts: Presente[];
  refetch: () => Promise<void>;
}

export function useGifts(): UseGiftsReturn {
  const [presentes, setPresentes] = useState<Presente[]>([]);
  const [selectedGift, setSelectedGift] = useState<Presente | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReserved, setIsReserved] = useState(false); // Mantemos localmente para UX do modal atual
  const [filterCategory, setFilterCategory] = useState<string>('Todos');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reserveError, setReserveError] = useState<string | null>(null);

  // ── BUSCA TODOS OS PRESENTES DA API ─────────────────────
  const fetchPresentes = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch(`${API_BASE}/api/presentes`);
      if (!res.ok) throw new Error(`Servidor respondeu ${res.status}`);

      const json = await res.json();

      if (json.success) {
        setPresentes(json.data);
      } else {
        throw new Error(json.error || 'Erro desconhecido');
      }
    } catch (err) {
      console.error('Erro ao carregar presentes:', err);
      setError('Não foi possível carregar os presentes. Verifique a conexão.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Carrega ao montar o componente
  useEffect(() => {
    fetchPresentes();
  }, [fetchPresentes]);

  // Refetch silencioso ao voltar para a aba — sem requests desnecessárias
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchPresentes();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', fetchPresentes);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', fetchPresentes);
    };
  }, [fetchPresentes]);

  // ── ABRE O MODAL ─────────────────────────────────────────
  const openModal = useCallback((gift: Presente) => {
    setSelectedGift(gift);
    setIsReserved(gift.esgotado || false); // Se já tiver esgotado, mostramos o estado correspondente
    setReserveError(null);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  // ── FECHA O MODAL ────────────────────────────────────────
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setIsReserved(false);
    setReserveError(null);
    setTimeout(() => setSelectedGift(null), 300);
    document.body.style.overflow = '';
  }, []);

  // ── RESERVA UM PRESENTE VIA API ─────────────────────────
  const reserveGift = useCallback(async (id: number, guestName: string) => {
    setReserveError(null);
    try {
      const res = await fetch(`${API_BASE}/api/presentes/${id}/reservar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guestName }),
      });

      const json = await res.json();

      if (res.status === 409) {
        // Limite atingido
        setReserveError(json.error || 'Presente esgotado.');
        setIsReserved(true); // Opcional: marca como reservado/esgotado
        setPresentes((prev) =>
          prev.map((p) => (p.id === id ? { ...p, esgotado: true } : p))
        );
        return;
      }

      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Erro ao reservar presente.');
      }

      // Sucesso — atualiza a lista local imediatamente sem F5
      setIsReserved(true);

      setPresentes((prev) =>
        prev.map((p) => {
          if (p.id !== id) return p;
          const novaContagem = (p.activeReservationsCount ?? 0) + 1;
          const esgotado = novaContagem >= (p.maxQuantity ?? 1);
          return { ...p, activeReservationsCount: novaContagem, esgotado };
        })
      );

      console.log(`💗 Presente #${id} reservado com sucesso por ${guestName}!`);

    } catch (err: any) {
      console.error('Erro ao reservar:', err);
      setReserveError(err.message || 'Erro de conexão.');
    }
  }, []);

  // ── FILTRO POR CATEGORIA ─────────────────────────────────
  const filteredGifts =
    filterCategory === 'Todos'
      ? presentes
      : presentes.filter((p) => p.categoria === filterCategory);

  return {
    presentes,
    selectedGift,
    isModalOpen,
    isReserved,
    isLoading,
    error,
    reserveError,
    openModal,
    closeModal,
    reserveGift,
    filterCategory,
    setFilterCategory,
    filteredGifts,
    refetch: fetchPresentes,
  };
}
