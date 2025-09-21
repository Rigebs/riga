import { useState } from "react";
import { login, register, logout } from "../services/authService";
import type { LoginRequest, UserRequest } from "../types/auth";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (data: UserRequest) => {
    try {
      setLoading(true);
      setError(null);
      return await register(data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (data: LoginRequest) => {
    try {
      setLoading(true);
      setError(null);
      return await login(data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => logout();

  return { handleRegister, handleLogin, handleLogout, loading, error };
}
