import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { OrderRequest, OrderResponse } from "../types/order";
import { Loader2, Save, X } from "lucide-react";
import toast from "react-hot-toast";
import { QuantitySelector } from "../components/QuantitySelector";
import { orderService } from "../services/orderService";
import { useOrders } from "../hooks/useOrder";

export default function OrderEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { updateOrder } = useOrders({ autoFetch: false });

  const [form, setForm] = useState<Partial<OrderRequest>>({});

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (!id) return;
        const res = await orderService.getById(Number(id));
        if (res.success) {
          setOrder(res.data);
          setForm({
            items: res.data.items.map((i) => {
              let quantity = i.quantity; // cantidad original pedida
              let newQuantity = i.quantity; // cantidad actual editable
              let unavailable = i.status === "REMOVED";

              if (i.status === "UPDATED") {
                quantity = i.originalQuantity ?? i.quantity;
                newQuantity = i.quantity;
              }

              return {
                productId: i.product.id,
                quantity,
                newQuantity,
                unavailable,
              };
            }),
          });
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

  const handleItemQuantity = (index: number, value: number) => {
    setForm((prev) => {
      const items = [...(prev.items ?? [])];
      if (!items[index].unavailable) {
        items[index].newQuantity = value;
      }
      return { ...prev, items };
    });
  };

  const handleUnavailableToggle = (index: number, checked: boolean) => {
    setForm((prev) => {
      const items = [...(prev.items ?? [])];
      items[index].unavailable = checked;
      // Si desmarca, no necesitamos tocar newQuantity, ya que nunca lo pusimos a 0
      return { ...prev, items };
    });
  };

  const handleSubmit = async () => {
    if (!id) return;
    setSaving(true);
    try {
      const payload: Partial<OrderRequest> = {
        items: (form.items ?? []).map((i) => ({
          productId: i.productId,
          quantity: i.unavailable ? 0 : i.quantity,
          ...(i.newQuantity !== undefined && i.newQuantity !== i.quantity
            ? { newQuantity: i.newQuantity }
            : {}),
        })),
      };

      await updateOrder(Number(id), payload);
      toast.success("Pedido actualizado");
      navigate("/orders");
    } catch (err: any) {
      toast.error(err.message || "Error al guardar cambios");
    } finally {
      setSaving(false);
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

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Editar Pedido #{order.id}
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 space-y-4">
        {/* Cliente */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-1">
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
            {order.items.map((item, index) => {
              const formItem = form.items?.[index];

              // SOLO basado en checkbox
              const isRemoved = formItem?.unavailable ?? false;

              const isUpdated =
                !isRemoved &&
                formItem?.newQuantity != null &&
                formItem.newQuantity !== formItem.quantity;

              const displayQuantity: number = formItem?.unavailable
                ? 0
                : formItem?.newQuantity ?? 1;

              return (
                <div
                  key={item.product.id}
                  className="border border-gray-400 rounded-xl p-3 space-y-2"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    {/* Nombre + badge */}
                    <div className="flex items-center gap-2 flex-1">
                      <span
                        className={`font-medium ${
                          isRemoved
                            ? "text-red-500 line-through"
                            : "text-gray-700"
                        }`}
                      >
                        {item.product.name}
                      </span>

                      {isUpdated && (
                        <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-xl font-medium whitespace-nowrap">
                          Actualizado
                        </span>
                      )}
                    </div>

                    {/* Selector + checkbox */}
                    <div className="flex items-center gap-3">
                      {!isRemoved && (
                        <QuantitySelector
                          quantity={displayQuantity}
                          max={item.originalQuantity ?? item.quantity}
                          onIncrease={() =>
                            handleItemQuantity(
                              index,
                              Math.min(
                                item.originalQuantity ?? item.quantity,
                                displayQuantity + 1
                              )
                            )
                          }
                          onDecrease={() =>
                            handleItemQuantity(
                              index,
                              Math.max(1, displayQuantity - 1)
                            )
                          }
                        />
                      )}

                      <label className="flex items-center gap-2 text-sm text-red-600 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={isRemoved}
                          onChange={(e) =>
                            handleUnavailableToggle(index, e.target.checked)
                          }
                        />
                        Sin stock
                      </label>
                    </div>
                  </div>

                  {isRemoved && (
                    <p className="text-sm text-gray-500 italic">
                      Este producto no se entregará
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Acciones */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
        >
          <X className="w-4 h-4" />
          <span className="hidden sm:inline">Cancelar</span>
        </button>

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50 shadow-md"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span className="hidden sm:inline">Guardar</span>
        </button>
      </div>
    </div>
  );
}
