"use client";

import { useEffect } from "react";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { getCurrentUser } from "./features/auth/authSlice";

/**
 * Custom hood to fetch the current user on application initialization
 * Can be imported and used across the application
 */

export function useAuthEffect() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
}
