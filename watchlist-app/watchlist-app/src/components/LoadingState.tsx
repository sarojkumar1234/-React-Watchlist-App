import React from "react";
import type { LoadingStateProps } from "../types";

export const LoadingState: React.FC<LoadingStateProps> = ({
  skeletonCount = 6,
}) => {
  return (
    <div className="loading-container" aria-live="polite" aria-busy="true">
      <div className="loading-skeleton">
        {Array(skeletonCount)
          .fill("")
          .map((_, i) => (
            <div key={i} className="skeleton-card" />
          ))}
      </div>
    </div>
  );
};
