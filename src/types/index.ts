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

export interface CartItem {
    id: number;
    productId: number;
    product: Product;
    quantity: number;
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