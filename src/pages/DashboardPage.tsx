import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userAPI, marketAPI, stocksAPI, newsAPI } from '../services/api';
import { clearAuthData, getUserEmail } from '../utils/auth';
import {
  User,
  MarketData,
  Stock,
  NewsArticle,
} from '../types';
import './Dashboard.css';
import OverviewTab from './tabs/OverviewTab';
import StockTab from './tabs/StockTab';
import MarketTab from './tabs/MarketTab';
import DiscoveryTab from './tabs/DiscoveryTab';
import SettingsTab from './tabs/SettingsTab';

type TabType = 'overview' | 'stock' | 'market' | 'discovery' | 'settings';

const DashboardPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [watchlist, setWatchlist] = useState<Stock[]>([]);
  const [topMovers, setTopMovers] = useState<Stock[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
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

      const [
        userResponse,
        marketResponse,
        watchlistResponse,
        topMoversResponse,
        newsResponse,
      ] = await Promise.all([
        userAPI.getProfile(),
        marketAPI.getOverview(),
        stocksAPI.getWatchlist(),
        stocksAPI.getTopMovers(),
        newsAPI.getMarketNews(),
      ]);

      setUser(userResponse);
      setMarketData(marketResponse);
      setWatchlist(watchlistResponse.stocks || []);
      setTopMovers(topMoversResponse.stocks || []);
      setNews(newsResponse.articles || []);
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
        const watchlistResponse = await stocksAPI.getWatchlist();
        setWatchlist(watchlistResponse.stocks || []);
      }

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
        const watchlistResponse = await stocksAPI.getWatchlist();
        setWatchlist(watchlistResponse.stocks || []);
      }

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
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const mouseY = e.clientY;
      const elementHeight = rect.height;
      const bufferZone = elementHeight * 1.0;
      if (mouseY >= rect.top - bufferZone && mouseY <= rect.bottom + bufferZone) {
        setDragOverIndex(index);
      }
    }
  };

  const handleDragLeave = (e: React.DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    const buffer = 5;
    if (x < rect.left - buffer || x > rect.right + buffer ||
        y < rect.top - buffer || y > rect.bottom + buffer) {
      setDragOverIndex(null);
    }
  };

  const handleDrop = async (e: React.DragEvent, dropIndex: number): Promise<void> => {
    e.preventDefault();
    e.stopPropagation();

    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const newWatchlist = [...watchlist];
    const draggedItem = newWatchlist[draggedIndex];
    newWatchlist.splice(draggedIndex, 1);
    newWatchlist.splice(dropIndex, 0, draggedItem);
    setWatchlist(newWatchlist);
    setDraggedIndex(null);
    setDragOverIndex(null);

    try {
      const symbols = newWatchlist.map(stock => stock.symbol);
      await stocksAPI.updateWatchlistOrder(symbols);
    } catch (error) {
      console.error('Failed to update watchlist order in backend:', error);
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
    if (index === draggedIndex) return '';
    if (draggedIndex < dragOverIndex) {
      if (index > draggedIndex && index <= dragOverIndex) {
        return 'translateY(-70px)';
      }
    } else if (draggedIndex > dragOverIndex) {
      if (index >= dragOverIndex && index < draggedIndex) {
        return 'translateY(70px)';
      }
    }
    return '';
  };

  const handleThemeChange = (newTheme: string): void => {
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else if (newTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }
    localStorage.setItem('theme', newTheme);
  };

  const handleDeleteAccount = async (): Promise<void> => {
    if (isDemoAccount) {
      setMessage('Demo accounts cannot be deleted. This is a demonstration account.');
      setTimeout(() => setMessage(''), 5000);
      return;
    }

    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone and will permanently remove all your data, including your watchlist, settings, and trading history.')) {
      if (window.confirm('This is your final warning. Deleting your account will permanently remove all data and cannot be reversed. Type "DELETE" in the next prompt to confirm.')) {
        if (window.prompt('Please type "DELETE" (in capital letters) to confirm account deletion:') === 'DELETE') {
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
        } else {
          setMessage('Account deletion cancelled. The confirmation text did not match.');
          setTimeout(() => setMessage(''), 3000);
        }
      }
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    handleThemeChange(savedTheme);
    const userEmail = getUserEmail();
    setIsDemoAccount(userEmail?.includes('demo') || userEmail?.includes('test') || false);
  }, []);

  const renderTabContent = (): JSX.Element | null => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab marketData={marketData} watchlist={watchlist} news={news} handleTabChange={handleTabChange} />;
      case 'stock':
        return <StockTab
          watchlist={watchlist}
          topMovers={topMovers}
          message={message}
          searchQuery={searchQuery}
          searchResults={searchResults}
          isInWatchlist={isInWatchlist}
          handleSearch={handleSearch}
          handleAddToWatchlist={handleAddToWatchlist}
          handleRemoveFromWatchlist={handleRemoveFromWatchlist}
          handleDragStart={handleDragStart}
          handleDragOver={handleDragOver}
          handleDragEnter={handleDragEnter}
          handleDragLeave={handleDragLeave}
          handleDrop={handleDrop}
          handleDragEnd={handleDragEnd}
          selectedStock={selectedStock}
          setSelectedStock={setSelectedStock}
          draggedIndex={draggedIndex}
          dragOverIndex={dragOverIndex}
          getItemTransform={getItemTransform}
        />;
      case 'market':
        return <MarketTab topMovers={topMovers} news={news} />;
      case 'discovery':
        return <DiscoveryTab />;
      case 'settings':
        return <SettingsTab theme={theme} handleThemeChange={handleThemeChange} handleDeleteAccount={handleDeleteAccount} isDemoAccount={isDemoAccount} />;
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