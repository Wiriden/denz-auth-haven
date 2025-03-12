
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/context/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import Administration from "./pages/dashboard/Administration";
import Anstallda from "./pages/dashboard/Anstallda";
import Oversikt from "./pages/dashboard/Oversikt";
import Utrustning from "./pages/dashboard/Utrustning";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-right" />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Dashboard routes med layout */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Oversikt />} />
              <Route path="oversikt" element={<Oversikt />} />
              <Route path="anstallda" element={<Anstallda />} />
              <Route path="utrustning" element={<Utrustning />} />
              <Route path="administration" element={<Administration />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
