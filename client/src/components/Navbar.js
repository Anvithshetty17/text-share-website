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

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

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
          <span className="brand-icon">✨</span>
          <span className="brand-text">TextShare</span>
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
              <span className="nav-link-text">Home</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/text-share" 
              className={`nav-link ${isActive('/text-share') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <span className="nav-icon">�</span>
              <span className="nav-link-text">Text Share</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/typing-race" 
              className={`nav-link ${isActive('/typing-race') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <span className="nav-icon">⚡</span>
              <span className="nav-link-text">Typing Race</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/gaming-zone" 
              className={`nav-link ${isActive('/gaming-zone') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <span className="nav-icon">🎮</span>
              <span className="nav-link-text">Gaming Zone</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/timetable" 
              className={`nav-link ${isActive('/timetable') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <span className="nav-icon">📅</span>
              <span className="nav-link-text">Timetable</span>
            </Link>
          </li>
          <li>
            <button 
              onClick={toggleTheme} 
              className="theme-toggle nav-link"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              <span className="nav-icon">
                {theme === 'light' ? '🌙' : '☀️'}
              </span>
              <span className="nav-link-text">
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
