"use client";

import { useEffect } from "react";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { fetchCart } from "@/features/cart/cartSlice";

/**
 * Custom hood to fetch the current user on application initialization
 * Can be imported and used across the application
 */

export function useCartEffect() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);
}
