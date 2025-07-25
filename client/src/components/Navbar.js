import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [theme, setTheme] = useState('light');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced mobile menu auto-close on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Touch gesture handling for mobile menu
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    // Close menu on left swipe, open on right swipe from edge
    if (isLeftSwipe && isMenuOpen) {
      setIsMenuOpen(false);
    } else if (isRightSwipe && !isMenuOpen && touchStart < 50) {
      setIsMenuOpen(true);
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  }, [touchStart, touchEnd, isMenuOpen]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="nav-brand" onClick={closeMenu}>
          <span className="brand-icon">📝</span>
          GoText
        </Link>
        
        <button 
          className={`nav-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <ul 
          className={`nav-menu ${isMenuOpen ? 'active' : ''}`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <li>
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <span className="nav-icon">🏠</span>
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/text-share" 
              className={`nav-link ${isActive('/text-share') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <span className="nav-icon">📝</span>
              Text Share
            </Link>
          </li>
          <li>
            <Link 
              to="/resume-builder" 
              className={`nav-link ${isActive('/resume-builder') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <span className="nav-icon">📄</span>
              Resume Builder
            </Link>
          </li>
          <li>
            <Link 
              to="/link-shortener" 
              className={`nav-link ${isActive('/link-shortener') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <span className="nav-icon">🔗</span>
              Link Shortener
            </Link>
          </li>
          <li>
            <Link 
              to="/student-tools" 
              className={`nav-link ${isActive('/student-tools') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <span className="nav-icon">🛠️</span>
              Student Tools
            </Link>
          </li>
          <li>
            <Link 
              to="/about" 
              className={`nav-link ${isActive('/about') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <span className="nav-icon">ℹ️</span>
              About
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <span className="nav-icon">📞</span>
              Contact
            </Link>
          </li>
          <li>
            <button 
              onClick={toggleTheme} 
              className="theme-toggle"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              <span className="theme-icon">
                {theme === 'light' ? '🌙' : '☀️'}
              </span>
              <span className="theme-text">
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </span>
            </button>
          </li>
        </ul>
        
        {isMenuOpen && (
          <div 
            className="nav-backdrop" 
            onClick={closeMenu}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          ></div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
