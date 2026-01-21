import { useEffect, useState } from "react";
import api from "../api/axios";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const searchPosts = async () => {
    if (!query.trim()) return;

    setLoading(true);
    const res = await api.get(`/posts/search?q=${query}`);
    setPosts(res.data);
    setLoading(false);
  };

  useEffect(() => {
    api.get("/posts").then((res) => setPosts(res.data));
  }, []);

  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">

        {/* HERO / HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Latest Blog Posts
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Explore insights, stories, and ideas from our writers
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex flex-col sm:flex-row gap-3 bg-white p-3 rounded-xl shadow-sm border">
            <input
              type="text"
              placeholder="Search posts by title or content..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={searchPosts}
              className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>

        {/* POSTS */}
        {loading ? (
          <div className="text-center text-gray-500 text-lg">
            Loading posts...
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            No posts found.
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
