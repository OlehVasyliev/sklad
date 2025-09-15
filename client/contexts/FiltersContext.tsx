import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FiltersContextType {
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  toggleFilters: () => void;
}

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (context === undefined) {
    throw new Error('useFilters must be used within a FiltersProvider');
  }
  return context;
};

interface FiltersProviderProps {
  children: ReactNode;
}

export const FiltersProvider: React.FC<FiltersProviderProps> = ({ children }) => {
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters(prev => !prev);
  };

  return (
    <FiltersContext.Provider value={{ showFilters, setShowFilters, toggleFilters }}>
      {children}
    </FiltersContext.Provider>
  );
};