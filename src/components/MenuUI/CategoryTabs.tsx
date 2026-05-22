import React from 'react';
import { motion } from 'framer-motion';

type Category = any;

const CategoryTabs: React.FC<{
  categories: Category[];
  active: string;
  onChange: (slug: string) => void;
}> = ({ categories, active, onChange }) => {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);
  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);

  React.useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const handle = (e: MediaQueryListEvent | MediaQueryList) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    if (mq.addEventListener) mq.addEventListener('change', handle);
    else mq.addListener(handle as any);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', handle as any);
      else mq.removeListener(handle as any);
    };
  }, []);
  return (
    <div className="sticky top-20 z-50 bg-transparent py-2">
      <div className="overflow-x-auto px-4 no-scrollbar">
        <div className={`flex gap-3 items-center ${!isMobile ? 'flex-wrap' : ''}`}>
          {/* All button */}
          <button
            onClick={() => onChange('all')}
            className={`whitespace-nowrap px-4 py-2 rounded-full transition-all duration-200 font-semibold text-sm ${
              active === 'all' ? 'bg-accent text-accent-foreground shadow-md scale-105' : 'bg-secondary/20 text-muted-foreground'
            }`}
          >
            All
          </button>

          {!isMobile && (() => {
            const validCats = categories.filter((cat) => {
              const title = (cat.title || cat.attributes?.title || '').toString().toLowerCase().trim();
              const slug = (cat.slug || cat.attributes?.slug || '').toString().toLowerCase().trim();
              return title !== 'all' && slug !== 'all';
            });
            const MAX_VISIBLE = 5;
            const hasMore = validCats.length > MAX_VISIBLE;
            const displayedCats = isExpanded ? validCats : validCats.slice(0, MAX_VISIBLE);

            return (
              <>
                {displayedCats.map((cat) => {
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
                          : 'bg-secondary/20 text-muted-foreground hover:bg-secondary/40'
                      }`}
                    >
                      <span className="inline-block px-1">{title}</span>
                    </button>
                  );
                })}
                {hasMore && (
                  <button
                    key="more-toggle"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="whitespace-nowrap px-4 py-2 rounded-full transition-all duration-200 font-semibold text-sm bg-accent/20 text-accent hover:bg-accent/30"
                  >
                    {isExpanded ? 'Less -' : 'More +'}
                  </button>
                )}
              </>
            );
          })()}
          {!isMobile && (
            <button
              key="menu-tab"
              onClick={() => onChange('menu')}
              className={`whitespace-nowrap px-4 py-2 rounded-full transition-all duration-200 font-semibold text-sm ${
                active === 'menu' ? 'bg-accent text-accent-foreground shadow-md scale-105' : 'bg-secondary/20 text-muted-foreground'
              }`}
            >
              Menu
            </button>
          )}
          {isMobile && (
            <>
              

              <button
                key="entrees-special"
                onClick={() => onChange('entrees-special')}
                className={`whitespace-nowrap px-4 py-2 rounded-full transition-all duration-200 font-semibold text-sm ${
                  active === 'entrees-special'
                    ? 'bg-accent text-accent-foreground shadow-md scale-105'
                    : 'bg-secondary/20 text-muted-foreground'
                }`}
              >
                Entrees & Special Platters
              </button>

              <button
                key="menu-tab-mobile"
                onClick={() => onChange('menu')}
                className={`whitespace-nowrap px-4 py-2 rounded-full transition-all duration-200 font-semibold text-sm ${
                  active === 'menu' ? 'bg-accent text-accent-foreground shadow-md scale-105' : 'bg-secondary/20 text-muted-foreground'
                }`}
              >
                Menu
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;
