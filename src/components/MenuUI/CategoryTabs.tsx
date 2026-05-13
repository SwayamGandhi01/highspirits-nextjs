import React from 'react';
import { motion } from 'framer-motion';

type Category = any;

const CategoryTabs: React.FC<{
  categories: Category[];
  active: string;
  onChange: (slug: string) => void;
}> = ({ categories, active, onChange }) => {
  return (
    <div className="sticky top-20 z-50 bg-transparent py-2">
      <div className="overflow-x-auto px-4 no-scrollbar">
        <div className="flex gap-3 items-center">
          {/* All button */}
          <button
            onClick={() => onChange('all')}
            className={`whitespace-nowrap px-4 py-2 rounded-full transition-all duration-200 font-semibold text-sm ${
              active === 'all' ? 'bg-accent text-accent-foreground shadow-md scale-105' : 'bg-secondary/20 text-muted-foreground'
            }`}
          >
            All
          </button>

          {categories.map((cat) => {
            const slug = cat.slug || cat.attributes?.slug || `category-${cat.id}`;
            const title = cat.title || cat.attributes?.title || 'Menu';
            const isActive = slug === active;

            return (
              <button
                key={cat.id}
                onClick={() => onChange(slug)}
                className={`whitespace-nowrap px-4 py-2 rounded-full transition-all duration-200 font-semibold text-sm ${
                  isActive
                    ? 'bg-accent text-accent-foreground shadow-md scale-105'
                    : 'bg-secondary/20 text-muted-foreground'
                }`}
              >
                <span className="inline-block px-1">{title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;
