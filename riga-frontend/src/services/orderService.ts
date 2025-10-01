import type { ApiResponse } from "../types/api-response";
import type { OrderFilter, OrderRequest, OrderResponse } from "../types/order";
import type { Page } from "../types/page";
import api from "./api/api";

export const orderService = {
  getAll: async (
    filter?: Partial<OrderFilter>,
    page: number = 0,
    size: number = 5,
    sort?: string[]
  ): Promise<ApiResponse<Page<OrderResponse>>> => {
    const { data } = await api.get<ApiResponse<Page<OrderResponse>>>(
      "/orders",
      {
        params: {
          ...filter,
          page,
          size,
          sort,
        },
      }
    );
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

  update: async (
    id: number,
    order: Partial<OrderRequest>
  ): Promise<ApiResponse<OrderResponse>> => {
    const { data } = await api.put<ApiResponse<OrderResponse>>(
      `/orders/${id}`,
      order
    );
    return data;
  },

  confirm: async (id: number): Promise<ApiResponse<OrderResponse>> => {
    const { data } = await api.patch<ApiResponse<OrderResponse>>(
      `/orders/${id}/confirm`
    );
    return data;
  },

  customerConfirmOrder: async (
    id: number
  ): Promise<ApiResponse<OrderResponse>> => {
    const { data } = await api.patch<ApiResponse<OrderResponse>>(
      `/orders/${id}/customer-confirm`
    );
    return data;
  },

  deliverOrder: async (id: number): Promise<ApiResponse<OrderResponse>> => {
    const { data } = await api.patch<ApiResponse<OrderResponse>>(
      `/orders/${id}/deliver`
    );
    return data;
  },

  cancelOrder: async (id: number): Promise<ApiResponse<OrderResponse>> => {
    const { data } = await api.patch<ApiResponse<OrderResponse>>(
      `/orders/${id}/cancel`
    );
    return data;
  },
};
