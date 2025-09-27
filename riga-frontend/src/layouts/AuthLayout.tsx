// layouts/AuthLayout.tsx
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      {/* Fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/auth-background.jpg')" }}
      ></div>

      {/* Capa semitransparente */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Contenido */}
      <div className="relative w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
        <Outlet /> {/* LoginPage / RegisterPage */}
      </div>
    </div>
  );
};

export default AuthLayout;
