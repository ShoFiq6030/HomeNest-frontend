import { useState, useEffect } from "react";
import axios from "axios";

export function useApi({ url, method = "GET", body = null, deps = [] }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (!url) return;

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      const config = {
        method,
        url: `${import.meta.env.VITE_API_BASE_URL}${url}`,
        data: body,
        headers: {},
      };

      // Authorization header
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      const res = await axios(config);
      setData(res.data);
    } catch (err) {
      console.error("API call failed:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, deps);

  return { data, loading, error, refetch: fetchData };
}
