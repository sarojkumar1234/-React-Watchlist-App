import React, { useState, useMemo } from "react";
import type { InstrumentListProps } from "../types";
import { InstrumentCard } from "./InstrumentCard";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";
import { useDebounce } from "../hooks/useDebounce";
import { FiSearch } from "react-icons/fi";

export const InstrumentList: React.FC<InstrumentListProps> = ({
  instruments,
  loading,
  error,
  onRefetch,
  isInWatchlist,
  onAddToWatchlist,
  onRemoveFromWatchlist,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const filteredInstruments = useMemo(() => {
    if (!instruments || instruments.length === 0) return [];

    const query = debouncedSearchQuery.trim();

    if (!query) return instruments;

    const lowerQuery = query.toLowerCase();
    const result = instruments.filter((instrument) =>
      instrument.symbol.toLowerCase().includes(lowerQuery)
    );

    return result;
  }, [instruments, debouncedSearchQuery]);

  if (loading) {
    return <LoadingState skeletonCount={6} />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={onRefetch} />;
  }

  return (
    <div className="instrument-list">
      <div className="search-container">
        <div className="search-input-wrapper">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search By Symbol..."
            value={searchQuery}
            onChange={(e) => {
              const value = e.target.value;
              setSearchQuery(value);
            }}
            className="search-input"
            aria-label="Search instruments by symbol"
          />
        </div>
      </div>

      <div className="instrument-list-content">
        {filteredInstruments.length === 0 ? (
          <div className="empty-state">
            <p>
              {searchQuery
                ? `No instruments found matching "${searchQuery}"`
                : "No instruments available"}
            </p>
          </div>
        ) : (
          <div className="instruments-grid">
            {filteredInstruments.map((instrument) => (
              <InstrumentCard
                key={instrument.symbol}
                instrument={instrument}
                isInWatchlist={isInWatchlist(instrument.symbol)}
                onAddToWatchlist={() => onAddToWatchlist(instrument)}
                onRemoveFromWatchlist={() =>
                  onRemoveFromWatchlist(instrument.symbol)
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
