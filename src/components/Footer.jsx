import { Facebook, Instagram, Shield, Twitter } from 'lucide-react';

const footerGroups = [
  {
    title: 'Shop',
    links: ['Running', 'Fitness', 'Football', 'Basketball'],
  },
  {
    title: 'Support',
    links: ['Shipping', 'Returns', 'Size guide', 'Contact'],
  },
  {
    title: 'Company',
    links: ['About', 'Teams', 'Stores', 'Careers'],
  },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <a className="brand footer-logo" href="#home" aria-label="ApexGear home">
            <span className="brand-mark">
              <Shield size={24} aria-hidden="true" />
            </span>
            <span>
              Apex<span>Gear</span>
            </span>
          </a>
          <p>
            Premium sports equipment, training essentials, and match-day gear
            curated for athletes who keep showing up.
          </p>
          <div className="social-links" aria-label="Social links">
            <a href="#home" aria-label="ApexGear on Instagram">
              <Instagram size={18} aria-hidden="true" />
            </a>
            <a href="#home" aria-label="ApexGear on Twitter">
              <Twitter size={18} aria-hidden="true" />
            </a>
            <a href="#home" aria-label="ApexGear on Facebook">
              <Facebook size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="footer-links">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3>{group.title}</h3>
              {group.links.map((link) => (
                <a href="#products" key={link}>
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
        <form className="footer-newsletter">
          <h3>Get the training drop</h3>
          <p>Weekly gear picks, bundle offers, and new arrivals.</p>
          <label>
            Email address
            <span>
              <input type="email" placeholder="you@example.com" required />
              <button type="submit">Join</button>
            </span>
          </label>
        </form>
      </div>
      <div className="footer-bottom">
        <span>© 2026 ApexGear. All rights reserved.</span>
        <div>
          <a href="#home">Privacy</a>
          <a href="#home">Terms</a>
        </div>
      </div>
    </footer>
  );
}
