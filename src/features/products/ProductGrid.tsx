import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useEffect } from "react";
import { fetchProducts } from "../../store/slices/productsSlice";
import { Button } from "@/components/common/Button";
import ProductCard from "./ProductCard";

const ProductGrid: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, isLoading, error, filters, totalCount, pageCount } =
    useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts(filters));
  }, [dispatch]);

  const handleLoadMore = () => {
    dispatch(
      fetchProducts({
        ...filters,
        page: (filters.page || 1) + 1,
      })
    );
  };

  if (isLoading && products.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="anime-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error && products.length === 0) {
    return (
      <div className="bg-red-50 p-4 rounded-md text-red-800">
        <p>Error loading products: {error}</p>
        <Button
          onClick={() => dispatch(fetchProducts(filters))}
          variant="outline"
          className="mt-2"
        >
          Try again
        </Button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No products found
        </h3>
        <p className="text=gray-500">
          Try adjusting your filters or search criteria
        </p>
      </div>
    );
  }

  const hasMorePages =
    filters.page && pageCount ? filters.page < pageCount : false;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {hasMorePages && (
        <div className="mt-8 text-center">
          <Button
            onClick={handleLoadMore}
            variant="outline"
            isLoading={isLoading}
          >
            Load More Products
          </Button>
          <p className="mt-2 text-sm text-gray-500">
            Showing {products.length} of {totalCount} products
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
