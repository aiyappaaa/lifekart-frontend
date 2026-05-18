export type UserRole = 'customer' | 'manufacturer' | 'corporate_admin' | 'superadmin';

export interface User {
  id: string;
  email: string;
  phone: string | null;
  full_name: string;
  role: UserRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  full_name: string;
  phone?: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: 'bearer';
  user: User;
}