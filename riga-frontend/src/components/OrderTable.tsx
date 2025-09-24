import type { OrderResponse } from "../types/order";

interface Props {
  orders: OrderResponse[];
}

export default function OrderTable({ orders }: Props) {
  return (
    <div className="overflow-x-auto bg-white shadow rounded-2xl p-4">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left text-sm">
            <th className="p-3">#</th>
            <th className="p-3">User</th>
            <th className="p-3">Status</th>
            <th className="p-3">Total</th>
            <th className="p-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b hover:bg-gray-50 transition">
              <td className="p-3">{order.id}</td>
              <td className="p-3">{order.user.name}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    order.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === "DELIVERED"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {order.status}
                </span>
              </td>
              <td className="p-3 font-semibold">${order.total.toFixed(2)}</td>
              <td className="p-3">
                {new Date(order.orderDate).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
