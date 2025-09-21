import ProductCard from "../components/ProductCard";
import { useFetch } from "../hooks/useFetch";
import { getProducts } from "../services/productService";
import type { ProductResponse } from "../types/product";

export default function ProductsPage() {
  const {
    data: products,
    loading,
    error,
  } = useFetch<ProductResponse[]>(getProducts);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
