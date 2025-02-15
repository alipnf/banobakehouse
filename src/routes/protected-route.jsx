import { Navigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebase/firebase-config";
import useAuthStore from "@/store/use-auth-store";
import { useEffect, useState } from "react";

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
        const userDoc = await getDoc(doc(db, "users", user.id));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setIsAdmin(userData.role === "admin");
        } else {
          console.error("User not found in Firestore");
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error checking user role:", error);
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
