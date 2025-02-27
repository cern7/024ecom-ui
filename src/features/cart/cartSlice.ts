import { cartApi } from "@/api/cart";
import { Cart } from "@/types";
import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { clear } from "console";
import exp from "constants";

interface CartState extends Cart {
  isLoading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  subtotal: 0,
  shipping: 0,
  tax: 0,
  total: 0,
  isLoading: false,
  error: null,
};

export const fetchCart = createAsyncThunk(
  "/cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      return await cartApi.getCart();
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch cart"
      );
    }
  }
);

export const addItemToCart = createAsyncThunk(
  "cart/addItem",
  async (
    { productId, quantity }: { productId: number; quantity: number },
    { rejectWithValue }
  ) => {
    try {
      return await cartApi.addToCart(productId, quantity);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add item to cart"
      );
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateItem",
  async (
    { itemId, quantity }: { itemId: number; quantity: number },
    { rejectWithValue }
  ) => {
    try {
      return await cartApi.updateCartItem(itemId, quantity);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update cart item"
      );
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeItem",
  async (itemId: number, { rejectWithValue }) => {
    try {
      return await cartApi.removeCartItem(itemId);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove cart item"
      );
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      return await cartApi.clearCart();
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to clear cart"
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCartError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch cart
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        return {
          ...state,
          ...action.payload,
          isLoading: false,
        };
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Add item to cart
      .addCase(addItemToCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        return {
          ...state,
          ...action.payload,
          isLoading: false,
        };
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update cart item
      .addCase(updateCartItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        return {
          ...state,
          ...action.payload,
          isLoading: false,
        };
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Remove cart item
      .addCase(removeCartItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        return {
          ...state,
          ...action.payload,
          isLoading: false,
        };
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Clear cart
      .addCase(clearCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        return {
          ...initialState,
          isLoading: false,
        };
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCartError } = cartSlice.actions;
export default cartSlice.reducer;
