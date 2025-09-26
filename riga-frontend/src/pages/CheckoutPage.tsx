import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useCheckout } from "../hooks/useCheckout";
import { useUser } from "../hooks/useUser";
import { toast } from "react-hot-toast";
import {
  CheckCircle,
  Truck,
  ShoppingBag,
  AlertCircle,
  Phone,
  MapPin,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { processCheckout, loading, error } = useCheckout();
  const { user } = useAuth();
  const { updateUser } = useUser();

  const navigate = useNavigate();

  const [delivery, setDelivery] = useState<"delivery" | "pickup" | null>(null);
  const [form, setForm] = useState({
    address: user?.address || "",
    phone: user?.phone || "",
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

    if (!user?.id) {
      console.error("Usuario no autenticado");
      return;
    }

    // Si es delivery, se requiere dirección y teléfono
    if (delivery === "delivery" && (!form.address || !form.phone)) {
      console.error("Faltan datos de envío");
      return;
    }

    await processCheckout(user.id, cart, delivery === "delivery");

    if (
      delivery === "delivery" &&
      (form.address !== user?.address || form.phone !== user?.phone)
    ) {
      await updateUser(form);
    }

    clearCart();

    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-md w-full bg-white shadow-lg rounded-2xl pointer-events-auto flex ring-opacity-5 p-4`}
      >
        <div className="flex items-center">
          <CheckCircle className="h-6 w-6 text-green-500" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              Pedido realizado con éxito
            </p>
            <p className="mt-1 text-sm text-gray-500">
              ¡Gracias por tu compra!
            </p>
          </div>
        </div>
      </div>
    ));

    navigate("/");
  };

  if (cart.length === 0)
    return (
      <div className="flex justify-center items-center h-64 text-gray-500 text-lg">
        Tu carrito está vacío 🛒
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-2xl p-6 space-y-4 border border-gray-100"
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Método de entrega
          </h2>

          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => setDelivery("delivery")}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl border ${
                delivery === "delivery"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              <Truck className="w-5 h-5" />
              <span>Delivery</span>
            </button>

            <button
              type="button"
              onClick={() => setDelivery("pickup")}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl border ${
                delivery === "pickup"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              <span>En tienda</span>
            </button>
          </div>

          {delivery === "delivery" && (
            <>
              <h2 className="text-xl font-semibold text-gray-700 mb-2 mt-4">
                Datos de envío
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {/* Dirección */}
                <div className="relative">
                  <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    name="address"
                    placeholder="Dirección"
                    value={form.address}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-3 pl-10 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>

                {/* Teléfono */}
                <div className="relative">
                  <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    name="phone"
                    placeholder="Teléfono"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-3 pl-10 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
              </div>
            </>
          )}

          {error && <p className="text-red-500">{error}</p>}

          {/* Mensaje de advertencia */}
          <div className="flex items-start bg-yellow-100 border-l-4 border-yellow-400 p-3 rounded-xl mb-4">
            <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <p className="ml-2 text-yellow-700 text-sm">
              Algunos productos podrían no estar disponibles. Se le notificará
              cualquier cambio.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading || !delivery}
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
