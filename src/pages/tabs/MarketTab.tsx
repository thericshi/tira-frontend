import React from 'react';
import { Stock, NewsArticle, MarketAnalysis } from '../../types';
import './MarketTab.css';

interface MarketTabProps {
  topMovers: Stock[];
  news: NewsArticle[];
  marketAnalysis: MarketAnalysis | null;
  handleStockClick: (stock: Stock) => void;
}

const MarketTab: React.FC<MarketTabProps> = ({ topMovers, news, marketAnalysis, handleStockClick }) => {
  const [barWidth, setBarWidth] = React.useState(0);

  React.useEffect(() => {
    if (marketAnalysis) {
      const timer = setTimeout(() => {
        setBarWidth(marketAnalysis.score);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [marketAnalysis]);

  const formatTimeAgo = (dateString: string): string => {
    if (!dateString) return 'a while ago';
    
    let safeDateString = dateString;
    if (!safeDateString.endsWith('Z')) {
      safeDateString += 'Z';
    }

    const date = new Date(safeDateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (seconds < 30) return "just now";
    
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

  const getSentimentProperties = (score: number | null) => {
    if (score === null || score === undefined) {
      return { label: 'Neutral', color: 'var(--sentiment-neutral)' };
    }
    if (score < 40) return { label: 'Bearish', color: 'var(--sentiment-bearish)' };
    if (score < 60) return { label: 'Neutral', color: 'var(--sentiment-neutral)' };
    return { label: 'Bullish', color: 'var(--sentiment-bullish)' };
  };

  const sentiment = getSentimentProperties(marketAnalysis?.score ?? null);

  const NewsItemContent = ({ article }: { article: NewsArticle }) => (
    <article className="news-item stock-item interactive-card">
      <h4>{article.title}</h4>
      <div className="news-meta">
        <span>{article.source}</span>
        <span>{article.time}</span>
      </div>
    </article>
  );

  return (
    <>
      <section className="dashboard-section interactive-card">
        <h2>AI Market Analysis</h2>
        {marketAnalysis ? (
          <div className="market-analysis-container">
            <div className="sentiment-indicator interactive-card">
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
              <h4>Research Summary</h4>
              <p className="interactive-card">{marketAnalysis.analysis}</p>
            </div>
          </div>
        ) : (
          <p>Loading market analysis...</p>
        )}
      </section>

      <section className="dashboard-section interactive-card">
        <h2>Top 5 Market Stocks</h2>
        <div className="stock-list">
          {topMovers
            .sort((a, b) => (b.score || 50) - (a.score || 50))
            .slice(0, 5)
            .map((stock, i) => (
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
            ))}
        </div>
      </section>

      <section className="dashboard-section interactive-card">
        <h2>Market News</h2>
        <div className="news-list">
          {news.map((article, i) => (
            article.url ? (
              <a
                key={i}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="news-item-link"
              >
                <NewsItemContent article={article} />
              </a>
            ) : (
              <div key={i} className="news-item-link non-clickable">
                <NewsItemContent article={article} />
              </div>
            )
          ))}
        </div>
      </section>
    </>
  );
};

export default MarketTab;
