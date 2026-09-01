import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { createMovement } from '../services/movementService';
import { getProducts } from '../services/productService';
import type { MovementRequest, MovementType } from '../types/movement';
import type { Product } from '../types/product';

interface MovementFormModalProps {
  onClose: () => void;
  onCreated: () => void;
}

export function MovementFormModal({
  onClose,
  onCreated,
}: MovementFormModalProps) {
  const [products, setProducts] = useState<Product[]>([]);

  const [form, setForm] = useState<MovementRequest>({
    productId: '',
    type: 'ENTRY',
    quantity: 1,
    observation: '',
  });

  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch {
        setError('Não foi possível carregar os produtos.');
      } finally {
        setLoadingProducts(false);
      }
    }

    loadProducts();
  }, []);

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: name === 'quantity' ? Number(value) : value,
    }));
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    try {
      setLoading(true);
      setError('');

      await createMovement(form);

      onCreated();
      onClose();
    } catch {
      setError(
        'Não foi possível registrar a movimentação. Verifique o estoque disponível.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              Nova movimentação
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Registre uma entrada ou saída de estoque.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Produto
            </label>

            <select
              name="productId"
              value={form.productId}
              onChange={handleChange}
              required
              disabled={loadingProducts}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900 cursor-pointer"
            >
              <option value="">
                {loadingProducts
                  ? 'Carregando produtos...'
                  : 'Selecione um produto'}
              </option>

              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} — estoque: {product.quantity}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Tipo
            </label>

            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900 cursor-pointer"
            >
              <option value="ENTRY">Entrada</option>
              <option value="EXIT">Saída</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Quantidade
            </label>

            <input
              name="quantity"
              type="number"
              min="1"
              value={form.quantity}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Observação
            </label>

            <textarea
              name="observation"
              value={form.observation}
              onChange={handleChange}
              rows={3}
              placeholder="Ex.: Reposição de estoque"
              className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading || loadingProducts}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
            >
              {loading ? 'Registrando...' : 'Registrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
