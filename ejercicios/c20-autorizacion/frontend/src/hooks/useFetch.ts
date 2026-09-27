import { useState, useEffect } from "react";
import { apiFetch } from "../services/api";

export function useFetch<T>(ruta: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    apiFetch<T>(ruta)
      .then((res) => {
        setData(res);
      })
      .catch((err: Error) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [ruta]);

  return { data, loading, error };
}