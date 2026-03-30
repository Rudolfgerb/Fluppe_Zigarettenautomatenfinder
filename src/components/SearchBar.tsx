import React from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <motion.form 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      onSubmit={handleSubmit}
      className="relative w-full max-w-md pointer-events-auto"
    >
      <div className="relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-gray-400 group-focus-within:text-marlboro-red transition-colors" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="PLZ oder Stadt eingeben..."
          className="w-full bg-white/90 backdrop-blur-md border-none rounded-2xl py-4 pl-12 pr-12 shadow-lg focus:ring-2 focus:ring-marlboro-red/20 outline-none text-gray-900 font-medium placeholder:text-gray-400 transition-all"
        />
        <AnimatePresence>
          {query && (
            <motion.button
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              type="button"
              onClick={() => setQuery('')}
              className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.form>
  );
};
