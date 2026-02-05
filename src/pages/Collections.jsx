/**
 * Collections.jsx
 * ================
 * Protected page showing all collections.
 * 
 * FEATURES:
 * - Shows all products organized by category
 * - Requires authentication to access
 * - Redirects to /login if not logged in
 * 
 * PROTECTION:
 * - Uses ProtectedRoute wrapper in App.jsx
 */

import { useState, useRef, useEffect } from "react";
import { fetchProducts } from "../services/api";
import { useAuth } from "../context/AuthContext";

// Import components
import ProductFilters from "../components/PRODUCTS/ProductFilters";
import ProductGrid from "../components/PRODUCTS/ProductGrid";
import Footer from "../components/FOOTER/footer";

export default function Collections() {
  // Get user info
  const { user } = useAuth();
  
  // Reference for scroll
  const topRef = useRef(null);

  // ========== STATE ==========
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initial Data Fetch
  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // Get all unique brands dynamically
  const allBrands = [...new Set(products.map((p) => p.brand))];
  
  // Wishlist - persisted in localStorage
  const [wishlist, setWishlist] = useState(() => {
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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  // Cart items (simplified - just for adding)
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

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("stylehub-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // ========== FUNCTIONS ==========

  function addToCart(product) {
    const existingItem = cartItems.find((item) => item.id === product.id);
    let newCart;

    if (existingItem) {
      newCart = cartItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCart = [...cartItems, { ...product, quantity: 1 }];
    }

    setCartItems(newCart);
    localStorage.setItem("stylehub-cart", JSON.stringify(newCart));
  }

  function toggleWishlist(productId) {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  }

  function clearFilters() {
    setSearchTerm("");
    setSelectedBrand("All");
    setSelectedCategory("All");
  }

  function scrollToTop() {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  // ========== FILTERING & SORTING ==========

  let filteredProducts = products.filter((product) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      product.name.toLowerCase().includes(searchLower) ||
      product.brand.toLowerCase().includes(searchLower);

    const matchesBrand =
      selectedBrand === "All" || product.brand === selectedBrand;

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesBrand && matchesCategory;
  });

  if (sortBy === "price-low") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
  }

  // ========== RENDER ==========

  return (
    <div className="collections-page" ref={topRef}>
      {/* Page Header */}
      <section className="collections-header">
        <div className="collections-header-content">
          <h1>Our Collections</h1>
          <p>Welcome, {user}! Browse our exclusive collection of fashion items.</p>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section" id="products">
        <div className="section-header">
          <h2 className="section-title">All Products</h2>
          <p className="section-subtitle">Discover the latest trends</p>
        </div>

        {/* Filters */}
        <ProductFilters
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          sortBy={sortBy}
          setSortBy={setSortBy}
          allBrands={allBrands}
        />

        {/* Product Grid */}
        <ProductGrid
          products={filteredProducts}
          totalProducts={products.length}
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          selectedBrand={selectedBrand}
          wishlist={wishlist}
          onAddToCart={addToCart}
          onToggleWishlist={toggleWishlist}
          onClearFilters={clearFilters}
        />
      </section>

      {/* Footer */}
      <Footer onScrollTop={scrollToTop} />
    </div>
  );
}
