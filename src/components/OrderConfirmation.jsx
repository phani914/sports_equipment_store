import { CheckCircle2, Package, Truck } from 'lucide-react';
import { formatCurrency } from '../utils/currency.js';

export function OrderConfirmation({ order, onContinueShopping }) {
  return (
    <main className="confirmation-page">
      <section className="confirmation-card">
        <div className="confirmation-icon">
          <CheckCircle2 size={42} aria-hidden="true" />
        </div>
        <p className="eyebrow">Order confirmed</p>
        <h1>Thanks, your gear is on the way.</h1>
        <p>
          We received your order and will send tracking details once your ApexGear
          kit leaves the warehouse.
        </p>

        <div className="confirmation-meta">
          <div>
            <span>Order number</span>
            <strong>{order.id}</strong>
          </div>
          <div>
            <span>Total paid</span>
            <strong>{formatCurrency(order.total)}</strong>
          </div>
          <div>
            <span>Estimated delivery</span>
            <strong>{order.deliveryWindow}</strong>
          </div>
        </div>

        <div className="confirmation-steps" aria-label="Order status">
          <div>
            <CheckCircle2 size={22} aria-hidden="true" />
            <span>Order placed</span>
          </div>
          <div>
            <Package size={22} aria-hidden="true" />
            <span>Packing gear</span>
          </div>
          <div>
            <Truck size={22} aria-hidden="true" />
            <span>Ready to ship</span>
          </div>
        </div>

        <section className="confirmation-items" aria-labelledby="confirmation-items-title">
          <h2 id="confirmation-items-title">Order items</h2>
          {order.items.map((item) => (
            <article key={item.id}>
              <img src={item.image} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <span>Qty {item.quantity}</span>
              </div>
              <strong>{formatCurrency(item.price * item.quantity)}</strong>
            </article>
          ))}
        </section>

        <button className="primary-link confirmation-action" type="button" onClick={onContinueShopping}>
          Continue shopping
        </button>
      </section>
    </main>
  );
}
