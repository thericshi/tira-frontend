import React from 'react';
import { isAuthenticated } from '../utils/auth';
import './Hero.css';

const Hero = () => {
  const handleStartResearch = () => {
    if (isAuthenticated()) {
      window.location.href = '/dashboard';
    } else {
      window.location.href = '/signup';
    }
  };

  const handleLearnMore = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>AI-Powered Research. Smarter Trades.</h1>
          <p className="hero-subtitle">
            TIRA delivers comprehensive market research and stock analysis that saves you hours of manual work, helping you make confident, data-driven trading decisions.
          </p>
          <div className="hero-cta">
            <button 
              className="primary-button" 
              onClick={handleStartResearch}
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
               <svg viewBox="0 0 200 100" preserveAspectRatio="none">
                <path className="path" d="M0,50 Q25,80 50,50 T100,60 T150,40 T200,70" fill="none" />
              </svg>
            </div>
            <div className="signal-indicator">
              <span className="signal buy">BUY SIGNAL</span>
              <span className="confidence">High Confidence</span>
            </div>
          </div>
        </div>
         <div className="hero-stats">
            <div className="stat">
              <h3>30+ min</h3>
              <p>Saved per stock</p>
            </div>
            <div className="stat">
              <h3>&lt; 1 min</h3>
              <p>Daily market context</p>
            </div>
            <div className="stat">
              <h3>3-5</h3>
              <p>Weekly opportunities</p>
            </div>
          </div>
      </div>
    </section>
  );
};

export default Hero;