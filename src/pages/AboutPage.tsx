import React from 'react';
import Header from '../components/common/Header.jsx';
import Footer from '../components/common/Footer.jsx';
import './StaticPages.css';

// SVG Icons for Values
const PrecisionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>;
const EfficiencyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>;
const TransparencyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>;
const InnovationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-3m0-7.98a9 9 0 0 1 7.94-8M5 19l4-4"></path><path d="M9 10a5 5 0 0 0 5 5h5"></path></svg>;
const IntegrityIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>;
const ResultsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>;
const MissionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>;
const VisionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      <Header />
      
      <main className="page-content">
        <div className="page-header">
            <div className="container">
                <h1>About TIRA</h1>
                <p>We're building the future of intelligent trading research, empowering traders with AI-driven insights and comprehensive market analysis.</p>
            </div>
        </div>

        <div className="about-container">
          <div className="story-section">
            <div className="story-content">
              <div className="story-text">
                <h2>Our Story</h2>
                <p>TIRA was born from a simple observation: most traders, especially casual ones, simply don't have hours each day to pore over stock charts, read market news, and analyze shifting global trends. Between work, family, and everyday life, the sheer volume of information makes it nearly impossible to track performance across multiple stocks and still react in time.</p>                
              </div>
              <div className="story-stats">
                <div className="stat-item">
                  <div className="stat-number">80+</div>
                  <div className="stat-label">Stocks Tracked</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">50+</div>
                  <div className="stat-label">Data Sources Analyzed</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">99%</div>
                  <div className="stat-label">Uptime</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">Daily</div>
                  <div className="stat-label">Market Monitoring</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mission-vision-section">
            <div className="mission-vision-card">
              <div className="card-icon-wrapper"><MissionIcon /></div>
              <h3>Our Mission</h3>
              <p>To democratize access to professional-grade trading research by delivering AI-powered insights that save time, cut through the noise, and simplify complex market data — enabling traders at all levels to make timely, confident investment decisions.</p>
            </div>
            <div className="mission-vision-card">
              <div className="card-icon-wrapper"><VisionIcon /></div>
              <h3>Our Vision</h3>
              <p>Every trader, from the casual participant to the seasoned investor, deserves access to the tools, speed, and clarity that were once the exclusive domain of institutional trading desks.</p>
            </div>
          </div>

          <div className="values-section">
            <h2>Our Values</h2>
            <div className="values-grid">
              <div className="value-card">
                  <div className="value-icon"><PrecisionIcon/></div>
                  <h4>Precision</h4>
                  <p>We deliver accurate, reliable analysis backed by LLM-driven qualitative analysis and proven quantitative methodologies.</p>
              </div>
              <div className="value-card">
                  <div className="value-icon"><EfficiencyIcon/></div>
                  <h4>Efficiency</h4>
                  <p>We respect your time by providing comprehensive insights digestiable in seconds, not hours.</p>
              </div>
              <div className="value-card">
                  <div className="value-icon"><TransparencyIcon/></div>
                  <h4>Transparency</h4>
                  <p>We provide clear reasoning behind every recommendation, empowering you to make informed decisions.</p>
              </div>
              <div className="value-card">
                  <div className="value-icon"><InnovationIcon/></div>
                  <h4>Innovation</h4>
                  <p>We continuously evolve our platform using the latest advances in AI and financial technology.</p>
              </div>
              <div className="value-card">
                  <div className="value-icon"><IntegrityIcon/></div>
                  <h4>Integrity</h4>
                  <p>We maintain the highest standards in our research and recommendations.</p>
              </div>
              <div className="value-card">
                  <div className="value-icon"><ResultsIcon/></div>
                  <h4>Results</h4>
                  <p>We measure our success by the improved outcomes and time savings we deliver to our customers.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="team-section">
          <div className="container">
            <h2>Our Team</h2>
            <div className="team-grid">
              <div className="team-member-card">
                <div className="team-member-avatar">ES</div>
                <div className="team-member-info">
                  <h4>Eric Shi</h4>
                  <div className="role">Developer</div>
                </div>
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