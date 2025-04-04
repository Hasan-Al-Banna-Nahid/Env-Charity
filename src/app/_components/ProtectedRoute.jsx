"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "./AuthProvider";
import { toast } from "react-hot-toast";

const ProtectedRoute = ({ children, roles = [] }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        toast.error("You need to login first");
        router.push("/login");
      } else if (roles.length > 0 && !roles.includes(user.role)) {
        toast.error("You do not have permission to access this page");
        router.push("/dashboard");
      }
    }
  }, [user, loading, roles, router]);

  if (loading || !user || (roles.length > 0 && !roles.includes(user.role))) {
    return <div>Loading...</div>;
  }

  return children;
};

export default ProtectedRoute;
