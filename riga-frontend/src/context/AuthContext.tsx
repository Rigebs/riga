// context/AuthContext.tsx
import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

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
  // 👇 Estado inicial directamente desde localStorage
  const storedToken = localStorage.getItem("accessToken");
  let initialUser: JwtPayload | null = null;
  let initialAuth = false;

  if (storedToken) {
    try {
      const decoded = jwtDecode<JwtPayload>(storedToken);
      // opcional: chequear expiración
      if (decoded.exp * 1000 > Date.now()) {
        initialUser = decoded;
        initialAuth = true;
      }
    } catch {
      // token inválido → se queda en null
    }
  }

  const [isAuthenticated, setIsAuthenticated] = useState(initialAuth);
  const [user, setUser] = useState<JwtPayload | null>(initialUser);

  const login = (accessToken: string, refreshToken: string) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    try {
      const decoded = jwtDecode<JwtPayload>(accessToken);
      setUser(decoded);
      setIsAuthenticated(true);
    } catch {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    setIsAuthenticated(false);
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
