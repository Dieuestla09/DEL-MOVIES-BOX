import { useCallback, useEffect, useState } from 'react';

export function useFetch(fetcher, dependencies = [], options = {}) {
  const [data, setData] = useState(options.initialValue ?? null);
  const [loading, setLoading] = useState(options.lazy ? false : true);
  const [error, setError] = useState(null);

  const refetch = useCallback(
    async (signal) => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetcher(signal);
        setData(result);
        return result;
      } catch (err) {
        if (err.name === 'AbortError') return null;
        setError(err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [fetcher],
  );

  useEffect(() => {
    const controller = new AbortController();
    if (!options.lazy) {
      refetch(controller.signal);
    }
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return { data, loading, error, refetch };
}
