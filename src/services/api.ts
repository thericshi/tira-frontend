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
  AuthResponse
} from '../types';

// API Configuration
const API_BASE_URL = 'http://localhost:8000/api';

// API Helper function
export const apiCall = async <T = any>(endpoint: string, options: ApiOptions = {}): Promise<T> => {
    const authToken = localStorage.getItem('authToken');
    
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(authToken && { 'Authorization': `Bearer ${authToken}` }),
                ...options.headers
            }
        });

        if (response.status === 401) {
            // Token expired, redirect to login
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

// Authentication API
export const authAPI = {
    login: async (credentials: LoginCredentials): Promise<Response> => {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        });
        return response;
    },

    signup: async (userData: SignupData): Promise<Response> => {
        const response = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });
        return response;
    },

    getUserSettings: async (): Promise<Response> => {
        const authToken = localStorage.getItem('authToken');
        const response = await fetch(`${API_BASE_URL}/user/settings`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        });
        return response;
    },

    updateUserSettings: async (settings: UserSettings): Promise<Response> => {
        const authToken = localStorage.getItem('authToken');
        const response = await fetch(`${API_BASE_URL}/user/settings`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(settings)
        });
        return response;
    },

    sendTestNotification: async (): Promise<Response> => {
        const authToken = localStorage.getItem('authToken');
        const response = await fetch(`${API_BASE_URL}/notifications/test`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        });
        return response;
    }
};

// User API
export const userAPI = {
    getProfile: (): Promise<User> => apiCall<User>('/user/profile'),
    deleteAccount: (): Promise<{message: string, success: boolean}> => 
        apiCall('/user/delete', {
            method: 'DELETE'
        }),
};

// Market API
export const marketAPI = {
    getOverview: (): Promise<MarketData> => apiCall<MarketData>('/market/overview'),
};

// Stocks API
export const stocksAPI = {
    getWatchlist: (): Promise<WatchlistResponse> => apiCall<WatchlistResponse>('/stocks/watchlist'),
    getTopMovers: (): Promise<TopMoversResponse> => apiCall<TopMoversResponse>('/stocks/top-movers'),
    getAllStocks: (): Promise<WatchlistResponse> => apiCall<WatchlistResponse>('/stocks/all'),
    searchStocks: (query: string): Promise<WatchlistResponse> => apiCall<WatchlistResponse>(`/stocks/search?q=${encodeURIComponent(query)}`),
    addToWatchlist: (symbol: string): Promise<{message: string, success: boolean}> => 
        apiCall('/stocks/watchlist/add', {
            method: 'POST',
            body: JSON.stringify({ symbol })
        }),
    removeFromWatchlist: (symbol: string): Promise<{message: string, success: boolean}> => 
        apiCall('/stocks/watchlist/remove', {
            method: 'DELETE',
            body: JSON.stringify({ symbol })
        }),
    updateWatchlistOrder: (symbols: string[]): Promise<{message: string, success: boolean}> => 
        apiCall('/stocks/watchlist/reorder', {
            method: 'PUT',
            body: JSON.stringify({ symbols })
        })
};

// News API
export const newsAPI = {
    getMarketNews: (): Promise<NewsResponse> => apiCall<NewsResponse>('/news/market'),
};

// Admin API
export const adminAPI = {
    getUsers: (): Promise<User[]> => apiCall<User[]>('/admin/users'),
};
