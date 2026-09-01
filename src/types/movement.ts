export type MovementType = 'ENTRY' | 'EXIT';

export interface Movement {
  id: string;
  type: MovementType;
  quantity: number;
  observation: string | null;
  productId: string;
  productName: string;
  createdAt: string;
}

export interface MovementRequest {
  productId: string;
  type: MovementType;
  quantity: number;
  observation?: string;
}
