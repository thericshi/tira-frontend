import React from 'react';
import './Limitations.css';

// SVG Icons for a professional look (replaces emojis)
const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shield-icon">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="icon-check">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const BlockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="icon-block">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);


const Limitations = () => {
  return (
    <section id="limitations" className="limitations">
      <div className="container">
        
        <div className="risk-control-card">
          <div className="risk-icon-wrapper">
            <ShieldIcon />
          </div>
          <h3>Risk Management</h3>
          <p>
            We believe the best way to manage risk is through a strategic focus on <strong>mid to long-term stock trading</strong>, 
            where in-depth research provides a clear advantage. We deliberately avoid high-risk, speculative areas to safeguard your investment strategy.
          </p>
        </div>

        <div className="focus-grid">
          <div className="focus-section">
            <h4>Our Focus</h4>
            <div className="focus-list">
              <div className="focus-item">
                <div className="focus-icon supported"><CheckIcon /></div>
                <div className="focus-details">
                  <strong>Mid-term Positions</strong>
                  <span>Weeks to months — where research creates opportunity.</span>
                </div>
              </div>
              <div className="focus-item">
                <div className="focus-icon supported"><CheckIcon /></div>
                <div className="focus-details">
                  <strong>Long-term Investments</strong>
                  <span>Months to years — powered by fundamental analysis.</span>
                </div>
              </div>
              <div className="focus-item">
                <div className="focus-icon supported"><CheckIcon /></div>
                <div className="focus-details">
                  <strong>Equity & Stock Analysis</strong>
                  <span>Comprehensive research and data-driven insights.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="focus-section">
            <h4>Controlled Risk Area</h4>
            <div className="focus-list">
              <div className="focus-item">
                <div className="focus-icon not-supported"><BlockIcon /></div>
                <div className="focus-details">
                  <strong>Day Trading</strong>
                  <span>High-frequency trading requires different tools.</span>
                </div>
              </div>
              <div className="focus-item">
                <div className="focus-icon not-supported"><BlockIcon /></div>
                <div className="focus-details">
                  <strong>Cryptocurrency</strong>
                  <span>These volatile markets require specialized analysis.</span>
                </div>
              </div>
              <div className="focus-item">
                <div className="focus-icon not-supported"><BlockIcon /></div>
                <div className="focus-details">
                  <strong>Complex Derivatives</strong>
                  <span>Options and futures require dedicated platforms.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="disclaimer">
          <h4>Your Investment Responsibility</h4>
          <p>
            TIRA is a powerful research tool that informs your investments. 
            However, all final trading decisions remains your responsibility. Past performance is not an indicator of future results.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Limitations;