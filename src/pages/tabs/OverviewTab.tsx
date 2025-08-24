import React from 'react';
import { MarketAnalysis, Stock, User } from '../../types';
import './OverviewTab.css';

interface OverviewTabProps {
  user: User | null;
  marketAnalysis: MarketAnalysis | null;
  watchlist: Stock[];
  handleTabChange: (tab: 'overview' | 'stock' | 'market' | 'discovery' | 'settings') => void;
  handleStockClick: (stock: Stock) => void;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ user, marketAnalysis, watchlist, handleTabChange, handleStockClick }) => {
  const firstName = user?.name?.split(' ')[0];
  const [barWidth, setBarWidth] = React.useState(0);

  React.useEffect(() => {
    if (marketAnalysis) {
      const timer = setTimeout(() => setBarWidth(marketAnalysis.score), 100);
      return () => clearTimeout(timer);
    }
  }, [marketAnalysis]);

  const getSentimentColor = (score: number | undefined) => {
    if (score === undefined) return 'var(--sentiment-neutral)';
    if (score < 40) return 'var(--sentiment-bearish)';
    if (score < 60) return 'var(--sentiment-neutral)';
    return 'var(--sentiment-bullish)';
  };

  return (
    <>
      <div className="overview-header">
        <h2>Hello {firstName || 'User'},</h2>
        <p>Here is your dashboard overview for today.</p>
      </div>

      {/* AI Sentiment Overview */}
      <section className="dashboard-section interactive-card">
        <div className="sentiment-overview">
          <div className="sentiment-overview-info">
            <h3>AI Market Sentiment</h3>
            <p>Overall market outlook based on our AI analysis.</p>
          </div>
          <div className="sentiment-overview-gauge">
            <div className="sentiment-overview-score" style={{ color: getSentimentColor(marketAnalysis?.score) }}>
              {marketAnalysis?.score ?? '--'}
              <span>/100</span>
            </div>
            <div className="sentiment-overview-bar-container">
              <div className="sentiment-overview-bar">
                <div
                  className="sentiment-overview-bar-fill"
                  style={{
                    width: `${barWidth}%`,
                    backgroundColor: getSentimentColor(marketAnalysis?.score)
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top 5 Watchlist */}
      <section className="dashboard-section interactive-card">
        <h2>Your Top 5 Watchlist</h2>
        <div className="stock-list">
          {watchlist.length > 0 ? (
            watchlist.slice(0, 5).map((stock, i) => (
              <div key={i} className="stock-item clickable interactive-card" onClick={() => handleStockClick(stock)}>
                <div className="stock-info">
                  <strong>{stock.symbol}</strong>
                  <span>{stock.name}</span>
                </div>
                <div className="stock-signal">
                  <div className={`signal ${stock.signal?.toLowerCase() || 'hold'}`}>
                    {stock.signal || 'HOLD'}
                  </div>
                  <div className="score">
                    Score: {stock.score || 50}/100
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No stocks in your watchlist yet. <button className="btn btn-primary" onClick={() => handleTabChange('stock')}>Add some stocks</button> to get started!</p>
          )}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="dashboard-section interactive-card">
        <h2>Quick Actions</h2>
        <div className="quick-actions">
          <button className="action-btn interactive-card" onClick={() => handleTabChange('stock')}>
            <span>📊</span>
            <div>
              <strong>Analyze Stock</strong>
              <p>Get detailed analysis for any stock</p>
            </div>
          </button>
          <button
            className="action-btn interactive-card"
            onClick={() => handleTabChange('market')}
          >
            <span>📈</span>
            <div>
              <strong>Market Research</strong>
              <p>Access comprehensive market reports</p>
            </div>
          </button>
          <button className="action-btn interactive-card" onClick={() => handleTabChange('settings')}>
            <span>⚙️</span>
            <div>
              <strong>Settings</strong>
              <p>Customize your preferences</p>
            </div>
          </button>
        </div>
      </section>
    </>
  );
};

export default OverviewTab;