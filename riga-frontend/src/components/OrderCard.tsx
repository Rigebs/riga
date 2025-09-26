import { formatDate } from "../utils/format";
import type { OrderResponse } from "../types/order";
import { StatusBadge } from "./StatusBadge";
import { OrderItemList } from "./OrderItemList";
import { Truck, ShoppingBag } from "lucide-react";

interface OrderCardProps {
  order: OrderResponse;
}

export function OrderCard({ order }: OrderCardProps) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Pedido #{order.id}
          </h2>
          <p className="text-sm text-gray-500">
            Fecha: {formatDate(order.orderDate)}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <StatusBadge status={order.status} />
          {/* Badge con ícono */}
          <span
            className={`flex items-center space-x-1 px-2 py-1 text-sm font-semibold rounded-full ${
              order.deliveryRequired
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {order.deliveryRequired ? (
              <Truck className="w-3 h-3" />
            ) : (
              <ShoppingBag className="w-3 h-3" />
            )}
            <span>
              {order.deliveryRequired ? "Delivery" : "Recoger en tienda"}
            </span>
          </span>
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
      </div>
    </div>
  );
}
