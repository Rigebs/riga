export interface UserResponse {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  roles: string[];
}

export interface UpdateUserRequest {
  address?: string;
  phone?: string;
}
