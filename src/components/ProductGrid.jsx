import { ProductCard } from './ProductCard.jsx';

export function ProductGrid({ products, onAddToCart }) {
  return (
    <section className="product-section" id="products">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Featured equipment</p>
          <h2>Performance picks for every kind of athlete.</h2>
        </div>
        <a className="text-link" href="#categories">Explore categories</a>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </section>
  );
}
