import React from 'react';
import { MarketData, Stock, NewsArticle, User } from '../../types';
import './OverviewTab.css';

interface OverviewTabProps {
  user: User | null;
  marketData: MarketData | null;
  watchlist: Stock[];
  news: NewsArticle[];
  handleTabChange: (tab: 'overview' | 'stock' | 'market' | 'discovery' | 'settings') => void;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ user, marketData, watchlist, news, handleTabChange }) => {
  const firstName = user?.name?.split(' ')[0];
  
  return (
    <>
      <div className="overview-header">
        <h2>Hello {firstName || 'User'},</h2>
        <p>Here is your dashboard overview for today</p>
      </div>

      {/* Market Overview */}
      <section className="dashboard-section">
        <h2>Market Overview</h2>
        <div className="market-cards">
          {marketData?.indices?.map((index, i) => (
            <div key={i} className="market-card">
              <h3>{index.name}</h3>
              <div className="price">{index.value}</div>
              <div className={`change ${index.change >= 0 ? 'positive' : 'negative'}`}>
                {index.change >= 0 ? '+' : ''}{index.change} ({index.changePercent}%)
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top 5 Watchlist */}
      <section className="dashboard-section">
        <h2>Your Top 5 Watchlist</h2>
        <div className="stock-list">
          {watchlist.length > 0 ? (
            watchlist.slice(0, 5).map((stock, i) => (
              <div key={i} className="stock-item">
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

      <div className="dashboard-grid">
        {/* Market News */}
        <section className="dashboard-section">
          <h2>Market News</h2>
          <div className="news-list">
            {news.map((article, i) => (
              <div key={i} className="news-item">
                <h4>{article.title}</h4>
                <p>{article.summary}</p>
                <div className="news-meta">
                  <span>{article.source}</span>
                  <span>{article.publishedAt}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Quick Actions */}
      <section className="dashboard-section">
        <h2>Quick Actions</h2>
        <div className="quick-actions">
          <button className="action-btn" onClick={() => handleTabChange('stock')}>
            <span>📊</span>
            <div>
              <strong>Analyze Stock</strong>
              <p>Get detailed analysis for any stock</p>
            </div>
          </button>
          <button
            className="action-btn"
            onClick={() => handleTabChange('market')}
            style={{ background: '#D4AF37', color: 'white', border: '2px solid #D4AF37' }}
          >
            <span>📈</span>
            <div>
              <strong>Market Research</strong>
              <p>Access comprehensive market reports</p>
            </div>
          </button>
          <button className="action-btn" onClick={() => handleTabChange('discovery')}>
            <span>🔍</span>
            <div>
              <strong>Discover Stocks</strong>
              <p>Find new investment opportunities</p>
            </div>
          </button>
          <button className="action-btn" onClick={() => handleTabChange('settings')}>
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