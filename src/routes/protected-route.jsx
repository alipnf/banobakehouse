import { Navigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase/firebase-config";
import useAuthStore from "../store/use-auth-store";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuthStore();
  const [isAdmin, setIsAdmin] = useState(null); // State untuk menyimpan status admin

  useEffect(() => {
    const checkUserRole = async () => {
      if (!user) {
        setIsAdmin(false);
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
      }
    };

    checkUserRole();
  }, [user]); // useEffect berjalan saat `user` berubah

  if (!isAdmin) {
    return <Navigate to="/error" replace />;
  }

  return children;
};

export default ProtectedRoute;
