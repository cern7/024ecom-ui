import apiClient from "./client.";
import { Product, ProductFilter } from "@/types/product";

export const productApi = {
  getProducts: async (filters?: ProductFilter) => {
    const response = await apiClient.get("/products", { params: filters });
    return response.data;
  },

  getProduct: async (id: number) => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  },

  searchProducts: async (query: string) => {
    const response = await apiClient.get("/products/search", {
      params: { q: query },
    });
    return response.data;
  },
};
