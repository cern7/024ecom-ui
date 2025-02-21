import { Suspense } from "react";
import dynamic from "next/dynamic";

const ProductReviews = dynamic(() => import("@components/ProductReviews"), {
  suspense: true,
});

export default function ProductPage() {
  return (
    <div>
      <ProductDetails />
      <Suspense fallback={<ReviewsSkeleton />}>
        <ProductReviews />
      </Suspense>
    </div>
  );
}
