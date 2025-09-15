import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export interface CompareItem {
  id: string;
  name: string;
  price: number;
  image: string;
  brand: string;
  category?: string;
  specifications?: Record<string, string>;
  features?: string[];
}

interface ComparisonContextType {
  items: CompareItem[];
  count: number;
  add: (item: CompareItem) => void;
  remove: (id: string) => void;
  toggle: (item: CompareItem) => void;
  has: (id: string) => boolean;
  clear: () => void;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export const useComparison = () => {
  const ctx = useContext(ComparisonContext);
  if (!ctx) throw new Error('useComparison must be used within ComparisonProvider');
  return ctx;
};

export const ComparisonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CompareItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('comparison');
    if (saved) setItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('comparison', JSON.stringify(items));
  }, [items]);

  const add = (item: CompareItem) => {
    setItems((prev) => (prev.find((i) => i.id === item.id) ? prev : [...prev, item]));
  };
  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));
  const toggle = (item: CompareItem) => {
    setItems((prev) => (prev.find((i) => i.id === item.id) ? prev.filter((i) => i.id !== item.id) : [...prev, item]));
  };
  const has = (id: string) => items.some((i) => i.id === id);
  const clear = () => setItems([]);

  const value = useMemo(() => ({ items, count: items.length, add, remove, toggle, has, clear }), [items]);

  return <ComparisonContext.Provider value={value}>{children}</ComparisonContext.Provider>;
};
