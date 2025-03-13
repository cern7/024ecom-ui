import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types/product";
import  ProductCard from "@/features/products/ProductCard"; 
import axios from "axios";

export const ProductList = () => {
  const { data, isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axios.get("/api/v1/products");
      return response.data.data;
    },
  });

  if (isLoading) return <ProductListSkeleton />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {data?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
