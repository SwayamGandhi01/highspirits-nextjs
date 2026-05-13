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
      <div className="flex items-center gap-3 bg-card/60 p-2 rounded-full border border-border">
        <Search className="w-5 h-5 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search dishes, ingredients or tags"
          className="bg-transparent outline-none flex-1 text-sm text-foreground placeholder:text-muted-foreground"
        />
        <div className="flex items-center gap-2 ml-2">
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
    </div>
  );
};

export default SearchBar;
