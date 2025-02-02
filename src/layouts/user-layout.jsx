import Footer from "../components/common/footer";
import Navbar from "../components/common/navbar";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default UserLayout;
