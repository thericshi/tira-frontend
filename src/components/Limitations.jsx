import React from 'react';
import './Limitations.css';

const Limitations = () => {
  return (
    <section id="limitations" className="limitations">
      <div className="container">
        <div className="section-header">
          <h2>Risk Control & Focus</h2>
          <p>How TIRA manages risk through strategic focus and clear boundaries</p>
        </div>
        <div className="limitations-content">
          <div className="risk-control-hero">
            <div className="risk-icon">🛡️</div>
            <h3>Strategic Risk Management</h3>
            <p>
              TIRA controls risk by focusing exclusively on <strong>mid to long-term stock trading</strong>, 
              where thorough research and analysis provide the greatest advantage. We deliberately avoid 
              high-risk, high-frequency trading areas to protect your investment strategy.
            </p>
          </div>

          <div className="focus-grid">
            <div className="focus-section optimal">
              <h4>Optimal Focus Areas</h4>
              <div className="focus-list">
                <div className="focus-item supported">
                  <span className="icon">✅</span>
                  <div className="focus-details">
                    <strong>Mid-term Positions</strong>
                    <span>Weeks to months - where research matters most</span>
                  </div>
                </div>
                <div className="focus-item supported">
                  <span className="icon">✅</span>
                  <div className="focus-details">
                    <strong>Long-term Investments</strong>
                    <span>Months to years - fundamental analysis advantage</span>
                  </div>
                </div>
                <div className="focus-item supported">
                  <span className="icon">✅</span>
                  <div className="focus-details">
                    <strong>Stock Market Analysis</strong>
                    <span>Comprehensive equity research and insights</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="focus-section controlled">
              <h4>Controlled Risk Areas</h4>
              <div className="focus-list">
                <div className="focus-item not-supported">
                  <span className="icon">🚫</span>
                  <div className="focus-details">
                    <strong>Day Trading</strong>
                    <span>High-frequency trading requires different tools</span>
                  </div>
                </div>
                <div className="focus-item not-supported">
                  <span className="icon">🚫</span>
                  <div className="focus-details">
                    <strong>Cryptocurrency</strong>
                    <span>Volatile markets need specialized analysis</span>
                  </div>
                </div>
                <div className="focus-item not-supported">
                  <span className="icon">🚫</span>
                  <div className="focus-details">
                    <strong>Options/Derivatives</strong>
                    <span>Complex instruments require dedicated platforms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="disclaimer">
            <div className="disclaimer-header">
              <h4>Investment Responsibility</h4>
            </div>
            <p>
              TIRA provides research and analysis tools to support your investment decisions. 
              All final investment choices remain your responsibility. Past performance does not guarantee future results.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Limitations;
