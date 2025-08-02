import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userAPI, marketAPI, stocksAPI, newsAPI, aiAPI } from '../services/api';
import { clearAuthData, getUserEmail } from '../utils/auth';
import { 
  User, 
  MarketData, 
  Stock, 
  NewsArticle, 
  Recommendation 
} from '../types';
import './Dashboard.css';

type TabType = 'overview' | 'stock' | 'market' | 'discovery' | 'settings';

const DashboardPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [watchlist, setWatchlist] = useState<Stock[]>([]);
  const [topMovers, setTopMovers] = useState<Stock[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [allStocks, setAllStocks] = useState<Stock[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Stock[]>([]);
  const [message, setMessage] = useState<string>('');
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [theme, setTheme] = useState<string>('light');
  const [isDemoAccount, setIsDemoAccount] = useState<boolean>(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectedStock) {
        setSelectedStock(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [selectedStock]);

  const loadDashboardData = async (): Promise<void> => {
    try {
      setLoading(true);
      
      // Load all dashboard data in parallel
      const [
        userResponse,
        marketResponse,
        watchlistResponse,
        topMoversResponse,
        newsResponse,
        recommendationsResponse
      ] = await Promise.all([
        userAPI.getProfile(),
        marketAPI.getOverview(),
        stocksAPI.getWatchlist(),
        stocksAPI.getTopMovers(),
        newsAPI.getMarketNews(),
        aiAPI.getRecommendations()
      ]);

      setUser(userResponse);
      setMarketData(marketResponse);
      setWatchlist(watchlistResponse.stocks || []);
      setTopMovers(topMoversResponse.stocks || []);
      setNews(newsResponse.articles || []);
      setRecommendations(recommendationsResponse.recommendations || []);
      
    } catch (error) {
      console.error('Dashboard data loading error:', error);
      setError('Failed to load dashboard data. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = (): void => {
    clearAuthData();
    window.location.href = '/';
  };

  const handleTabChange = (tab: TabType): void => {
    setActiveTab(tab);
    if (tab === 'discovery' && allStocks.length === 0) {
      loadAllStocks();
    }
    
    // Always scroll to top when switching tabs
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const loadAllStocks = async (): Promise<void> => {
    try {
      const response = await stocksAPI.getAllStocks();
      setAllStocks(response.stocks || []);
    } catch (error) {
      console.error('Failed to load all stocks:', error);
    }
  };

  const handleSearch = async (query: string): Promise<void> => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    try {
      const response = await stocksAPI.searchStocks(query);
      setSearchResults(response.stocks || []);
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
    }
  };

  const handleAddToWatchlist = async (symbol: string): Promise<void> => {
    try {
      const response = await stocksAPI.addToWatchlist(symbol);
      setMessage(response.message);
      
      if (response.success) {
        // Refresh watchlist
        const watchlistResponse = await stocksAPI.getWatchlist();
        setWatchlist(watchlistResponse.stocks || []);
      }
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Failed to add to watchlist:', error);
      setMessage('Failed to add stock to watchlist');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleRemoveFromWatchlist = async (symbol: string): Promise<void> => {
    try {
      const response = await stocksAPI.removeFromWatchlist(symbol);
      setMessage(response.message);
      
      if (response.success) {
        // Refresh watchlist
        const watchlistResponse = await stocksAPI.getWatchlist();
        setWatchlist(watchlistResponse.stocks || []);
      }
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Failed to remove from watchlist:', error);
      setMessage('Failed to remove stock from watchlist');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const isInWatchlist = (symbol: string): boolean => {
    return watchlist.some(stock => stock.symbol === symbol);
  };

  const handleDragStart = (e: React.DragEvent, index: number): void => {
    console.log('Drag start:', index);
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: React.DragEvent): void => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e: React.DragEvent, index: number): void => {
    e.preventDefault();
    e.stopPropagation();
    if (draggedIndex !== null && draggedIndex !== index) {
      // Get the element bounds and mouse position
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const mouseY = e.clientY;
      
      // Add buffer zones above and below the element (100% of the element height)
      const elementHeight = rect.height;
      const bufferZone = elementHeight * 1.0;
      
      // Check if mouse is within the expanded detection area
      if (mouseY >= rect.top - bufferZone && mouseY <= rect.bottom + bufferZone) {
        setDragOverIndex(index);
      }
    }
  };


  const handleDragLeave = (e: React.DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    
    // Only clear dragOverIndex if we're actually leaving the element
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    
    // Add small buffer to prevent flickering
    const buffer = 5;
    if (x < rect.left - buffer || x > rect.right + buffer || 
        y < rect.top - buffer || y > rect.bottom + buffer) {
      setDragOverIndex(null);
    }
  };

  const handleDrop = async (e: React.DragEvent, dropIndex: number): Promise<void> => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Drop event:', { draggedIndex, dropIndex });
    
    if (draggedIndex === null || draggedIndex === dropIndex) {
      console.log('Same position or no drag index, aborting');
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const newWatchlist = [...watchlist];
    const draggedItem = newWatchlist[draggedIndex];
    
    console.log('Swapping:', draggedItem?.symbol, 'with item at index', dropIndex);
    
    // Remove the dragged item
    newWatchlist.splice(draggedIndex, 1);
    
    // Insert at new position
    newWatchlist.splice(dropIndex, 0, draggedItem);
    
    console.log('New watchlist order:', newWatchlist.map(s => s.symbol));
    
    // Update local state immediately for responsive UI
    setWatchlist(newWatchlist);
    setDraggedIndex(null);
    setDragOverIndex(null);
    
    // Update backend with new order
    try {
      const symbols = newWatchlist.map(stock => stock.symbol);
      await stocksAPI.updateWatchlistOrder(symbols);
      console.log('Watchlist order updated in backend');
    } catch (error) {
      console.error('Failed to update watchlist order in backend:', error);
      // Optionally show an error message to the user
      setMessage('Failed to save watchlist order. Please try again.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleDragEnd = (): void => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const getItemTransform = (index: number): string => {
    if (draggedIndex === null || dragOverIndex === null) return '';
    
    // Don't transform the dragged item
    if (index === draggedIndex) return '';
    
    // If dragging down (draggedIndex < dragOverIndex)
    if (draggedIndex < dragOverIndex) {
      // Items between draggedIndex and dragOverIndex move up
      if (index > draggedIndex && index <= dragOverIndex) {
        return 'translateY(-70px)';
      }
    }
    // If dragging up (draggedIndex > dragOverIndex)
    else if (draggedIndex > dragOverIndex) {
      // Items between dragOverIndex and draggedIndex move down
      if (index >= dragOverIndex && index < draggedIndex) {
        return 'translateY(70px)';
      }
    }
    
    return '';
  };

  const handleThemeChange = (newTheme: string): void => {
    setTheme(newTheme);
    
    // Apply theme to document
    if (newTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else if (newTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      // Auto theme - detect system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }
    
    // Save to localStorage
    localStorage.setItem('theme', newTheme);
  };

  const handleDeleteAccount = async (): Promise<void> => {
    if (isDemoAccount) {
      setMessage('Demo accounts cannot be deleted. This is a demonstration account.');
      setTimeout(() => setMessage(''), 5000);
      return;
    }

    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone and will permanently remove all your data, including your watchlist, settings, and trading history.'
    );

    if (!confirmed) return;

    const doubleConfirmed = window.confirm(
      'This is your final warning. Deleting your account will permanently remove all data and cannot be reversed. Type "DELETE" in the next prompt to confirm.'
    );

    if (!doubleConfirmed) return;

    const finalConfirmation = window.prompt(
      'Please type "DELETE" (in capital letters) to confirm account deletion:'
    );

    if (finalConfirmation !== 'DELETE') {
      setMessage('Account deletion cancelled. The confirmation text did not match.');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    try {
      const response = await userAPI.deleteAccount();
      if (response.success) {
        alert('Your account has been successfully deleted. You will now be logged out.');
        clearAuthData();
        window.location.href = '/';
      } else {
        setMessage('Failed to delete account. Please try again or contact support.');
        setTimeout(() => setMessage(''), 5000);
      }
    } catch (error) {
      console.error('Account deletion error:', error);
      setMessage('An error occurred while deleting your account. Please try again.');
      setTimeout(() => setMessage(''), 5000);
    }
  };

  // Initialize theme on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    handleThemeChange(savedTheme);

    // Check if this is a demo account
    const userEmail = getUserEmail();
    setIsDemoAccount(userEmail?.includes('demo') || userEmail?.includes('test') || false);
  }, []);

  const renderTabContent = (): JSX.Element | null => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
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
              {/* AI Recommendations */}
              <section className="dashboard-section">
                <h2>AI Recommendations</h2>
                <div className="recommendations-list">
                  {recommendations.map((rec, i) => (
                    <div key={i} className="recommendation-item">
                      <div className="rec-header">
                        <strong>{rec.symbol}</strong>
                        <span className={`rec-type ${rec.type.toLowerCase()}`}>
                          {rec.type}
                        </span>
                      </div>
                      <p>{rec.reason}</p>
                      <div className="rec-details">
                        <span>Target: ${rec.target}</span>
                        <span>Confidence: {rec.confidence}%</span>
                      </div>
                    </div>
                  ))}
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
                  style={{background: '#D4AF37', color: 'white', border: '2px solid #D4AF37'}}
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

      case 'stock':
        return (
          <>
            {/* Stock Search */}
            <section className="dashboard-section">
              <h2>Search Stocks</h2>
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search stocks by symbol or name..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="form-input"
                />
                {message && <div className="message success">{message}</div>}
                {searchResults.length > 0 && (
                  <div className="search-results">
                    <h3>Search Results</h3>
                    <div className="stock-list">
                      {searchResults.map((stock, i) => (
                        <div key={i} className="stock-item">
                          <div className="stock-info">
                            <strong>{stock.symbol}</strong>
                            <span>{stock.name}</span>
                            <small>{stock.sector} • {stock.marketCap}</small>
                          </div>
                          <div className="stock-actions">
                            <div className="stock-signal">
                              <div className={`signal ${stock.signal?.toLowerCase() || 'hold'}`}>
                                {stock.signal || 'HOLD'}
                              </div>
                              <div className="score">
                                Score: {stock.score || 50}/100
                              </div>
                            </div>
                            <button
                              onClick={() => isInWatchlist(stock.symbol) 
                                ? handleRemoveFromWatchlist(stock.symbol)
                                : handleAddToWatchlist(stock.symbol)
                              }
                              className={`btn ${isInWatchlist(stock.symbol) ? 'btn-secondary' : 'btn-primary'}`}
                            >
                              {isInWatchlist(stock.symbol) ? 'Remove' : 'Add'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>

            <div className="dashboard-grid">
              {/* Watchlist */}
              <section className="dashboard-section">
                <h2>Your Watchlist</h2>
                <div className="stock-list">
                  {watchlist.length > 0 ? (
                    watchlist.map((stock, i) => (
                      <div 
                        key={i}
                        className={`stock-item clickable draggable ${draggedIndex === i ? 'dragging' : ''} ${
                          draggedIndex !== null && dragOverIndex === i 
                            ? (draggedIndex < i ? 'light-from-top' : 'light-from-bottom')
                            : ''
                        }`}
                        draggable
                        onDragStart={(e) => handleDragStart(e, i)}
                        onDragOver={handleDragOver}
                        onDragEnter={(e) => handleDragEnter(e, i)}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, i)}
                        onDragEnd={handleDragEnd}
                        onClick={(e) => {
                          // Only handle click if not dragging
                          if (draggedIndex === null) {
                            e.stopPropagation();
                            setSelectedStock(selectedStock === stock.symbol ? null : stock.symbol);
                          }
                        }}
                        style={{
                          transform: getItemTransform(i),
                          transition: draggedIndex === i ? 'none' : 'transform 0.3s ease'
                        }}
                      >
                        <div className="drag-handle">⋮⋮</div>
                        <div className="stock-info">
                          <strong>{stock.symbol}</strong>
                          <span>{stock.name}</span>
                        </div>
                        <div className="stock-actions">
                          <div className="stock-signal">
                            <div className={`signal ${stock.signal?.toLowerCase() || 'hold'}`}>
                              {stock.signal || 'HOLD'}
                            </div>
                            <div className="score">
                              Score: {stock.score || 50}/100
                            </div>
                          </div>
                          {selectedStock === stock.symbol && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveFromWatchlist(stock.symbol);
                                setSelectedStock(null);
                              }}
                              className="trash-button"
                            >
                              🗑️
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No stocks in your watchlist yet. Add some to get started!</p>
                  )}
                </div>
              </section>

              {/* Top Movers */}
              <section className="dashboard-section">
                <h2>Top Movers</h2>
                <div className="stock-list">
                  {topMovers.map((stock, i) => (
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
            </div>

            {/* Stock Analysis Tools */}
            <section className="dashboard-section">
              <h2>Stock Analysis Tools</h2>
              <div className="analysis-tools">
                <div className="tool-card">
                  <h3>📊 Technical Analysis</h3>
                  <p>Advanced charting and technical indicators</p>
                  <button className="btn btn-primary">Launch Tool</button>
                </div>
                <div className="tool-card">
                  <h3>📈 Fundamental Analysis</h3>
                  <p>Financial ratios and company metrics</p>
                  <button className="btn btn-primary">Launch Tool</button>
                </div>
                <div className="tool-card">
                  <h3>🎯 Price Targets</h3>
                  <p>AI-powered price predictions</p>
                  <button className="btn btn-primary">Launch Tool</button>
                </div>
              </div>
            </section>
          </>
        );

      case 'market':
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

      case 'discovery':
        return (
          <>
            {/* Trending Stocks */}
            <section className="dashboard-section">
              <h2>Trending Stocks</h2>
              <div className="trending-stocks">
                <div className="trending-item">
                  <div className="trending-info">
                    <strong>NVDA</strong>
                    <span>NVIDIA Corporation</span>
                    <div className="trending-reason">AI chip demand surge</div>
                  </div>
                  <div className="trending-metrics">
                    <div className="price">$875.32</div>
                    <div className="change positive">+5.2%</div>
                  </div>
                </div>
                <div className="trending-item">
                  <div className="trending-info">
                    <strong>TSLA</strong>
                    <span>Tesla Inc</span>
                    <div className="trending-reason">Q4 delivery beat</div>
                  </div>
                  <div className="trending-metrics">
                    <div className="price">$248.50</div>
                    <div className="change positive">+3.8%</div>
                  </div>
                </div>
                <div className="trending-item">
                  <div className="trending-info">
                    <strong>AMZN</strong>
                    <span>Amazon.com Inc</span>
                    <div className="trending-reason">AWS growth acceleration</div>
                  </div>
                  <div className="trending-metrics">
                    <div className="price">$155.75</div>
                    <div className="change positive">+2.1%</div>
                  </div>
                </div>
              </div>
            </section>

            {/* AI Recommendations */}
            <section className="dashboard-section">
              <h2>AI Stock Recommendations</h2>
              <div className="recommendations-list">
                {recommendations.map((rec, i) => (
                  <div key={i} className="recommendation-item">
                    <div className="rec-header">
                      <strong>{rec.symbol}</strong>
                      <span className={`rec-type ${rec.type.toLowerCase()}`}>
                        {rec.type}
                      </span>
                    </div>
                    <p>{rec.reason}</p>
                    <div className="rec-details">
                      <span>Target: ${rec.target}</span>
                      <span>Confidence: {rec.confidence}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        );

      case 'settings':
        return (
          <>
            {/* Notification Settings */}
            <section className="dashboard-section">
              <h2>Notification Settings</h2>
              <p className="section-description">
                Manage your notification preferences to stay informed about market changes and portfolio updates.
              </p>
              <div className="notification-grid">
                <div className="notification-item">
                  <div className="notification-info">
                    <h3>Price Alerts</h3>
                    <p>Get notified when stocks in your watchlist reach target prices</p>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="notification-item">
                  <div className="notification-info">
                    <h3>News Alerts</h3>
                    <p>Receive breaking news about your watched stocks and market sectors</p>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="notification-item">
                  <div className="notification-info">
                    <h3>Market Updates</h3>
                    <p>Daily market summaries and key economic indicators</p>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="notification-item">
                  <div className="notification-info">
                    <h3>Weekly Reports</h3>
                    <p>Comprehensive weekly portfolio performance and market analysis</p>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </section>

            {/* Display Preferences */}
            <section className="dashboard-section">
              <h2>Display Preferences</h2>
              <p className="section-description">
                Customize how information is displayed in your dashboard.
              </p>
              <div className="preference-item">
                <label>Theme</label>
                <select 
                  className="form-select"
                  value={theme}
                  onChange={(e) => handleThemeChange(e.target.value)}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto (System)</option>
                </select>
                <small>Choose your preferred color scheme</small>
              </div>
              <div className="preference-item">
                <label>Currency</label>
                <select className="form-select">
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="CAD">CAD (C$)</option>
                </select>
                <small>Select your preferred currency for displaying prices</small>
              </div>
              <div className="preference-item">
                <label>Timezone</label>
                <select className="form-select">
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  <option value="UTC">UTC</option>
                </select>
                <small>Choose your timezone for market hours and timestamps</small>
              </div>
            </section>

            {/* Privacy Settings */}
            <section className="dashboard-section">
              <h2>Privacy & Data</h2>
              <p className="section-description">
                Control how your data is used and shared.
              </p>
              <div className="checkbox-item">
                <label>
                  <input type="checkbox" defaultChecked />
                  Allow analytics to improve service quality
                </label>
                <p>Help us improve TIRA by sharing anonymous usage data</p>
              </div>
              <div className="checkbox-item">
                <label>
                  <input type="checkbox" />
                  Receive marketing communications
                </label>
                <p>Get updates about new features and market insights via email</p>
              </div>
            </section>

            {/* Account Actions */}
            <section className="dashboard-section">
              <h2>Account Management</h2>
              <p className="section-description">
                Manage your account settings and data.
              </p>
              <div className="settings-actions">
                <button 
                  className="btn btn-primary"
                  style={{background: '#000000', color: 'white', border: '2px solid #000000'}}
                >
                  Save Settings
                </button>
                <button 
                  className="btn btn-secondary"
                  style={{background: '#000000', color: 'white', border: '2px solid #000000'}}
                >
                  Export Data
                </button>
                <button 
                  className="btn" 
                  style={{background: '#dc2626', color: 'white', border: '2px solid #dc2626'}}
                  onClick={handleDeleteAccount}
                  disabled={isDemoAccount}
                  title={isDemoAccount ? 'Demo accounts cannot be deleted' : 'Permanently delete your account'}
                >
                  {isDemoAccount ? 'Delete Account (Demo)' : 'Delete Account'}
                </button>
              </div>
            </section>
          </>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <Link to="/">
                <h1>TIRA</h1>
                <span>Dashboard</span>
              </Link>
            </div>
            <div className="user-menu">
              <span>Welcome, {user?.name || getUserEmail()}</span>
              <button onClick={handleLogout} className="btn btn-secondary">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="dashboard-tabs">
        <div className="container">
          <div className="tab-list">
            <button 
              className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => handleTabChange('overview')}
            >
              <span>📊</span>
              Overview
            </button>
            <button 
              className={`tab-button ${activeTab === 'stock' ? 'active' : ''}`}
              onClick={() => handleTabChange('stock')}
            >
              <span>📈</span>
              Stock
            </button>
            <button 
              className={`tab-button ${activeTab === 'market' ? 'active' : ''}`}
              onClick={() => handleTabChange('market')}
            >
              <span>🌐</span>
              Market
            </button>
            <button 
              className={`tab-button ${activeTab === 'discovery' ? 'active' : ''}`}
              onClick={() => handleTabChange('discovery')}
            >
              <span>🔍</span>
              Discovery
            </button>
            <button 
              className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => handleTabChange('settings')}
            >
              <span>⚙️</span>
              Settings
            </button>
          </div>
        </div>
      </nav>

      <main className="dashboard-content">
        <div className="container">
          {error && <div className="error">{error}</div>}
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
