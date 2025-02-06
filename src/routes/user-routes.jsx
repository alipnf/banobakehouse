import { Routes, Route } from "react-router-dom";
import UserLayout from "../layouts/user-layout";
import {
  HomePage,
  ProductPage,
  ProductDetailPage,
  RecomendationPage,
  CartPage,
} from "../pages/user";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<HomePage />} />
        <Route path="produk" element={<ProductPage />} />
        <Route path="produk/:id" element={<ProductDetailPage />} />
        <Route path="rekomendasi" element={<RecomendationPage />} />
        <Route path="keranjang" element={<CartPage />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
