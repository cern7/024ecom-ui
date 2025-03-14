import { SignInData, SignUpData, User } from "@/types/auth";
import { useRouter } from "next/router";
import React, { createContext, useState } from "react";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: SignInData) => Promise<void>;
  register: (data: SignUpData) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType> | (undefined > undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
};
