import React from "react";

interface Category {
  id: number;
  name: string;
}

interface Props {
  categories: Category[];
  selectedCategory: number | null;
  setSelectedCategory: (id: number | null) => void;
  loading: boolean;
  error: string | null;
}

const CategoryFilter: React.FC<Props> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  loading,
  error,
}) => {
  return (
    <div className="flex gap-2 overflow-x-auto mb-6 pb-2">
      <button
        className={`flex-shrink-0 px-4 py-2 rounded ${
          selectedCategory === null ? "bg-blue-600 text-white" : "bg-gray-200"
        }`}
        onClick={() => setSelectedCategory(null)}
      >
        All
      </button>

      {loading && <p>Loading categories...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {categories.map((c) => (
        <button
          key={c.id}
          className={`flex-shrink-0 px-4 py-2 rounded ${
            selectedCategory === c.id ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setSelectedCategory(c.id)}
        >
          {c.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
