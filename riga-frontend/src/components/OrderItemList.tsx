import { useState } from "react";
import type { OrderItemResponse } from "../types/order";

interface OrderItemListProps {
  items: OrderItemResponse[];
}

export function OrderItemList({ items }: OrderItemListProps) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => setExpanded(!expanded);

  const displayedItems = expanded ? items : items.slice(0, 2);

  return (
    <div>
      <ul className="divide-y divide-gray-200 mb-4">
        {displayedItems.map((item) => (
          <li
            key={item.product.id}
            className="flex justify-between py-2 text-gray-600"
          >
            <span>
              {item.product.name} × {item.quantity}
            </span>
            <span className="font-medium">
              ${item.product.price * item.quantity}
            </span>
          </li>
        ))}
      </ul>

      {items.length > 2 && (
        <button
          onClick={toggleExpand}
          className="text-blue-600 text-sm hover:underline"
        >
          {expanded
            ? "Ocultar productos"
            : `Ver todos los productos (${items.length})`}
        </button>
      )}
    </div>
  );
}
