import { apiClient } from './client';
import type { ApiResponse, AuthSuccessData, LoginPayload, SignUpPayload } from '../types/auth';

/**
 * Service to handle all Authentication HTTP requests to the .NET backend.
 */
export const authService = {
  /**
   * Send user registration details to the backend
   * Endpoint: POST /api/auth/register
   */
  async signup(payload: SignUpPayload): Promise<ApiResponse<AuthSuccessData>> {
    const response = await apiClient.post<ApiResponse<AuthSuccessData>>('/Authentication/signup', payload);
    return response.data;
  },

  /**
   * Send login credentials to the backend
   * Endpoint: POST /api/auth/login
   */
  async login(payload: LoginPayload): Promise<ApiResponse<AuthSuccessData>> {
    const response = await apiClient.post<ApiResponse<AuthSuccessData>>('/Authentication/Login', payload);
    return response.data;
  },
};
