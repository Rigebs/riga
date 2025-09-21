import type { CategoryResponse } from "./category";

export interface ProductResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: CategoryResponse;
}
