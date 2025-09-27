import { formatDate } from "../utils/format";
import type { OrderResponse } from "../types/order";
import { StatusBadge } from "./StatusBadge";
import { OrderItemList } from "./OrderItemList";
import {
  Truck,
  ShoppingBag,
  CheckCircle2,
  Loader2,
  PackageCheck,
  XCircle,
  Edit3,
  Eye,
} from "lucide-react";

interface OrderCardProps {
  order: OrderResponse;
  isAdmin?: boolean;
  onConfirm?: (orderId: number) => void;
  onDeliver?: (orderId: number) => void;
  onEdit?: (orderId: number) => void;
  onView?: (orderId: number) => void;
  onCancel?: (orderId: number) => void;
  confirming?: boolean;
  delivering?: boolean;
  canceling?: boolean;
}

export function OrderCard({
  order,
  isAdmin = false,
  onConfirm,
  onDeliver,
  onEdit,
  onView,
  onCancel,
  confirming,
  delivering,
  canceling,
}: OrderCardProps) {
  const getCustomerStatusBadge = (order: OrderResponse) => {
    if (order.status === "PENDING") {
      return (
        <span className="px-3 py-1 rounded-xl bg-yellow-200 text-yellow-800 text-sm font-medium">
          Pendiente
        </span>
      );
    }
    if (order.status === "PROCESSING") {
      return (
        <span className="px-3 py-1 rounded-xl bg-blue-100 text-blue-800 text-sm font-medium">
          {order.deliveryRequired
            ? "Pedido en camino"
            : "Pedido listo para recoger"}
        </span>
      );
    }
    if (order.status === "DELIVERED") {
      return (
        <span className="px-3 py-1 rounded-xl bg-green-200 text-green-800 text-sm font-medium">
          Pedido entregado
        </span>
      );
    }
    if (order.status === "CANCELED") {
      return (
        <span className="px-3 py-1 rounded-xl bg-red-200 text-red-800 text-sm font-medium">
          Pedido cancelado
        </span>
      );
    }
  };

  const renderAdminActions = () => {
    if (!isAdmin) return null;

    const buttonBase =
      "flex items-center justify-center gap-2 px-3 py-1.5 text-sm rounded-lg transition";

    switch (order.status) {
      case "PENDING":
        return (
          <>
            <button
              onClick={() => onConfirm?.(order.id)}
              disabled={
                confirming || (order.modified && !order.customerConfirmed)
              }
              className={`${buttonBase} min-w-[40px] ${
                confirming || (order.modified && !order.customerConfirmed)
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {confirming ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="hidden md:inline">Procesar pedido</span>
                </>
              )}
            </button>

            <button
              onClick={() => onEdit?.(order.id)}
              className={`${buttonBase} min-w-[40px] bg-blue-600 text-white hover:bg-blue-700`}
            >
              <Edit3 className="w-4 h-4" />
              <span className="hidden md:inline">Editar</span>
            </button>

            <button
              onClick={() => onCancel?.(order.id)}
              disabled={canceling}
              className={`${buttonBase} min-w-[40px] ${
                canceling
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-red-500 text-white hover:bg-red-700"
              }`}
            >
              {canceling ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <XCircle className="w-4 h-4" />
                  <span className="hidden md:inline">Cancelar</span>
                </>
              )}
            </button>
          </>
        );

      case "PROCESSING":
        return (
          <>
            <button
              onClick={() => onDeliver?.(order.id)}
              disabled={delivering}
              className={`${buttonBase} min-w-[40px] ${
                delivering
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {delivering ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <PackageCheck className="w-4 h-4" />
                  <span className="hidden md:inline">Entregado</span>
                </>
              )}
            </button>

            <button
              onClick={() => onEdit?.(order.id)}
              className={`${buttonBase} min-w-[40px] bg-blue-600 text-white hover:bg-blue-700`}
            >
              <Edit3 className="w-4 h-4" />
              <span className="hidden md:inline">Editar</span>
            </button>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 pr-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Pedido #{order.id}
          </h2>

          {order.modified && (
            <div className="flex items-center gap-2 py-2 flex-wrap">
              {!order.customerConfirmed ? (
                <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-xl font-medium inline-block">
                  Pedido modificado
                </span>
              ) : (
                <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-xl font-medium inline-block">
                  Confirmado
                </span>
              )}
            </div>
          )}

          <div className="space-y-1.5 text-[15px] text-gray-600 mt-2">
            <p>
              <span className="font-medium text-gray-700">Fecha:</span>{" "}
              {formatDate(order.orderDate)}
            </p>

            {isAdmin && order.user && (
              <p className="truncate">
                <span className="font-medium text-gray-700">Cliente:</span>{" "}
                {order.user.name}
              </p>
            )}

            <p className="flex items-center gap-1">
              {order.deliveryRequired ? (
                <Truck className="w-4 h-4 text-gray-500" />
              ) : (
                <ShoppingBag className="w-4 h-4 text-gray-500" />
              )}
              <span>
                {order.deliveryRequired
                  ? "Entrega a domicilio"
                  : "Retiro en tienda"}
              </span>
            </p>
          </div>
        </div>

        {/* Columna derecha: badge visual */}
        <div className="flex-shrink-0">
          {isAdmin ? (
            <StatusBadge status={order.status} />
          ) : (
            getCustomerStatusBadge(order)
          )}
        </div>
      </div>

      {/* Items */}
      <OrderItemList items={order.items} />

      {/* Footer */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-lg font-bold text-gray-800">
          Total:{" "}
          <span className="text-blue-600">${order.total.toFixed(2)}</span>
        </p>

        <div className="flex gap-2 flex-wrap">
          {isAdmin && renderAdminActions()}

          {/* Botón Revisar solo si el pedido fue modificado y el cliente no lo confirmó */}
          {!isAdmin && order.modified && !order.customerConfirmed && (
            <button
              onClick={() => onView?.(order.id)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-gray-200 hover:bg-gray-300 transition"
            >
              <Eye className="w-4 h-4" />
              <span>Revisar</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
