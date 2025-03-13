import apiClient from "./client.";
import { CartItem, Cart } from "@/types/product";
// TODO
// implement all these api in backend
export const cartApi = {
  getCart: async () => {
    const response = await apiClient.get("/cart");
    return response.data;
  },

  addToCart: async (productId: number, quantity: number = 1) => {
    const response = await apiClient.post("/cart/items", {
      product_id: productId,
      quantity,
    });
    return response.data;
  },

  updateCartItem: async (itemId: number, quantity: number) => {
    const response = await apiClient.put(`/cart/items/${itemId}`, { quantity });
    return response.data;
  },

  removeCartItem: async (itemId: number) => {
    const response = await apiClient.delete(`/cart/items/${itemId}`);
    return response.data;
  },

  clearCart: async () => {
    const response = await apiClient.delete("/cart");
    return response.data;
  },
};
