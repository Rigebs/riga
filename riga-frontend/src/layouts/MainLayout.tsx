// layouts/MainLayout.tsx
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ArrowLeft } from "lucide-react";

interface Props {
  cartLength?: number;
  onCartClick?: () => void;
}

const MainLayout: React.FC<Props> = ({ cartLength = 0, onCartClick }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const showBackButton = /\/orders\/\d+/.test(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar cartLength={cartLength} onCartClick={onCartClick} />

      <main className="pt-20 pb-6 px-6 max-w-7xl mx-auto">
        {showBackButton && (
          <button
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center gap-2 px-3 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver</span>
          </button>
        )}
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
