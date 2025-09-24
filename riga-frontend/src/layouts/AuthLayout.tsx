// layouts/AuthLayout.tsx
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <Outlet /> {/* 👈 aquí se inyectan LoginPage y RegisterPage */}
      </div>
    </div>
  );
};

export default AuthLayout;
