import { ProductCard } from './ProductCard.jsx';

export function ProductGrid({ products, onAddToCart }) {
  return (
    <section className="product-section" id="products">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Store</p>
          <h2>Choose your everyday training setup.</h2>
        </div>
        <a className="text-link" href="#categories">Compare gear</a>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </section>
  );
}
