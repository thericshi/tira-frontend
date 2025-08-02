import React, { useState, useEffect, ChangeEvent } from 'react';
import Header from '../components/common/Header.jsx';
import Footer from '../components/common/Footer.jsx';
import { authAPI } from '../services/api';
import { UserSettings, EmailNotifications } from '../types';
import './Dashboard.css';

type MessageType = 'success' | 'error' | '';

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<UserSettings>({
    emailNotifications: {
      buySignals: true,
      sellSignals: true,
      holdSignals: false,
      dailyDigest: true,
      weeklyReport: false,
      priceAlerts: true
    },
    notificationFrequency: 'immediate',
    priceAlertThreshold: 5,
    watchlistNotifications: true,
    marketHoursOnly: true
  });
  
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<MessageType>('');

  useEffect(() => {
    loadUserSettings();
  }, []);

  const loadUserSettings = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await authAPI.getUserSettings();
      const data = await response.json();
      
      if (response.ok) {
        setSettings(data.settings || settings);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationToggle = (type: keyof EmailNotifications): void => {
    setSettings((prev: UserSettings) => ({
      ...prev,
      emailNotifications: {
        ...prev.emailNotifications,
        [type]: !prev.emailNotifications[type]
      }
    }));
  };

  const handleSettingChange = <K extends keyof UserSettings>(
    key: K, 
    value: UserSettings[K]
  ): void => {
    setSettings((prev: UserSettings) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = async (): Promise<void> => {
    try {
      setLoading(true);
      setMessage('');
      
      console.log('Saving settings')
      const response = await authAPI.updateUserSettings(settings);
      const data = await response.json();
      
      if (response.ok) {
        setMessage('Settings saved successfully!');
        setMessageType('success');
      } else {
        setMessage(data.message || 'Failed to save settings');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      setMessage('Connection error. Please try again.');
      setMessageType('error');
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleTestNotification = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await authAPI.sendTestNotification();
      const data = await response.json();
      
      if (response.ok) {
        setMessage('Test notification sent! Check your email.');
        setMessageType('success');
      } else {
        setMessage(data.message || 'Failed to send test notification');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error sending test notification:', error);
      setMessage('Connection error. Please try again.');
      setMessageType('error');
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleFrequencyChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    handleSettingChange('notificationFrequency', e.target.value as UserSettings['notificationFrequency']);
  };

  const handleThresholdChange = (e: ChangeEvent<HTMLInputElement>): void => {
    handleSettingChange('priceAlertThreshold', parseInt(e.target.value));
  };

  const handleWatchlistChange = (e: ChangeEvent<HTMLInputElement>): void => {
    handleSettingChange('watchlistNotifications', e.target.checked);
  };

  const handleMarketHoursChange = (e: ChangeEvent<HTMLInputElement>): void => {
    handleSettingChange('marketHoursOnly', e.target.checked);
  };

  return (
    <div className="settings-page">
      <Header />
      
      <main className="page-content">
        <div className="container">
          <div className="dashboard-header">
            <h1>Notification Settings</h1>
            <p>Configure your email notifications for trading signals and market updates</p>
          </div>

          {message && (
            <div className={`message ${messageType}`}>
              {message}
            </div>
          )}

          <div className="settings-container">
            <div className="settings-section">
              <h2>📧 Email Notifications</h2>
              <p className="section-description">
                Get notified when important trading signals are generated for your watchlist stocks
              </p>
              
              <div className="notification-grid">
                <div className="notification-item">
                  <div className="notification-info">
                    <h3>🟢 Buy Signals</h3>
                    <p>Receive alerts when stocks show strong buy indicators</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications.buySignals}
                      onChange={() => handleNotificationToggle('buySignals')}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="notification-item">
                  <div className="notification-info">
                    <h3>🔴 Sell Signals</h3>
                    <p>Get alerts when stocks show strong sell indicators</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications.sellSignals}
                      onChange={() => handleNotificationToggle('sellSignals')}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="notification-item">
                  <div className="notification-info">
                    <h3>🟡 Hold Signals</h3>
                    <p>Receive notifications for hold recommendations</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications.holdSignals}
                      onChange={() => handleNotificationToggle('holdSignals')}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="notification-item">
                  <div className="notification-info">
                    <h3>📊 Price Alerts</h3>
                    <p>Get notified of significant price movements</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications.priceAlerts}
                      onChange={() => handleNotificationToggle('priceAlerts')}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="notification-item">
                  <div className="notification-info">
                    <h3>📈 Daily Digest</h3>
                    <p>Daily summary of market activity and your portfolio</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications.dailyDigest}
                      onChange={() => handleNotificationToggle('dailyDigest')}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="notification-item">
                  <div className="notification-info">
                    <h3>📋 Weekly Report</h3>
                    <p>Comprehensive weekly market analysis and performance report</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications.weeklyReport}
                      onChange={() => handleNotificationToggle('weeklyReport')}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>

            <div className="settings-section">
              <h2>⚙️ Notification Preferences</h2>
              
              <div className="preference-item">
                <label>
                  <strong>Notification Frequency</strong>
                  <select
                    value={settings.notificationFrequency}
                    onChange={handleFrequencyChange}
                    className="form-select"
                  >
                    <option value="immediate">Immediate</option>
                    <option value="hourly">Hourly Digest</option>
                    <option value="daily">Daily Digest</option>
                  </select>
                </label>
              </div>

              <div className="preference-item">
                <label>
                  <strong>Price Alert Threshold (%)</strong>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={settings.priceAlertThreshold}
                    onChange={handleThresholdChange}
                    className="form-input"
                  />
                  <small>Minimum percentage change to trigger price alerts</small>
                </label>
              </div>

              <div className="preference-item">
                <div className="checkbox-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.watchlistNotifications}
                      onChange={handleWatchlistChange}
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
                      checked={settings.marketHoursOnly}
                      onChange={handleMarketHoursChange}
                    />
                    <strong>Market Hours Only</strong>
                  </label>
                  <p>Only send notifications during market hours (9:30 AM - 4:00 PM ET)</p>
                </div>
              </div>
            </div>

            <div className="settings-actions">
              <button
                onClick={handleTestNotification}
                className="btn btn-secondary"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Test Email'}
              </button>
              
              <button
                onClick={handleSaveSettings}
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Settings'}
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SettingsPage;
