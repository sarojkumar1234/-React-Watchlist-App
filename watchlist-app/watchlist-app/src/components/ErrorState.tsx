import React from "react";
import type { ErrorStateProps } from "../types";

export const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => {
  return (
    <div className="error-container">
      <p className="error-message">{error}</p>
      <button onClick={onRetry} className="retry-button">
        Retry
      </button>
    </div>
  );
};
