import { useState, useEffect, useCallback } from "react";
const URL = "v1";
export type Post = {
  title: string;
  body: string;
  updatedAt: string;
  _id: string;
};
const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [, setTotal] = useState();

  const getPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE}/${URL}/posts`
      );
      const posts = await response.json();
      setPosts(posts.posts);
      setTotal(posts.count);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : "Sth undexpected went ");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return { posts, loading, error, refresh: getPosts };
};

export default usePosts;
