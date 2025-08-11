// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  company?: string;
  tradingExperience: string;
}

// Market Types
export interface MarketIndex {
  name: string;
  value: string;
  change: number;
  changePercent: string;
}

export interface MarketData {
  indices: MarketIndex[];
}

export interface MarketAnalysis {
  last_updated_utc: string;
  score: number;
  analysis: string;
  sources: [string, string][]; // A list of [title, url] tuples
}

// Stock Types
export interface Stock {
  symbol: string;
  name: string;
  price: string;
  change: string;
  positive: boolean;
  signal?: 'BUY' | 'SELL' | 'HOLD';
  score?: number;
  sector?: string;
  marketCap?: string;
}

export interface WatchlistResponse {
  stocks: Stock[];
}

export interface TopMoversResponse {
  stocks: Stock[];
}

// News Types
export interface NewsArticle {
  title: string;
  source: string;
  time: string;
  url?: string;
}

export interface NewsResponse {
  articles: NewsArticle[];
}

// Settings Types
export interface EmailNotifications {
  buySignals: boolean;
  sellSignals: boolean;
  holdSignals: boolean;
  dailyDigest: boolean;
  weeklyReport: boolean;
  priceAlerts: boolean;
}

export interface UserSettings {
  emailNotifications: EmailNotifications;
  notificationFrequency: 'immediate' | 'hourly' | 'daily';
  priceAlertThreshold: number;
  watchlistNotifications: boolean;
  marketHoursOnly: boolean;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Component Props Types
export interface ProtectedRouteProps {
  children: React.ReactNode;
}

export interface PublicRouteProps {
  children: React.ReactNode;
}

// Form Types
export interface FormErrors {
  [key: string]: string;
}

// API Options
export interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: string;
}