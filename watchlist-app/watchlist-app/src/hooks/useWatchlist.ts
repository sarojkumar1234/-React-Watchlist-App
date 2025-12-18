import { useState, useEffect, useCallback } from "react";
import type { Instrument } from "../types";

interface UseWatchlistReturn {
  watchlist: Instrument[];
  loading: boolean;
  addToWatchlist: (instrument: Instrument) => void;
  removeFromWatchlist: (symbol: string) => void;
  isInWatchlist: (symbol: string) => boolean;
  clearWatchlist: () => void;
  storageError: string | null;
}

const WATCHLIST_STORAGE_KEY = "watchlist-app-watchlist";

export const useWatchlist = (): UseWatchlistReturn => {
  const [watchlist, setWatchlist] = useState<Instrument[]>([]);
  const [storageError, setStorageError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load watchlist from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(WATCHLIST_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Instrument[];
        // Validate parsed data
        if (Array.isArray(parsed)) {
          setWatchlist(parsed);
        }
      }
      setIsInitialized(true);
    } catch (err) {
      console.error("Failed to load watchlist from localStorage:", err);
      setStorageError("Failed to load watchlist from storage.");
      setIsInitialized(true);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save watchlist to localStorage whenever it changes (but not on initial load)
  useEffect(() => {
    // Don't save until we've finished loading from localStorage
    if (!isInitialized) return;

    try {
      localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(watchlist));
      setStorageError(null);
    } catch (err) {
      console.error("Failed to save watchlist to localStorage:", err);
      setStorageError("Failed to save watchlist to storage.");
    }
  }, [watchlist, isInitialized]);

  const addToWatchlist = useCallback((instrument: Instrument) => {
    setWatchlist((prev) => {
      // Check if already in watchlist
      if (prev.some((item) => item.symbol === instrument.symbol)) {
        return prev;
      }
      return [...prev, instrument];
    });
  }, []);

  const removeFromWatchlist = useCallback((symbol: string) => {
    setWatchlist((prev) => prev.filter((item) => item.symbol !== symbol));
  }, []);

  const isInWatchlist = useCallback(
    (symbol: string): boolean => {
      return watchlist.some((item) => item.symbol === symbol);
    },
    [watchlist]
  );

  const clearWatchlist = useCallback(() => {
    setWatchlist([]);
  }, []);

  return {
    watchlist,
    loading,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    clearWatchlist,
    storageError,
  };
};
