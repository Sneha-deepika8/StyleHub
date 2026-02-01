import ProductCard from "./components/ProductCard";
import products from "./data";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  //BRANDS
  const allBrands = [...new Set(products.map((p) => p.brand))];

  // State
  // Cart - array of products in cart
  const [cartItems, setCartItems] = useState([]);

  // Wishlist - array of product IDs that are wishlisted
  const [wishlist, setWishlist] = useState([]);

  // Search - what user types in search box
  const [searchTerm, setSearchTerm] = useState("");

  // Brand Filter - which brand is selected ('All' means show all)
  const [selectedBrand, setSelectedBrand] = useState("All");

  // Category Filter - which category is selected ('All' means show all)
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Sort - how to sort products
  const [sortBy, setSortBy] = useState("default");

  // Theme Mode - Load from localStorage or default to light
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  // NEW: Cart Sidebar Toggle
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Save theme to localStorage and apply to document
  useEffect(() => {
    const theme = isDarkMode ? "dark" : "light";
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [isDarkMode]);

  function addToCart(product) {
    //Check if Cart Item Exists
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      //PRODUCT IS THERE IN THE CART
      setCartItems(
        cartItems.map(
          (
            item, //[ARRAY OF OBJECTS]
          ) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
        ),
      );
    } else {
      //PRODUCT NOT THERE
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  }

  // NEW: Remove item from cart
  function removeFromCart(productId) {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  }

  // NEW: Update quantity in cart
  function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems(
      cartItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item,
      ),
    );
  }

  //Calculate Total number of Cart ITEMS
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  //CALCULATE TOTAL PRICE
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  //WISHLIST FUNCTION

  function toggleWishlist(productID) {
    if (wishlist.includes(productID)) {
      //Already Existing - Remove It
      setWishlist(wishlist.filter((id) => id !== productID));
    } else {
      //NOT IN THE WISHLIST - JUST ADD IT
      setWishlist([...wishlist, productID]);
    }
  }

  //STEP 1 : FILTER BASED ON SEARCH, BRAND, AND CATEGORY

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

  //STEP 2 : SORT BASED ON FILTERED PRODUCTS
  if (sortBy === "price-low") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.rating - a.rating,
    );
  }

  return (
    <div className={`app ${isDarkMode ? "dark" : "light"}`}>
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <a href="/" className="logo">
            <span className="logo-icon">◆</span>
            StyleHub
          </a>

          <ul className="nav-links">
            <li>
              <a href="#" className="nav-link">
                Collections
              </a>
            </li>
            <li>
              <a href="#" className="nav-link">
                Trending Styles
              </a>
            </li>
            <li>
              <a href="#" className="nav-link">
                Customer Care
              </a>
            </li>
            <li>
              <a href="#" className="nav-link">
                Our Story
              </a>
            </li>
          </ul>

          <div className="nav-actions">
            {/* Dark Mode Toggle */}
            <button
              className="nav-btn icon-btn theme-toggle"
              onClick={() => setIsDarkMode(!isDarkMode)}
              title={
                isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
              }
            >
              {isDarkMode ? "☀️" : "🌙"}
            </button>

            {/* Wishlist Button with Count */}
            <button className="nav-btn icon-btn">
              ♡
              {wishlist.length > 0 && (
                <span className="badge">{wishlist.length}</span>
              )}
            </button>

            {/* Cart Button with Count */}
            <button
              className="nav-btn icon-btn"
              onClick={() => setIsCartOpen(true)}
            >
              🛒
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </button>
            <button className="nav-btn">Sign In</button>
            <button className="nav-btn primary">Shop Now</button>
          </div>
        </div>
      </nav>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h2>Your Cart ({cartCount})</h2>
              <button
                className="cart-close"
                onClick={() => setIsCartOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="cart-items">
              {cartItems.length === 0 ? (
                <div className="cart-empty">
                  <span className="cart-empty-icon">🛒</span>
                  <p>Your cart is empty</p>
                  <button
                    className="btn-primary"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-image"
                    />
                    <div className="cart-item-details">
                      <h4>{item.name}</h4>
                      <p className="cart-item-price">
                        ₹{item.price.toLocaleString("en-IN")}
                      </p>
                      <div className="quantity-controls">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      className="cart-item-remove"
                      onClick={() => removeFromCart(item.id)}
                    >
                      🗑️
                    </button>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="cart-footer">
                <div className="cart-subtotal">
                  <span>Subtotal:</span>
                  <span className="cart-subtotal-price">
                    ₹{cartTotal.toLocaleString("en-IN")}
                  </span>
                </div>
                <button className="btn-checkout-full">
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-tag">New Arrivals 2026</p>
          <h1 className="hero-title">
            The Future of Fashion
            <br />
            <span className="hero-highlight">Starts Here.</span>
          </h1>
          <p className="hero-description">
            Discover the latest trends in fashion and style. From stylish
            outfits to premium accessories, find everything you need to upgrade
            your wardrobe in one place.
          </p>
          <div className="hero-cta">
            <button className="btn-primary">Shop Now</button>
            <button className="btn-secondary">View Collections</button>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">50K+</span>
            <span className="stat-label">Happy Customers</span>
          </div>
          <div className="stat">
            <span className="stat-number">200+</span>
            <span className="stat-label">Fashion Products</span>
          </div>
          <div className="stat">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Customer Support</span>
          </div>
        </div>
      </section>
      {/* Cart Summary Bar - Shows only when cart has items */}
      {cartItems.length > 0 && (
        <div className="cart-summary">
          <div className="cart-summary-content">
            <span>🛒 {cartCount} items in cart</span>
            <span className="cart-total">
              Total: ₹{cartTotal.toLocaleString("en-IN")}
            </span>
            <button
              className="btn-checkout"
              onClick={() => setIsCartOpen(true)}
            >
              View Cart →
            </button>
          </div>
        </div>
      )}
      {/* Products Section */}
      <section className="products-section" id="products">
        <div className="section-header">
          <h2 className="section-title">Best Sellers</h2>
          <p className="section-subtitle">Trending Styles Loved by Customers</p>
        </div>

        {/* Category Filter Buttons */}
        <div className="category-filters">
          <button
            className={`category-btn ${selectedCategory === "All" ? "active" : ""}`}
            onClick={() => setSelectedCategory("All")}
          >
            All Products
          </button>
          <button
            className={`category-btn ${selectedCategory === "Women" ? "active" : ""}`}
            onClick={() => setSelectedCategory("Women")}
          >
            👗 Women
          </button>
          <button
            className={`category-btn ${selectedCategory === "Men" ? "active" : ""}`}
            onClick={() => setSelectedCategory("Men")}
          >
            👔 Men
          </button>
          <button
            className={`category-btn ${selectedCategory === "Kids" ? "active" : ""}`}
            onClick={() => setSelectedCategory("Kids")}
          >
            🧸 Kids
          </button>
        </div>

        {/* Search and Filter Controls */}
        <div className="filter-controls">
          {/* Search Box */}
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button className="clear-btn" onClick={() => setSearchTerm("")}>
                ✕
              </button>
            )}
          </div>

          {/* Brand Filter Dropdown */}
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="filter-select"
          >
            <option value="All">All Collections</option>
            {allBrands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="default">Sort By</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        {/* Results Count */}
        <p className="results-count">
          Showing {filteredProducts.length} of {products.length} products
          {searchTerm && ` for "${searchTerm}"`}
          {selectedCategory !== "All" && ` in ${selectedCategory}`}
          {selectedBrand !== "All" && ` from ${selectedBrand}`}
        </p>
        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                category={product.category}
                price={product.price}
                originalPrice={product.originalPrice}
                discount={product.discount}
                rating={product.rating}
                image={product.image}
                isBestSeller={product.isBestSeller}
                isWishlisted={wishlist.includes(product.id)}
                onAddToCart={() => addToCart(product)}
                onToggleWishlist={() => toggleWishlist(product.id)}
              />
            ))
          ) : (
            <div className="no-results">
              <p>😕 No Collection found</p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedBrand("All");
                  setSelectedCategory("All");
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 StyleHub. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
