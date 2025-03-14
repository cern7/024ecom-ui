import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import React, { useEffect } from "react";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchProducts, setFilters } from "../../store/slices/productsSlice";
import { ProductFilter as ProductFilterType } from "@/types/product";
import { Button } from "@/components/common/Button";
import {Input} from '../../components/common/Input';
import { Select} from '../../components/common/Select';

// Zod schema for form validation
const filterSchema = z.object({
  category: z.string().optional(),
  minPrice: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().min(0).optional()
  ),
  maxPrice: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().min(0).optional()
  ),
  sort: z
    .enum(["name_asc", "name_desc", "price_asc", "price_desc", "newest"])
    .optional(),
});

type FilterFormValues = z.infer<typeof filterSchema>;

const ProductFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.products);

  // Set up form with React Hook Form and zod validation
  const methods = useForm<FilterFormValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      category: filters.category || "",
      minPrice: filters.minPrice || 0,
      maxPrice: filters.maxPrice || 0,
      sort: filters.sort || "newest",
    },
  });

  const { reset, watch } = methods;

  // Watch for changes in the sort field to apply immediately
  const sortValue = watch("sort");

  useEffect(() => {
    if (sortValue) {
      dispatch(setFilters({ sort: sortValue }));
      dispatch(fetchProducts({ ...filters, sort: sortValue }));
    }
  }, [sortValue, dispatch]);

  // Reset filters handler
  const handleResetFilters = () => {
    reset({ category: "", minPrice: 0, maxPrice: 0, sort: "newest" });
    dispatch(
      setFilters({
        category: undefined,
        minPrice: undefined,
        maxPrice: undefined,
        sort: "newest",
        page: 1,
      })
    );

    dispatch(fetchProducts({ sort: "newest", page: 1 }));
  };

  // Apply filters handler
  const onSubmit = (data: FilterFormValues) => {
    const newFilters: ProductFilterType = {
      ...filters,
      category: data.category || undefined,
      minPrice: data.minPrice || undefined,
      maxPrice: data.maxPrice || undefined,
      sort: data.sort,
      page: 1,
    };

    dispatch(setFilters(newFilters));
    dispatch(fetchProducts(newFilters));
  };

  // Category options
  const categoryOptions = [
    { value: "tables", label: "Tables" },
    { value: "lamps", label: "Lamps" },
    { value: "others", label: "others" },
  ];

  // Sort options
  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
    { value: "name_asc", label: "Name: A to Z" },
    { value: "name_desc", label: "Name: Z to A" },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h2 className="text-lg font-medium mb-4">Filter Products</h2>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <Select name="category" label="Category" options={categoryOptions} />
          <div className="grid grid-cols-2 gap-4">
            <Input
              name="minPrice"
              label="Min Price"
              type="number"
              min="0"
              step="0.01"
            />
            <Input
              name="maxPrice"
              label="Max Price"
              type="number"
              min="0"
              step="0.01"
            />
          </div>

          <Select name="sort" label="Sort by" options={sortOptions} />
          <div className="flex space-x-4">
            <Button type="submit" className="flex-1">
              Apply Filters
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={handleResetFilters}
            >
              Reset Filters
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ProductFilter;
