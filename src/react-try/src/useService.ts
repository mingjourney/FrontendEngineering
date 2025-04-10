import { useEffect, useState } from "react";

type FetchService = <T>(url: string) => Promise<T>;

const fetchService: FetchService = async <T>(url: string) : Promise<T> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return (await res.json()) as T;
}

type UseServiceResult<T> = {
  result: T | null;
  error: string;
  loading: boolean;
};

const useService = <T>(): UseServiceResult<T> => {
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      const result = await fetchService('www.baidu.com');
      setResult(result);
    } catch (err) {
      setError(String(err))
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return {
    result,
    error,
    loading
  }
}

export default useService;