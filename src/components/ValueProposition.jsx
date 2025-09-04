import React from 'react';
import './ValueProposition.css';

const ValueProposition = () => {
  return (
    <section id="value" className="value-proposition">
      <div className="container">
        <div className="section-header">
          <h2>Go Beyond the Ticker</h2>
          <p>TIRA translates complex data into actionable insights, giving you a clear advantage in the market.</p>
        </div>
        <div className="value-list">

          <div className="value-row">
            <div className="value-text">
              <h3>Save Precious Time</h3>
              <p>Get comprehensive stock research in seconds, not hours. We automate the heavy lifting of data gathering and analysis so you can focus on making the right moves.</p>
            </div>
            <div className="value-icon-container">
              <div className="abstract-visual visual-time">
                <div className="circle"></div>
                <div className="hand"></div>
              </div>
            </div>
          </div>

          <div className="value-row">
            <div className="value-icon-container">
               <div className="abstract-visual visual-signal">
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
              </div>
            </div>
            <div className="value-text">
              <h3>Get Clear Signals</h3>
              <p>Receive definitive buy, hold, or sell recommendations with detailed, transparent reasoning. Cut through the noise with binary indicators for quick decision-making.</p>
            </div>
          </div>

          <div className="value-row">
            <div className="value-text">
              <h3>Make Data-Driven Decisions</h3>
              <p>Our insights are backed by proven research methodologies and a wide array of real-time data sources, giving you the confidence to act decisively.</p>
            </div>
            <div className="value-icon-container">
              <div className="abstract-visual visual-data">
                <div className="node"></div>
                <div className="node"></div>
                <div className="node"></div>
                <div className="node"></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
