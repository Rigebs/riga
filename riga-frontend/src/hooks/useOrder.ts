import { useEffect, useState } from "react";
import type { OrderResponse, OrderFilter } from "../types/order";
import { orderService } from "../services/orderService";

export function useOrders(initialFilter?: Partial<OrderFilter>) {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const PAGE_SIZE = 5;

  const fetchOrders = async (
    newPage: number = 0,
    filter?: Partial<OrderFilter>
  ) => {
    setLoading(true);
    setError(null);
    try {
      const res = await orderService.getAll(
        filter ?? initialFilter,
        newPage,
        PAGE_SIZE
      );
      if (res.success) {
        setOrders(res.data.content);
        setPage(res.data.pageable.pageNumber);
        setTotalPages(res.data.totalPages);
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError("Error fetching orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(0, initialFilter);
  }, [initialFilter]);

  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 0 && pageNumber < totalPages) {
      fetchOrders(pageNumber, initialFilter);
    }
  };

  return {
    orders,
    loading,
    error,
    page,
    totalPages,
    refresh: () => fetchOrders(page, initialFilter),
    goToPage,
  };
}
