import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export interface FavItem {
  id: string;
  name: string;
  price: number;
  image: string;
  brand: string;
}

interface FavoritesContextType {
  items: FavItem[];
  count: number;
  add: (item: FavItem) => void;
  remove: (id: string) => void;
  toggle: (item: FavItem) => void;
  has: (id: string) => boolean;
  clear: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
};

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<FavItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('favorites');
    if (saved) setItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(items));
  }, [items]);

  const add = (item: FavItem) => {
    setItems((prev) => (prev.find((i) => i.id === item.id) ? prev : [...prev, item]));
  };
  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));
  const toggle = (item: FavItem) => {
    setItems((prev) => (prev.find((i) => i.id === item.id) ? prev.filter((i) => i.id !== item.id) : [...prev, item]));
  };
  const has = (id: string) => items.some((i) => i.id === id);
  const clear = () => setItems([]);

  const value = useMemo(() => ({ items, count: items.length, add, remove, toggle, has, clear }), [items]);

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};
