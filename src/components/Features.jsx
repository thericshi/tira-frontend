import React from 'react';
import './Features.css';

const MarketIcon = () => <svg className="feature-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>;
const AnalysisIcon = () => <svg className="feature-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>;
const DiscoveryIcon = () => <svg className="feature-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;
const MonitorIcon = () => <svg className="feature-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>;


const Features = () => {
  return (
    <section id="features" className="features">
      <div className="container">
        <div className="section-header">
          <h2>An All-in-One Research Toolkit</h2>
          <p>TIRA streamlines your workflow, from daily market briefings to deep-dive stock analysis, all powered by intelligent automation.</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-header">
              <MarketIcon />
              <div className="feature-title-group">
                <h3>Daily Market Research</h3>
                <span className="timing">Daily</span>
              </div>
            </div>
            <div className="feature-content">
              <p>Get essential market context and political trends that influence your trading decisions.</p>
              <ul>
                <li>Global market overview</li>
                <li>Political trend analysis</li>
                <li>Key economic indicators</li>
              </ul>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-header">
              <AnalysisIcon />
              <div className="feature-title-group">
                <h3>Single-Stock Research</h3>
                <span className="timing">On-Demand</span>
              </div>
            </div>
            <div className="feature-content">
              <p>Comprehensive reports with clear buy/hold/sell signals and detailed reasoning.</p>
              <ul>
                <li>Technical & Fundamental analysis</li>
                <li>Risk assessment</li>
                <li>Actionable signal indicators</li>
              </ul>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-header">
              <MonitorIcon />
              <div className="feature-title-group">
                <h3>Automatic Monitoring</h3>
                <span className="timing">Continuous</span>
              </div>
            </div>
            <div className="feature-content">
              <p>Stay informed with intelligent alerts and continuous monitoring of your portfolio positions.</p>
              <ul>
                <li>Price movement alerts</li>
                <li>Critical news impact analysis</li>
                <li>Buy/Sell signal notifications</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;