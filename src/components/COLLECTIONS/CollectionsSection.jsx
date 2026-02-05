/**
 * CollectionsSection.jsx
 * =======================
 * Featured collections display section for the home page.
 * Shows category cards that link to filtered views.
 */

import { Link } from "react-router-dom";

const collections = [
  {
    id: 1,
    name: "Women's Fashion",
    description: "Elegant styles for every occasion",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=80",
    category: "Women",
    itemCount: 15,
  },
  {
    id: 2,
    name: "Men's Collection",
    description: "Sharp looks for modern gentlemen",
    image: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=600&auto=format&fit=crop&q=80",
    category: "Men",
    itemCount: 12,
  },
  {
    id: 3,
    name: "Kids' Corner",
    description: "Fun and comfy styles for little ones",
    image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&auto=format&fit=crop&q=80",
    category: "Kids",
    itemCount: 5,
  },
  {
    id: 4,
    name: "Accessories",
    description: "Complete your look",
    image: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=600&auto=format&fit=crop&q=80",
    category: "Accessories",
    itemCount: 8,
  },
];

export default function CollectionsSection() {
  return (
    <section id="collections" className="collections-section">
      <div className="section-header">
        <h2 className="section-title">Shop By Collection</h2>
        <p className="section-subtitle">Explore our curated categories</p>
      </div>

      <div className="collections-grid">
        {collections.map((collection) => (
          <Link
            key={collection.id}
            to="/collections"
            className="collection-card"
          >
            <div className="collection-image-wrapper">
              <img
                src={collection.image}
                alt={collection.name}
                className="collection-image"
              />
              <div className="collection-overlay"></div>
            </div>
            <div className="collection-content">
              <h3 className="collection-name">{collection.name}</h3>
              <p className="collection-description">{collection.description}</p>
              <span className="collection-count">{collection.itemCount} items</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="collections-cta">
        <Link to="/collections" className="btn-secondary">
          View All Collections →
        </Link>
      </div>
    </section>
  );
}
