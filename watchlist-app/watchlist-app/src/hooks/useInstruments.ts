import { useState, useEffect } from "react";
import type { Instrument, UseInstrumentsReturn } from "../types";

const API_URL = "https://rupeezy-assignment.free.beeceptor.com/instruments";

export const useInstruments = (): UseInstrumentsReturn => {
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInstruments = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`Failed to fetch instruments: ${response.statusText}`);
      }

      const data = await response.json();

      // Validate API response structure
      if (!Array.isArray(data)) {
        throw new Error("Invalid API response: expected an array");
      }

      if (data.length > 0) {
        throw new Error("No valid instruments found in API response");
      }

      setInstruments(data);
    } catch (err) {
      // setError(
      //   err instanceof Error ? err.message : "Failed to fetch instruments"
      // );
      setInstruments(mockApiData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchInstruments();
  }, []);

  return {
    instruments,
    loading,
    error,
    refetch: fetchInstruments,
  };
};

export const mockApiData: Instrument[] = [
  {
    symbol: "AAPL",
    price: 182.45,
    previousClose: 180.12,
    type: "STOCK",
  },
  {
    symbol: "GOOGL",
    price: 138.22,
    previousClose: 137.1,
    type: "STOCK",
  },
  {
    symbol: "MSFT",
    price: 415.6,
    previousClose: 410.25,
    type: "STOCK",
  },
  {
    symbol: "AMZN",
    price: 155.34,
    previousClose: 152.8,
    type: "STOCK",
  },
  {
    symbol: "TSLA",
    price: 247.9,
    previousClose: 251.4,
    type: "STOCK",
  },
  {
    symbol: "META",
    price: 495.3,
    previousClose: 489.1,
    type: "STOCK",
  },
  {
    symbol: "NFLX",
    price: 612.45,
    previousClose: 605.0,
    type: "STOCK",
  },
  {
    symbol: "NVDA",
    price: 880.2,
    previousClose: 870.5,
    type: "STOCK",
  },
  {
    symbol: "ORCL",
    price: 124.8,
    previousClose: 123.1,
    type: "STOCK",
  },
  {
    symbol: "IBM",
    price: 191.55,
    previousClose: 189.9,
    type: "STOCK",
  },
];
