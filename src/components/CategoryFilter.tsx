import React from 'react';
import { Category } from '../data';
import { cn } from '../utils/cn';

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: Category | 'All';
  onCategoryChange: (category: Category | 'All') => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  categories, 
  activeCategory, 
  onCategoryChange 
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-8 justify-center">
      <button
        onClick={() => onCategoryChange('All')}
        className={cn(
          "px-6 py-2 rounded-full font-medium transition-all duration-200 border",
          activeCategory === 'All' 
            ? "bg-emerald-600 text-white border-emerald-600" 
            : "bg-white text-gray-600 border-gray-200 hover:border-emerald-300"
        )}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={cn(
            "px-6 py-2 rounded-full font-medium transition-all duration-200 border",
            activeCategory === category 
              ? "bg-emerald-600 text-white border-emerald-600" 
              : "bg-white text-gray-600 border-gray-200 hover:border-emerald-300"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
