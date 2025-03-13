import { LargeNumberLike } from "crypto";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilter{
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: 'name_asc'|'name_desc'| 'price_asc' |'price_desc'| 'newest';
    page?: number;
    limit?: number;
}

export interface CartItem {
  id: number;
  productId: number;
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}
export interface Review {
  id: number;
  productId: number;
  userId: number;
  rating: number;
  comment: string;
  userName: string;
  createdAt: string;
}
