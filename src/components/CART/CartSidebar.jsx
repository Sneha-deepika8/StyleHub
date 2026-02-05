/**
 * CartSidebar.jsx
 * ================
 * Slide-out cart panel that shows all items in the cart.
 * 
 * FEATURES:
 * - Shows all cart items with images
 * - Quantity controls (+ / -)
 * - Remove item button
 * - Subtotal calculation
 * - Checkout button
 * 
 * PROPS:
 * - isOpen: boolean - whether sidebar is visible
 * - onClose: function - close the sidebar
 * - cartItems: array - items in cart
 * - cartCount: number - total item count
 * - cartTotal: number - total price
 * - updateQuantity: function(id, newQty) - change item quantity
 * - removeFromCart: function(id) - remove item
 */

export default function CartSidebar({
  isOpen,
  onClose,
  cartItems,
  cartCount,
  cartTotal,
  updateQuantity,
  removeFromCart,
}) {
  // Don't render if cart is closed
  if (!isOpen) return null;

  return (
    <div className="cart-overlay" onClick={onClose}>
      {/* Stop click propagation to prevent closing when clicking inside */}
      <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cart-header">
          <h2>Your Cart ({cartCount})</h2>
          <button className="cart-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Cart Items List */}
        <div className="cart-items">
          {cartItems.length === 0 ? (
            // Empty cart message
            <div className="cart-empty">
              <span className="cart-empty-icon">🛒</span>
              <p>Your cart is empty</p>
              <button className="btn-primary" onClick={onClose}>
                Continue Shopping
              </button>
            </div>
          ) : (
            // List of cart items
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
                  {/* Quantity Controls */}
                  <div className="quantity-controls">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                {/* Remove Button */}
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

        {/* Footer with total and checkout */}
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-subtotal">
              <span>Subtotal:</span>
              <span className="cart-subtotal-price">
                ₹{cartTotal.toLocaleString("en-IN")}
              </span>
            </div>
            <button className="btn-checkout-full">Proceed to Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
}
