import { Menu, Shield, ShoppingCart } from 'lucide-react';

export function Header({ onAuthOpen, onCartOpen, onStoreOpen, accountMessage, cartCount }) {
  return (
    <header className="site-header">
      <a className="brand" href="#home" onClick={onStoreOpen} aria-label="ApexGear home">
        <span className="brand-mark">
          <Shield size={24} aria-hidden="true" />
        </span>
        <span>
          Apex<span>Gear</span>
        </span>
      </a>
      <nav className="nav-links" aria-label="Primary navigation">
        <a href="#home" onClick={onStoreOpen}>Home</a>
        <a href="#products" onClick={onStoreOpen}>Products</a>
        <a href="#categories" onClick={onStoreOpen}>Categories</a>
        <a href="#deals" onClick={onStoreOpen}>Deals</a>
      </nav>
      <div className="header-actions">
        {accountMessage && <span className="account-pill">{accountMessage}</span>}
        <button className="login-button" type="button" onClick={() => onAuthOpen('login')}>
          Login
        </button>
        <button className="signup-button" type="button" onClick={() => onAuthOpen('signup')}>
          Sign up
        </button>
        <button className="icon-button cart-button" type="button" onClick={onCartOpen} aria-label={`Open cart with ${cartCount} items`}>
          <ShoppingCart size={20} aria-hidden="true" />
          {cartCount > 0 && <span>{cartCount}</span>}
        </button>
        <button className="icon-button mobile-only" type="button" aria-label="Open menu">
          <Menu size={20} aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
