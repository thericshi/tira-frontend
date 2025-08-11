import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { authAPI } from '../services/api';
import { setAuthData } from '../utils/auth';
import { LoginCredentials } from '../types';
import './AuthPages.css';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginCredentials>({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Pre-fill email if coming from signup
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setFormData(prev => ({ ...prev, email: emailParam }));
    }
  }, [searchParams]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await authAPI.login(formData);
      const data = await response.json();

      if (response.ok) {
        setAuthData(data.access_token, formData.email);
        setSuccess('Login successful! Redirecting...');
        
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    alert('Password reset functionality will be implemented soon.');
  };

  return (
    <div className="auth-page">
      <Link to="/" className="back-to-home">
        ← Back to Home
      </Link>

      <div className="auth-container">
        <div className="auth-header">
          <h1>TIRA</h1>
          <p>Trading Intelligent Research Assistant</p>
        </div>

        <div className="auth-form">
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading && <span className="loading-spinner"></span>}
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="forgot-password">
            <a href="#" onClick={handleForgotPassword}>
              Forgot your password?
            </a>
          </div>

          <div className="divider">
            <span>or</span>
          </div>

          <div className="auth-link">
            Don't have an account? <Link to="/signup">Sign up for free</Link>
          </div>

          {/* Demo credentials hint */}
          <div className="demo-hint">
            <strong>Demo Credentials:</strong><br />
            Email: demo@tira.ai<br />
            Password: demo123
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
