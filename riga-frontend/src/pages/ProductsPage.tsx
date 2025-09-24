import { useCart } from "../hooks/useCart";
import { useProduct } from "../hooks/useProduct";
import ProductCard from "../components/ProductCard";

export default function ProductsPage() {
  const { products, loading, error } = useProduct();
  const { addToCart } = useCart();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Our Products</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}
