import React from 'react';
import { Search } from 'lucide-react';

const SearchBar: React.FC<{
  query: string;
  onQuery: (q: string) => void;
  vegOnly: boolean;
  nonVegOnly: boolean;
  setVegOnly: (v: boolean) => void;
  setNonVegOnly: (v: boolean) => void;
}> = ({ query, onQuery, vegOnly, nonVegOnly, setVegOnly, setNonVegOnly }) => {
  return (
    <div className="px-4">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        <div className="flex items-center gap-3 bg-card/60 p-2 rounded-full border border-border w-full">
          <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          <input
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Search dishes, ingredients or tags"
            className="bg-transparent outline-none flex-1 min-w-0 text-sm text-foreground placeholder:text-muted-foreground"
          />
          {/* Inline controls shown from small screens up */}
          <div className="hidden sm:flex items-center gap-2 ml-2">
            <button
              onClick={() => setVegOnly(!vegOnly)}
              aria-pressed={vegOnly}
              className={`px-3 py-1 rounded-full text-sm font-semibold ${vegOnly ? 'bg-accent text-accent-foreground' : 'bg-secondary/30 text-muted-foreground'}`}
            >
              Veg
            </button>
            <button
              onClick={() => setNonVegOnly(!nonVegOnly)}
              aria-pressed={nonVegOnly}
              className={`px-3 py-1 rounded-full text-sm font-semibold ${nonVegOnly ? 'bg-accent text-accent-foreground' : 'bg-secondary/30 text-muted-foreground'}`}
            >
              Non-Veg
            </button>
          </div>
        </div>

        {/* Mobile controls: full-width buttons for thumb accessibility */}
        <div className="flex sm:hidden items-center gap-2 w-full">
          <button
            onClick={() => setVegOnly(!vegOnly)}
            aria-pressed={vegOnly}
            className={`flex-1 px-4 py-2 rounded-full text-sm font-semibold ${vegOnly ? 'bg-accent text-accent-foreground' : 'bg-secondary/30 text-muted-foreground'}`}
          >
            Veg
          </button>
          <button
            onClick={() => setNonVegOnly(!nonVegOnly)}
            aria-pressed={nonVegOnly}
            className={`flex-1 px-4 py-2 rounded-full text-sm font-semibold ${nonVegOnly ? 'bg-accent text-accent-foreground' : 'bg-secondary/30 text-muted-foreground'}`}
          >
            Non-Veg
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
