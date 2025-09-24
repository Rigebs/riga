import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { orderService } from "../services/orderService";

export default function OrderConfirmPage() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const handleConfirm = async () => {
    const orderRequest = {
      userId: 1,
      items: cart.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
    };

    const res = await orderService.create(orderRequest);
    if (res.success) {
      clearCart();
      navigate("/orders");
    } else {
      alert(res.message);
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Confirm Order</h1>
      <ul className="space-y-2">
        {cart.map((item) => (
          <li key={item.product.id}>
            {item.product.name} x {item.quantity} = $
            {(item.product.price * item.quantity).toFixed(2)}
          </li>
        ))}
      </ul>
      <p className="mt-4 font-bold">Total: ${total.toFixed(2)}</p>

      <button
        onClick={handleConfirm}
        className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        Confirm Order
      </button>
    </div>
  );
}
