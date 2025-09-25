import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { userService } from "../services/userService";
import type { UpdateUserRequest, UserResponse } from "../types/user";

export function useUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const updateUser = async (
    data: UpdateUserRequest
  ): Promise<UserResponse | null> => {
    if (!user) return null;

    try {
      setLoading(true);
      setError(null);

      const res = await userService.update(user.id, data);

      return res.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Error actualizando usuario");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { user, updateUser, loading, error };
}
