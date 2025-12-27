# TIRA Frontend

React frontend for the TIRA (Trading Intelligent Research Assistant) platform.

## Routing System

| Route | Component | Access | Description |
|-------|-----------|--------|-------------|
| `/` | HomePage | Public | Landing page with hero, features, etc. |
| `/about` | AboutPage | Public | Company information and team |
| `/contact` | ContactPage | Public | Contact form and information |
| `/login` | LoginPage | Public* | User authentication |
| `/signup` | SignupPage | Public* | User registration |
| `/dashboard` | DashboardPage | Protected | User dashboard with trading data |

*Public routes redirect to dashboard if user is already authenticated

## Authentication Flow

1. **Unauthenticated Users**: Can access public pages (/, /about, /contact, /login, /signup)
2. **Login Process**: Successful login stores JWT token and redirects to dashboard
3. **Protected Access**: Dashboard requires valid authentication token
4. **Auto-Redirect**: Authenticated users accessing login/signup are redirected to dashboard
5. **Token Expiry**: Expired tokens automatically redirect to login page

## Development Setup

### **Prerequisites (Local Dev)**
- Node.js 16+ and npm
- Backend API running on localhost:8000

### **Installation**
```bash
cd tira-frontend
npm install
```

### **Development**
```bash
npm start
```

### **Build for Production**
```bash
npm run build
```

### **Testing**
```bash
npm test
```

## API Integration

### **API Endpoints**
- **Auth**: `/api/auth/login`, `/api/auth/signup`
- **User**: `/api/user/profile`
- **Market**: `/api/market/overview`
- **Stocks**: `/api/stocks/watchlist`, `/api/stocks/top-movers`
- **News**: `/api/news/market`

## Troubleshooting

### **Common Issues**

**Build Errors**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Routing Issues**
- Ensure React Router is properly configured
- Check for missing route components
- Verify authentication logic

**API Connection**
- Confirm backend is running on localhost:8000
- Check CORS configuration

## Contributing

### **Code Style**
- Use functional components with hooks
- Follow React best practices
- Maintain consistent naming conventions
- Add comments for complex logic

### **File Organization**
- Components in `src/components/`
- Pages in `src/pages/`
- Utilities in `src/utils/`
- Styles co-located with components
