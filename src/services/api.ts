import {
  ApiOptions,
  LoginCredentials,
  SignupData,
  User,
  MarketData,
  WatchlistResponse,
  TopMoversResponse,
  NewsResponse,
  UserSettings,
  AuthResponse,
  MarketAnalysis,
  StockHistoryResponse
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiCall = async <T = any>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> => {
  const authToken = localStorage.getItem('authToken');

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(authToken && { Authorization: `Bearer ${authToken}` }),
        ...options.headers
      }
    });

    if (response.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userEmail');
      window.location.href = '/login';
      throw new Error('Unauthorized');
    }

    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

export const authAPI = {
  login: (credentials: LoginCredentials) =>
    fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    }),

  signup: (userData: SignupData) =>
    fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    }),

  getUserSettings: () => {
    const authToken = localStorage.getItem('authToken');
    return fetch(`${API_BASE_URL}/user/settings`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      }
    });
  },

  updateUserSettings: (settings: UserSettings) => {
    const authToken = localStorage.getItem('authToken');
    return fetch(`${API_BASE_URL}/user/settings`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify(settings)
    });
  },

  sendTestNotification: () => {
    const authToken = localStorage.getItem('authToken');
    return fetch(`${API_BASE_URL}/notifications/test`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      }
    });
  }
};

export const userAPI = {
  getProfile: (): Promise<User> => apiCall<User>('/user/profile'),
  deleteAccount: (): Promise<{ message: string; success: boolean }> =>
    apiCall('/user/delete', { method: 'DELETE' })
};

export const marketAPI = {
  getMarketAnalysis: (): Promise<MarketAnalysis> =>
    apiCall<MarketAnalysis>('/market/analysis'),
  getMarketHistory: (): Promise<MarketAnalysis[]> =>
    apiCall<MarketAnalysis[]>('/market/history'),
};

export const stocksAPI = {
  getWatchlist: (): Promise<WatchlistResponse> =>
    apiCall<WatchlistResponse>('/stocks/watchlist'),
  getTopMovers: (): Promise<TopMoversResponse> =>
    apiCall<TopMoversResponse>('/stocks/top-movers'),
  getAllStocks: (): Promise<WatchlistResponse> =>
    apiCall<WatchlistResponse>('/stocks/all'),
  searchStocks: (query: string): Promise<WatchlistResponse> =>
    apiCall<WatchlistResponse>(`/stocks/search?q=${encodeURIComponent(query)}`),
  addToWatchlist: (symbol: string) =>
    apiCall('/stocks/watchlist/add', {
      method: 'POST',
      body: JSON.stringify({ symbol })
    }),
  removeFromWatchlist: (symbol: string) =>
    apiCall('/stocks/watchlist/remove', {
      method: 'DELETE',
      body: JSON.stringify({ symbol })
    }),
  updateWatchlistOrder: (symbols: string[]) =>
    apiCall('/stocks/watchlist/reorder', {
      method: 'PUT',
      body: JSON.stringify({ symbols })
    }),
  getStockRationale: (symbol: string) =>
    apiCall(`/stocks/${symbol}/rationale`),
  getStockHistory: (symbol: string): Promise<StockHistoryResponse> =>
    apiCall<StockHistoryResponse>(`/stocks/${symbol}/history`),
};

export const newsAPI = {
  getMarketNews: (): Promise<NewsResponse> =>
    apiCall<NewsResponse>('/news/market')
};

export const adminAPI = {
  getUsers: (): Promise<User[]> => apiCall<User[]>('/admin/users')
};