import Navbar from "@/components/common/navbar";
import { Outlet } from "react-router-dom";

const QuestLayout = () => {
  return (
    <div className="bg-light text-secondary dark:bg-dark dark:text-secondary-dark min-h-screen">
      <Navbar />
      <div className="sm:px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default QuestLayout;
