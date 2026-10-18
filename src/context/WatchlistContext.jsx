import { useEffect, useMemo, useState } from 'react';
import { WatchlistContext } from './watchlistStore.js';
import { LEGACY_WATCHLIST_STORAGE_KEY, WATCHLIST_STORAGE_KEY } from '../constants.js';

const readStorage = () => {
  try {
    const current = localStorage.getItem(WATCHLIST_STORAGE_KEY);
    const legacy = localStorage.getItem(LEGACY_WATCHLIST_STORAGE_KEY);

    if (current !== null) {
      localStorage.removeItem(LEGACY_WATCHLIST_STORAGE_KEY);
      const parsed = JSON.parse(current);
      return Array.isArray(parsed) ? parsed : [];
    }

    if (legacy === null) return [];

    const parsed = JSON.parse(legacy);
    const items = Array.isArray(parsed) ? parsed : [];
    localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(items));
    localStorage.removeItem(LEGACY_WATCHLIST_STORAGE_KEY);
    return items;
  } catch {
    return [];
  }
};

export function WatchlistProvider({ children }) {
  const [items, setItems] = useState(() => readStorage());

  useEffect(() => {
    try {
      localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore write failures because the app should remain usable.
    }
  }, [items]);

  const value = useMemo(() => {
    const addItem = (item) => {
      setItems((current) => {
        const key = `${item.mediaType}:${item.id}`;
        if (current.some((entry) => `${entry.mediaType}:${entry.id}` === key)) return current;
        return [item, ...current];
      });
    };

    const removeItem = (mediaType, id) => {
      setItems((current) => current.filter((entry) => !(entry.mediaType === mediaType && entry.id === id)));
    };

    const toggleItem = (item) => {
      setItems((current) => {
        const key = `${item.mediaType}:${item.id}`;
        const exists = current.some((entry) => `${entry.mediaType}:${entry.id}` === key);
        if (exists) {
          return current.filter((entry) => !(entry.mediaType === item.mediaType && entry.id === item.id));
        }
        return [item, ...current];
      });
    };

    const isInWatchlist = (mediaType, id) => items.some((entry) => entry.mediaType === mediaType && entry.id === id);
    const clearAll = () => setItems([]);

    return { items, addItem, removeItem, toggleItem, isInWatchlist, clearAll };
  }, [items]);

  return <WatchlistContext.Provider value={value}>{children}</WatchlistContext.Provider>;
}

export default WatchlistContext;
