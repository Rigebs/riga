import type { ProductResponse } from "../types/product";
import api from "./api/api";

export const getProducts = async (): Promise<ProductResponse[]> => {
  const res = await api.get("/products");
  return res.data;
};

export const getProductById = async (id: number): Promise<ProductResponse> => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};
