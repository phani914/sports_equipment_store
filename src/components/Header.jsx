import { useState } from 'react';
import { Menu, Send, Shield, ShoppingCart, X } from 'lucide-react';

export function Header({ onAboutOpen, onAuthOpen, onCartOpen, onStoreOpen, accountMessage, cartCount }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      from: 'support',
      text: 'Hi, I am here to help with products, sizing, bundles, shipping, or returns.',
    },
  ]);

  function handleChatSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const message = formData.get('message')?.trim();

    if (!message) {
      return;
    }

    setChatMessages((messages) => [
      ...messages,
      { id: Date.now(), from: 'user', text: message },
      {
        id: Date.now() + 1,
        from: 'support',
        text: 'Thanks. Our team will help you with that. For fastest support, share the product name or order ID if you have one.',
      },
    ]);
    event.currentTarget.reset();
  }

  return (
    <header className="site-header">
      <button
        className="support-pill"
        type="button"
        onClick={() => setChatOpen((isOpen) => !isOpen)}
        aria-expanded={chatOpen}
        aria-controls="support-chat"
      >
        <span aria-hidden="true" />
        <div>
          <strong>Real person here</strong>
          <small>Typically replies in 3 mins</small>
        </div>
      </button>
      {chatOpen && (
        <section className="support-chat" id="support-chat" aria-label="ApexGear support chat">
          <div className="support-chat-header">
            <div>
              <strong>ApexGear Support</strong>
              <small>Online now</small>
            </div>
            <button type="button" onClick={() => setChatOpen(false)} aria-label="Close support chat">
              <X size={18} aria-hidden="true" />
            </button>
          </div>
          <div className="support-chat-messages" aria-live="polite">
            {chatMessages.map((message) => (
              <p className={message.from === 'user' ? 'chat-message user' : 'chat-message'} key={message.id}>
                {message.text}
              </p>
            ))}
          </div>
          <form className="support-chat-form" onSubmit={handleChatSubmit}>
            <input name="message" type="text" placeholder="Type your question..." autoComplete="off" />
            <button type="submit" aria-label="Send message">
              <Send size={17} aria-hidden="true" />
            </button>
          </form>
        </section>
      )}
      <div className="header-row">
        <a className="brand" href="#home" onClick={onStoreOpen} aria-label="ApexGear home">
          <span className="brand-mark">
            <Shield size={24} aria-hidden="true" />
          </span>
          <span>
            Apex<span>Gear</span>
          </span>
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#products" onClick={onStoreOpen}>Store</a>
          <a href="#categories" onClick={onStoreOpen}>Compare</a>
          <a href="#deals" onClick={onStoreOpen}>Bundles</a>
          <a href="#about" onClick={onAboutOpen}>About</a>
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
      </div>
    </header>
  );
}
