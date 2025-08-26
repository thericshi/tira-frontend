import React, { useState, useEffect, useRef } from 'react';
import { Stock, NewsArticle, MarketAnalysis } from '../../types';
import './MarketTab.css';

interface MarketHistoryChartProps {
  history: MarketAnalysis[];
}

const MarketHistoryChart: React.FC<MarketHistoryChartProps> = ({ history }) => {
  const [tooltip, setTooltip] = useState<{ x: number, y: number, content: string } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  
  if (!history || history.length < 2) {
    return (
      <div className="market-chart-container interactive-card">
        <h4>Historical Score</h4>
        <p>Not enough data to display a chart. Check back tomorrow.</p>
      </div>
    );
  }

  const width = 600;
  const height = 200;
  const padding = { top: 20, right: 20, bottom: 30, left: 30 };

  const data = history.map(d => ({
    date: new Date(d.last_updated_utc.endsWith('Z') ? d.last_updated_utc : d.last_updated_utc + 'Z'),
    score: d.score,
  }));

  const minDate = data[0].date;
  const maxDate = data[data.length - 1].date;
  
  const xScale = (date: Date) => {
    return padding.left + ((date.getTime() - minDate.getTime()) / (maxDate.getTime() - minDate.getTime())) * (width - padding.left - padding.right);
  };
  
  const yScale = (score: number) => {
    return height - padding.bottom - ((score / 100)) * (height - padding.top - padding.bottom);
  };

  const linePath = data.map(d => `${xScale(d.date)},${yScale(d.score)}`).join(' ');
  const areaPath = `${xScale(minDate)},${height - padding.bottom} ` + linePath + ` ${xScale(maxDate)},${height - padding.bottom}`;

  const yAxisLabels = [0, 25, 50, 75, 100];
  const xAxisLabels = [data[0], data[Math.floor(data.length / 2)], data[data.length - 1]];

  const handleMouseOver = (e: React.MouseEvent, d: { date: Date, score: number }) => {
    if (!svgRef.current) return;
    const svgRect = svgRef.current.getBoundingClientRect();
    setTooltip({
      x: e.clientX - svgRect.left,
      y: e.clientY - svgRect.top - 10,
      content: `${d.date.toLocaleDateString()}: ${d.score}`
    });
  };

  const handleMouseOut = () => {
    setTooltip(null);
  };

  return (
    <div className="market-chart-container interactive-card" style={{ position: 'relative' }}>
      <h4>Historical Score (Last 30 Days)</h4>
      <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`} className="market-chart-svg">
        {/* Y-Axis Grid Lines and Labels */}
        {yAxisLabels.map(label => (
          <g key={label}>
            <line className="grid-line" x1={padding.left} y1={yScale(label)} x2={width - padding.right} y2={yScale(label)} />
            <text className="axis-label" x={padding.left - 8} y={yScale(label) + 4} textAnchor="end">{label}</text>
          </g>
        ))}
        {/* X-Axis Labels */}
        {xAxisLabels.map((d, i) => (
          <text className="axis-label" key={i} x={xScale(d.date)} y={height - padding.bottom + 15} textAnchor="middle">
            {d.date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
          </text>
        ))}

        {/* Score Area Gradient */}
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--chart-line-color)" stopOpacity={0.4}/>
            <stop offset="100%" stopColor="var(--chart-line-color)" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <polyline className="score-area" points={areaPath} fill="url(#areaGradient)" />

        {/* Score Line */}
        <polyline className="score-line" points={linePath} />

        {/* Data Points */}
        {data.map((d, i) => (
          <circle
            key={i}
            className="score-point"
            cx={xScale(d.date)}
            cy={yScale(d.score)}
            r="4"
            onMouseOver={(e) => handleMouseOver(e, d)}
            onMouseOut={handleMouseOut}
          />
        ))}
      </svg>
      {tooltip && (
        <div className="chart-tooltip" style={{ left: tooltip.x, top: tooltip.y, transform: 'translate(-50%, -100%)' }}>
          {tooltip.content}
        </div>
      )}
    </div>
  );
};


interface MarketTabProps {
  topMovers: Stock[];
  news: NewsArticle[];
  marketAnalysis: MarketAnalysis | null;
  marketHistory: MarketAnalysis[];
  handleStockClick: (stock: Stock) => void;
}

const MarketTab: React.FC<MarketTabProps> = ({ topMovers, news, marketAnalysis, marketHistory, handleStockClick }) => {
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
    if (!safeDateString.endsWith('Z')) safeDateString += 'Z';
    const date = new Date(safeDateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (seconds < 5) return "just now";
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
    if (score === null || score === undefined) return { label: 'Neutral', color: 'var(--sentiment-neutral)' };
    if (score < 40) return { label: 'Bearish', color: 'var(--sentiment-bearish)' };
    if (score < 60) return { label: 'Neutral', color: 'var(--sentiment-neutral)' };
    return { label: 'Bullish', color: 'var(--sentiment-bullish)' };
  };

  const sentiment = getSentimentProperties(marketAnalysis?.score ?? null);

  const NewsItemContent = ({ article }: { article: NewsArticle }) => (
    <article className="news-item stock-item interactive-card">
      <h4 className="news-title">{article.title}</h4>
      <div className="news-meta">
        <span className="news-source">{article.source}</span>
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
              <div className="analysis-summary-box interactive-card">
                <h4>Research Summary</h4>
                <p>{marketAnalysis.analysis}</p>
              </div>
              <MarketHistoryChart history={marketHistory} />
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