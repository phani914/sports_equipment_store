import { useState } from 'react';
import { Banknote, CreditCard, MapPin, PackageCheck, ShieldCheck, Truck, Wallet } from 'lucide-react';
import { formatCurrency } from '../utils/currency.js';

export function CheckoutPage({ cartItems, onBackToStore, onPlaceOrder }) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const discount = subtotal >= 16500 ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal >= 12500 ? 0 : 199;
  const tax = Math.round((subtotal - discount) * 0.06);
  const total = subtotal - discount + shipping + tax;

  function handlePlaceOrder(event) {
    event.preventDefault();
    onPlaceOrder(total);
  }

  return (
    <main className="checkout-page">
      <button className="back-link" type="button" onClick={onBackToStore}>
        Back to store
      </button>
      <div className="checkout-heading">
        <p className="eyebrow">Secure checkout</p>
        <h1>Complete your ApexGear order.</h1>
        <p>Confirm your delivery details and payment method for your training kit.</p>
      </div>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handlePlaceOrder}>
          <section>
            <div className="checkout-section-title">
              <MapPin size={22} aria-hidden="true" />
              <h2>Contact & delivery</h2>
            </div>
            <div className="form-grid">
              <label>
                Full name
                <input type="text" placeholder="Alex Morgan" required />
              </label>
              <label>
                Email address
                <input type="email" placeholder="you@example.com" required />
              </label>
              <label className="full-field">
                Street address
                <input type="text" placeholder="123 Arena Street" required />
              </label>
              <label>
                City
                <input type="text" placeholder="Mumbai" required />
              </label>
              <label>
                ZIP code
                <input type="text" placeholder="400001" required />
              </label>
            </div>
          </section>

          <section>
            <div className="checkout-section-title">
              <Truck size={22} aria-hidden="true" />
              <h2>Shipping method</h2>
            </div>
            <label className="option-row">
              <input type="radio" name="shipping" defaultChecked />
              <span>
                <strong>Standard delivery</strong>
                <small>3-5 business days</small>
              </span>
              <b>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</b>
            </label>
            <label className="option-row">
              <input type="radio" name="shipping" />
              <span>
                <strong>Express delivery</strong>
                <small>1-2 business days</small>
              </span>
              <b>{formatCurrency(499)}</b>
            </label>
          </section>

          <section>
            <div className="checkout-section-title">
              <CreditCard size={22} aria-hidden="true" />
              <h2>Payment</h2>
            </div>
            <div className="payment-methods" role="radiogroup" aria-label="Payment method">
              <label className={paymentMethod === 'card' ? 'payment-method active' : 'payment-method'}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                />
                <CreditCard size={20} aria-hidden="true" />
                <span>Card</span>
              </label>
              <label className={paymentMethod === 'wallet' ? 'payment-method active' : 'payment-method'}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="wallet"
                  checked={paymentMethod === 'wallet'}
                  onChange={() => setPaymentMethod('wallet')}
                />
                <Wallet size={20} aria-hidden="true" />
                <span>UPI / Wallet</span>
              </label>
              <label className={paymentMethod === 'cod' ? 'payment-method active' : 'payment-method'}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                />
                <Banknote size={20} aria-hidden="true" />
                <span>Cash</span>
              </label>
            </div>

            {paymentMethod === 'card' && (
              <div className="payment-card-panel">
                <div className="card-preview" aria-hidden="true">
                  <div>
                    <span>ApexGear Pay</span>
                    <ShieldCheck size={22} />
                  </div>
                  <strong>•••• •••• •••• 4242</strong>
                  <small>Secure sports checkout</small>
                </div>
                <div className="form-grid">
                  <label className="full-field">
                    Name on card
                    <input type="text" placeholder="Alex Morgan" required />
                  </label>
                  <label className="full-field">
                    Card number
                    <input type="text" inputMode="numeric" placeholder="4242 4242 4242 4242" required />
                  </label>
                  <label>
                    Expiry
                    <input type="text" placeholder="MM/YY" required />
                  </label>
                  <label>
                    CVV
                    <input type="text" inputMode="numeric" placeholder="123" required />
                  </label>
                </div>
                <label className="billing-toggle">
                  <input type="checkbox" defaultChecked />
                  Billing address is same as delivery address
                </label>
              </div>
            )}

            {paymentMethod === 'wallet' && (
              <div className="wallet-panel">
                <label>
                  UPI ID or wallet number
                  <input type="text" placeholder="name@upi or mobile number" required />
                </label>
                <p>We will send a secure payment request after you place the order.</p>
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div className="cash-panel">
                <Banknote size={24} aria-hidden="true" />
                <div>
                  <strong>Pay when your gear arrives</strong>
                  <p>Keep exact change ready. Card or UPI may be accepted by the delivery partner.</p>
                </div>
              </div>
            )}
          </section>

          <button className="place-order-button" type="submit">
            <PackageCheck size={20} aria-hidden="true" />
            Place order
          </button>
        </form>

        <aside className="checkout-summary" aria-labelledby="checkout-summary-title">
          <h2 id="checkout-summary-title">Order Summary</h2>
          <div className="checkout-items">
            {cartItems.map((item) => (
              <article key={item.id}>
                <img src={item.image} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <span>Qty {item.quantity}</span>
                </div>
                <strong>{formatCurrency(item.price * item.quantity)}</strong>
              </article>
            ))}
          </div>
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
        </aside>
      </div>
    </main>
  );
}
