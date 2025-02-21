import { create } from "zustand";
import { api } from "@/utils/api";
import { AxiosError } from "axios";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  signIn: (data: SignInData) => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  signOut: () => void;
  clearError: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  signIn: async (data) => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.post("/auth/sign_in", data);
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      set({ user, isLoading: false });
    } catch (error) {
      if (error instanceof AxiosError) {
        set({
          error: error.response?.data?.message || "An error occured",
          isLoading: false,
        });
      } else {
        set({
          error: "Unknown error occured",
          isLoading: false,
        });
      }
    }
  },

  signUp: async (data) => {
    try {
        set({ isLoading: true, error: null});
        const response = await api.post('/auth/sign_up', data);
        const {token, user} = response.data;
        /// no need for token, needs to redirect to login / email to confirm register
    } catch (error) {
        if (error instanceof AxiosError) {
            set({
              error: error.response?.data?.message || "An error occured",
              isLoading: false,
            });
          } else {
            set({
              error: "Unknown error occured",
              isLoading: false,
            });
          }
    }
  },

  signOut: () => {
    localStorage.removeItem('token');
    set({user: null});
  },
  
  clearError: () => set({ error: null }),
}));
