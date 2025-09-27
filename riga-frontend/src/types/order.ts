import type { ProductResponse } from "./product";
import type { UserResponse } from "./user";

export type OrderStatus = "PENDING" | "PROCESSING" | "DELIVERED" | "CANCELED";

export type OrderItemStatus = "ACTIVE" | "REMOVED" | "UPDATED";

export interface OrderItemResponse {
  id: number;
  product: ProductResponse;
  quantity: number;
  originalQuantity: number;
  status: OrderItemStatus;
  unitPrice: number;
}

export interface OrderResponse {
  id: number;
  orderDate: string;
  deliveryRequired: boolean;
  status: OrderStatus;
  modified: boolean;
  customerConfirmed: boolean;
  total: number;
  user: UserResponse;
  items: OrderItemResponse[];
}

export interface OrderItemRequest {
  productId: number;
  quantity: number;
  newQuantity?: number;
  unavailable?: boolean;
}

export interface OrderRequest {
  userId: number;
  items: OrderItemRequest[];
  deliveryRequired: boolean;
}

export interface OrderFilter {
  orderDateFrom?: string;
  orderDateTo?: string;
  status?: OrderStatus;
  minTotal?: number;
  maxTotal?: number;
  userId?: number;
}
