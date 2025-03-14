import { useAppDispatch } from "@/hooks/useAppDispatch";
import { Product } from "@/types/product";
import React from "react";
import { addItemToCart } from "../../store/slices/cartSlice";
import { Link } from "react-router-dom";
import { Button } from "@/components/common/Button";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addItemToCart({ productId: product.id, quantity: 1 }));
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden flex flex-col">
      <Link
        to={`/products/${product.id}`}
        className="block overflow-hidden h-48"
      >
        <img
          src={product.images[0] || "/placeholder-product.jpg"}
          alt={product.name}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </Link>

      <div className="p-4 flex-grow flex flex-col">
        <Link to={`/products/${product.id}`} className="block">
          <h3 className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        <p className="text-sm text-gray-500 mb-2 line-clamp-2 flex-grow">
          {product.description}
        </p>

        <div className="mt-2 flex items-center justify-between">
          <p className="text-lg font-medium text-gray-900">
            ${product.price.toFixed(2)}
          </p>

          {product.inStock ? (
            <span className="text-sm font-medium text-green-600">In Stock</span>
          ) : (
            <span className="text-sm font-medium text-red-600">
              Out of Stock
            </span>
          )}
        </div>
        <Button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="mt-4 w-full"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
