/**
 * Home.jsx
 * =========
 * The main landing page of StyleHub.
 * 
 * FEATURES:
 * - Hero section with welcome message
 * - Product section with filters
 * - Cart sidebar
 * - Cart summary bar
 * 
 * STATE MANAGED HERE:
 * - Cart items (persisted in localStorage)
 * - Wishlist
 * - Filters (search, brand, category, sort)
 * - Cart sidebar visibility
 */

import { useState, useEffect, useRef } from "react";
import { fetchProducts } from "../services/api";

// Import components
import HeroSection from "../components/HEROSECTION/HeroSection";
import ProductFilters from "../components/PRODUCTS/ProductFilters";
import ProductGrid from "../components/PRODUCTS/ProductGrid";
import CartSidebar from "../components/CART/CartSidebar";
import CollectionsSection from "../components/COLLECTIONS/CollectionsSection";
import Footer from "../components/FOOTER/footer";

export default function Home() {
  // Reference to scroll to top
  const topRef = useRef(null);

  // ========== STATE ==========
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cart items - persisted in localStorage
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("stylehub-cart");
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch (error) {
        console.error("Error loading cart:", error);
        return [];
      }
    }
    return [];
  });

  // Wishlist - persisted in localStorage
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("stylehub-wishlist");
    if (savedWishlist) {
      try {
        return JSON.parse(savedWishlist);
      } catch (error) {
        console.error("Error loading wishlist:", error);
        return [];
      }
    }
    return [];
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState("newest");
  const [isCartOpen, setIsCartOpen] = useState(false);

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

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("stylehub-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("stylehub-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Handle scroll to top on mount
  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // ========== CART FUNCTIONS ==========

  // Add product to cart
  function addToCart(product) {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      // Product exists - increase quantity
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // New product - add with quantity 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  }

  // Remove product from cart
  function removeFromCart(productId) {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  }

  // Update quantity of item in cart
  function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems(
      cartItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  }

  // ========== WISHLIST FUNCTION ==========

  function toggleWishlist(productId) {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  }

  // ========== CALCULATIONS ==========

  // Total items in cart
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Total price
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

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

  // Apply sorting
  if (sortBy === "price-low") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
  }

  // Clear all filters
  function clearFilters() {
    setSearchTerm("");
    setSelectedBrand("All");
    setSelectedCategory("All");
  }

  // Scroll to top
  function scrollToTop() {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  // ========== RENDER ==========

  return (
    <div ref={topRef}>
      {/* Hero Section */}
      <HeroSection />

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        cartCount={cartCount}
        cartTotal={cartTotal}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />

      {/* Collections Section */}
      <CollectionsSection />

      {/* Products Section */}
      <section className="products-section" id="products">
        <div className="section-header">
          <h2 className="section-title">Best Sellers</h2>
          <p className="section-subtitle">Trending Styles Loved by Customers</p>
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
