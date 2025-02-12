import Sidebar from "../components/common/sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <Sidebar>
      <Outlet />
    </Sidebar>
  );
};

export default AdminLayout;
