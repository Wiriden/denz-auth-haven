
import { UserProvider } from "@/context/UserContext";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const DashboardLayout = () => {
  const { user, loading, authChecked } = useAuth();
  
  useEffect(() => {
    // Log in development mode to reduce console noise
    if (process.env.NODE_ENV === 'development') {
      console.log("DashboardLayout state:", { loading, authChecked, user: !!user });
    }
  }, [loading, authChecked, user]);
  
  // In demo mode, we always show the dashboard regardless of authentication state
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
