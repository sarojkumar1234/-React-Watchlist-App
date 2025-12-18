import React, { useState, useMemo } from "react";
import type { SortOrder, WatchlistProps } from "../types";
import { InstrumentCard } from "./InstrumentCard";
import { EmptyState } from "./EmptyState";

export const Watchlist: React.FC<WatchlistProps> = ({
  watchlist,
  onRemoveFromWatchlist,
  isInWatchlist,
}) => {
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const sortedWatchlist = useMemo(() => {
    const sorted = [...watchlist];
    sorted.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    return sorted;
  }, [watchlist, sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  if (watchlist.length === 0) {
    return (
      <div className="watchlist-container">
        <h2>My Watchlist</h2>
        <EmptyState message="Your watchlist is empty. Add instruments to track them here." />
      </div>
    );
  }

  return (
    <div className="watchlist-container">
      <div className="watchlist-header">
        <h2>My Watchlist ({watchlist.length})</h2>
        <button
          onClick={toggleSortOrder}
          className="sort-button"
          aria-label={`Sort by price ${
            sortOrder === "asc" ? "descending" : "ascending"
          }`}
        >
          Sort by Price ({sortOrder === "asc" ? "↑" : "↓"})
        </button>
      </div>

      <div className="instruments-grid">
        {sortedWatchlist.map((instrument) => (
          <InstrumentCard
            key={instrument.symbol}
            instrument={instrument}
            isInWatchlist={isInWatchlist(instrument.symbol)}
            onAddToWatchlist={() => {}}
            onRemoveFromWatchlist={() =>
              onRemoveFromWatchlist(instrument.symbol)
            }
          />
        ))}
      </div>
    </div>
  );
};
