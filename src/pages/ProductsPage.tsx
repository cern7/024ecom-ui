import { useAppDispatch } from "@/hooks/useAppDispatch";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { searchProducts } from "@/features/products/productsSlice";
import { Button } from "@/components/common/Button";
import ProductFilter from "@/features/products/ProductFilter";
import ProductGrid from "@/features/products/ProductGrid";

const ProductsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Get the search query from URL parameters
  const qeuryParams = new URLSearchParams(location.search);
  const initialSearchQuery = qeuryParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // update URL with search query
    if (searchQuery) {
      qeuryParams.set("q", searchQuery);
    } else {
      qeuryParams.delete("q");
    }

    navigate({
      pathname: location.pathname,
      search: qeuryParams.toString(),
    });

    // Dispatch search action
    dispatch(searchProducts(searchQuery));
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Products</h1>

        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="flex-grow">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button type="submit">Search</Button>
        </form>
      </div>
      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar with filters */}
        <div className="col-span-12 md:col-span-3">
          <ProductFilter />
        </div>

        {/* Main Content */}
        <div className="col-span-12 md:col-span-9">
          <ProductGrid />
        </div>
      </div>
    </div>
  );
};
export default ProductsPage;
