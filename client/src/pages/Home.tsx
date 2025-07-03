import { useState, useEffect, useMemo, useCallback } from "react";
import usePosts, { type Post } from "../hooks/usePosts";
import { Link } from "react-router-dom";
import NewPostDialog from "../components/NewPostDialog";
import { searchPost } from "../action";
import useAuth from "../authContext";
import Button from "@mui/material/Button";

const Home = () => {
  const { user } = useAuth();
  const [searchValue, setSearchValue] = useState("");
  const [searchError, setSearchError] = useState<null | string>(null);
  const { posts, loading, error, refresh } = usePosts();
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [limitPosts, setLimitPosts] = useState(5);

  const fetchSearchedItems = useCallback(
    async (val: string) => {
      if (!val.trim()) {
        setFilteredPosts([]);
        setSearchError(null);
        return;
      }

      try {
        const results = await searchPost(val);
        if ("error" in results) {
          setSearchError(results.error);
          setFilteredPosts([]);
        } else {
          setFilteredPosts(results.posts);
          setSearchError(null);
        }
      } catch (err) {
        setSearchError("An unexpected error occurred");
        setFilteredPosts([]);
      }
    },
    [] // no dependencies, stable reference
  );
  console.log({ limitPosts });
  useEffect(() => {
    fetchSearchedItems(searchValue);
  }, [searchValue, fetchSearchedItems]);

  const displayedPosts = useMemo(() => {
    if (searchValue) return filteredPosts;
    return posts;
  }, [posts, searchValue, filteredPosts]);

  return (
    <div className="home">
      <section className="intro">
        <h1>Hi, we are NodeStars</h1>
        <p>
          Web developers on a mission to help the next generation of fullstack
          developers
        </p>
        <img src="/node.png" alt="tambi blog" />
      </section>

      <section className="posts-header">
        <div className="heading">
          <h3>Latest Posts</h3>
          {user && <NewPostDialog onPostCreated={refresh} />}
        </div>
        <input
          type="search"
          name="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search..."
        />
        {searchError && <p style={{ color: "red" }}>{searchError}</p>}
      </section>

      <section className="posts">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          displayedPosts.slice(0, limitPosts).map((post) => (
            <div className="post" key={post._id}>
              <Link to={`/posts/${post._id}`}>{post.title}</Link>
              <span>{new Date(post.updatedAt).toDateString()}</span>
            </div>
          ))
        )}
      </section>
      <Button
        variant="contained"
        onClick={() => setLimitPosts((prev) => (prev === 20 ? 5 : 20))}
        sx={{ borderRadius: "10px" }}
      >
        {limitPosts < 6 ? "See More" : "See Less"}
      </Button>
    </div>
  );
};

export default Home;
