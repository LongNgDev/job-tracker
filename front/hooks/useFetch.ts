import { useCallback, useEffect, useState } from "react";

function useFetch<T>(url: string | undefined) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    if (!url) return;

    const controller = new AbortController();
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(url, { signal: controller.signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const json = await res.json();
      setData(json);
      return json;
    } catch (e: unknown) {
      if (e instanceof Error && e.name !== "AbortError") setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (!url) return;
    refetch();
  }, [url, refetch]);

  return { data, setData, loading, error, refetch };
}

export default useFetch;
