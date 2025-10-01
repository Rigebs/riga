import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface Props {
  cartLength?: number;
  onCartClick?: () => void;
}

const Navbar: React.FC<Props> = ({ cartLength = 0, onCartClick }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const clientRoutes = [
    { path: "/", label: "Inicio" },
    { path: "/orders", label: "Mis pedidos" },
  ];

  const adminRoutes = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/products", label: "Productos" },
    { path: "/orders", label: "Pedidos" },
    { path: "/users", label: "Usuarios" },
  ];

  const routes =
    isAuthenticated && user?.roles?.includes("ROLE_ADMIN")
      ? adminRoutes
      : clientRoutes;

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800">
          <Link to="/">Riga Shop</Link>
        </div>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6">
          {routes.map((r) => (
            <li key={r.path}>
              <Link
                to={r.path}
                className="text-gray-700 hover:text-gray-900 transition"
              >
                {r.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          {isAuthenticated && user && (
            <span className="hidden sm:inline text-gray-700 font-medium">
              Hola, {user.name.split(" ")[0]} 👋
            </span>
          )}

          {/* Carrito SOLO para clientes */}
          {user?.roles?.includes("client") && cartLength > 0 && onCartClick && (
            <button
              className="relative text-gray-700 hover:text-gray-900 transition"
              onClick={onCartClick}
            >
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartLength}
              </span>
            </button>
          )}

          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="hidden sm:inline text-sm text-red-500 hover:underline"
            >
              Cerrar sesión
            </button>
          )}

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700 hover:text-gray-900"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-md">
          <ul className="flex flex-col p-4 gap-4">
            {routes.map((r) => (
              <li key={r.path}>
                <Link
                  to={r.path}
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-700 hover:text-gray-900"
                >
                  {r.label}
                </Link>
              </li>
            ))}

            {isAuthenticated && (
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="text-sm text-red-500 hover:underline text-left"
              >
                Cerrar sesión
              </button>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
