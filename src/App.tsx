import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CompradorEventos from "./pages/CompradorEventos";
import OrganizadorDashboard from "./pages/OrganizadorDashboard";
import CrearEvento from "./pages/CrearEvento";
import OrganizadorEventos from "./pages/OrganizadorEventos";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Comprador Routes */}
            <Route 
              path="/comprador/eventos" 
              element={
                <ProtectedRoute requiredRole="comprador">
                  <CompradorEventos />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/checkout/:eventId" 
              element={
                <ProtectedRoute requiredRole="comprador">
                  <Checkout />
                </ProtectedRoute>
              } 
            />
            
            {/* Organizador Routes */}
            <Route 
              path="/organizador/dashboard" 
              element={
                <ProtectedRoute requiredRole="organizador">
                  <OrganizadorDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/organizador/evento/nuevo" 
              element={
                <ProtectedRoute requiredRole="organizador">
                  <CrearEvento />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/organizador/eventos" 
              element={
                <ProtectedRoute requiredRole="organizador">
                  <OrganizadorEventos />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
