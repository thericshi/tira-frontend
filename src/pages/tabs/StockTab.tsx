import React from 'react';
import { Stock } from '../../types';

interface StockTabProps {
  watchlist: Stock[];
  topMovers: Stock[];
  message: string;
  searchQuery: string;
  searchResults: Stock[];
  isInWatchlist: (symbol: string) => boolean;
  handleSearch: (query: string) => void;
  handleAddToWatchlist: (symbol: string) => void;
  handleRemoveFromWatchlist: (symbol: string) => void;
  handleDragStart: (e: React.DragEvent, index: number) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDragEnter: (e: React.DragEvent, index: number) => void;
  handleDragLeave: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent, dropIndex: number) => void;
  handleDragEnd: () => void;
  selectedStock: string | null;
  setSelectedStock: React.Dispatch<React.SetStateAction<string | null>>;
  draggedIndex: number | null;
  dragOverIndex: number | null;
  getItemTransform: (index: number) => string;
}

const StockTab: React.FC<StockTabProps> = ({
  watchlist,
  topMovers,
  message,
  searchQuery,
  searchResults,
  isInWatchlist,
  handleSearch,
  handleAddToWatchlist,
  handleRemoveFromWatchlist,
  handleDragStart,
  handleDragOver,
  handleDragEnter,
  handleDragLeave,
  handleDrop,
  handleDragEnd,
  selectedStock,
  setSelectedStock,
  draggedIndex,
  dragOverIndex,
  getItemTransform,
}) => {
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
};

export default StockTab;