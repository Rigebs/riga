import type { ApiResponse } from "../types/api-response";
import type { OrderRequest, OrderResponse } from "../types/order";
import api from "./api/api";

export const orderService = {
  getAll: async (): Promise<ApiResponse<OrderResponse[]>> => {
    const { data } = await api.get<ApiResponse<OrderResponse[]>>("/orders");
    return data;
  },

  getById: async (id: number): Promise<ApiResponse<OrderResponse>> => {
    const { data } = await api.get<ApiResponse<OrderResponse>>(`/orders/${id}`);
    return data;
  },

  create: async (
    order: Partial<OrderRequest>
  ): Promise<ApiResponse<OrderResponse>> => {
    const { data } = await api.post<ApiResponse<OrderResponse>>(
      "/orders",
      order
    );
    return data;
  },
};
