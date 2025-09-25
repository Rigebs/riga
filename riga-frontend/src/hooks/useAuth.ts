import { useState } from "react";
import { authService } from "../services/authService";
import type { LoginRequest, UserRequest } from "../types/auth";
import { useAuth as useAuthContext } from "../context/AuthContext";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login: setAuthTokens, logout: clearAuth } = useAuthContext();

  const handleRegister = async (data: UserRequest) => {
    try {
      setLoading(true);
      setError(null);

      const res = await authService.register(data);
      return res;
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (data: LoginRequest) => {
    try {
      setLoading(true);
      setError(null);

      const res = await authService.login(data);

      if (res.success && res.data) {
        setAuthTokens(res.data.accessToken, res.data.refreshToken);
        return { success: true };
      }

      return { success: false };
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    clearAuth();
  };

  return { handleRegister, handleLogin, handleLogout, loading, error };
}
