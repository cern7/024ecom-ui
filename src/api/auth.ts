import apiClient, { removeAuthToken, setAuthToken } from "./client.";
import {
  SignUpData,
  SignInData,
  AuthResponse,
  ChangePasswordRequest,
  User,
} from "@/types/auth";

export const register = async (data: SignUpData): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>("/auth/sign_up", data);
  setAuthToken(response.data.token);
  return response.data;
};

export const login = async (data: SignInData): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>("/auth/sign_in", data);
  setAuthToken(response.data.token);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await apiClient.delete("auth/logout");
  removeAuthToken();
};

export const changePassword = async (
  data: ChangePasswordRequest
): Promise<{ message: string }> => {
  const response = await apiClient.put<{ message: string }>(
    "auht/change_password",
    data
  );
  return response.data;
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const response = await apiClient.get<{ user: User }>("/auth/me");
    return response.data.user;
  } catch (error) {
    return null;
  }
};
