import React from 'react';
import './ValueProposition.css';

const ValueProposition = () => {
  return (
    <section id="value" className="value-proposition">
      <div className="container">
        <div className="section-header">
          <h2>Advanced Stock Trading & Research Tools</h2>
          <p>TIRA offers premium tools for both new and experienced traders. Get access to cutting-edge research, news, and data analytics for smarter decision-making.</p>
        </div>
        <div className="value-list">

          {/* Row 1: Text on Left, Icon on Right */}
          <div className="value-row">
            <div className="value-text">
              <h3>Save Precious Time</h3>
              <p>Get comprehensive stock research in 30 seconds instead of spending 2+ hours manually gathering data from multiple sources.</p>
            </div>
            <div className="value-icon-container">
              <div className="animated-icon">⏰</div>
            </div>
          </div>

          {/* Row 2: Icon on Left, Text on Right */}
          <div className="value-row">
            <div className="value-icon-container">
              <div className="animated-icon">🎯</div>
            </div>
            <div className="value-text">
              <h3>Clear Signals</h3>
              <p>Receive definitive buy/hold/sell recommendations with clear reasoning and binary indicators for quick decision making.</p>
            </div>
          </div>

          {/* Row 3: Text on Left, Icon on Right */}
          <div className="value-row">
            <div className="value-text">
              <h3>Data-Driven Insights</h3>
              <p>Make informed decisions with comprehensive analysis backed by reliable real-time data and proven research methodologies.</p>
            </div>
            <div className="value-icon-container">
              <div className="animated-icon">📊</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ValueProposition;