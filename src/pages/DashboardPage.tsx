import React, { useState, useEffect, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { userAPI, marketAPI, stocksAPI, newsAPI, authAPI } from '../services/api';
import { clearAuthData, getUserEmail } from '../utils/auth';
import {
  User,
  MarketData,
  Stock,
  NewsArticle,
  UserSettings,
  EmailNotifications,
  // Note: The 'MarketAnalysis' type should be defined in your types file
  MarketAnalysis, 
} from '../types';
import './Dashboard.css';
import OverviewTab from './tabs/OverviewTab';
import StockTab from './tabs/StockTab';
import MarketTab from './tabs/MarketTab';
import DiscoveryTab from './tabs/DiscoveryTab';
import SettingsTab from './tabs/SettingsTab';
import RationaleModal from '../components/RationaleModal';

type TabType = 'overview' | 'stock' | 'market' | 'discovery' | 'settings';
type MessageType = 'success' | 'error' | '';

const DashboardPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  // --- NEW STATE FOR MARKET ANALYSIS ---
  const [marketAnalysis, setMarketAnalysis] = useState<MarketAnalysis | null>(null);
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
  const [selectedStockForHold, setSelectedStockForHold] = useState<string | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [theme, setTheme] = useState<string>('light');
  const [isDemoAccount, setIsDemoAccount] = useState<boolean>(false);

  // Rationale Modal State
  const [isRationaleModalOpen, setIsRationaleModalOpen] = useState(false);
  const [selectedStockForRationale, setSelectedStockForRationale] = useState<Stock | null>(null);
  const [rationale, setRationale] = useState<string | null>(null);
  const [rationaleLoading, setRationaleLoading] = useState(false);
  const [rationaleError, setRationaleError] = useState<string | null>(null);

  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [settingsLoading, setSettingsLoading] = useState<boolean>(false);
  const [settingsMessage, setSettingsMessage] = useState<string>('');
  const [settingsMessageType, setSettingsMessageType] = useState<MessageType>('');

  useEffect(() => {
    loadDashboardData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectedStockForHold) {
        setSelectedStockForHold(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [selectedStockForHold]);

  const loadDashboardData = async (): Promise<void> => {
    try {
      setLoading(true);

      const [
        userResponse,
        marketResponse,
        // --- ADDED API CALL FOR ANALYSIS ---
        analysisResponse,
        watchlistResponse,
        topMoversResponse,
        newsResponse,
        settingsResponse,
      ] = await Promise.all([
        userAPI.getProfile(),
        marketAPI.getOverview(),
        marketAPI.getMarketAnalysis(), // <-- Fetch market analysis
        stocksAPI.getWatchlist(),
        stocksAPI.getTopMovers(),
        newsAPI.getMarketNews(),
        authAPI.getUserSettings().then(res => res.json()),
      ]);

      setUser(userResponse);
      setMarketData(marketResponse);
      setMarketAnalysis(analysisResponse); // <-- Set the state
      setWatchlist(watchlistResponse.stocks || []);
      setTopMovers(topMoversResponse.stocks || []);
      setNews(newsResponse.articles || []);
      setSettings(settingsResponse);
    } catch (error) {
      console.error('Dashboard data loading error:', error);
      setError('Failed to load dashboard data. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  const handleStockClick = async (stock: Stock) => {
    setSelectedStockForRationale(stock);
    setIsRationaleModalOpen(true);
    setRationaleLoading(true);
    setRationaleError(null);
    setRationale(null);

    try {
      const response = await stocksAPI.getStockRationale(stock.symbol);
      setRationale(response.rationale);
    } catch (error) {
      console.error('Failed to fetch rationale:', error);
      setRationaleError('Could not load rationale for this stock.');
    } finally {
      setRationaleLoading(false);
    }
  };

  const handleCloseRationaleModal = () => {
    setIsRationaleModalOpen(false);
    setSelectedStockForRationale(null);
  };

  const handleNotificationToggle = (type: keyof EmailNotifications): void => {
    if (!settings) return;
    setSettings((prev: UserSettings | null) => {
      if (!prev) return null;
      return {
        ...prev,
        emailNotifications: {
          ...prev.emailNotifications,
          [type]: !prev.emailNotifications[type],
        },
      };
    });
  };

  const handleSettingChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    if (!settings) return;
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    const checkedValue = (e.target as HTMLInputElement).checked;

    setSettings(prev => {
        if (!prev) return null;
        return {
            ...prev,
            [name]: isCheckbox ? checkedValue : value,
        };
    });
  };

  const handleSaveSettings = async (): Promise<void> => {
    if (!settings) return;
    try {
      setSettingsLoading(true);
      setSettingsMessage('');
      
      const response = await authAPI.updateUserSettings(settings);
      const data = await response.json();
      
      if (response.ok) {
        setSettingsMessage('Settings saved successfully!');
        setSettingsMessageType('success');
      } else {
        setSettingsMessage(data.detail || 'Failed to save settings');
        setSettingsMessageType('error');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      setSettingsMessage('Connection error. Please try again.');
      setSettingsMessageType('error');
    } finally {
      setSettingsLoading(false);
      setTimeout(() => setSettingsMessage(''), 3000);
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
  };

  const handleDragOver = (e: React.DragEvent): void => {
    e.preventDefault();
  };

  const handleDragEnter = (e: React.DragEvent, index: number): void => {
    e.preventDefault();
    if (draggedIndex === null) return;
    setDragOverIndex(index);
  };

  const handleDrop = async (e: React.DragEvent, dropIndex: number): Promise<void> => {
    e.preventDefault();
    if (draggedIndex === null) return;

    // Adjust dropIndex for items shifted by the drag
    const adjustedDropIndex = dropIndex > draggedIndex ? dropIndex -1 : dropIndex;

    if (draggedIndex === adjustedDropIndex) {
        setDraggedIndex(null);
        setDragOverIndex(null);
        return;
    }

    const newWatchlist = [...watchlist];
    const [draggedItem] = newWatchlist.splice(draggedIndex, 1);
    newWatchlist.splice(adjustedDropIndex, 0, draggedItem);
    
    setWatchlist(newWatchlist);
    setDraggedIndex(null);
    setDragOverIndex(null);

    try {
      const symbols = newWatchlist.map(stock => stock.symbol);
      await stocksAPI.updateWatchlistOrder(symbols);
    } catch (error) {
      console.error('Failed to update watchlist order in backend:', error);
      setMessage('Failed to save watchlist order. Please try again.');
      // Revert to original order on failure
      setWatchlist(watchlist);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleDragEnd = (): void => {
    setDraggedIndex(null);
    setDragOverIndex(null);
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
      setSettingsMessage('Demo accounts cannot be deleted.');
      setSettingsMessageType('error');
      setTimeout(() => setSettingsMessage(''), 5000);
      return;
    }
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        if (window.prompt('Please type "DELETE" to confirm account deletion:') === 'DELETE') {
          try {
            const response = await userAPI.deleteAccount();
            if (response.success) {
              alert('Account deleted successfully. You will be logged out.');
              clearAuthData();
              window.location.href = '/';
            } else {
              setSettingsMessage('Failed to delete account.');
              setSettingsMessageType('error');
              setTimeout(() => setSettingsMessage(''), 5000);
            }
          } catch (error) {
            console.error('Account deletion error:', error);
            setSettingsMessage('An error occurred while deleting your account.');
            setSettingsMessageType('error');
            setTimeout(() => setSettingsMessage(''), 5000);
          }
        } else {
          setSettingsMessage('Account deletion cancelled.');
          setSettingsMessageType('error');
          setTimeout(() => setSettingsMessage(''), 3000);
        }
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    handleThemeChange(savedTheme);
    const userEmail = getUserEmail();
    setIsDemoAccount(userEmail?.includes('demo') || false);
  }, []);

  const renderTabContent = (): JSX.Element | null => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab user={user} marketData={marketData} watchlist={watchlist} news={news} handleTabChange={handleTabChange} />;
      case 'stock':
        return <StockTab
          watchlist={watchlist} topMovers={topMovers} message={message}
          searchQuery={searchQuery} searchResults={searchResults}
          isInWatchlist={isInWatchlist} handleSearch={handleSearch}
          handleAddToWatchlist={handleAddToWatchlist} handleRemoveFromWatchlist={handleRemoveFromWatchlist}
          handleDragStart={handleDragStart} handleDragOver={handleDragOver}
          handleDragEnter={handleDragEnter}
          handleDrop={handleDrop} handleDragEnd={handleDragEnd}
          selectedStockForHold={selectedStockForHold} setSelectedStockForHold={setSelectedStockForHold}
          draggedIndex={draggedIndex}
          dragOverIndex={dragOverIndex}
          handleStockClick={handleStockClick}
        />;
      case 'market':
        // --- PASS THE NEW PROP ---
        return <MarketTab topMovers={topMovers} news={news} marketAnalysis={marketAnalysis} />;
      case 'discovery':
        return <DiscoveryTab />;
      case 'settings':
        return <SettingsTab 
                  theme={theme} 
                  handleThemeChange={handleThemeChange} 
                  handleDeleteAccount={handleDeleteAccount} 
                  isDemoAccount={isDemoAccount}
                  settings={settings}
                  handleSettingChange={handleSettingChange}
                  handleNotificationToggle={handleNotificationToggle}
                  handleSaveSettings={handleSaveSettings}
                  loading={settingsLoading}
                  message={settingsMessage}
                  messageType={settingsMessageType}
                />;
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
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <Link to="/" className="logo">
            <h1>TIRA</h1>
            <span className="nav-text">Trading Intelligence</span>
          </Link>
        </div>
        <nav className="sidebar-nav">
          <div className="nav-group">
            <h3 className="nav-group-title">Menu</h3>
            <button className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => handleTabChange('overview')}>
                <span>📊</span><span className="nav-text">Overview</span>
            </button>
            <button className={`tab-button ${activeTab === 'stock' ? 'active' : ''}`} onClick={() => handleTabChange('stock')}>
                <span>📈</span><span className="nav-text">Stock</span>
            </button>
            <button className={`tab-button ${activeTab === 'market' ? 'active' : ''}`} onClick={() => handleTabChange('market')}>
                <span>🌐</span><span className="nav-text">Market</span>
            </button>
          </div>
          <div className="nav-group">
            <h3 className="nav-group-title">Profile</h3>
            <button className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => handleTabChange('settings')}>
                <span>⚙️</span><span className="nav-text">Settings</span>
            </button>
          </div>
        </nav>
        <div className="user-profile">
          <div className="user-info">
            <span className="user-name nav-text">{user?.name || 'User'}</span>
            <span className="user-email nav-text">{getUserEmail()}</span>
          </div>
          <button onClick={handleLogout} className="logout-button">
            <span className="nav-text">Logout</span>
          </button>
        </div>
      </aside>
      <div className="content-wrapper">
        <main className="dashboard-content">
          {error && <div className="error">{error}</div>}
          {renderTabContent()}
        </main>
      </div>
      <RationaleModal 
        isOpen={isRationaleModalOpen}
        onClose={handleCloseRationaleModal}
        stock={selectedStockForRationale}
        rationale={rationale}
        loading={rationaleLoading}
        error={rationaleError}
      />
    </div>
  );
};

export default DashboardPage;