import Footer from "../components/common/footer";
import Navbar from "../components/common/navbar";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="bg-light text-secondary dark:bg-dark dark:text-secondary-dark min-h-screen">
      <Navbar />
      <div className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default UserLayout;
