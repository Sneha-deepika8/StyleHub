/**
 * Footer.jsx
 * ===========
 * Footer component for StyleHub.
 * 
 * FEATURES:
 * - Brand section with logo and tagline
 * - Quick links (Shop, About, Support)
 * - Social media icons
 * - Copyright and legal links
 * - Scroll to top button
 * 
 * PROPS:
 * - onScrollTop: function - scroll to top of page
 */

import { Link } from "react-router-dom";

export default function Footer({ onScrollTop }) {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span className="logo-icon">◆</span>
            StyleHub
          </Link>
          <p className="footer-tagline">
            Your destination for premium fashion and style. Discover the latest
            trends and upgrade your wardrobe with our curated collections.
          </p>
        </div>

        {/* Shop Links */}
        <div className="footer-links">
          <h4>Shop</h4>
          <ul>
            <li>
              <a href="#products">New Arrivals</a>
            </li>
            <li>
              <Link to="/collections">Collections</Link>
            </li>
            <li>
              <a href="#products">Best Sellers</a>
            </li>
            <li>
              <a href="#products">Sale</a>
            </li>
          </ul>
        </div>

        {/* Company Links */}
        <div className="footer-links">
          <h4>Company</h4>
          <ul>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Careers</a>
            </li>
            <li>
              <a href="#">Press</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#" className="social-icon" title="Instagram">
              📷
            </a>
            <a href="#" className="social-icon" title="Twitter">
              🐦
            </a>
            <a href="#" className="social-icon" title="Facebook">
              📘
            </a>
            <a href="#" className="social-icon" title="YouTube">
              ▶️
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>© 2026 StyleHub. All rights reserved.</p>
        <div className="footer-legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        className="scroll-top-btn"
        onClick={onScrollTop}
        title="Scroll to Top"
      >
        ↑
      </button>
    </footer>
  );
}
