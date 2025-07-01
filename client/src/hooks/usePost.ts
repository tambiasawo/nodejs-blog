import { useState, useEffect, useCallback } from "react";
const URL = "v1";
type Post = {
  title: string;
  body: string;
  updatedAt: string;
  _id: string;
};
const usePost = (id: string) => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const getPost = useCallback(async (id: string) => {
    if (!id) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE}/${URL}/posts/${id}`,
        {
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error(
          `Fetch failed: ${response.status} ${response.statusText}`
        );
      }
      const data = await response.json();
      setPost(data);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : "Sth undexpected went ");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getPost(id);
  }, [getPost, id]);

  return { post, loading, error };
};

export default usePost;
