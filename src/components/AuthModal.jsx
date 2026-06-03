import { X } from 'lucide-react';

export function AuthModal({ mode, purpose, onClose, onSwitchMode, onSubmit }) {
  const isSignup = mode === 'signup';
  const isCheckout = purpose === 'checkout';

  return (
    <div className="modal-backdrop" role="presentation">
      <section
        className="auth-modal"
        aria-labelledby="auth-modal-title"
        role="dialog"
        aria-modal="true"
      >
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close account form">
          <X size={20} aria-hidden="true" />
        </button>
        <p className="eyebrow">
          {isCheckout ? 'Checkout details' : isSignup ? 'Join ApexGear' : 'Welcome back'}
        </p>
        <h2 id="auth-modal-title">
          {isCheckout
            ? isSignup
              ? 'Create account to checkout'
              : 'Login to checkout'
            : isSignup
              ? 'Create your athlete account'
              : 'Login to your account'}
        </h2>
        {isCheckout && (
          <p className="auth-note">
            Enter your account details to continue with your equipment order.
          </p>
        )}
        <form className="auth-form" onSubmit={onSubmit}>
          {isSignup && (
            <label>
              Full name
              <input name="name" type="text" autoComplete="name" placeholder="Alex Morgan" required />
            </label>
          )}
          <label>
            Email address
            <input name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
          </label>
          <label>
            Password
            <input
              name="password"
              type="password"
              autoComplete={isSignup ? 'new-password' : 'current-password'}
              placeholder="Enter password"
              minLength="6"
              required
            />
          </label>
          <button className="auth-submit" type="submit">
            {isCheckout ? 'Continue checkout' : isSignup ? 'Create account' : 'Login'}
          </button>
        </form>
        <p className="auth-switch">
          {isSignup ? 'Already have an account?' : 'New to ApexGear?'}
          <button type="button" onClick={() => onSwitchMode(isSignup ? 'login' : 'signup')}>
            {isSignup ? 'Login' : 'Sign up'}
          </button>
        </p>
      </section>
    </div>
  );
}
