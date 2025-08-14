// API Configuration
export const API_CONFIG = {
  // Update this to match your backend URL
  BASE_URL: 'http://localhost:5000/api',
  
  // Default headers
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
  },
  
  // Timeout settings
  TIMEOUT: 10000, // 10 seconds
}

// You can add more configuration options here as needed
export const APP_CONFIG = {
  // Default user ID (replace with actual user authentication)
  DEFAULT_USER_ID: '64f1a2b3c4d5e6f7g8h9i0j1',
  
  // Currency settings
  CURRENCY: 'Rs',
  CURRENCY_SYMBOL: '/=',
  
  // Date format
  DATE_FORMAT: 'YYYY-MM-DD',
  TIME_FORMAT: 'HH:mm',
}
