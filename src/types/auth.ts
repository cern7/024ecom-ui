export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  role: "customer" | "admin" | "super_admin";
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ChangePasswordRequest {
  user: {
    current_password: string;
    password: string;
    password_confirmation: string;
  };
}

export interface SignUpData {
  user: {
    email: string;
    password: string;
    passwordConfirmation: string;
    firstName: string;
    lastName: string;
  };
}

export interface SignInData {
  user: {
    email: string;
    password: string;
  };
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}


