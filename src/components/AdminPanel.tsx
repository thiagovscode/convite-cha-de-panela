import { useState, useEffect } from 'react';
import { Crown, FlowerOrnament } from './DecorativeElements';

const API_BASE = import.meta.env.VITE_API_URL || '';

interface ReservedBy {
  name: string;
  reservationId: string;
}

interface AdminPresente {
  id: number;
  nome: string;
  categoria: string;
  maxQuantity: number;
  activeReservationsCount: number;
  reservedBy: ReservedBy[];
  esgotado: boolean;
}

interface Rsvp {
  id: string;
  name: string;
  confirmed: boolean;
  message: string;
  createdAt: string;
}

export default function AdminPanel() {
  const [presentes, setPresentes] = useState<AdminPresente[]>([]);
  const [rsvps, setRsvps] = useState<Rsvp[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Authentication state
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const [loginError, setLoginError] = useState('');
  
  // Tab state
  const [activeTab, setActiveTab] = useState<'presentes' | 'rsvp'>('presentes');

  const fetchAdminData = async (token: string) => {
    setLoading(true);
    try {
      // Fetch presentes
      const resPresentes = await fetch(`${API_BASE}/api/admin/presentes`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const dataPresentes = await resPresentes.json();
      if (dataPresentes.success) {
        setPresentes(dataPresentes.data);
      }
      
      // Fetch rsvp
      const resRsvp = await fetch(`${API_BASE}/api/admin/rsvp`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const dataRsvp = await resRsvp.json();
      if (dataRsvp.success) {
        setRsvps(dataRsvp.data);
      }
    } catch (err) {
      alert('Erro ao carregar dados do admin.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'admin', password })
      });
      if (res.ok) {
        const data = await res.json();
        setJwtToken(data.token);
        setIsAuthenticated(true);
        setLoginError('');
        fetchAdminData(data.token);
      } else {
        setLoginError('Senha incorreta.');
      }
    } catch (err) {
      setLoginError('Erro de conexão com servidor.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelReservation = async (reservationId: string) => {
    if (!window.confirm('Tem certeza que deseja cancelar esta reserva?')) return;

    try {
      const res = await fetch(`${API_BASE}/api/admin/presentes/reservas/${reservationId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${jwtToken}` }
      });
      const data = await res.json();
      if (data.success) {
        fetchAdminData(jwtToken!);
      } else {
        alert(data.error || 'Erro ao cancelar');
      }
    } catch (err) {
      alert('Erro ao cancelar reserva.');
    }
  };

  const handleUpdateMaxQuantity = async (id: number, currentMax: number) => {
    const newValStr = window.prompt(`Nova quantidade máxima para o presente #${id}:`, currentMax.toString());
    if (!newValStr) return;
    
    const maxQuantity = parseInt(newValStr, 10);
    if (isNaN(maxQuantity) || maxQuantity < 1) {
      alert('Quantidade inválida.');
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/admin/presentes/${id}/quantidade`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        },
        body: JSON.stringify({ maxQuantity }),
      });
      const data = await res.json();
      if (data.success) {
        fetchAdminData(jwtToken!);
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert('Erro ao atualizar presente.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-creme flex flex-col items-center justify-center font-sans p-4">
        <Crown size={40} color="#C9A86A" className="mb-6" />
        <div className="bg-white p-8 rounded-2xl shadow-elegant border border-dourado/20 max-w-sm w-full">
          <h2 className="font-serif text-2xl text-marrom mb-4 text-center">Acesso Restrito</h2>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <input 
                type="password" 
                placeholder="Senha de acesso" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-dourado/40 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-dourado"
              />
            </div>
            {loginError && <p className="text-red-500 text-xs text-center">{loginError}</p>}
            <button 
              type="submit"
              disabled={loading}
              className="bg-dourado text-white rounded-lg py-2 text-sm font-semibold hover:bg-dourado/90 transition-colors"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
          <div className="mt-4 text-center">
            <a href="/" className="text-xs text-marrom/50 hover:underline">Voltar para o convite</a>
          </div>
        </div>
      </div>
    );
  }

  if (error) return <div className="min-h-screen bg-creme flex items-center justify-center font-serif text-red-800">{error}</div>;

  const totalConfirmed = rsvps.filter(r => r.confirmed).length;
  const totalDeclined = rsvps.filter(r => !r.confirmed).length;

  return (
    <div className="min-h-screen bg-diary-page py-12 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col items-center mb-10 relative">
          <Crown size={40} color="#C9A86A" className="mb-4" />
          <h1 className="font-serif text-3xl sm:text-4xl text-marrom">Painel Administrativo</h1>
          
          <div className="flex gap-4 mt-8">
            <button 
              onClick={() => setActiveTab('presentes')}
              className={`font-sans text-xs uppercase tracking-widest px-6 py-2 rounded-full border transition-all ${activeTab === 'presentes' ? 'bg-marrom text-creme border-marrom' : 'text-dourado border-dourado hover:bg-marrom/5'}`}
            >
              Lista de Presentes
            </button>
            <button 
              onClick={() => setActiveTab('rsvp')}
              className={`font-sans text-xs uppercase tracking-widest px-6 py-2 rounded-full border transition-all ${activeTab === 'rsvp' ? 'bg-marrom text-creme border-marrom' : 'text-dourado border-dourado hover:bg-marrom/5'}`}
            >
              RSVP (Presenças)
            </button>
          </div>
        </div>

        {activeTab === 'presentes' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-dourado/20 shadow-elegant overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans text-sm text-marrom">
                <thead className="bg-[#F8F1E8] text-dourado border-b border-dourado/20">
                  <tr>
                    <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Presente</th>
                    <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs text-center">Máx</th>
                    <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs text-center">Reservados</th>
                    <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs text-center">Restante</th>
                    <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Responsáveis</th>
                    <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-marrom/10">
                  {presentes.map((p) => {
                    const restante = p.maxQuantity - p.activeReservationsCount;
                    return (
                      <tr key={p.id} className="hover:bg-rosa/5 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-serif text-base font-medium">{p.nome}</div>
                          <div className="text-xs text-marrom/60">{p.categoria}</div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="bg-dourado/10 text-dourado px-2 py-1 rounded font-semibold">{p.maxQuantity}</span>
                        </td>
                        <td className="px-6 py-4 text-center font-medium">{p.activeReservationsCount}</td>
                        <td className="px-6 py-4 text-center">
                          <span className={`font-semibold ${restante === 0 ? 'text-red-500' : 'text-green-600'}`}>
                            {restante}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {p.reservedBy && p.reservedBy.length > 0 ? (
                            <ul className="space-y-1">
                              {p.reservedBy.map((res) => (
                                <li key={res.reservationId} className="flex items-center justify-between gap-4 text-xs bg-creme px-2 py-1 rounded border border-marrom/5">
                                  <span className="font-medium">{res.name}</span>
                                  <button
                                    onClick={() => handleCancelReservation(res.reservationId)}
                                    className="text-red-500 hover:text-red-700 font-bold px-1"
                                    title="Cancelar esta reserva"
                                  >
                                    X
                                  </button>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <span className="text-xs text-marrom/40 italic">Nenhuma</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleUpdateMaxQuantity(p.id, p.maxQuantity)}
                            className="text-xs text-dourado hover:text-marrom transition-colors font-medium border border-dourado/30 px-3 py-1.5 rounded hover:bg-dourado/10"
                          >
                            Editar Máx.
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'rsvp' && (
          <div>
            <div className="flex gap-4 mb-6 justify-center">
              <div className="bg-white/80 p-4 rounded-xl border border-dourado/20 shadow-sm flex flex-col items-center flex-1 max-w-[200px]">
                <span className="text-3xl font-serif text-green-600">{totalConfirmed}</span>
                <span className="text-xs uppercase tracking-widest text-marrom/60 mt-1">Confirmados</span>
              </div>
              <div className="bg-white/80 p-4 rounded-xl border border-dourado/20 shadow-sm flex flex-col items-center flex-1 max-w-[200px]">
                <span className="text-3xl font-serif text-red-500">{totalDeclined}</span>
                <span className="text-xs uppercase tracking-widest text-marrom/60 mt-1">Não irão</span>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-dourado/20 shadow-elegant overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left font-sans text-sm text-marrom">
                  <thead className="bg-[#F8F1E8] text-dourado border-b border-dourado/20">
                    <tr>
                      <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Data</th>
                      <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Convidado</th>
                      <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs text-center">Status</th>
                      <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Mensagem</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-marrom/10">
                    {rsvps.length === 0 ? (
                       <tr>
                         <td colSpan={4} className="px-6 py-8 text-center text-marrom/50 italic">
                           Nenhuma confirmação recebida ainda.
                         </td>
                       </tr>
                    ) : (
                      rsvps.map((r) => (
                        <tr key={r.id} className="hover:bg-rosa/5 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-xs text-marrom/60">
                            {new Date(r.createdAt).toLocaleDateString('pt-BR')} {new Date(r.createdAt).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}
                          </td>
                          <td className="px-6 py-4 font-medium">
                            {r.name}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {r.confirmed ? (
                              <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Sim</span>
                            ) : (
                              <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Não</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-xs italic">
                            {r.message || '-'}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
           <a href="/" className="text-sm font-sans text-marrom/50 hover:text-marrom underline transition-colors">Voltar para o Convite</a>
        </div>
      </div>
    </div>
  );
}
