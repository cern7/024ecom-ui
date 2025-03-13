import { Product } from "./product";
import { AddressResource } from "./address";

export interface OrderAttributes {
  number: string;
  total_amount: number;
  status:
    | "pending"
    | "paid"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "refunded";
  tracking_number: string | null;
  carrier: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderRelationships {
  order_items: {
    data: Array<{
      id: string;
      type: "order_item";
    }>;
  };
  shipping_address: {
    data: {
      id: string;
      type: "address";
    };
  };
  billing_address: {
    data: {
      id: string;
      type: "address";
    };
  };
  payment: {
    data: {
      id: string;
      type: "payment";
    };
  };
}

export interface OrderResource {
  id: string;
  type: "order";
  attributes: OrderAttributes;
  relationships: OrderRelationships;
}

export interface OrderListResponse {
  data: OrderResource[];
  meta: {
    current_page: number;
    total_pages: number;
    total_count: number;
  };
}

export interface OrderItemAttributes {
  quantity: number;
  price: number;
  created_at: string;
  updated_at: string;
}

export interface OrderItemResource {
  id: string;
  type: "order_item";
  attributes: OrderItemAttributes;
  relationships: {
    order: {
      data: {
        id: string;
        type: "order";
      };
    };
    product: {
      data: {
        id: string;
        type: "product";
      };
    };
  };
}

export interface PaymentAttributes {
  amount: number;
  payment_method: "credit_card" | "payu" | "bank_transfer";
  status: "pending" | "completed" | "failed" | "refunded";
  transaction_id: string;
  refund_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface PaymentResource {
  id: string;
  type: "payment";
  attributes: PaymentAttributes;
}

export interface OrderDetailResponse {
  data: OrderResource;
  included: Array<
    OrderItemResource | AddressResource | PaymentResource | Product
  >;
}

export interface CreateOrderRequest {
  order: {
    shipping_address_attributes: {
      first_name: string;
      last_name: string;
      street: string;
      city: string;
      state: string;
      postal_code: string;
      country: string;
      phone: string;
    };
    billing_address_attributes: {
      first_name: string;
      last_name: string;
      street: string;
      city: string;
      state: string;
      postal_code: string;
      country: string;
      phone: string;
    };
  };
}

export interface UpdateOrderRequest {
  order: {
    status:
      | "pending"
      | "paid"
      | "processing"
      | "shipped"
      | "delivered"
      | "cancelled"
      | "refunded";
  };
}
