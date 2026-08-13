import { useState } from 'react';
import { OrnamentalDivider, Crown } from './DecorativeElements';

const API_BASE = import.meta.env.VITE_API_URL || '';

export default function RsvpForm() {
  const [name, setName] = useState('');
  const [confirmed, setConfirmed] = useState<boolean | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || confirmed === null) {
      setError('Por favor, preencha o nome e selecione se vai comparecer.');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const res = await fetch(`${API_BASE}/api/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, confirmed, message })
      });
      
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
      } else {
        setError(data.error || 'Erro ao enviar confirmação.');
      }
    } catch (err) {
      setError('Erro de conexão. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <section className="py-16 px-4 bg-creme flex flex-col items-center justify-center text-center">
        <Crown size={40} color="#C9A86A" className="mb-4 opacity-80" />
        <h2 className="font-serif text-3xl text-marrom mb-4">Obrigado!</h2>
        <p className="font-sans text-marrom/80 max-w-md">
          {confirmed 
            ? 'Sua presença foi confirmada com sucesso. Mal podemos esperar para celebrar com você!' 
            : 'Sentiremos sua falta! Obrigado por nos avisar.'}
        </p>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 sm:px-8 bg-creme flex flex-col items-center">
      <div className="max-w-2xl w-full flex flex-col items-center">
        <h2 className="font-serif text-3xl sm:text-4xl text-marrom text-center mb-2">
          R.S.V.P
        </h2>
        <p className="font-sans text-sm text-dourado uppercase tracking-widest text-center mb-8">
          Confirme sua Presença
        </p>

        <form onSubmit={handleSubmit} className="w-full bg-white/60 p-8 rounded-2xl shadow-elegant border border-dourado/20">
          
          <div className="mb-6">
            <label className="block font-serif text-marrom mb-2 text-lg">Nome Completo</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent border-b border-dourado/40 px-2 py-2 text-marrom focus:outline-none focus:border-dourado transition-colors font-sans"
              placeholder="Digite seu nome"
            />
          </div>

          <div className="mb-6">
            <label className="block font-serif text-marrom mb-4 text-lg">Confirmar presença?</label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setConfirmed(true)}
                className={`flex-1 py-3 rounded-lg border font-sans uppercase tracking-wider text-sm transition-all ${
                  confirmed === true 
                    ? 'bg-dourado border-dourado text-white shadow-md' 
                    : 'bg-transparent border-dourado/30 text-marrom hover:border-dourado hover:bg-dourado/5'
                }`}
              >
                Sim, estarei lá
              </button>
              <button
                type="button"
                onClick={() => setConfirmed(false)}
                className={`flex-1 py-3 rounded-lg border font-sans uppercase tracking-wider text-sm transition-all ${
                  confirmed === false 
                    ? 'bg-marrom border-marrom text-white shadow-md' 
                    : 'bg-transparent border-marrom/30 text-marrom hover:border-marrom hover:bg-marrom/5'
                }`}
              >
                Não poderei
              </button>
            </div>
          </div>

          <div className="mb-8">
            <label className="block font-serif text-marrom mb-2 text-lg">Mensagem ou Restrição Alimentar (Opcional)</label>
            <textarea 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-transparent border border-dourado/40 rounded-lg p-3 text-marrom focus:outline-none focus:border-dourado transition-colors font-sans min-h-[100px]"
              placeholder="Deixe uma mensagem para os noivos ou avise sobre alguma restrição alimentar..."
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-marrom text-creme rounded-lg py-4 font-serif text-xl hover:bg-marrom/90 transition-colors shadow-elegant disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Enviando...' : 'Enviar Confirmação'}
          </button>
        </form>

        <div className="mt-12 w-full max-w-xs">
          <OrnamentalDivider />
        </div>
      </div>
    </section>
  );
}
