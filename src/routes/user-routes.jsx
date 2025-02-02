import { Routes, Route } from "react-router-dom";
import UserLayout from "../layouts/user-layout";
import { Home, Product, Recomendation, Cart } from "../pages/user";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="produk" element={<Product />} />
        <Route path="rekomendasi" element={<Recomendation />} />
        <Route path="keranjang" element={<Cart />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
