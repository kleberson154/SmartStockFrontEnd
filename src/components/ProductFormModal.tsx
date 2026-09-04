import { X } from 'lucide-react';
import { useState } from 'react';

import { createProduct, updateProduct } from '../services/productService';
import type { Product, ProductRequest } from '../types/product';

interface ProductFormModalProps {
  product?: Product | null;
  onClose: () => void;
  onSaved: () => void;
}

export function ProductFormModal({ product, onClose, onSaved }: ProductFormModalProps) {
  const [form, setForm] = useState<ProductRequest>({
    name: product?.name || '',
    code: product?.code || '',
    category: product?.category || '',
    price: product?.price || 0,
    quantity: product?.quantity || 0,
    minimumStock: product?.minimumStock || 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === 'number' ? Number(value) : value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setLoading(true);
      setError('');

      if (product) {
        await updateProduct(product.id, form);
      } else {
        await createProduct(form);
      }

      onSaved();
      onClose();
    } catch {
      setError('Não foi possível cadastrar o produto.');
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
              {product ? 'Editar produto' : 'Novo produto'}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {product
                ? 'Atualize as informações do produto.'
                : 'Cadastre um novo produto no estoque.'}
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
            <label className="mb-2 block text-sm font-medium text-slate-700">Nome</label>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Código</label>

            <input
              name="code"
              value={form.code}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Categoria</label>

            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Preço</label>

              <input
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
              />
            </div>

            {!product && (
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Quantidade</label>

                <input
                  name="quantity"
                  type="number"
                  min="0"
                  value={form.quantity}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
                />
              </div>
            )}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Estoque mínimo
              </label>

              <input
                name="minimumStock"
                type="number"
                min="0"
                value={form.minimumStock}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
              />
            </div>
          </div>

          {error && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>}

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
              disabled={loading}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60 cursor-pointer"
            >
              {loading ? 'Salvando...' : product ? 'Salvar alterações' : 'Cadastrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
