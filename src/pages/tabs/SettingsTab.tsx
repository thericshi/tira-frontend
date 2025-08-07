import React, { ChangeEvent } from 'react';
import { UserSettings, EmailNotifications } from '../../types';

interface SettingsTabProps {
  theme: string;
  handleThemeChange: (newTheme: string) => void;
  handleDeleteAccount: () => void;
  isDemoAccount: boolean;
  settings: UserSettings | null;
  handleSettingChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleNotificationToggle: (type: keyof EmailNotifications) => void;
  handleSaveSettings: () => void;
  loading: boolean;
  message: string;
  messageType: 'success' | 'error' | '';
}

const SettingsTab: React.FC<SettingsTabProps> = ({
  theme,
  handleThemeChange,
  handleDeleteAccount,
  isDemoAccount,
  settings,
  handleSettingChange,
  handleNotificationToggle,
  handleSaveSettings,
  loading,
  message,
  messageType,
}) => {
  if (!settings) {
    return (
      <div className="dashboard-section">
        <div className="loading-spinner"></div>
        <p>Loading settings...</p>
      </div>
    );
  }

  return (
    <>
      {message && (
        <div className={`settings-message ${messageType}`}>
          {message}
        </div>
      )}

      {/* Email Notifications Section */}
      <section className="dashboard-section">
        <h2>📧 Email Notifications</h2>
        <p className="section-description">
          Manage your notification preferences for trading signals and market updates.
        </p>
        <div className="notification-grid">
          {Object.keys(settings.emailNotifications).map((key) => {
            const typedKey = key as keyof EmailNotifications;
            const labels: Record<keyof EmailNotifications, { title: string; desc: string }> = {
              buySignals: { title: '🟢 Buy Signals', desc: 'Alerts when stocks show strong buy indicators' },
              sellSignals: { title: '🔴 Sell Signals', desc: 'Alerts when stocks show strong sell indicators' },
              holdSignals: { title: '🟡 Hold Signals', desc: 'Notifications for hold recommendations' },
              priceAlerts: { title: '📊 Price Alerts', desc: 'Notified of significant price movements' },
              dailyDigest: { title: '📈 Daily Digest', desc: 'Daily summary of market activity' },
              weeklyReport: { title: '📋 Weekly Report', desc: 'Weekly market analysis and performance report' },
            };
            return (
              <div className="notification-item" key={key}>
                <div className="notification-info">
                  <h3>{labels[typedKey].title}</h3>
                  <p>{labels[typedKey].desc}</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications[typedKey]}
                    onChange={() => handleNotificationToggle(typedKey)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            );
          })}
        </div>
      </section>

      {/* Notification Preferences Section */}
      <section className="dashboard-section">
        <h2>⚙️ Notification Preferences</h2>
        <div className="preference-item">
            <label htmlFor="notificationFrequency"><strong>Notification Frequency</strong></label>
            <select
                id="notificationFrequency"
                name="notificationFrequency"
                value={settings.notificationFrequency}
                onChange={handleSettingChange}
                className="form-select"
            >
                <option value="immediate">Immediate</option>
                <option value="hourly">Hourly Digest</option>
                <option value="daily">Daily Digest</option>
            </select>
        </div>
        <div className="preference-item">
            <label htmlFor="priceAlertThreshold"><strong>Price Alert Threshold (%)</strong></label>
            <input
                type="number"
                id="priceAlertThreshold"
                name="priceAlertThreshold"
                min="1"
                max="50"
                value={settings.priceAlertThreshold}
                onChange={handleSettingChange}
                className="form-input"
            />
            <small>Minimum percentage change to trigger price alerts</small>
        </div>
        <div className="preference-item">
            <div className="checkbox-item">
                <label>
                    <input
                        type="checkbox"
                        name="watchlistNotifications"
                        checked={settings.watchlistNotifications}
                        onChange={handleSettingChange}
                    />
                    <strong>Watchlist Only</strong>
                </label>
                <p>Only receive notifications for stocks in your watchlist</p>
            </div>
        </div>
        <div className="preference-item">
            <div className="checkbox-item">
                <label>
                    <input
                        type="checkbox"
                        name="marketHoursOnly"
                        checked={settings.marketHoursOnly}
                        onChange={handleSettingChange}
                    />
                    <strong>Market Hours Only</strong>
                </label>
                <p>Only send notifications during market hours (9:30 AM - 4:00 PM ET)</p>
            </div>
        </div>
      </section>

      {/* Display Preferences Section */}
      <section className="dashboard-section">
        <h2>🎨 Display Preferences</h2>
        <div className="preference-item">
          <label><strong>Theme</strong></label>
          <select
            className="form-select"
            value={theme}
            onChange={(e) => handleThemeChange(e.target.value)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto (System)</option>
          </select>
        </div>
      </section>

      {/* Account Actions Section */}
      <section className="dashboard-section">
        <h2>Account Management</h2>
        <p className="section-description">
          Manage your account settings and data.
        </p>
        <div className="settings-actions">
          <button
            className="btn btn-primary"
            onClick={handleSaveSettings}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Settings'}
          </button>
          <button
            className="btn btn-danger"
            onClick={handleDeleteAccount}
            disabled={isDemoAccount || loading}
            title={isDemoAccount ? 'Demo accounts cannot be deleted' : 'Permanently delete your account'}
          >
            {isDemoAccount ? 'Delete Account (Disabled)' : 'Delete Account'}
          </button>
        </div>
      </section>
    </>
  );
};

export default SettingsTab;