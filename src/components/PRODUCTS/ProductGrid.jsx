/**
 * ProductGrid.jsx
 * ================
 * Displays the grid of product cards.
 * 
 * PROPS:
 * - products: array - filtered products to display
 * - totalProducts: number - total count before filtering
 * - searchTerm: string - current search text
 * - selectedCategory: string - current category
 * - selectedBrand: string - current brand
 * - wishlist: array - IDs of wishlisted products
 * - onAddToCart: function(product) - add product to cart
 * - onToggleWishlist: function(id) - toggle wishlist status
 * - onClearFilters: function - reset all filters
 */

import ProductCard from "../ProductCard";

export default function ProductGrid({
  products,
  totalProducts,
  searchTerm,
  selectedCategory,
  selectedBrand,
  wishlist,
  onAddToCart,
  onToggleWishlist,
  onClearFilters,
}) {
  return (
    <>
      {/* Results Count */}
      <p className="results-count">
        Showing {products.length} of {totalProducts} products
        {searchTerm && ` for "${searchTerm}"`}
        {selectedCategory !== "All" && ` in ${selectedCategory}`}
        {selectedBrand !== "All" && ` from ${selectedBrand}`}
      </p>

      {/* Product Grid */}
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
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
              onAddToCart={() => onAddToCart(product)}
              onToggleWishlist={() => onToggleWishlist(product.id)}
            />
          ))
        ) : (
          // No results message
          <div className="no-results">
            <p>😕 No Collection found</p>
            <button onClick={onClearFilters}>Clear Filters</button>
          </div>
        )}
      </div>
    </>
  );
}
