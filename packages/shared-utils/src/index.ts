export const formatDate = (date: Date | string, format: string = 'yyyy-MM-dd'): string => {
  const d = new Date(date);
  return d.toLocaleDateString();
};

// String utilities
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const truncate = (str: string, length: number): string => {
  return str.length > length ? str.substring(0, length) + '...' : str;
};

// Number utilities
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const formatDistance = (meters: number): string => {
  if (meters < 1000) {
    return `${meters}m`;
  }
  return `${(meters / 1000).toFixed(1)}km`;
};

// Validation utilities
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
};

// Constants
export const VEHICLE_TYPES = [
  'CAR',
  'TRUCK',
  'BUS',
  'MOTORCYCLE',
  'VAN'
] as const;

export const USER_ROLES = [
  'SUPER_ADMIN',
  'COMPANY_ADMIN',
  'FLEET_MANAGER',
  'DRIVER',
  'VIEWER'
] as const;

export default {
  formatDate,
  capitalize,
  truncate,
  formatCurrency,
  formatDistance,
  isValidEmail,
  isValidPhone,
  VEHICLE_TYPES,
  USER_ROLES,
};
