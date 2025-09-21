import type { ApiResponse } from "../types/api-response";
import type { LoginRequest, TokenResponse, UserRequest } from "../types/auth";
import api from "./api/api";

export const register = async (
  data: UserRequest
): Promise<ApiResponse<void>> => {
  const res = await api.post<ApiResponse<void>>("/auth/register", data);
  return res.data;
};

export const login = async (
  data: LoginRequest
): Promise<ApiResponse<TokenResponse>> => {
  const res = await api.post<ApiResponse<TokenResponse>>("/auth/login", data);
  if (res.data.success && res.data.data) {
    localStorage.setItem("accessToken", res.data.data.accessToken);
    localStorage.setItem("refreshToken", res.data.data.refreshToken);
  }
  return res.data;
};

export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};
