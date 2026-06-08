import { ShoppingCart } from 'lucide-react';
import { formatCurrency } from '../utils/currency.js';

export function ProductCard({ product, onAddToCart }) {
  return (
    <article className="product-card">
      <div className="product-media" style={{ '--product-accent': product.accent }}>
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      <div className="product-content">
        <div className="product-meta">
          <p className="product-category">{product.category}</p>
          <span>In stock</span>
        </div>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
      </div>
      <div className="product-footer">
        <strong>{formatCurrency(product.price)}</strong>
        <button type="button" onClick={() => onAddToCart(product)} aria-label={`Add ${product.name} to cart`}>
          <ShoppingCart size={18} aria-hidden="true" />
          Add
        </button>
      </div>
    </article>
  );
}
