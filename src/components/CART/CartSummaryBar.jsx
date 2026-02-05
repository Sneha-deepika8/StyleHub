/**
 * CartSummaryBar.jsx
 * ===================
 * Fixed bar at the bottom that shows cart summary.
 * Only visible when cart has items.
 * 
 * PROPS:
 * - cartCount: number - total item count
 * - cartTotal: number - total price
 * - onViewCart: function - open cart sidebar
 */

export default function CartSummaryBar({ cartCount, cartTotal, onViewCart }) {
  // Don't render if cart is empty
  if (cartCount === 0) return null;

  return (
    <div className="cart-summary">
      <div className="cart-summary-content">
        <span>🛒 {cartCount} items in cart</span>
        <span className="cart-total">
          Total: ₹{cartTotal.toLocaleString("en-IN")}
        </span>
        <button className="btn-checkout" onClick={onViewCart}>
          View Cart →
        </button>
      </div>
    </div>
  );
}
