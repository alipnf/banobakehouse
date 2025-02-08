import { Routes, Route } from "react-router-dom";
import UserLayout from "../layouts/user-layout";
import {
  HomePage,
  ProductPage,
  ProductDetailPage,
  WishlistPage,
} from "../pages/user";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<HomePage />} />
        <Route path="produk" element={<ProductPage />} />
        <Route path="produk/:id" element={<ProductDetailPage />} />
        <Route path="favorit" element={<WishlistPage />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
