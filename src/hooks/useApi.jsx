import { useState, useEffect } from "react";
import axios from "axios";

export function useApi({ url, method = "GET", body = null, deps = [] }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios({
          method,
          url: `${import.meta.env.VITE_API_BASE_URL}${url}`,
          data: body,
        });

        setData(res.data);
      } catch (err) {
        console.error("API error:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, deps);

  return { data, loading, error };
}
