import { useEffect, useState } from "react";
import type { OrderResponse, OrderFilter, OrderRequest } from "../types/order";
import { orderService } from "../services/orderService";

interface UseOrdersOptions {
  initialFilter?: Partial<OrderFilter>;
  initialSort?: string[];
  autoFetch?: boolean;
}

export function useOrders({
  initialFilter,
  initialSort,
  autoFetch = true,
}: UseOrdersOptions = {}) {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState<string[]>(initialSort ?? []);

  const PAGE_SIZE = 5;

  const fetchOrders = async (
    newPage: number = 0,
    filter?: Partial<OrderFilter>,
    newSort?: string[]
  ) => {
    setLoading(true);
    setError(null);
    try {
      const res = await orderService.getAll(
        filter ?? initialFilter,
        newPage,
        PAGE_SIZE,
        newSort ?? sort
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
    if (autoFetch) {
      fetchOrders(0, initialFilter, sort);
    }
  }, [initialFilter, sort, autoFetch]);

  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 0 && pageNumber < totalPages) {
      fetchOrders(pageNumber, initialFilter, sort);
    }
  };

  const confirmOrder = async (id: number) => {
    const res = await orderService.confirm(id);
    if (res.success) {
      await fetchOrders(page, initialFilter, sort);
    } else {
      throw new Error(res.message);
    }
    return res;
  };

  const updateOrder = async (id: number, order: Partial<OrderRequest>) => {
    const res = await orderService.update(id, order);
    if (!res.success) {
      throw new Error(res.message);
    }
  };

  return {
    orders,
    loading,
    error,
    page,
    totalPages,
    sort,
    setSort,
    refresh: () => fetchOrders(page, initialFilter, sort),
    goToPage,
    confirmOrder,
    updateOrder, // <-- agregado
  };
}
