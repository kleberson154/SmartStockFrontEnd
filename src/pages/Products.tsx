import { PackagePlus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useAuth } from '../contexts/AuthContext';
import { deleteProduct, getProducts } from '../services/productService';
import type { Product } from '../types/product';
import { ProductFormModal } from '../components/ProductFormModal';

export function Products() {
  const { isAdmin } = useAuth();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  async function loadProducts() {
    try {
      setLoading(true);
      setError('');

      const data = await getProducts();

      setProducts(data);
    } catch {
      setError('Não foi possível carregar os produtos.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function handleDelete(product: Product) {
    const confirmed = window.confirm(`Deseja realmente excluir o produto "${product.name}"?`);

    if (!confirmed) {
      return;
    }

    try {
      await deleteProduct(product.id);
      await loadProducts();
    } catch {
      setError('Não foi possível excluir o produto.');
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Produtos</h2>

          <p className="mt-2 text-slate-600">Gerencie os produtos cadastrados no estoque.</p>
        </div>

        {isAdmin && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 cursor-pointer"
          >
            <PackagePlus size={18} />
            Novo produto
          </button>
        )}
      </div>

      {loading && (
        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">
          Carregando produtos...
        </div>
      )}

      {error && <div className="mt-8 rounded-xl bg-red-50 p-4 text-sm text-red-600">{error}</div>}

      {!loading && !error && products.length === 0 && (
        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-8 text-center">
          <p className="font-medium text-slate-900">Nenhum produto cadastrado</p>

          <p className="mt-1 text-sm text-slate-500">Os produtos cadastrados aparecerão aqui.</p>
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Produto
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Código
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Categoria
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Preço
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Estoque
                  </th>

                  {isAdmin && (
                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Ações
                    </th>
                  )}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {products.map((product) => (
                  <tr key={product.id} className="transition hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-900">{product.name}</p>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">{product.code}</td>

                    <td className="px-6 py-4 text-sm text-slate-600">{product.category}</td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {product.price.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={
                          product.quantity <= product.minimumStock
                            ? 'rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-600'
                            : 'rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-600'
                        }
                      >
                        {product.quantity}
                      </span>
                    </td>

                    {isAdmin && (
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={() => setEditingProduct(product)}
                            className="text-sm font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                          >
                            Editar
                          </button>

                          <button
                            onClick={() => handleDelete(product)}
                            className="flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-700 cursor-pointer"
                          >
                            <Trash2 size={16} />
                            Excluir
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showCreateModal && (
        <ProductFormModal onClose={() => setShowCreateModal(false)} onSaved={loadProducts} />
      )}

      {editingProduct && (
        <ProductFormModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSaved={loadProducts}
        />
      )}
    </div>
  );
}
