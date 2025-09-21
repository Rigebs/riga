import type { ProductResponse } from "./product";
import type { UserResponse } from "./user";

export interface OrderItemResponse {
  id: number;
  product: ProductResponse;
  quantity: number;
  unitPrice: number;
}

export interface OrderResponse {
  id: number;
  orderDate: string;
  status: "PENDING" | "PROCESSING" | "DELIVERED" | "CANCELED";
  total: number;
  user: UserResponse;
  items: OrderItemResponse[];
}
