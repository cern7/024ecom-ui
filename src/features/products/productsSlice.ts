import { productApi } from "@/api/products";
import { Product, ProductFilter } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


interface ProductsState {
  products: Product[];
  currentProduct: Product | null;
  isLoading: boolean;
  error: string | null;
  filters: ProductFilter;
  totalCount: number;
  pageCount: number;
}

const initialState: ProductsState = {
  products: [],
  currentProduct: null,
  isLoading: false,
  error: null,
  filters: {
    page: 1,
    limit: 12,
  },
  totalCount: 0,
  pageCount: 0,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (filters: ProductFilter = {}, { rejectWithValue }) => {
    try {
      return await productApi.getProducts(filters);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id: number, { rejectWithValue }) => {
    try {
      return await productApi.getProduct(id);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch product"
      );
    }
  }
);

export const searchProducts = createAsyncThunk(
  "products/searchProducts",
  async (query: string, { rejectWithValue }) => {
    try {
      return await productApi.searchProducts(query);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to search products"
      );
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
        page: 1, // reset to first page when filters change
      };
    },
    clearProductError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products;
        state.totalCount = action.payload.totalCount;
        state.pageCount = action.payload.pageCount;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Search products
      .addCase(searchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products;
        state.totalCount = action.payload.totalCount;
        state.pageCount = action.payload.pageCount;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFilters, clearProductError } = productsSlice.actions;
export default productsSlice.reducer;
