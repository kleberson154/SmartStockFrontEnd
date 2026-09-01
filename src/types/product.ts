export interface Product {
  id: string;
  name: string;
  code: string;
  category: string;
  price: number;
  quantity: number;
  minimumStock: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductRequest {
  name: string;
  code: string;
  category: string;
  price: number;
  quantity: number;
  minimumStock: number;
}
