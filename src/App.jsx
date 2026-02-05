/**
 * App.jsx
 * ========
 * The main application component.
 * 
 * RESPONSIBILITIES:
 * - Wraps app with AuthProvider for authentication
 * - Defines all routes
 * - Manages global state (theme, cart counts for navbar)
 * - Renders Navbar on all pages
 * 
 * ROUTES:
 * - "/" → Home page
 * - "/login" → Login page
 * - "/collections" → Collections (protected - requires login)
 */

import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Context
import { AuthProvider } from "./context/AuthContext";

// Components
import Navbar from "./components/HEADER/navbar";
import CartSidebar from "./components/CART/CartSidebar";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Collections from "./pages/Collections";

// Styles
import "./App.css";

function App() {
  // ========== THEME STATE ==========
  // Load theme preference from localStorage
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  // Apply theme to document when it changes
  useEffect(() => {
    const theme = isDarkMode ? "dark" : "light";
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [isDarkMode]);

  // ========== CART STATE (for navbar badge) ==========
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("stylehub-cart");
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch {
        return [];
      }
    }
    return [];
  });

  // Listen for cart changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const savedCart = localStorage.getItem("stylehub-cart");
      if (savedCart) {
        try {
          setCartItems(JSON.parse(savedCart));
        } catch {
          setCartItems([]);
        }
      }
    };

    // Listen for changes from other components
    window.addEventListener("storage", handleStorageChange);
    
    // Also poll periodically for same-tab updates
    const interval = setInterval(handleStorageChange, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Calculate cart count for navbar badge
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // ========== WISHLIST STATE (for navbar badge) ==========
  const [wishlistItems, setWishlistItems] = useState(() => {
    const savedWishlist = localStorage.getItem("stylehub-wishlist");
    if (savedWishlist) {
      try {
        return JSON.parse(savedWishlist);
      } catch {
        return [];
      }
    }
    return [];
  });

  // Listen for wishlist changes in localStorage
  useEffect(() => {
    const handleWishlistChange = () => {
      const savedWishlist = localStorage.getItem("stylehub-wishlist");
      if (savedWishlist) {
        try {
          setWishlistItems(JSON.parse(savedWishlist));
        } catch {
          setWishlistItems([]);
        }
      }
    };

    window.addEventListener("storage", handleWishlistChange);
    const interval = setInterval(handleWishlistChange, 1000);

    return () => {
      window.removeEventListener("storage", handleWishlistChange);
      clearInterval(interval);
    };
  }, []);

  const wishlistCount = wishlistItems.length;

  // ========== CART SIDEBAR STATE ==========
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Calculate cart total
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Update cart item quantity
  const updateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id);
      return;
    }
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQty } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("stylehub-cart", JSON.stringify(updatedCart));
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("stylehub-cart", JSON.stringify(updatedCart));
  };

  // ========== RENDER ==========
  return (
    <AuthProvider>
      <div className={`app ${isDarkMode ? "dark" : "light"}`}>
        {/* Navbar appears on all pages */}
        {/* Navbar - Hidden on Login/Signup pages */}
        <NavbarWrapper
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          wishlistCount={wishlistCount}
          cartCount={cartCount}
          onCartClick={() => setIsCartOpen(true)}
        />

        {/* Global Cart Sidebar - works from any page */}
        <CartSidebar
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          cartCount={cartCount}
          cartTotal={cartTotal}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
        />

        {/* Route definitions */}
        <Routes>
          {/* Home page - public */}
          <Route path="/" element={<Home />} />

          {/* Login page - public */}
          <Route path="/login" element={<Login />} />

          {/* Signup page - public */}
          <Route path="/signup" element={<Signup />} />

          {/* Collections page - now PUBLIC (no login required) */}
          <Route path="/collections" element={<Collections />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

// Helper component to check location and render Navbar conditionally
function NavbarWrapper(props) {
  const location = useLocation();
  const hideStart = ["/login", "/signup"];
  // Hide if path starts with /login or /signup
  if (hideStart.some((path) => location.pathname.startsWith(path))) {
    return null;
  }
  return <Navbar {...props} />;
}

export default App;
