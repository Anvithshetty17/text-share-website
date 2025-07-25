import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-brand">
              <span className="brand-icon">📝</span>
              <span className="brand-name">GoText</span>
            </div>
            <p className="footer-description">
              Your all-in-one platform for text sharing, link shortening, resume building, and student tools. 
              Simplifying digital life with secure, user-friendly solutions.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Twitter" className="social-link">🐦</a>
              <a href="#" aria-label="Facebook" className="social-link">📘</a>
              <a href="#" aria-label="LinkedIn" className="social-link">💼</a>
              <a href="#" aria-label="GitHub" className="social-link">🐙</a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Services</h4>
            <ul className="footer-links">
              <li><Link to="/text-share" className="footer-link">Text Share</Link></li>
              <li><Link to="/link-shortener" className="footer-link">Link Shortener</Link></li>
              <li><Link to="/resume-builder" className="footer-link">Resume Builder</Link></li>
              <li><Link to="/student-tools" className="footer-link">Student Tools</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Company</h4>
            <ul className="footer-links">
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
              <li><a href="#" className="footer-link">Blog</a></li>
              <li><a href="#" className="footer-link">Help Center</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Legal</h4>
            <ul className="footer-links">
              <li><Link to="/privacy" className="footer-link">Privacy Policy</Link></li>
              <li><Link to="/terms" className="footer-link">Terms of Service</Link></li>
              <li><a href="#" className="footer-link">Cookie Policy</a></li>
              <li><a href="#" className="footer-link">Disclaimer</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Stay Updated</h4>
            <p className="footer-text">
              Subscribe to our newsletter for updates, tips, and new features.
            </p>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="newsletter-input"
                aria-label="Email for newsletter"
              />
              <button className="newsletter-button" type="submit">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © {currentYear} GoText. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <Link to="/privacy" className="footer-bottom-link">Privacy</Link>
              <Link to="/terms" className="footer-bottom-link">Terms</Link>
              <Link to="/contact" className="footer-bottom-link">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
