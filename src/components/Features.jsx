import React from 'react';
import './Features.css';

const Features = () => {
  return (
    <section id="features" className="features">
      <div className="container">
        <div className="section-header">
          <h2>Core Features</h2>
          <p>Everything you need for intelligent trading research</p>
        </div>
        <div className="features-grid">
          <div className="feature-card primary">
            <div className="feature-header">
              <h3>Daily Market Research</h3>
              <span className="timing">Daily Before Market Open</span>
            </div>
            <div className="feature-content">
              <p>Get essential market context and political trends that influence your trading decisions.</p>
              <ul>
                <li>Global market overview</li>
                <li>Political trend analysis</li>
                <li>Regional market insights</li>
                <li>Economic indicators</li>
              </ul>
            </div>
          </div>

          <div className="feature-card primary">
            <div className="feature-header">
              <h3>Single-Stock Research</h3>
              <span className="timing">Daily Before Market Open</span>
            </div>
            <div className="feature-content">
              <p>Comprehensive research reports with clear buy/hold/sell signals and detailed reasoning.</p>
              <ul>
                <li>Technical analysis</li>
                <li>Fundamental analysis</li>
                <li>Risk assessment</li>
                <li>Signal indicators</li>
              </ul>
            </div>
          </div>

          <div className="feature-card primary">
            <div className="feature-header">
              <h3>Stock Discovery</h3>
              <span className="timing">Weekly on Weekends</span>
            </div>
            <div className="feature-content">
              <p>Surface compelling investment opportunities ranked by risk-adjusted potential.</p>
              <ul>
                <li>Advanced screening</li>
                <li>Risk-adjusted ranking</li>
                <li>Opportunity analysis</li>
                <li>Portfolio context</li>
              </ul>
            </div>
          </div>

          <div className="feature-card primary">
            <div className="feature-header">
              <h3>Automatic Monitoring</h3>
              <span className="timing">Continuous</span>
            </div>
            <div className="feature-content">
              <p>Stay informed with intelligent alerts and monitoring of your portfolio positions.</p>
              <ul>
                <li>Price movement alerts</li>
                <li>News impact analysis</li>
                <li>Signal notifications</li>
                <li>Portfolio updates</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
