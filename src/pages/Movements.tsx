/* eslint-disable react-hooks/exhaustive-deps */
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

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  async function loadMovements() {
    try {
      setLoading(true);
      setError('');

      const data = await getMovements(page, 10);

      setMovements(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
    } catch {
      setError('Não foi possível carregar as movimentações.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMovements();
  }, [page]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Movimentações</h2>

          <p className="mt-2 text-slate-600">Histórico de entradas e saídas do estoque.</p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 sm:w-auto cursor-pointer"
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
                  className="flex flex-col gap-4 p-5 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
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

                  <div className="text-left sm:text-right">
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

      {!loading && !error && totalPages > 1 && (
        <div className="mt-6 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <p className="text-sm text-slate-500">{totalElements} movimentações registradas</p>

          <div className="flex items-center justify-between gap-2 sm:justify-start sm:gap-3">
            <button
              disabled={page === 0}
              onClick={() => setPage((current) => current - 1)}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm disabled:opacity-40 cursor-pointer"
            >
              Anterior
            </button>

            <span className="text-sm text-slate-600">
              Página {page + 1} de {totalPages}
            </span>

            <button
              disabled={page + 1 >= totalPages}
              onClick={() => setPage((current) => current + 1)}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm disabled:opacity-40 cursor-pointer"
            >
              Próxima
            </button>
          </div>
        </div>
      )}

      {showCreateModal && (
        <MovementFormModal onClose={() => setShowCreateModal(false)} onCreated={loadMovements} />
      )}
    </div>
  );
}
