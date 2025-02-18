import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuthStore from "@/store/use-auth-store";
import { supabase } from "@/services/supabase/supabase-config";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuthStore();
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserRole = async () => {
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Error fetching user role:", error.message);
          setIsAdmin(false);
        } else {
          // Periksa apakah role pengguna adalah "admin"
          setIsAdmin(data.role === "admin");
        }
      } catch (error) {
        console.error("Error checking user role:", error.message);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkUserRole();
  }, [user]);

  if (loading) {
    return (
      <div className="hs-embed-spinner flex justify-center items-center mt-5">
        <div
          className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/error" replace />;
  }

  return children;
};

export default ProtectedRoute;
