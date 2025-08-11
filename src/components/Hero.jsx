import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';
import './Hero.css';

const Hero = () => {
  const handleStartResearch = () => {
    // If user is authenticated, go to dashboard, otherwise go to signup
    if (isAuthenticated()) {
      window.location.href = '/dashboard';
    } else {
      window.location.href = '/signup';
    }
  };

  const handleLearnMore = () => {
    // Scroll to features section
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>Your Indispensable Trading Research Assistant</h1>
          <p className="hero-subtitle">
            TIRA delivers comprehensive market research, stock analysis, and investment opportunities 
            that save you hours of manual research and help you make better trading decisions.
          </p>
          <div className="hero-stats">
            <div className="stat">
              <h3>30+ minutes</h3>
              <p>Saved researching per stock</p>
            </div>
            <div className="stat">
              <h3>&lt;1 Min</h3>
              <p>Get daily market context</p>
            </div>
            <div className="stat">
              <h3>3-5</h3>
              <p>Weekly investment opportunities surfaced</p>
            </div>
          </div>
          <div className="hero-cta">
            <button 
              className="primary-button" 
              onClick={handleStartResearch}
              style={{background: '#D4AF37', borderColor: '#D4AF37'}}
            >
              Start Your Research
            </button>
            <button className="secondary-button" onClick={handleLearnMore}>
              Learn More
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="dashboard-preview">
            <div className="chart-placeholder">
              <div className="chart-bars">
                <div className="bar" style={{height: '60%'}}></div>
                <div className="bar" style={{height: '80%'}}></div>
                <div className="bar" style={{height: '45%'}}></div>
                <div className="bar" style={{height: '90%'}}></div>
                <div className="bar" style={{height: '70%'}}></div>
              </div>
            </div>
            <div className="signal-indicator">
              <span className="signal buy">BUY</span>
              <span className="confidence">High Confidence</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;