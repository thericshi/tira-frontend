import React from 'react';
import Header from '../components/common/Header.jsx';
import Footer from '../components/common/Footer.jsx';
import './StaticPages.css';

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      <Header />
      
      <main className="page-content">
        <div className="container">
          <div className="page-header">
            <h1>About TIRA</h1>
            <p>We're building the future of intelligent trading research, empowering traders with AI-driven insights and comprehensive market analysis.</p>
          </div>

          <div className="story-section">
            <div className="story-content">
              <div className="story-text">
                <h2>Our Story</h2>
                <p>TIRA was born from a simple observation: traders spend countless hours researching stocks, analyzing markets, and staying on top of global trends, yet still struggle to make timely, informed decisions. We saw an opportunity to leverage artificial intelligence and advanced data analytics to transform this process.</p>                
              </div>
              <div className="story-stats">
                <div className="stat-item">
                  <div className="stat-number">X</div>
                  <div className="stat-label">Active Traders</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">X</div>
                  <div className="stat-label">Data Points Analyzed</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">X</div>
                  <div className="stat-label">Uptime</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">Daily</div>
                  <div className="stat-label">Market Monitoring</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mission-vision">
            <div className="mission-card">
              <h3>Our Mission</h3>
              <p>To democratize access to professional-grade trading research by providing AI-powered insights that save time, reduce complexity, and improve investment outcomes for traders at all levels.</p>
            </div>
            <div className="vision-card">
              <h3>Our Vision</h3>
              <p>To become the indispensable research assistant that every casual and serious trader relies on, setting the standard for intelligent, data-driven investment analysis.</p>
            </div>
          </div>

          <div className="about-section">
            <h2>Our Values</h2>
            <div className="values-grid">
              <div className="value-item">
                <h4>🎯 Precision</h4>
                <p>We deliver accurate, reliable analysis backed by rigorous data science and proven methodologies.</p>
              </div>
              <div className="value-item">
                <h4>⚡ Efficiency</h4>
                <p>We respect your time by providing comprehensive insights digestiable in seconds, not hours.</p>
              </div>
              <div className="value-item">
                <h4>🔍 Transparency</h4>
                <p>We provide clear reasoning behind every recommendation, empowering you to make informed decisions.</p>
              </div>
              <div className="value-item">
                <h4>🚀 Innovation</h4>
                <p>We continuously evolve our platform using the latest advances in AI and financial technology.</p>
              </div>
              <div className="value-item">
                <h4>🤝 Integrity</h4>
                <p>We maintain the highest standards in our research and recommendations.</p>
              </div>
              <div className="value-item">
                <h4>📈 Results</h4>
                <p>We measure our success by the improved outcomes and time savings we deliver to our customers.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="team-section">
          <div className="container">
            <h2 style={{textAlign: 'center', marginBottom: '1rem'}}>Meet Our Team</h2>
            <p style={{textAlign: 'center', color: '#666', marginBottom: '3rem'}}>The experts behind TIRA's intelligent trading research platform</p>
            
            <div className="team-grid">
              <div className="team-member">
                <div className="avatar">ES</div>
                <h4>Eric Shi</h4>
                <div className="role">Founder</div>
                <p>Bio</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
