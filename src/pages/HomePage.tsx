import { Button } from "@/components/common/Button";
import MainLayout from "@/components/layout/MainLayout";
import { ProductList } from "@/components/ProductList";
import { fetchProducts } from "@/features/products/productsSlice";
import { AppDispatch, RootState } from "@/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, isLoading } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    // Fetch products with a limit of 8 for the homepage
    dispatch(
      fetchProducts({
        limit: 8,
        page: 1,
        // can add more parameters if needed
      })
    );
  }, [dispatch]);

  // Create two different product sections by splitting the array
  // This simulates featured and new arribal sections
  const featuredProducts = products.slice(0, 4);
  const newArrivals = products.slice(4, 8);

  return (
    // <MainLayout>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="relative py-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-xl mb-8">
        <div className="max-w-3xl mx-auto text-center text-white px-4">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Shop the Latest Trends
          </h1>
          <p className="mt-4 text-xl">
            Discover quality products at affordable prices
          </p>
          <div className="mt-8">
            <Link to="/products">
              <Button variant="secondary">Shop Now</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link
            to="/products"
            className="text-indigo-600 hover:text-indigo-500"
          >
            View All
          </Link>
                  </div>
                  {isLoading ? (
                    <div className="text-center py-12">Loading products...</div>
                  ) : featuredProducts.length > 0 ? (
                    <ProductList products={featuredProducts}
                  )}
      </section>
    </div>
    // </MainLayout>
  );
};
