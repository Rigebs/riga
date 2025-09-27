import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { orderService } from "../services/orderService";
import type { OrderResponse } from "../types/order";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function OrderViewPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (!id) return;
        const res = await orderService.getById(Number(id));
        if (res.success) {
          setOrder(res.data);
        } else {
          toast.error(res.message);
        }
      } catch {
        toast.error("Error al cargar el pedido");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  const handleConfirm = async () => {
    if (!id) return;
    try {
      setConfirming(true);
      const res = await orderService.customerConfirmOrder(Number(id));
      if (res.success) {
        setOrder(res.data);
        toast.success("Pedido confirmado ✅");
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Error al confirmar el pedido");
    } finally {
      setConfirming(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        Cargando pedido...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        Pedido no encontrado
      </div>
    );
  }

  const isClient = !user?.roles.includes("ROLE_ADMIN");
  const showConfirmButton =
    isClient && order.modified && !order.customerConfirmed; // mostramos solo si fue modificado y el cliente no confirmó

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Pedido #{order.id}
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 space-y-4">
        {/* Cliente */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cliente
          </label>
          <input
            type="text"
            value={order.user?.name ?? ""}
            disabled
            className="w-full border border-gray-300 p-3 rounded-xl bg-gray-100 text-gray-600"
          />
        </div>

        {/* Items */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Items</h2>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="border border-gray-300 rounded-xl p-3 space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span
                    className={`font-medium flex-1 ${
                      item.status === "REMOVED"
                        ? "text-red-500 line-through"
                        : "text-gray-700"
                    }`}
                  >
                    {item.product.name}
                  </span>

                  {item.status === "REMOVED" && (
                    <span className="text-sm text-red-600 italic">
                      Eliminado
                    </span>
                  )}
                  {item.status === "UPDATED" && (
                    <span className="text-sm text-blue-600 italic">
                      Cantidad ajustada: {item.quantity} (original:{" "}
                      {item.originalQuantity})
                    </span>
                  )}
                  {item.status === "ACTIVE" && (
                    <span className="text-sm text-gray-500">
                      Cantidad: {item.quantity}
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  Precio unitario: ${item.unitPrice.toFixed(2)}
                </div>
                <div className="text-sm font-semibold">
                  Subtotal: ${(item.unitPrice * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-right font-bold text-lg">
          Total: ${order.total.toFixed(2)}
        </div>

        {/* Botón de confirmación */}
        {showConfirmButton && (
          <div className="flex justify-end mt-4">
            <button
              onClick={handleConfirm}
              disabled={confirming}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition disabled:opacity-50"
            >
              {confirming && <Loader2 className="w-4 h-4 animate-spin" />}
              Confirmar Pedido
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
