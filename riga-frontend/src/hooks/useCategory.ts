import { useEffect, useState } from "react";
import type { CategoryResponse } from "../types/category";
import { categoryService } from "../services/categoryService";

export function useCategory() {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await categoryService.getAll();
        if (res.success && Array.isArray(res.data)) {
          setCategories(res.data);
        } else {
          setCategories([]);
          setError("No categories found or wrong data format");
        }
      } catch (err: any) {
        setCategories([]);
        setError(err.message || "Error fetching categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
}
