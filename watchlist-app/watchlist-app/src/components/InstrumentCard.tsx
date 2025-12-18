import React, { useMemo } from "react";
import type { InstrumentCardProps } from "../types";
import {
  calculatePercentageChange,
  formatPercentageChange,
  getPercentageColor,
} from "../utils/calculations";

export const InstrumentCard: React.FC<InstrumentCardProps> = React.memo(
  ({ instrument, isInWatchlist, onAddToWatchlist, onRemoveFromWatchlist }) => {
    const { percentageChange, formattedPercentage, color } = useMemo(() => {
      const change = calculatePercentageChange(
        instrument.price,
        instrument.previousClose
      );
      return {
        percentageChange: change,
        formattedPercentage: formatPercentageChange(change),
        color: getPercentageColor(change),
      };
    }, [instrument.price, instrument.previousClose]);

    return (
      <div className="instrument-card">
        <div className="instrument-header">
          <h3>{instrument.symbol}</h3>
          <span className="instrument-type">{instrument.type}</span>
        </div>
      <div className="instrument-price">
        <span className="price">
          ₹{instrument.price.toLocaleString()}
          {percentageChange > 0 && (
            <span className="arrow arrow-up">▲</span>
          )}
          {percentageChange < 0 && (
            <span className="arrow arrow-down">▼</span>
          )}
        </span>
        <span className="percentage" style={{ color }}>
          {formattedPercentage}
        </span>
      </div>
        <button
          className={`watchlist-button ${isInWatchlist ? "remove" : "add"}`}
          onClick={isInWatchlist ? onRemoveFromWatchlist : onAddToWatchlist}
          aria-label={
            isInWatchlist
              ? `Remove ${instrument.symbol} from watchlist`
              : `Add ${instrument.symbol} to watchlist`
          }
        >
          {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
        </button>
      </div>
    );
  }
);

InstrumentCard.displayName = "InstrumentCard";
