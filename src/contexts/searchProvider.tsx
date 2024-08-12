// searchContext.tsx

'use client';

// React Imports
import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface SearchContextType {
  query: string;
  setQuery: (query: string) => void;
  genre: string;
  setGenre: (genre: string) => void;
  year: Date | null;
  setYear: (year: Date | null) => void;
  type: string;
  setType: (type: string) => void;
  clearAll: () => void;
  searchInitiated: boolean;
  setSearchInitiated: (value: boolean) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [query, setQuery] = useState<string>('');
  const [genre, setGenre] = useState<string>('');
  const [year, setYear] = useState<Date | null>(null);
  const [type, setType] = useState<string>('');
  const [searchInitiated, setSearchInitiated] = useState<boolean>(false);

  const clearAll = () => {
    setQuery('');
    setGenre('');
    setYear(null);
    setType('');
    setSearchInitiated(false);
  };

  return (
    <SearchContext.Provider
      value={{ 
        query, setQuery, 
        genre, setGenre, 
        year, setYear, 
        type, setType, 
        clearAll, 
        searchInitiated, setSearchInitiated 
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }

  return context;
};
