import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CartItem } from "@types";
import axios from "axios";

export const useCart = () => {
  const queryClient = useQueryClient();

  const addToCart = useMutation({
    mutationFn: async (product: Product) => {
      const response = await axios.post("/api/v1/cart_items", {
        product_id: product.id,
        quantity: 1, // could extend this to allow users to choose the quantity (e.g., from a product page form
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  return { addToCart };
};
