import type { ApiResponse } from "../types/api-response";
import type { CategoryResponse } from "../types/category";
import api from "./api/api";

export const categoryService = {
  getAll: async (): Promise<ApiResponse<CategoryResponse[]>> => {
    const { data } = await api.get<ApiResponse<CategoryResponse[]>>(
      "/categories"
    );
    return data;
  },
};
