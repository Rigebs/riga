import type { ApiResponse } from "../types/api-response";
import type { ProductResponse } from "../types/product";
import api from "./api/api";

export const productService = {
  getAll: async (): Promise<ApiResponse<ProductResponse[]>> => {
    const { data } = await api.get<ApiResponse<ProductResponse[]>>("/products");
    return data;
  },
};
