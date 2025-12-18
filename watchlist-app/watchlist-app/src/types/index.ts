export type InstrumentType = "STOCK" | "ETF";

export interface Instrument {
  symbol: string;
  price: number;
  previousClose: number;
  type: InstrumentType;
}

export interface ToastItem {
  id: string;
  message: string;
  type?: "error" | "success" | "info";
}

export interface InstrumentListProps {
  instruments: Instrument[];
  loading: boolean;
  error: string | null;
  onRefetch: () => void;
  isInWatchlist: (symbol: string) => boolean;
  onAddToWatchlist: (instrument: Instrument) => void;
  onRemoveFromWatchlist: (symbol: string) => void;
}

export interface UseInstrumentsReturn {
  instruments: Instrument[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export interface InstrumentCardProps {
  instrument: Instrument;
  isInWatchlist: boolean;
  onAddToWatchlist: () => void;
  onRemoveFromWatchlist: () => void;
}

export interface LoadingStateProps {
  skeletonCount?: number;
}

export interface ToastProps {
  message: string;
  type?: "error" | "success" | "info";
  onClose: () => void;
  duration?: number;
}

export interface ToastItem {
  id: string;
  message: string;
  type?: "error" | "success" | "info";
}

export interface ToastContainerProps {
  toasts: ToastItem[];
  onRemove: (id: string) => void;
}

export interface WatchlistProps {
  watchlist: Instrument[];
  onRemoveFromWatchlist: (symbol: string) => void;
  isInWatchlist: (symbol: string) => boolean;
}

export type SortOrder = "asc" | "desc";

export interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export interface EmptyStateProps {
  title?: string;
  message: string;
}
