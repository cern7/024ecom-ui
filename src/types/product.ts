export interface ProductImage {
  id: number;
  url: string;
}

export interface ProductVideo {
  id: number;
  url: string;
}

export interface ProductAttributes {
  name: string;
  description: string;
  price: number;
  sale_price: number | null;
  sku: string;
  featured: boolean;
  images: ProductImage[];
  videos?: ProductVideo[];
  in_stock: boolean;
  friendly_slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryRelationship {
  id: string;
  type: "category";
}

export interface TagRelationship {
  id: string;
  type: "tag";
}

export interface ProductRelationships {
  categories: {
    data: CategoryRelationship[];
  };
  tags: {
    data: TagRelationship[];
  };
}

export interface Product {
  id: number;
  type: 'product';
  attributes: ProductAttributes;
  relationships: ProductRelationships;
}

export interface ProductListResponse {
  data: Product[];
  meta: {
    current_page: number;
    total_pages: number;
    total_count: number;
  };
}

export interface ProductDetailResponse {
  data: Product;
  include: Array<CategoryResource | TagResource>;
}

export interface CategoryAttributes {
  name: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CategoryResource {
  id: string;
  type: 'category';
  attributes: CategoryAttributes;
}

export interface TagAttributes {
  name: string;
  created_at: string;
  updated_at: string;
}


export interface TagResource {
  id: string;
  type: 'tag';
  attributes: TagAttributes;
}

export interface ProductFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: "name_asc" | "name_desc" | "price_asc" | "price_desc" | "newest";
  page?: number;
  limit?: number;
}