import { ApiResponse, Company, CompanyStatus, PaginatedResponse } from '@fleet/shared-types';
import { BaseApiClient } from '../client/base-client';

export class CompanyService extends BaseApiClient {
  constructor(config: any) {
    super({ ...config, baseURL: `${config.baseURL}/companies` });
  }

  // Company CRUD
  async getCompanies(params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: CompanyStatus;
  }): Promise<ApiResponse<PaginatedResponse<Company>>> {
    return this.get<PaginatedResponse<Company>>('/companies', { params });
  }

  async getCompanyById(id: string): Promise<ApiResponse<Company>> {
    return this.get<Company>(`/companies/${id}`);
  }

  async createCompany(companyData: Partial<Company>): Promise<ApiResponse<Company>> {
    return this.post<Company>('/companies', companyData);
  }

  async updateCompany(id: string, companyData: Partial<Company>): Promise<ApiResponse<Company>> {
    return this.put<Company>(`/companies/${id}`, companyData);
  }

  async deleteCompany(id: string): Promise<ApiResponse<void>> {
    return this.delete<void>(`/companies/${id}`);
  }

  // Company settings
  async getCompanySettings(id: string): Promise<ApiResponse<any>> {
    return this.get(`/companies/${id}/settings`);
  }

  async updateCompanySettings(id: string, settings: any): Promise<ApiResponse<any>> {
    return this.put(`/companies/${id}/settings`, settings);
  }

  // Subscription management
  async updateSubscription(id: string, subscriptionData: any): Promise<ApiResponse<Company>> {
    return this.patch<Company>(`/companies/${id}/subscription`, subscriptionData);
  }

  // Logo upload
  async uploadLogo(id: string, file: File): Promise<ApiResponse<{ url: string }>> {
    return this.uploadFile<{ url: string }>(`/companies/${id}/logo`, file);
  }
}
