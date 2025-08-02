import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <h3>TIRA</h3>
              <p>Trading Intelligent Research Assistant</p>
            </div>
            <p className="footer-description">
              Your indispensable research assistant for mid to long-term stock trading decisions.
            </p>
          </div>
          
          <div className="footer-section">
            <h4>Features</h4>
            <ul>
              <li><Link to="/#features">Daily Market Research</Link></li>
              <li><Link to="/#features">Single-Stock Analysis</Link></li>
              <li><Link to="/#features">Stock Discovery</Link></li>
              <li><Link to="/#features">Automatic Monitoring</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-legal">
            <p>&copy; 2025 TIRA. All rights reserved.</p>
            <p className="disclaimer-text">
              Investment research and analysis tools. Not financial advice. 
              Trading involves risk of loss.
            </p>
          </div>
          <div className="footer-social">
            <a href="#twitter" aria-label="Twitter">🐦</a>
            <a href="#linkedin" aria-label="LinkedIn">💼</a>
            <a href="#github" aria-label="GitHub">🔗</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
