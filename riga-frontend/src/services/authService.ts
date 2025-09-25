import api from "./api/api";
import type { ApiResponse } from "../types/api-response";
import type { LoginRequest, TokenResponse, UserRequest } from "../types/auth";

export const authService = {
  register: async (data: UserRequest): Promise<ApiResponse<void>> => {
    const res = await api.post<ApiResponse<void>>("/auth/register", data);
    return res.data;
  },

  login: async (data: LoginRequest): Promise<ApiResponse<TokenResponse>> => {
    const res = await api.post<ApiResponse<TokenResponse>>("/auth/login", data);

    if (res.data.success && res.data.data) {
      localStorage.setItem("accessToken", res.data.data.accessToken);
      localStorage.setItem("refreshToken", res.data.data.refreshToken);
    }

    return res.data;
  },

  refresh: async (
    refreshToken: string
  ): Promise<ApiResponse<TokenResponse>> => {
    const res = await api.post<ApiResponse<TokenResponse>>("/auth/refresh", {
      refreshToken,
    });

    if (res.data.success && res.data.data) {
      localStorage.setItem("accessToken", res.data.data.accessToken);
      localStorage.setItem("refreshToken", res.data.data.refreshToken);
    }

    return res.data;
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },
};
