import { useState } from "react";
import type { CartItem } from "../hooks/useCart";

type CheckoutData = {
  name: string;
  email: string;
  address: string;
  phone: string;
};

export function useCheckout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function processCheckout(data: CheckoutData, cart: CartItem[]) {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Simula un "pedido creado"
      await new Promise((res) => setTimeout(res, 1500));

      console.log("Order created:", {
        customer: data,
        items: cart.map((c) => ({
          id: c.product.id,
          name: c.product.name,
          quantity: c.quantity,
          price: c.product.price,
        })),
      });

      setSuccess(true);
    } catch (err) {
      setError("Error al procesar el pedido");
    } finally {
      setLoading(false);
    }
  }

  return { processCheckout, loading, error, success };
}
