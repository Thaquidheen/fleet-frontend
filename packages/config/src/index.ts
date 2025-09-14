export const API_CONFIG = {
  development: 'http://localhost:8080',
  staging: 'https://api-staging.yourcompany.com',
  production: 'https://api.yourcompany.com',
};

export const APP_CONFIG = {
  name: 'AVL Fleet Management',
  version: '1.0.0',
  description: 'Complete fleet management solution',
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/auth/login',
  DASHBOARD: '/dashboard',
  COMPANIES: '/companies',
  USERS: '/users',
  VEHICLES: '/fleet/vehicles',
  ANALYTICS: '/analytics',
};

export default {
  API_CONFIG,
  APP_CONFIG,
  ROUTES,
};
