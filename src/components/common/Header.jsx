import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();

  const handleSectionClick = (sectionId) => {
    // If we're not on the home page, navigate there first
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    // If we're on the home page, scroll to the section
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <h1>TIRA</h1>
            <span>Trading Intelligent Research Assistant</span>
          </Link>
        </div>
        <nav className="nav">
          <button 
            onClick={() => handleSectionClick('features')}
            className="nav-link"
          >
            Features
          </button>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/login" className="cta-button">Log in</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
