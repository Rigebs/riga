// hooks/useCheckout.ts
import { useState } from "react";
import type { CartItem } from "../hooks/useCart";
import type { OrderRequest } from "../types/order";
import { orderService } from "../services/orderService";

export function useCheckout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function processCheckout(userId: number, cart: CartItem[]) {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const orderRequest: OrderRequest = {
        userId: userId,
        items: cart.map((c) => ({
          productId: c.product.id,
          quantity: c.quantity,
        })),
      };

      const response = await orderService.create(orderRequest);

      if (!response.success) {
        throw new Error(response.message || "Error creando pedido");
      }

      console.log("✅ Order created:", response.data);

      setSuccess(true);
      return response.data;
    } catch (err: any) {
      setError(err.message || "Error al procesar el pedido");
    } finally {
      setLoading(false);
    }
  }

  return { processCheckout, loading, error, success };
}
