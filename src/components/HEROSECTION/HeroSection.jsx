/**
 * HeroSection.jsx
 * ================
 * The main hero/banner section at the top of the home page.
 * 
 * FEATURES:
 * - Eye-catching headline
 * - Call-to-action buttons
 * - Statistics (customers, products, support)
 * 
 * PROPS: None - this is a static display component
 */

import { useAuth } from "../../context/AuthContext";

export default function HeroSection() {
  // Get user info to personalize greeting
  const { user, isAuthenticated } = useAuth();

  return (
    <section className="hero" id="home">
      <div className="hero-content" style={{ textAlign: 'center' }}>
        {/* Personalized greeting for logged in users */}
        {isAuthenticated && (
          <div className="hero-greeting-banner">
            <p>👋 Welcome back, {user}!</p>
            <span className="greeting-subtitle">Great to see you again</span>
          </div>
        )}

        {/* Tag line badge - centered */}
        <p className="hero-tag" style={{ margin: '0 auto 16px' }}>New Arrivals 2026</p>

        {/* Main headline */}
        <h1 className="hero-title">
          The Future of Fashion
          <br />
          <span className="hero-highlight">Starts Here.</span>
        </h1>

        {/* Description text */}
        <p className="hero-description">
          Discover the latest trends in fashion and style. From stylish outfits
          to premium accessories, find everything you need to upgrade your
          wardrobe in one place.
        </p>

        {/* Call-to-action buttons with smooth scroll */}
        <div className="hero-cta" style={{ justifyContent: 'center' }}>
          <a href="#products" className="btn-primary smooth-scroll">
            Shop Now
          </a>
          <a href="#collections" className="btn-secondary smooth-scroll">
            View Collections
          </a>
        </div>
      </div>

      {/* Statistics section */}
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
  );
}
