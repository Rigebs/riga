import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.product.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <span>
                  {item.product.name} x {item.quantity}
                </span>
                <div className="flex gap-4 items-center">
                  <span>
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-between items-center">
            <span className="text-lg font-bold">
              Total: ${total.toFixed(2)}
            </span>
            <div className="space-x-4">
              <button
                onClick={clearCart}
                className="px-4 py-2 border rounded-lg"
              >
                Clear
              </button>
              <button
                onClick={() => navigate("/checkout")}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
