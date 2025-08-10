import React from 'react';
import { Stock, NewsArticle, MarketAnalysis } from '../../types';
import './MarketTab.css';

interface MarketTabProps {
  topMovers: Stock[];
  news: NewsArticle[];
  marketAnalysis: MarketAnalysis | null;
}

const MarketTab: React.FC<MarketTabProps> = ({ topMovers, news, marketAnalysis }) => {
  const [barWidth, setBarWidth] = React.useState(0);

  // This effect triggers the fill animation when the component receives the analysis data.
  // It ensures the bar is visually rendered at 0% width before the transition starts.
  React.useEffect(() => {
    if (marketAnalysis) {
      const timer = setTimeout(() => {
        setBarWidth(marketAnalysis.score);
      }, 100); // A brief delay to allow for initial render
      return () => clearTimeout(timer);
    }
  }, [marketAnalysis]);

  /**
   * Converts an ISO date string to a human-readable "time ago" format.
   * @param dateString The ISO date string to format.
   * @returns A string like "5 minutes ago".
   */
  const formatTimeAgo = (dateString: string): string => {
    if (!dateString) return 'a while ago';
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
  };

  /**
   * Gets sentiment properties (a text label and color) based on the score.
   * @param score A number from 0-100.
   * @returns An object with a 'label' string and a 'color' CSS variable string.
   */
  const getSentimentProperties = (score: number | null) => {
    if (score === null || score === undefined) {
      return { label: 'Neutral', color: 'var(--sentiment-neutral)' };
    }
    if (score < 40) return { label: 'Bearish', color: 'var(--sentiment-bearish)' };
    if (score < 60) return { label: 'Neutral', color: 'var(--sentiment-neutral)' };
    return { label: 'Bullish', color: 'var(--sentiment-bullish)' };
  };

  const sentiment = getSentimentProperties(marketAnalysis?.score ?? null);

  return (
    <>
      <section className="dashboard-section">
        <h2>AI Market Analysis</h2>
        {marketAnalysis ? (
          <div className="market-analysis-container">
            <div className="sentiment-indicator">
              <div className="sentiment-header">
                <span className="sentiment-score-value" style={{ color: sentiment.color }}>
                  {marketAnalysis.score}
                </span>
                <div className="sentiment-score-label">
                  <span>/ 100</span>
                  <strong style={{ color: sentiment.color }}>{sentiment.label}</strong>
                </div>
              </div>

              <div className="sentiment-bar-container">
                <div className="sentiment-bar">
                  <div
                    className="sentiment-bar-fill"
                    style={{
                      width: `${barWidth}%`,
                      backgroundColor: sentiment.color,
                    }}
                  />
                </div>
                <div className="sentiment-labels">
                  <span>Bearish</span>
                  <span>Bullish</span>
                </div>
              </div>
              <p className="update-time">
                Updated {formatTimeAgo(marketAnalysis.last_updated_utc)}
              </p>
            </div>
            <div className="analysis-text">
              <h4>Qualitative Summary</h4>
              <p>{marketAnalysis.analysis}</p>
            </div>
          </div>
        ) : (
          <p>Loading market analysis...</p>
        )}
      </section>

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