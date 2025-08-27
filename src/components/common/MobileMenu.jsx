import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const MobileMenu = ({ isOpen, onClose, onSectionClick }) => {
  const handleClick = (target) => {
    onSectionClick(target);
    onClose();
  };

  return (
    <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
      <button 
        className="close-button" 
        onClick={onClose} 
        aria-label="Close menu"
      >
        ✕
      </button>
      <nav className="mobile-nav">
        <button onClick={() => handleClick('features')} className="nav-link">Features</button>
        <Link to="/about" onClick={onClose}>About</Link>
        <Link to="/contact" onClick={onClose}>Contact</Link>
        <Link to="/login" className="cta-button" onClick={onClose}>Log in</Link>
      </nav>
    </div>
  );
};

export default MobileMenu;
