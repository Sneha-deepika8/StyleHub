/**
 * ProductFilters.jsx
 * ===================
 * Filter controls for the product section.
 * 
 * FEATURES:
 * - Category buttons (All, Women, Men, Kids)
 * - Search input with clear button
 * - Brand dropdown filter
 * - Sort dropdown (price, rating)
 * 
 * PROPS:
 * - selectedCategory: string - current category
 * - setSelectedCategory: function - change category
 * - searchTerm: string - current search text
 * - setSearchTerm: function - change search
 * - selectedBrand: string - current brand filter
 * - setSelectedBrand: function - change brand
 * - sortBy: string - current sort option
 * - setSortBy: function - change sort
 * - allBrands: array - list of available brands
 */

export default function ProductFilters({
  selectedCategory,
  setSelectedCategory,
  searchTerm,
  setSearchTerm,
  selectedBrand,
  setSelectedBrand,
  sortBy,
  setSortBy,
  allBrands,
}) {
  return (
    <>
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
    </>
  );
}
