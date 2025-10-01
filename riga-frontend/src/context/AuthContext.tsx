// context/AuthContext.tsx
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";

interface JwtPayload {
  id: number;
  name: string;
  address: string;
  phone: string;
  roles: string[];
  sub: string;
  exp: number;
  iat: number;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: JwtPayload | null;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<JwtPayload | null>(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.exp * 1000 > Date.now() ? decoded : null;
    } catch {
      return null;
    }
  });

  const isAuthenticated = !!user;

  useEffect(() => {
    const handleTokenRefreshed = (e: any) => {
      try {
        const decoded = jwtDecode<JwtPayload>(e.detail);
        setUser(decoded);
      } catch {
        setUser(null);
      }
    };

    window.addEventListener("tokenRefreshed", handleTokenRefreshed);
    return () =>
      window.removeEventListener("tokenRefreshed", handleTokenRefreshed);
  }, []);

  const login = (accessToken: string, refreshToken: string) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    try {
      const decoded = jwtDecode<JwtPayload>(accessToken);
      setUser(decoded);
    } catch {
      setUser(null);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
