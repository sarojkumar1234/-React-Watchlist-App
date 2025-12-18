import { useCallback, useEffect, useState } from "react";
import { useInstruments } from "./hooks/useInstruments";
import { useWatchlist } from "./hooks/useWatchlist";
import { InstrumentList } from "./components/InstrumentList";
import { Watchlist } from "./components/Watchlist";
import { ToastContainer } from "./components/ToastContainer";
import type { Instrument, ToastItem } from "./types";
import "./App.css";

function App() {
  const { instruments, loading, error, refetch } = useInstruments();
  const {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    storageError,
  } = useWatchlist();

  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Show toast when storage error occurs
  useEffect(() => {
    if (storageError) {
      const toastId = `storage-error-${Date.now()}`;
      setToasts((prev) => [
        ...prev,
        { id: toastId, message: storageError, type: "error" },
      ]);
    }
  }, [storageError]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const handleAddToWatchlist = useCallback(
    (instrument: Instrument) => {
      addToWatchlist(instrument);
      // Show success toast when item is added
      const toastId = `success-${Date.now()}`;
      setToasts((prev) => [
        ...prev,
        {
          id: toastId,
          message: `${instrument.symbol} added to watchlist`,
          type: "success",
        },
      ]);
    },
    [addToWatchlist]
  );

  const handleRemoveFromWatchlist = useCallback(
    (symbol: string) => {
      removeFromWatchlist(symbol);
      // Show success toast when item is removed
      const toastId = `success-${Date.now()}`;
      setToasts((prev) => [
        ...prev,
        {
          id: toastId,
          message: `${symbol} removed from watchlist`,
          type: "success",
        },
      ]);
    },
    [removeFromWatchlist]
  );

  return (
    <div className="app">
      <header className="app-header">
        <h1>Market Instruments Watchlist</h1>
      </header>

      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <main className="app-main">
        <section className="instruments-section">
          <h2>All Instruments</h2>
          <InstrumentList
            instruments={instruments}
            loading={loading}
            error={error}
            onRefetch={refetch}
            isInWatchlist={isInWatchlist}
            onAddToWatchlist={handleAddToWatchlist}
            onRemoveFromWatchlist={handleRemoveFromWatchlist}
          />
        </section>

        <section className="watchlist-section">
          <Watchlist
            watchlist={watchlist}
            onRemoveFromWatchlist={handleRemoveFromWatchlist}
            isInWatchlist={isInWatchlist}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
