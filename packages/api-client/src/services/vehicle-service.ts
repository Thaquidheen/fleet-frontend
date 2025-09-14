import {
  ApiResponse,
  PaginatedResponse,
  Vehicle,
  VehicleStatus,
  VehicleType,
} from '@fleet/shared-types';
import { BaseApiClient } from '../client/base-client';

export class VehicleService extends BaseApiClient {
  constructor(config: any) {
    super({ ...config, baseURL: `${config.baseURL}/vehicles` });
  }

  // Vehicle CRUD
  async getVehicles(params?: {
    page?: number;
    limit?: number;
    search?: string;
    type?: VehicleType;
    status?: VehicleStatus;
    companyId?: string;
  }): Promise<ApiResponse<PaginatedResponse<Vehicle>>> {
    return this.get<PaginatedResponse<Vehicle>>('/vehicles', { params });
  }

  async getVehicleById(id: string): Promise<ApiResponse<Vehicle>> {
    return this.get<Vehicle>(`/vehicles/${id}`);
  }

  async createVehicle(vehicleData: Partial<Vehicle>): Promise<ApiResponse<Vehicle>> {
    return this.post<Vehicle>('/vehicles', vehicleData);
  }

  async updateVehicle(id: string, vehicleData: Partial<Vehicle>): Promise<ApiResponse<Vehicle>> {
    return this.put<Vehicle>(`/vehicles/${id}`, vehicleData);
  }

  async deleteVehicle(id: string): Promise<ApiResponse<void>> {
    return this.delete<void>(`/vehicles/${id}`);
  }

  // Device assignment
  async assignDevice(vehicleId: string, deviceId: string): Promise<ApiResponse<Vehicle>> {
    return this.post<Vehicle>(`/vehicles/${vehicleId}/device`, { deviceId });
  }

  async unassignDevice(vehicleId: string): Promise<ApiResponse<Vehicle>> {
    return this.delete<Vehicle>(`/vehicles/${vehicleId}/device`);
  }

  // Driver assignment
  async assignDriver(vehicleId: string, driverId: string): Promise<ApiResponse<Vehicle>> {
    return this.post<Vehicle>(`/vehicles/${vehicleId}/driver`, { driverId });
  }

  async unassignDriver(vehicleId: string): Promise<ApiResponse<Vehicle>> {
    return this.delete<Vehicle>(`/vehicles/${vehicleId}/driver`);
  }

  // Document management
  async uploadDocument(vehicleId: string, file: File, type: string): Promise<ApiResponse<any>> {
    return this.uploadFile(`/vehicles/${vehicleId}/documents`, file, undefined, { type });
  }

  async getDocuments(vehicleId: string): Promise<ApiResponse<any[]>> {
    return this.get(`/vehicles/${vehicleId}/documents`);
  }

  async deleteDocument(vehicleId: string, documentId: string): Promise<ApiResponse<void>> {
    return this.delete(`/vehicles/${vehicleId}/documents/${documentId}`);
  }
}
