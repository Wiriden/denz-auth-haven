
import { UserProvider } from "@/context/UserContext";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const DashboardLayout = () => {
  const { user, loading } = useAuth();
  
  useEffect(() => {
    // Only log in development mode to reduce console noise
    if (process.env.NODE_ENV === 'development') {
      console.log("DashboardLayout state:", { loading, user: !!user });
    }
  }, [loading, user]);
  
  // If still loading, show loading indicator
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="h-12 w-12 border-4 border-t-transparent border-denz-blue rounded-full animate-spin"></div>
      </div>
    );
  }
  
  // If not loading anymore and no user, redirect to login
  if (!loading && !user) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <UserProvider>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Topbar />
          <div className="flex-1 overflow-auto">
            <div className="p-6 max-w-7xl mx-auto w-full">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </UserProvider>
  );
};

export default DashboardLayout;
