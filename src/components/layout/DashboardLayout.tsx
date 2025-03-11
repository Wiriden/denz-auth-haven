
import { UserProvider } from "@/context/UserContext";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const DashboardLayout = () => {
  const { user, loading } = useAuth();
  
  useEffect(() => {
    // Debug loading state
    console.log("DashboardLayout loading state:", loading, "user:", !!user);
  }, [loading, user]);
  
  // Show loading indicator for max 3 seconds to prevent infinite loading
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="h-12 w-12 border-4 border-t-transparent border-denz-blue rounded-full animate-spin"></div>
      </div>
    );
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
