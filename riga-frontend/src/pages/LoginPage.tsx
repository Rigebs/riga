// pages/LoginPage.tsx
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";

export default function LoginPage() {
  const { handleLogin, loading, error } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });

  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as { from?: Location };
  const from = state?.from?.pathname || "/dashboard";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await handleLogin(form);
    if (res?.success) {
      navigate(from, { replace: true });
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Iniciar sesión
      </h2>

      {/* Mensaje si fue redirigido desde una ruta protegida */}
      {state?.from && (
        <p className="mb-4 text-center text-blue-600">
          Necesitas <strong>iniciar sesión</strong> para continuar con tu
          pedido.
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-xl shadow-md disabled:opacity-50"
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>

      <p className="mt-6 text-center text-gray-600 text-sm">
        ¿No tienes cuenta?{" "}
        <button
          onClick={() => navigate("/register")}
          className="text-blue-600 hover:underline font-medium"
        >
          Regístrate aquí
        </button>
      </p>
    </>
  );
}
