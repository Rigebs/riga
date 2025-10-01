import type { ApiResponse } from "../types/api-response";
import type { DashboardResponse } from "../types/dashboard";
import api from "./api/api";

export const dashboardService = {
  getDashboard: async (): Promise<ApiResponse<DashboardResponse>> => {
    const { data } = await api.get<ApiResponse<DashboardResponse>>(
      "/dashboard"
    );
    return data;
  },
};
