import type { ApiResponse } from "../types/api-response";
import type { UpdateUserRequest, UserResponse } from "../types/user";
import api from "./api/api";

export const userService = {
  update: async (
    id: number,
    data: UpdateUserRequest
  ): Promise<ApiResponse<UserResponse>> => {
    const { data: res } = await api.put<ApiResponse<UserResponse>>(
      `/users/${id}`,
      data
    );
    return res;
  },
};
