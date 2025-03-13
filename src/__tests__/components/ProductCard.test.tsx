import { render, screen } from "@testing-library/react";
import { ProductCard } from "@/components/ProductCard";
import { describe, it,expect } from "vitest";

describe("ProductCard", () => {
  it("displays product information", () => {
    const product = {
      id: 1,
      name: "Test Product",
      price: 199.99,
    };

    render(<ProductCard product={product} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("199.99")).toBeInTheDocument();
  });
});
