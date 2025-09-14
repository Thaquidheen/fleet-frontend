import { BaseApiClient } from '../client/base-client';
import { ApiResponse, User, LoginRequest, LoginResponse, UserRole, UserStatus, PaginatedResponse } from '@avl/shared-types';

export class UserService extends BaseApiClient {
  constructor(config: any) {
    super({ ...config, baseURL: `${config.baseURL}/users` });
  }

  // Authentication
  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    return this.post<LoginResponse>('/auth/login', credentials);
  }

  async logout(): Promise<ApiResponse<void>> {
    const response = await this.post<void>('/auth/logout');
    this.clearTokens();
    return response;
  }

  async refreshToken(): Promise<ApiResponse<LoginResponse>> {
    return this.post<LoginResponse>('/auth/refresh');
  }

  // User CRUD
  async getUsers(params?: {
    page?: number;
    limit?: number;
    search?: string;
    role?: UserRole;
    status?: UserStatus;
    companyId?: string;
  }): Promise<ApiResponse<PaginatedResponse<User>>> {
    return this.get<PaginatedResponse<User>>('/users', { params });
  }

  async getUserById(id: string): Promise<ApiResponse<User>> {
    return this.get<User>(`/users/${id}`);
  }

  async createUser(userData: Partial<User>): Promise<ApiResponse<User>> {
    return this.post<User>('/users', userData);
  }

  async updateUser(id: string, userData: Partial<User>): Promise<ApiResponse<User>> {
    return this.put<User>(`/users/${id}`, userData);
  }

  async deleteUser(id: string): Promise<ApiResponse<void>> {
    return this.delete<void>(`/users/${id}`);
  }

  // Profile management
  async getProfile(): Promise<ApiResponse<User>> {
    return this.get<User>('/profile');
  }

  async updateProfile(profileData: Partial<User>): Promise<ApiResponse<User>> {
    return this.put<User>('/profile', profileData);
  }

  async changePassword(data: { currentPassword: string; newPassword: string }): Promise<ApiResponse<void>> {
    return this.post<void>('/profile/change-password', data);
  }

  async uploadProfileImage(file: File): Promise<ApiResponse<{ url: string }>> {
    return this.uploadFile<{ url: string }>('/profile/image', file);
  }

  // Bulk operations
  async bulkCreateUsers(users: Partial<User>[]): Promise<ApiResponse<{ created: number; failed: number; errors?: string[] }>> {
    return this.post('/users/bulk', { users });
  }

  async bulkUpdateUsers(updates: { id: string; data: Partial<User> }[]): Promise<ApiResponse<{ updated: number; failed: number }>> {
    return this.put('/users/bulk', { updates });
  }

  async bulkDeleteUsers(userIds: string[]): Promise<ApiResponse<{ deleted: number; failed: number }>> {
    return this.delete('/users/bulk', { data: { userIds } });
  }
}
