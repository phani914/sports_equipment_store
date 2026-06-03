import { Minus, Plus, Trash2, X } from 'lucide-react';
import { formatCurrency } from '../utils/currency.js';

export function CartDrawer({ cartItems, onCheckout, onClose, onDecrease, onIncrease, onRemove }) {
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const discount = subtotal >= 16500 ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal >= 12500 ? 0 : 199;
  const tax = Math.round((subtotal - discount) * 0.06);
  const total = subtotal - discount + shipping + tax;

  return (
    <div className="drawer-backdrop" role="presentation">
      <aside className="cart-drawer" aria-labelledby="cart-title" role="dialog" aria-modal="true">
        <div className="cart-header">
          <div>
            <p className="eyebrow">Your kit</p>
            <h2 id="cart-title">Shopping cart</h2>
          </div>
          <button className="modal-close" type="button" onClick={onClose} aria-label="Close cart">
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <strong>Your cart is empty.</strong>
            <p>Add featured equipment to build your training kit.</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <article className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div>
                    <h3>{item.name}</h3>
                    <p>{formatCurrency(item.price)}</p>
                    <div className="quantity-controls" aria-label={`${item.name} quantity`}>
                      <button type="button" onClick={() => onDecrease(item.id)} aria-label={`Decrease ${item.name}`}>
                        <Minus size={16} aria-hidden="true" />
                      </button>
                      <span>{item.quantity}</span>
                      <button type="button" onClick={() => onIncrease(item.id)} aria-label={`Increase ${item.name}`}>
                        <Plus size={16} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <button className="remove-item" type="button" onClick={() => onRemove(item.id)} aria-label={`Remove ${item.name}`}>
                    <Trash2 size={18} aria-hidden="true" />
                  </button>
                </article>
              ))}
            </div>
            <section className="cart-summary" aria-labelledby="cart-summary-title">
              <h3 id="cart-summary-title">Cart Summary</h3>
              <div className="summary-row">
                <span>Items</span>
                <strong>{itemCount}</strong>
              </div>
              <div className="summary-row">
                <span>Subtotal</span>
                <strong>{formatCurrency(subtotal)}</strong>
              </div>
              <div className="summary-row savings">
                <span>Bundle discount</span>
                <strong>{discount > 0 ? `-${formatCurrency(discount)}` : formatCurrency(0)}</strong>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <strong>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</strong>
              </div>
              <div className="summary-row">
                <span>Estimated tax</span>
                <strong>{formatCurrency(tax)}</strong>
              </div>
              <div className="summary-total">
                <span>Total</span>
                <strong>{formatCurrency(total)}</strong>
              </div>
              <p>Free shipping over {formatCurrency(12500)}. 10% bundle discount over {formatCurrency(16500)}.</p>
              <button type="button" onClick={onCheckout}>Checkout</button>
            </section>
          </>
        )}
      </aside>
    </div>
  );
}
