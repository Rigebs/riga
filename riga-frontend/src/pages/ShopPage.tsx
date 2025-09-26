import { useState } from "react";
import { useProduct } from "../hooks/useProduct";
import { useCategory } from "../hooks/useCategory";
import { useCart } from "../hooks/useCart";
import CategoryFilter from "../components/CategoryFilter";
import CartDrawer from "../components/CartDrawer";
import FloatingCartButton from "../components/FloatingCartButton";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";

export default function ShopPage() {
  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useProduct();
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategory();

  const { addToCart, cart, removeFromCart, clearCart, updateQuantity } =
    useCart();

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [isCartOpen, setCartOpen] = useState(false);

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category?.id === selectedCategory)
    : products;

  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen">
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        loading={categoriesLoading}
        error={categoriesError}
      />

      {/* Products Grid */}
      {productsLoading && <p>Loading products...</p>}
      {productsError && <p className="text-red-500">{productsError}</p>}
      {!productsLoading && filteredProducts.length === 0 && (
        <p>No products found</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addToCart}
          />
        ))}
      </div>

      <CartDrawer
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setCartOpen(false)}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        updateQuantity={updateQuantity} // <-- aquí lo pasamos
        onCheckout={() => {
          setCartOpen(false);
          navigate("/checkout");
        }}
      />

      {cart.length > 0 && !isCartOpen && (
        <FloatingCartButton
          cartLength={cart.length}
          onClick={() => setCartOpen(true)}
        />
      )}
    </div>
  );
}
