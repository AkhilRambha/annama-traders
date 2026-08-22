import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Collections from "./pages/Collections";
import ProductDetails from "./pages/ProductDetails";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Jewellery from "./pages/Jewellery";
import Specials from "./pages/Specials";
import "./styles.css";

import { CartProvider } from "./context/CartContext";
import { AdminProvider } from "./context/AdminContext";
import { Toaster } from "@/components/ui/sonner";
import AdminDashboard from "./pages/AdminDashboard";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AdminProvider>
      <CartProvider>
        <HashRouter>
          <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/jewellery" element={<Jewellery />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/specials" element={<Specials />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          {/* Admin Route (No Layout) */}
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </HashRouter>
      <Toaster position="bottom-right" />
      </CartProvider>
    </AdminProvider>
  </React.StrictMode>
);
