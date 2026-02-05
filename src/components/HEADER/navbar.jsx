/**
 * Navbar.jsx
 * ===========
 * Main navigation component for StyleHub.
 * 
 * FEATURES:
 * - Logo with link to home
 * - Navigation links (Home, Collections)
 * - Theme toggle (dark/light mode)
 * - Wishlist & Cart icons with badges
 * - User greeting and login/logout
 * 
 * PROPS:
 * - isDarkMode: boolean - current theme state
 * - setIsDarkMode: function - toggle theme
 * - wishlistCount: number - items in wishlist
 * - cartCount: number - items in cart
 * - onCartClick: function - open cart sidebar
 */

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar({
  isDarkMode,
  setIsDarkMode,
  wishlistCount,
  cartCount,
  onCartClick,
}) {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="logo">
          <span className="logo-icon">◆</span>
          StyleHub
        </Link>

        {/* Navigation Links */}
        <ul className="nav-links">
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <a href="/#collections" className="nav-link">
              Collections
            </a>
          </li>
          <li>
            <a href="/#products" className="nav-link">
              Products
            </a>
          </li>
        </ul>

        {/* Actions */}
        <div className="nav-actions">
          {/* Theme Toggle */}
          <button
            className="nav-btn theme-toggle"
            onClick={() => setIsDarkMode(!isDarkMode)}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? "☀️" : "🌙"}
          </button>

          {/* Wishlist */}
          <button className="nav-btn icon-btn" title="Wishlist">
            ♡
            {wishlistCount > 0 && (
              <span className="badge">{wishlistCount}</span>
            )}
          </button>

          {/* Cart */}
          <button
            className="nav-btn icon-btn"
            onClick={onCartClick}
            title="Shopping Cart"
          >
            🛒
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </button>

          {/* User Section */}
          {isAuthenticated ? (
            <>
              <span className="user-greeting">Hello, {user}! 👋</span>
              <button className="nav-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="nav-btn primary">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
