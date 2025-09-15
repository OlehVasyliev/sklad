import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { ComparisonProvider } from "./contexts/ComparisonContext";
import { FiltersProvider } from "./contexts/FiltersContext";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Catalog from "./pages/Catalog";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";
import Register from "./pages/Register";
import Search from "./pages/Search";

import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Favorites from "./pages/Favorites";
import Comparison from "./pages/Comparison";
import Viewed from "./pages/Viewed";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <FavoritesProvider>
            <ComparisonProvider>
              <FiltersProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Layout><Index /></Layout>} />
                    <Route path="/catalog" element={<Layout><Catalog /></Layout>} />
                    <Route path="/catalog/:category" element={<Layout><Catalog /></Layout>} />
                    <Route path="/login" element={<Layout><Login /></Layout>} />
                    <Route path="/product/:id" element={<Layout><Product /></Layout>} />
                    <Route path="/cart" element={<Layout><Cart /></Layout>} />

                    <Route path="/orders" element={<Layout><Orders /></Layout>} />
                    <Route path="/favorites" element={<Layout><Favorites /></Layout>} />
                    <Route path="/comparison" element={<Layout><Comparison /></Layout>} />
                    <Route path="/viewed" element={<Layout><Viewed /></Layout>} />
                    <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
                    <Route path="/register" element={<Layout><Register /></Layout>} />
                    <Route path="/search" element={<Layout><Search /></Layout>} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<Layout><NotFound /></Layout>} />
                  </Routes>
                </BrowserRouter>
              </FiltersProvider>
            </ComparisonProvider>
          </FavoritesProvider>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
