import { useState } from "react";
import { useCart } from "../hooks/useCart";
import { useCheckout } from "../hooks/useCheckout";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { processCheckout, loading, error } = useCheckout();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await processCheckout(form, cart);

    clearCart();
    navigate("/order-success", {
      state: { email: form.email, phone: form.phone },
    });
  };

  if (cart.length === 0)
    return (
      <div className="flex justify-center items-center h-64 text-gray-500 text-lg">
        Tu carrito está vacío 🛒
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-2xl p-6 space-y-4 border border-gray-100"
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Datos de envío
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <input
              name="name"
              placeholder="Nombre completo"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Correo electrónico"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <input
              name="address"
              placeholder="Dirección"
              value={form.address}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <input
              name="phone"
              placeholder="Teléfono"
              value={form.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-xl shadow-md disabled:opacity-50"
          >
            {loading ? "Procesando..." : "Confirmar Pedido"}
          </button>
        </form>

        {/* Resumen del pedido */}
        <div className="bg-gray-50 shadow-md rounded-2xl p-6 border border-gray-100 h-fit">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Resumen del pedido
          </h2>
          <ul className="divide-y divide-gray-200 mb-4">
            {cart.map((item) => (
              <li
                key={item.product.id}
                className="flex justify-between py-2 text-gray-600"
              >
                <span>
                  {item.product.name} × {item.quantity}
                </span>
                <span className="font-medium">
                  ${item.product.price * item.quantity}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-lg font-bold text-gray-800">
            Total: <span className="text-blue-600">${total}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
