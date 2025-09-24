import React, { useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Props {
  cartLength?: number;
  onCartClick?: () => void;
}

const Navbar: React.FC<Props> = ({ cartLength = 0, onCartClick }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800">
          <Link to="/">Riga Shop</Link>
        </div>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6">
          <li>
            <Link
              to="/"
              className="text-gray-700 hover:text-gray-900 transition"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/shop"
              className="text-gray-700 hover:text-gray-900 transition"
            >
              Shop
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-gray-700 hover:text-gray-900 transition"
            >
              About
            </Link>
          </li>
        </ul>

        {/* Right actions (always visible) */}
        <div className="flex items-center gap-4">
          {isAuthenticated && user && (
            <span className="hidden sm:inline text-gray-700 font-medium">
              Hola, {user.name.split(" ")[0]} 👋
            </span>
          )}

          {cartLength > 0 && onCartClick && (
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

      {/* Mobile dropdown (only links) */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-md">
          <ul className="flex flex-col p-4 gap-4">
            <li>
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 hover:text-gray-900"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/shop"
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 hover:text-gray-900"
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 hover:text-gray-900"
              >
                About
              </Link>
            </li>

            {/* Opcional: en mobile podrías poner logout aquí también */}
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
