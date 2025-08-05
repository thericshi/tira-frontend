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

// Stock Types
export interface Stock {
  symbol: string;
  name: string;
  price: string; // Backend sends as string like "$175.43"
  change: string; // Backend sends as string like "+2.1%"
  positive: boolean; // Backend sends positive flag
  signal?: 'BUY' | 'SELL' | 'HOLD';
  score?: number; // Confidence score 0-100
  sector?: string; // Stock sector
  marketCap?: string; // Market cap category
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
  summary: string;
  source: string;
  publishedAt: string;
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
