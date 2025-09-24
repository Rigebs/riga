import type { ProductResponse } from "../types/product";

interface ProductCardProps {
  product: ProductResponse;
  onAddToCart?: (product: ProductResponse) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className="p-4 bg-white shadow rounded-lg hover:shadow-lg transition flex flex-col">
      {/* Imagen */}
      <div className="h-40 w-full flex items-center justify-center bg-gray-100 rounded-md mb-4 overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-contain"
          />
        ) : (
          <span className="text-gray-500">No Image</span>
        )}
      </div>

      {/* Información */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-gray-500 line-clamp-2">{product.description}</p>
        <p className="text-green-600 font-bold mt-2">
          ${product.price.toFixed(2)}
        </p>
        {product.category && (
          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded mt-2 inline-block">
            {product.category.name}
          </span>
        )}
      </div>

      {/* Botón */}
      {onAddToCart && (
        <button
          onClick={() => onAddToCart(product)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}
