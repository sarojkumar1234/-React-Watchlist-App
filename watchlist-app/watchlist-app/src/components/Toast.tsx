import React, { useEffect } from "react";
import type { ToastProps } from "../types";

export const Toast: React.FC<ToastProps> = ({
  message,
  type = "error",
  onClose,
  duration = 5000,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`toast toast-${type}`} role="alert">
      <div className="toast-content">
        <span className="toast-icon">
          {type === "error" && "⚠️"}
          {type === "success" && "✓"}
          {type === "info" && "ℹ️"}
        </span>
        <span className="toast-message">{message}</span>
      </div>
      <button
        className="toast-close"
        onClick={onClose}
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
};
