import React from 'react';
import { Stock, NewsArticle } from '../../types';

interface MarketTabProps {
  topMovers: Stock[];
  news: NewsArticle[];
}

const MarketTab: React.FC<MarketTabProps> = ({ topMovers, news }) => {
  return (
    <>
      {/* Top 5 Market Stocks */}
      <section className="dashboard-section">
        <h2>Top 5 Market Stocks</h2>
        <div className="stock-list">
          {topMovers
            .sort((a, b) => (b.score || 50) - (a.score || 50))
            .slice(0, 5)
            .map((stock, i) => (
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
            ))}
        </div>
      </section>

      {/* Market Sectors */}
      <section className="dashboard-section">
        <h2>Market Sectors</h2>
        <div className="sector-grid">
          <div className="sector-card">
            <h3>Technology</h3>
            <div className="sector-performance">
              <span className="sector-change positive">+2.4%</span>
              <span className="sector-trend">📈</span>
            </div>
          </div>
          <div className="sector-card">
            <h3>Healthcare</h3>
            <div className="sector-performance">
              <span className="sector-change positive">+1.8%</span>
              <span className="sector-trend">📈</span>
            </div>
          </div>
          <div className="sector-card">
            <h3>Finance</h3>
            <div className="sector-performance">
              <span className="sector-change negative">-0.5%</span>
              <span className="sector-trend">📉</span>
            </div>
          </div>
          <div className="sector-card">
            <h3>Energy</h3>
            <div className="sector-performance">
              <span className="sector-change positive">+3.2%</span>
              <span className="sector-trend">📈</span>
            </div>
          </div>
        </div>
      </section>

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
    </>
  );
};

export default MarketTab;