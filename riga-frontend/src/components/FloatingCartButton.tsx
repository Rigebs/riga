import React from "react";
import { ShoppingCart } from "lucide-react";

interface Props {
  cartLength: number;
  onClick: () => void;
}

const FloatingCartButton: React.FC<Props> = ({ cartLength, onClick }) => {
  if (cartLength === 0) return null;

  return (
    <button
      className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 flex items-center gap-2 z-50 transition"
      onClick={onClick}
    >
      <ShoppingCart size={20} />
      <span className="font-semibold">Carrito ({cartLength})</span>
    </button>
  );
};

export default FloatingCartButton;
