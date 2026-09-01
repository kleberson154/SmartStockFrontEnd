import { AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';

import { getLowStockProducts } from '../services/productService';
import type { Product } from '../types/product';

export function LowStock() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadLowStock() {
      try {
        const data = await getLowStockProducts();
        setProducts(data);
      } catch {
        setError('Não foi possível carregar os produtos com estoque baixo.');
      } finally {
        setLoading(false);
      }
    }

    loadLowStock();
  }, []);

  return (
    <div>
      <div>
        <h2 className="text-3xl font-bold text-slate-900">
          Estoque baixo
        </h2>

        <p className="mt-2 text-slate-600">
          Produtos que precisam de reposição.
        </p>
      </div>

      {loading && (
        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">
          Carregando estoque...
        </div>
      )}

      {error && (
        <div className="mt-8 rounded-xl bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-8 text-center">
          <AlertTriangle
            size={32}
            className="mx-auto text-emerald-600"
          />

          <p className="mt-3 font-medium text-slate-900">
            Nenhum produto com estoque baixo
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Todos os produtos estão acima do estoque mínimo.
          </p>
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="mt-8 grid gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between rounded-xl border border-red-100 bg-white p-5 shadow-sm"
            >
              <div>
                <p className="font-semibold text-slate-900">
                  {product.name}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {product.code} • {product.category}
                </p>
              </div>

              <div className="text-right">
                <p className="font-semibold text-red-600">
                  {product.quantity} unidades
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Mínimo: {product.minimumStock}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
