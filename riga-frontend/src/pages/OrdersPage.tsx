import { useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Loader2, ChevronLeft, ChevronRight, Box } from "lucide-react";
import { OrderCard } from "../components/OrderCard";
import { useOrders } from "../hooks/useOrder";
import type { OrderStatus } from "../types/order";

const STATUS_OPTIONS = ["ALL", "PENDING", "DELIVERED", "CANCELED"] as const;

export default function OrdersPage() {
  const { user } = useAuth();

  const [statusFilter, setStatusFilter] = useState<OrderStatus | "ALL">("ALL");

  const apiFilter = useMemo(() => {
    if (!user?.id) return undefined;
    return {
      userId: user.id,
      ...(statusFilter !== "ALL"
        ? { status: statusFilter as OrderStatus }
        : {}),
    };
  }, [user?.id, statusFilter]);

  const { orders, loading, error, page, totalPages, goToPage } =
    useOrders(apiFilter);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Mis Pedidos</h1>

      {/* Filtro */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex gap-2">
          {STATUS_OPTIONS.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status as OrderStatus | "ALL")}
              className={`px-3 py-1 rounded-full text-sm font-medium border ${
                statusFilter === status
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {status === "ALL"
                ? "Todos"
                : status === "PENDING"
                ? "Pendientes"
                : status === "DELIVERED"
                ? "Completados"
                : "Cancelados"}
            </button>
          ))}
        </div>
      </div>

      {/* Contenido */}
      {loading ? (
        <div className="flex justify-center items-center h-64 text-gray-500">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          Cargando pedidos...
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-64 text-red-500">
          {error}
        </div>
      ) : orders.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-64 text-gray-500 text-lg gap-2">
          <Box className="h-8 w-8" />
          {statusFilter === "ALL"
            ? "No hay pedidos aún"
            : `No se encontraron pedidos ${
                statusFilter === "PENDING"
                  ? "pendientes"
                  : statusFilter === "DELIVERED"
                  ? "completados"
                  : "cancelados"
              }`}
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}

      {/* Paginación */}
      {orders.length > 0 && (
        <div className="flex justify-center items-center mt-6 gap-2">
          <button
            disabled={page === 0}
            onClick={() => goToPage(page - 1)}
            className="p-2 rounded bg-gray-200 disabled:opacity-50 flex items-center justify-center"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <span className="px-3 py-1">
            Página {page + 1} de {totalPages}
          </span>

          <button
            disabled={page + 1 >= totalPages}
            onClick={() => goToPage(page + 1)}
            className="p-2 rounded bg-gray-200 disabled:opacity-50 flex items-center justify-center"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}
