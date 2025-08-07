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
  handleDrop: (e: React.DragEvent, dropIndex: number) => void;
  handleDragEnd: () => void;
  selectedStockForHold: string | null;
  setSelectedStockForHold: React.Dispatch<React.SetStateAction<string | null>>;
  draggedIndex: number | null;
  dragOverIndex: number | null;
  handleStockClick: (stock: Stock) => void;
}

const DropZone: React.FC<{
    index: number;
    dragOverIndex: number | null;
    handleDragEnter: (e: React.DragEvent, index: number) => void;
    handleDragOver: (e: React.DragEvent) => void;
    handleDrop: (e: React.DragEvent, index: number) => void;
}> = ({ index, dragOverIndex, handleDragEnter, handleDragOver, handleDrop }) => {
    const isDragOver = dragOverIndex === index;
    return (
        <div
            className={`drop-zone ${isDragOver ? 'drag-over' : ''}`}
            onDragEnter={(e) => handleDragEnter(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
        />
    );
};

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
  handleDrop,
  handleDragEnd,
  selectedStockForHold,
  setSelectedStockForHold,
  draggedIndex,
  dragOverIndex,
  handleStockClick,
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
          <div className="watchlist-container">
            <div className="stock-list">
              {watchlist.length > 0 ? (
                <>
                  <DropZone index={0} dragOverIndex={dragOverIndex} handleDragEnter={handleDragEnter} handleDragOver={handleDragOver} handleDrop={handleDrop} />
                  {watchlist.map((stock, i) => (
                    <React.Fragment key={stock.symbol}>
                      <div
                        className={`stock-item clickable draggable ${draggedIndex === i ? 'dragging' : ''}`}
                        draggable
                        onDragStart={(e) => handleDragStart(e, i)}
                        onDragEnd={handleDragEnd}
                        onClick={() => handleStockClick(stock)}
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
                          {selectedStockForHold === stock.symbol && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveFromWatchlist(stock.symbol);
                                setSelectedStockForHold(null);
                              }}
                              className="trash-button"
                            >
                              🗑️
                            </button>
                          )}
                        </div>
                      </div>
                      <DropZone index={i + 1} dragOverIndex={dragOverIndex} handleDragEnter={handleDragEnter} handleDragOver={handleDragOver} handleDrop={handleDrop} />
                    </React.Fragment>
                  ))}
                </>
              ) : (
                <p>No stocks in your watchlist yet. Add some to get started!</p>
              )}
            </div>
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
    </>
  );
};

export default StockTab;