import Footer from "../components/common/footer";
import Navbar from "../components/common/navbar";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto w-full">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default UserLayout;
