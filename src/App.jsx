import { useState } from 'react';
import { AuthModal } from './components/AuthModal.jsx';
import { CartDrawer } from './components/CartDrawer.jsx';
import { CheckoutPage } from './components/CheckoutPage.jsx';
import { Footer } from './components/Footer.jsx';
import { Header } from './components/Header.jsx';
import { OrderConfirmation } from './components/OrderConfirmation.jsx';
import { ProductGrid } from './components/ProductGrid.jsx';
import { products } from './data/products.js';
import { formatCurrency } from './utils/currency.js';

const categories = ['Running', 'Fitness', 'Football', 'Basketball', 'Tennis'];

export default function App() {
  const [authMode, setAuthMode] = useState(null);
  const [authPurpose, setAuthPurpose] = useState('account');
  const [accountMessage, setAccountMessage] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [pageView, setPageView] = useState('store');
  const [lastOrder, setLastOrder] = useState(null);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  function handleAddToCart(product) {
    setCartItems((items) => {
      const existingItem = items.find((item) => item.id === product.id);

      if (existingItem) {
        return items.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [...items, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  }

  function handleIncreaseCartItem(productId) {
    setCartItems((items) =>
      items.map((item) => (item.id === productId ? { ...item, quantity: item.quantity + 1 } : item)),
    );
  }

  function handleDecreaseCartItem(productId) {
    setCartItems((items) =>
      items
        .map((item) => (item.id === productId ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0),
    );
  }

  function handleRemoveCartItem(productId) {
    setCartItems((items) => items.filter((item) => item.id !== productId));
  }

  function openAuth(mode, purpose = 'account') {
    setAuthPurpose(purpose);
    setAuthMode(mode);
  }

  function handleCheckout() {
    setCartOpen(false);
    if (accountMessage) {
      setPageView('checkout');
      return;
    }

    openAuth('login', 'checkout');
  }

  function handleAuthSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const displayName = name || email;

    setAccountMessage(
      authPurpose === 'checkout'
        ? `Checkout ready for ${displayName}`
        : `${authMode === 'signup' ? 'Signed up' : 'Logged in'} as ${displayName}`,
    );
    setAuthMode(null);
    setAuthPurpose('account');

    if (authPurpose === 'checkout') {
      setPageView('checkout');
    }
  }

  function handleBackToStore() {
    setPageView('store');
  }

  function handlePlaceOrder(total) {
    const order = {
      id: `AG-${Math.floor(100000 + Math.random() * 900000)}`,
      total,
      deliveryWindow: '3-5 business days',
      items: cartItems,
    };

    setLastOrder(order);
    setAccountMessage(`Order ${order.id} confirmed: ${formatCurrency(total)}`);
    setCartItems([]);
    setPageView('confirmation');
  }

  return (
    <div className="app-shell">
      <Header
        onAuthOpen={(mode) => openAuth(mode)}
        onCartOpen={() => setCartOpen(true)}
        onStoreOpen={handleBackToStore}
        accountMessage={accountMessage}
        cartCount={cartCount}
      />
      {pageView === 'checkout' ? (
        <CheckoutPage
          cartItems={cartItems}
          onBackToStore={handleBackToStore}
          onPlaceOrder={handlePlaceOrder}
        />
      ) : pageView === 'confirmation' && lastOrder ? (
        <OrderConfirmation order={lastOrder} onContinueShopping={handleBackToStore} />
      ) : (
        <main className="page">
          <section className="hero" id="home">
            <div className="hero-content">
              <p className="eyebrow">New season performance gear</p>
              <h1>Train harder with premium sports equipment.</h1>
              <p className="hero-copy">
                Shop stadium-ready balls, training essentials, running gear, and
                recovery accessories selected for athletes who want to move better.
              </p>
              <div className="hero-actions">
                <a className="primary-link" href="#products">
                  Shop equipment
                </a>
                <a className="secondary-link" href="#deals">
                  View deals
                </a>
              </div>
              <dl className="hero-stats" aria-label="Store highlights">
                <div>
                  <dt>6k+</dt>
                  <dd>happy athletes</dd>
                </div>
                <div>
                  <dt>24h</dt>
                  <dd>fast dispatch</dd>
                </div>
                <div>
                  <dt>4.9</dt>
                  <dd>store rating</dd>
                </div>
              </dl>
            </div>
          </section>
          <section className="category-band" id="categories" aria-label="Shop by category">
            {categories.map((category) => (
              <a href="#products" key={category}>
                {category}
              </a>
            ))}
          </section>
          <ProductGrid products={products} onAddToCart={handleAddToCart} />
          <section className="deal-strip" id="deals">
            <div>
              <p className="eyebrow">Limited deal</p>
              <h2>Save 20% on training bundles this week.</h2>
            </div>
            <a className="primary-link" href="#products">Build your kit</a>
          </section>
        </main>
      )}
      <Footer />
      {authMode && (
        <AuthModal
          mode={authMode}
          purpose={authPurpose}
          onClose={() => setAuthMode(null)}
          onSwitchMode={setAuthMode}
          onSubmit={handleAuthSubmit}
        />
      )}
      {cartOpen && (
        <CartDrawer
          cartItems={cartItems}
          onCheckout={handleCheckout}
          onClose={() => setCartOpen(false)}
          onDecrease={handleDecreaseCartItem}
          onIncrease={handleIncreaseCartItem}
          onRemove={handleRemoveCartItem}
        />
      )}
    </div>
  );
}
