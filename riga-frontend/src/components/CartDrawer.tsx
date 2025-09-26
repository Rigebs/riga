import { Trash, X } from "lucide-react";
import React from "react";
import { QuantitySelector } from "./QuantitySelector";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface Props {
  cart: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  onCheckout: () => void;
  updateQuantity: (id: number, quantity: number) => void;
}

const CartDrawer: React.FC<Props> = ({
  cart,
  isOpen,
  onClose,
  removeFromCart,
  clearCart,
  onCheckout,
  updateQuantity,
}) => {
  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full z-50 transform transition-transform duration-300
          ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } w-full sm:w-96 flex flex-col`}
      >
        {/* Drawer Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/95 to-white/100 backdrop-blur-md shadow-lg" />

        {/* Content */}
        <div className="relative flex flex-col h-full z-10">
          {/* Header */}
          <div className="flex justify-between items-center p-6 shadow-md bg-white/90 backdrop-blur-sm">
            <h2 className="text-xl font-bold text-gray-800">Your Cart</h2>
            <button
              className="text-gray-500 hover:text-gray-800 p-1 rounded transition"
              onClick={onClose}
            >
              <X size={24} />
            </button>
          </div>

          {/* Cart Items */}
          {cart.length === 0 ? (
            <p className="p-6 text-gray-500 italic">Your cart is empty</p>
          ) : (
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {cart.map((item) => {
                const subtotal = item.product.price * item.quantity;
                return (
                  <div
                    key={item.product.id}
                    className="flex justify-between items-center p-3 bg-white/80 backdrop-blur-sm rounded-md shadow-sm"
                  >
                    {/* Información del producto */}
                    <div>
                      <p className="font-semibold text-gray-800">
                        {item.product.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        s/. {item.product.price.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-400">
                        Subtotal: ${subtotal.toFixed(2)}
                      </p>
                    </div>

                    {/* Selector de cantidad y botón eliminar */}
                    <div className="flex items-center gap-3">
                      <QuantitySelector
                        quantity={item.quantity}
                        onIncrease={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        onDecrease={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                      />
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-500 hover:text-red-700 p-1 rounded transition"
                      >
                        <Trash size={20} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Footer */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-gray-200 bg-white/90 backdrop-blur-sm flex flex-col gap-3">
              <p className="font-bold text-lg text-gray-800">
                Total: ${total.toFixed(2)}
              </p>
              <button
                className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                onClick={onCheckout}
              >
                Checkout
              </button>
              <button
                className="w-full py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition flex items-center justify-center gap-2"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
