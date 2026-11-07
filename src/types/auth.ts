export interface User {
  id: string;
  fullName: string;
  email: string;
  accessToken: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  errorMessage?: string;
  message?: string;
  data?: T;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignUpPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthSuccessData {
  id?: string;
  userId?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  accessToken?: string;
  token?: string;
}
