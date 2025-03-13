export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

export interface SignUpData {
  email: string;
  password: string;
  passwordConfirmation: string;
  firstName: string;
  lastName: string;
}

export interface SignInData{
    email: string;
    password: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
