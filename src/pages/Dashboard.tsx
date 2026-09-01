import { AlertTriangle, Boxes, PackageCheck } from 'lucide-react';
import { useEffect, useState } from 'react';

import { StatCard } from '../components/StatCard';
import { getMovements } from '../services/movementService';
import {
  getLowStockProducts,
  getProducts,
} from '../services/productService';
import type { Movement } from '../types/movement';
import type { Product } from '../types/product';

export function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);
  const [movements, setMovements] = useState<Movement[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        setError('');

        const [
          productsData,
          lowStockData,
          movementsData,
        ] = await Promise.all([
          getProducts(),
          getLowStockProducts(),
          getMovements(),
        ]);

        setProducts(productsData);
        setLowStockProducts(lowStockData);
        setMovements(movementsData);
      } catch {
        setError('Não foi possível carregar os dados do dashboard.');
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">
        Carregando dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
        {error}
      </div>
    );
  }

  const recentMovements = [...movements]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  const dashboardLowStock = lowStockProducts.slice(0, 5);

  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-900">
        Dashboard
      </h2>

      <p className="mt-2 text-slate-600">
        Visão geral do estoque.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <StatCard
          title="Total de Produtos"
          value={products.length}
          description="Produtos cadastrados"
          icon={<Boxes />}
        />

        <StatCard
          title="Estoque baixo"
          value={lowStockProducts.length}
          description="Produtos precisam de atenção"
          icon={<AlertTriangle />}
        />

        <StatCard
          title="Movimentações"
          value={movements.length}
          description="Entradas e saídas registradas"
          icon={<PackageCheck />}
        />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">
            Estoque baixo
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Produtos que precisam de atenção
          </p>

          <div className="mt-6 space-y-3">
            {dashboardLowStock.length === 0 ? (
              <div className="rounded-lg bg-emerald-50 p-4 text-sm text-emerald-700">
                Nenhum produto com estoque baixo.
              </div>
            ) : (
              dashboardLowStock.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between rounded-lg border border-slate-200 p-4"
                >
                  <div>
                    <p className="font-medium text-slate-900">
                      {product.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Mínimo: {product.minimumStock}
                    </p>
                  </div>

                  <p className="text-sm font-semibold text-red-600">
                    {product.quantity}{' '}
                    {product.quantity === 1
                      ? 'unidade'
                      : 'unidades'}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">
            Movimentações recentes
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Últimas entradas e saídas registradas
          </p>

          <div className="mt-6 space-y-3">
            {recentMovements.length === 0 ? (
              <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-500">
                Nenhuma movimentação registrada.
              </div>
            ) : (
              recentMovements.map((movement) => {
                const isEntry = movement.type === 'ENTRY';

                return (
                  <div
                    key={movement.id}
                    className="flex items-center justify-between rounded-lg border border-slate-200 p-4"
                  >
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          isEntry
                            ? 'text-emerald-600'
                            : 'text-red-600'
                        }`}
                      >
                        {isEntry ? 'Entrada' : 'Saída'}
                      </p>

                      <p className="font-medium text-slate-900">
                        {movement.productName}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {new Date(
                          movement.createdAt
                        ).toLocaleString('pt-BR')}
                      </p>
                    </div>

                    <p
                      className={`font-semibold ${
                        isEntry
                          ? 'text-emerald-600'
                          : 'text-red-600'
                      }`}
                    >
                      {isEntry ? '+' : '-'}
                      {movement.quantity}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
