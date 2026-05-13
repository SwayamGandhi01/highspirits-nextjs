import React from 'react';
import { Search } from 'lucide-react';

const SearchBar: React.FC<{
  query: string;
  onQuery: (q: string) => void;
}> = ({ query, onQuery }) => {
  return (
    <div className="px-4">
      <div className="flex items-center gap-3 bg-card/60 p-2 rounded-full border border-border w-full">
        <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        <input
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search dishes, ingredients or tags"
          className="bg-transparent outline-none flex-1 min-w-0 text-sm text-foreground placeholder:text-muted-foreground"
        />
      </div>
    </div>
  );
};

export default SearchBar;
