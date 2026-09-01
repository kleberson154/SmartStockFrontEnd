import { api } from './api';

import type {
  Movement,
  MovementRequest,
} from '../types/movement';

export async function getMovements(): Promise<Movement[]> {
  const response = await api.get<Movement[]>('/movements');

  return response.data;
}

export async function getMovementsByProduct(
  productId: string
): Promise<Movement[]> {
  const response = await api.get<Movement[]>(
    `/movements/product/${productId}`
  );

  return response.data;
}

export async function createMovement(
  data: MovementRequest
): Promise<Movement> {
  const response = await api.post<Movement>(
    '/movements',
    data
  );

  return response.data;
}
