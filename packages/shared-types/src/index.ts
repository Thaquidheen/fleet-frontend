// packages/shared-types/src/index.ts
// export * from './api';
// export * from './user';
// export * from './company';
// export * from './vehicle';
// export * from './device';
// export * from './location';
// export * from './alert';
// export * from './analytics';
// export * from './maintenance';
// export * from './common';

// Common API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

export interface PaginatedResponse<T = any> {
  items: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// User Service Types (Port 8082)
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: UserRole;
  status: UserStatus;
  companyId: string;
  profileImage?: string;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  COMPANY_ADMIN = 'COMPANY_ADMIN',
  FLEET_MANAGER = 'FLEET_MANAGER',
  DRIVER = 'DRIVER',
  VIEWER = 'VIEWER'
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  LOCKED = 'LOCKED',
  SUSPENDED = 'SUSPENDED'
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

// Company Service Types (Port 8083)
export interface Company {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: Address;
  website?: string;
  logo?: string;
  status: CompanyStatus;
  subscription: Subscription;
  settings: CompanySettings;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export enum CompanyStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  TRIAL = 'TRIAL'
}

export interface Subscription {
  planId: string;
  planName: string;
  maxUsers: number;
  maxVehicles: number;
  startDate: string;
  endDate: string;
  autoRenew: boolean;
}

export interface CompanySettings {
  timeZone: string;
  currency: string;
  dateFormat: string;
  theme: string;
  notifications: NotificationSettings;
  whiteLabel?: WhiteLabelSettings;
}

export interface WhiteLabelSettings {
  primaryColor: string;
  secondaryColor: string;
  logo: string;
  favicon: string;
  companyName: string;
}

// Vehicle Service Types (Port 8084)
export interface Vehicle {
  id: string;
  registrationNumber: string;
  make: string;
  model: string;
  year: number;
  vin?: string;
  type: VehicleType;
  status: VehicleStatus;
  companyId: string;
  deviceId?: string;
  driverId?: string;
  fuelType: FuelType;
  capacity?: number;
  mileage?: number;
  lastServiceDate?: string;
  nextServiceDate?: string;
  insurance: InsuranceInfo;
  documents: VehicleDocument[];
  createdAt: string;
  updatedAt: string;
}

export enum VehicleType {
  CAR = 'CAR',
  TRUCK = 'TRUCK',
  BUS = 'BUS',
  MOTORCYCLE = 'MOTORCYCLE',
  VAN = 'VAN'
}

export enum VehicleStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  MAINTENANCE = 'MAINTENANCE',
  OUT_OF_SERVICE = 'OUT_OF_SERVICE'
}

export enum FuelType {
  PETROL = 'PETROL',
  DIESEL = 'DIESEL',
  ELECTRIC = 'ELECTRIC',
  HYBRID = 'HYBRID',
  CNG = 'CNG'
}

export interface InsuranceInfo {
  provider: string;
  policyNumber: string;
  expiryDate: string;
  coverageAmount: number;
}

export interface VehicleDocument {
  id: string;
  type: string;
  name: string;
  url: string;
  expiryDate?: string;
  uploadedAt: string;
}

// Device Service Types (Port 8085)
export interface Device {
  id: string;
  imei: string;
  model: string;
  brand: string;
  firmwareVersion: string;
  status: DeviceStatus;
  lastHeartbeat?: string;
  batteryLevel?: number;
  signalStrength?: number;
  companyId: string;
  vehicleId?: string;
  configuration: DeviceConfiguration;
  createdAt: string;
  updatedAt: string;
}

export enum DeviceStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  SLEEPING = 'SLEEPING',
  ERROR = 'ERROR'
}

export interface DeviceConfiguration {
  reportingInterval: number;
  idleTimeout: number;
  speedLimit: number;
  geofenceEnabled: boolean;
  panicButtonEnabled: boolean;
}

// Location Service Types (Port 8086)
export interface Location {
  id: string;
  deviceId: string;
  vehicleId: string;
  latitude: number;
  longitude: number;
  altitude?: number;
  speed: number;
  heading: number;
  accuracy: number;
  timestamp: string;
  address?: string;
  isValid: boolean;
  satellites?: number;
  odometer?: number;
}

export interface Trip {
  id: string;
  vehicleId: string;
  driverId?: string;
  startTime: string;
  endTime?: string;
  startLocation: Location;
  endLocation?: Location;
  distance: number;
  duration: number;
  maxSpeed: number;
  averageSpeed: number;
  idleTime: number;
  fuelConsumed?: number;
  status: TripStatus;
}

export enum TripStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

// Alert Service Types (Port 8088)
export interface Alert {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  title: string;
  message: string;
  vehicleId: string;
  deviceId?: string;
  location?: Location;
  timestamp: string;
  status: AlertStatus;
  acknowledgedBy?: string;
  acknowledgedAt?: string;
  resolvedAt?: string;
  companyId: string;
}

export enum AlertType {
  SPEEDING = 'SPEEDING',
  GEOFENCE_VIOLATION = 'GEOFENCE_VIOLATION',
  PANIC_BUTTON = 'PANIC_BUTTON',
  ENGINE_ON = 'ENGINE_ON',
  ENGINE_OFF = 'ENGINE_OFF',
  DEVICE_OFFLINE = 'DEVICE_OFFLINE',
  LOW_BATTERY = 'LOW_BATTERY',
  HARSH_BRAKING = 'HARSH_BRAKING',
  HARSH_ACCELERATION = 'HARSH_ACCELERATION',
  MAINTENANCE_DUE = 'MAINTENANCE_DUE'
}

export enum AlertSeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export enum AlertStatus {
  ACTIVE = 'ACTIVE',
  ACKNOWLEDGED = 'ACKNOWLEDGED',
  RESOLVED = 'RESOLVED',
  IGNORED = 'IGNORED'
}

// Common Utility Types
export interface NotificationSettings {
  email: boolean;
  sms: boolean;
  push: boolean;
  alerts: string[];
}

export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface BoundingBox {
  northEast: Coordinates;
  southWest: Coordinates;
}

// Analytics Types
export interface DashboardStats {
  totalVehicles: number;
  activeVehicles: number;
  totalTrips: number;
  totalDistance: number;
  fuelConsumption: number;
  averageSpeed: number;
  alerts: {
    total: number;
    critical: number;
    unresolved: number;
  };
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string[];
    borderColor?: string[];
  }[];
}
