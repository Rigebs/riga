// src/pages/dashboard.tsx

import { Box, CheckCircle, PackageIcon, DollarSign } from "lucide-react";
import { useDashboard } from "../hooks/useDashboard";

export default function DashboardPage() {
  const { dashboard, loading, error } = useDashboard();

  if (loading)
    return <div className="p-6 text-center">Cargando dashboard...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      {/* Totales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white shadow rounded p-4 flex items-center space-x-4">
          <Box className="w-10 h-10 text-blue-500 flex-shrink-0" />
          <div className="truncate">
            <p className="text-gray-500 text-sm truncate">Total Pedidos</p>
            <p className="text-xl font-semibold">{dashboard?.totalOrders}</p>
          </div>
        </div>

        <div className="bg-white shadow rounded p-4 flex items-center space-x-4">
          <CheckCircle className="w-10 h-10 text-green-500 flex-shrink-0" />
          <div className="truncate">
            <p className="text-gray-500 text-sm truncate">Pedidos Entregados</p>
            <p className="text-xl font-semibold">
              {dashboard?.totalDeliveredOrders}
            </p>
          </div>
        </div>

        <div className="bg-white shadow rounded p-4 flex items-center space-x-4">
          <DollarSign className="w-10 h-10 text-yellow-500 flex-shrink-0" />
          <div className="truncate">
            <p className="text-gray-500 text-sm truncate">Ingresos Totales</p>
            <p className="text-xl font-semibold">
              ${dashboard?.totalRevenue.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="bg-white shadow rounded p-4 flex items-center space-x-4">
          <PackageIcon className="w-10 h-10 text-purple-500 flex-shrink-0" />
          <div className="truncate">
            <p className="text-gray-500 text-sm truncate">Productos en Stock</p>
            <p className="text-xl font-semibold">{dashboard?.totalStock}</p>
          </div>
        </div>
      </div>

      {/* Últimos pedidos */}
      <div className="bg-white shadow rounded p-4 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Últimos Pedidos</h2>
        <table className="w-full table-auto min-w-[600px]">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Fecha</th>
              <th className="py-2 px-4">Total</th>
              <th className="py-2 px-4">Estado</th>
            </tr>
          </thead>
          <tbody>
            {dashboard?.recentOrders.map((order) => (
              <tr key={order.orderId} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{order.orderId}</td>
                <td className="py-2 px-4">
                  {new Date(order.orderDate).toLocaleString()}
                </td>
                <td className="py-2 px-4">${order.total.toFixed(2)}</td>
                <td className="py-2 px-4">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
