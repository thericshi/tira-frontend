import React from 'react';
import { Stock, StockHistoryPoint } from '../types';
import StockHistoryChart from './StockHistoryChart';
import '../pages/Dashboard.css';

interface RationaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  stock: Stock | null;
  rationale: string | null;
  loading: boolean;
  error: string | null;
  history: StockHistoryPoint[];
  historyLoading: boolean;
  historyError: string | null;
}

const RationaleModal: React.FC<RationaleModalProps> = ({
  isOpen,
  onClose,
  stock,
  rationale,
  loading,
  error,
  history,
  historyLoading,
  historyError,
}) => {
  if (!isOpen || !stock) return null;

  return (
    <div className="rationale-modal-overlay" onClick={onClose}>
      <div className="rationale-modal interactive-card" onClick={(e) => e.stopPropagation()}>
        <button className="rationale-modal-close" onClick={onClose}>&times;</button>
        
        <div className="rationale-header">
          <div>
            <h2>{stock.symbol}</h2>
            <span className="stock-name">{stock.name}</span>
          </div>
          <div className="stock-signal">
            <div className={`signal ${stock.signal?.toLowerCase() || 'hold'}`}>
              {stock.signal || 'HOLD'}
            </div>
          </div>
        </div>

        <div className="rationale-content">
          <div className="score-display">
            <div className="score-label">TIRA Score</div>
            <div className="score-value">{stock.score ?? 'N/A'}<span className="score-total">/100</span></div>
          </div>
          
          <div className="rationale-text-container">
            <h4>Investment Rationale</h4>
            <div className="rationale-text">
                {loading && <p>Loading rationale...</p>}
                {error && <p className="message error">{error}</p>}
                {rationale && <p>{rationale}</p>}
            </div>
          </div>

          <div className="rationale-history-chart">
            <h4>Historical Score</h4>
            {historyLoading && <p>Loading history...</p>}
            {historyError && <p className="message error">{historyError}</p>}
            {!historyLoading && !historyError && (
              <StockHistoryChart history={history} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RationaleModal;