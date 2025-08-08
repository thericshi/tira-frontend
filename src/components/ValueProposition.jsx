import React from 'react';
import './ValueProposition.css';

const ValueProposition = () => {
  return (
    <section id="value" className="value-proposition">
      <div className="container">
        <div className="section-header">
          <h2 className="value-header">Why Traders Choose TIRA</h2>
          <p className="value-subheader">Built for mid to long-term stock trading success</p>
        </div>
        <div className="value-grid">
          <div className="value-card">  
            <div className="value-icon">⏰</div>
            <h3>Save Precious Time</h3>
            <p>Get comprehensive stock research in 30 seconds instead of spending 2+ hours manually gathering data from multiple sources.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">🎯</div>
            <h3>Clear Signals</h3>
            <p>Receive definitive buy/hold/sell recommendations with clear reasoning and binary indicators for quick decision making.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">📊</div>
            <h3>Data-Driven Insights</h3>
            <p>Make informed decisions with comprehensive analysis backed by reliable real-time data and proven research methodologies.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
