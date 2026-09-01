import { ArrowDownToLine, ArrowUpFromLine, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

import { getMovements } from '../services/movementService';
import type { Movement } from '../types/movement';
import { MovementFormModal } from '../components/MovementFormModal';

export function Movements() {
  const [movements, setMovements] = useState<Movement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  async function loadMovements() {
    try {
      setLoading(true);
      setError('');

      const data = await getMovements();

      setMovements(data);
    } catch {
      setError('Não foi possível carregar as movimentações.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMovements();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Movimentações</h2>

          <p className="mt-2 text-slate-600">Histórico de entradas e saídas do estoque.</p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 cursor-pointer"
        >
          <Plus size={18} />
          Nova movimentação
        </button>
      </div>

      {loading && (
        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">
          Carregando movimentações...
        </div>
      )}

      {error && <div className="mt-8 rounded-xl bg-red-50 p-4 text-sm text-red-600">{error}</div>}

      {!loading && !error && movements.length === 0 && (
        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-8 text-center">
          <p className="font-medium text-slate-900">Nenhuma movimentação registrada</p>

          <p className="mt-1 text-sm text-slate-500">Entradas e saídas aparecerão aqui.</p>
        </div>
      )}

      {!loading && !error && movements.length > 0 && (
        <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="divide-y divide-slate-200">
            {movements.map((movement) => {
              const isEntry = movement.type === 'ENTRY';

              return (
                <div
                  key={movement.id}
                  className="flex items-center justify-between p-5 transition hover:bg-slate-50"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`rounded-lg p-3 ${
                        isEntry ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                      }`}
                    >
                      {isEntry ? <ArrowDownToLine size={20} /> : <ArrowUpFromLine size={20} />}
                    </div>

                    <div>
                      <p className="font-semibold text-slate-900">
                        {isEntry ? 'Entrada' : 'Saída'}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {movement.productName ?? 'Produto'}
                      </p>

                      {movement.observation && (
                        <p className="mt-1 text-xs text-slate-400">{movement.observation}</p>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <p className={`font-semibold ${isEntry ? 'text-emerald-600' : 'text-red-600'}`}>
                      {isEntry ? '+' : '-'}
                      {movement.quantity}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {new Date(movement.createdAt).toLocaleString('pt-BR')}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {showCreateModal && (
        <MovementFormModal onClose={() => setShowCreateModal(false)} onCreated={loadMovements} />
      )}
    </div>
  );
}
