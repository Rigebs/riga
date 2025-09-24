import OrderTable from "../components/OrderTable";
import { useOrders } from "../hooks/useOrder";

export default function OrdersPage() {
  const { orders, loading, error, refresh } = useOrders();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
        <button
          onClick={refresh}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Refresh
        </button>
      </div>

      {loading && <p className="text-gray-500">Loading orders...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && <OrderTable orders={orders} />}
    </div>
  );
}
