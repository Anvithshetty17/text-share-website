import React from 'react';

const Navbar = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    { key: 'home', label: 'Home' },
    { key: 'strings', label: 'Strings' },
    { key: 'arrays', label: 'Arrays' },
    { key: 'collections', label: 'Collections' },
    { key: 'datastructures', label: 'Data Structures' },
    { key: 'practice', label: 'Practice Questions' },
    { key: 'algorithms', label: 'Algorithms' },
    { key: 'tips', label: 'Interview Tips' }
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">Java Coding Prep</div>
        <ul className="nav-menu">
          {navItems.map(item => (
            <li
              key={item.key}
              className={`nav-item ${currentPage === item.key ? 'active' : ''}`}
              onClick={() => setCurrentPage(item.key)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
