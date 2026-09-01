import { api } from './api';

import type { Product, ProductRequest } from '../types/product';

export async function getProducts(): Promise<Product[]> {
  const response = await api.get<Product[]>('/products');

  return response.data;
}

export async function createProduct(
  data: ProductRequest
): Promise<Product> {
  const response = await api.post<Product>('/products', data);

  return response.data;
}

export async function updateProduct(
  id: string,
  data: ProductRequest
): Promise<Product> {
  const response = await api.put<Product>(`/products/${id}`, data);

  return response.data;
}

export async function deleteProduct(id: string): Promise<void> {
  await api.delete(`/products/${id}`);
}

export async function getLowStockProducts(): Promise<Product[]> {
  const response = await api.get<Product[]>('/products/low-stock');

  return response.data;
}
