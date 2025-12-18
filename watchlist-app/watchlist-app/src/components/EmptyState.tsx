import React from "react";
import type { EmptyStateProps } from "../types";

export const EmptyState: React.FC<EmptyStateProps> = ({ title, message }) => {
  return (
    <div className="empty-state">
      {title && <h3>{title}</h3>}
      <p>{message}</p>
    </div>
  );
};
