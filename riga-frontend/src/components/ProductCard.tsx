import type { ProductResponse } from "../types/product";

export default function ProductCard({ product }: { product: ProductResponse }) {
  return (
    <div className="p-4 bg-white shadow rounded-lg hover:shadow-lg transition">
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-gray-500">{product.description}</p>
      <p className="text-green-600 font-bold mt-2">${product.price}</p>
      <p className="text-sm text-gray-400">Stock: {product.stock}</p>
      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
        {product.category?.name}
      </span>
    </div>
  );
}
