import React from 'react';

interface SettingsTabProps {
  theme: string;
  handleThemeChange: (newTheme: string) => void;
  handleDeleteAccount: () => void;
  isDemoAccount: boolean;
}

const SettingsTab: React.FC<SettingsTabProps> = ({
  theme,
  handleThemeChange,
  handleDeleteAccount,
  isDemoAccount,
}) => {
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
            style={{ background: '#000000', color: 'white', border: '2px solid #000000' }}
          >
            Save Settings
          </button>
          <button
            className="btn btn-secondary"
            style={{ background: '#000000', color: 'white', border: '2px solid #000000' }}
          >
            Export Data
          </button>
          <button
            className="btn"
            style={{ background: '#dc2626', color: 'white', border: '2px solid #dc2626' }}
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
};

export default SettingsTab;