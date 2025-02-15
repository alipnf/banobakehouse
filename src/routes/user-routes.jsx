import { Route } from "react-router-dom";
import UserLayout from "@/layouts/user-layout";
import {
  HomePage,
  ProductPage,
  ProductDetailPage,
  WishlistPage,
} from "../pages/user";

const UserRoutes = () => {
  return (
    <Route path="/" element={<UserLayout />}>
      <Route index element={<HomePage />} />
      <Route path="product" element={<ProductPage />} />
      <Route path="product/:id" element={<ProductDetailPage />} />
      <Route path="wishlist" element={<WishlistPage />} />
    </Route>
  );
};

export default UserRoutes;
