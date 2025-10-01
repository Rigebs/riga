// AppRouter.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProductsPage from "../pages/ProductsPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import CartPage from "../pages/CartPage";
import OrdersPage from "../pages/OrdersPage";
import ShopPage from "../pages/ShopPage";
import MainLayout from "../layouts/MainLayout";
import CheckoutPage from "../pages/CheckoutPage";
import OrderSuccessPage from "../pages/OrderSuccessPage";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "../context/AuthContext";
import AuthLayout from "../layouts/AuthLayout";
import OrderEditPage from "../pages/OrderEditPage";
import OrderViewPage from "../pages/OrderViewPage";
import DashboardPage from "../pages/DashboardPage";

export default function AppRouter() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas de autenticación */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* Rutas con layout principal */}
          <Route element={<MainLayout />}>
            {/* públicas */}
            <Route path="/" element={<ShopPage />} />

            {/* privadas */}
            <Route element={<PrivateRoute />}>
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-success" element={<OrderSuccessPage />} />
              <Route path="/orders/:id/edit" element={<OrderEditPage />} />
              <Route path="/orders/:id/view" element={<OrderViewPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
