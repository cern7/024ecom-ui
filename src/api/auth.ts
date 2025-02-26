import apiClient from "./client.";
import { SignUpData, SignInData, User } from "@/types/auth";

export const authApi = {
  login: async (credentials: SignInData) => {
    const response = await apiClient.post("/auth/sing_in", credentials);
    localStorage.setItem("auth_token", response.data.token);
    return response.data.user;
  },

  register: async (userData: SignUpData) => {
    const response = await apiClient.post("/auth/sing_up", userData);
    // TODO
    // add email confirmation, remove token from this step
    localStorage.setItem("auth_token", response.data.token);
    return response.data.user;
  },

  logout: async () => {
    // TODO
    // implement this controller API
    await apiClient.post("/auth/logout");
    localStorage.removeItem("auth_token");
  },

  getCurrentUser: async () => {
    // TODO
    // implement this controller API
    const response = await apiClient.get("/auth/me");
    return response.data;
  },
};
