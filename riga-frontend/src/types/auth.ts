export interface UserRequest {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}
