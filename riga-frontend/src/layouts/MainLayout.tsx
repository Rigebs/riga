// layouts/MainLayout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

interface Props {
  cartLength?: number;
  onCartClick?: () => void;
}

const MainLayout: React.FC<Props> = ({ cartLength = 0, onCartClick }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar cartLength={cartLength} onCartClick={onCartClick} />

      {/* Page Content */}
      <main className="pt-20 px-6 max-w-7xl mx-auto">
        <Outlet /> {/* 👈 aquí se inyectan las páginas */}
      </main>
    </div>
  );
};

export default MainLayout;
