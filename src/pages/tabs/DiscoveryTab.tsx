import React from 'react';

const DiscoveryTab: React.FC = () => {
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
    </>
  );
};

export default DiscoveryTab;