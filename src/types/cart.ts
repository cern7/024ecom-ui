import { Product } from "./product";

export interface CartItemAttributes {
  quantity: number;
  total: number;
  created_at: string;
  updated_at: string;
}

export interface CartItemRelationships {
  product: {
    data: {
      id: string;
      type: "product";
    };
  };
}

export interface CartItemResource {
  id: string;
  type: "cart_item";
  attributes: CartItemAttributes;
  relationships: CartItemRelationships;
}

export interface CartAttributes {
  total_items: number;
  total_amount: number;
  created_at: string;
  updated_at: string;
}

export interface CartRelationShips {
  cart_items: {
    data: Array<{ id: string; type: "cart_item" }>;
  };
}

export interface CartResource {
  id: string;
  type: "cart";
  attributes: CartAttributes;
  relationships: CartRelationShips;
}

export interface CartResponse {
  data: CartResource;
  included: Array<CartItemResource | Product>;
}

export interface AddToCartRequest {
  product_id: number;
  quantity: number;
}
export interface UpdateCartItemRequest {
  id: number;
  quantity: number;
}

export interface RemoveCartItemRequest {
  id: number;
}
