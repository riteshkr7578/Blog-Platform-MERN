import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function Profile() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get("/posts/my").then((res) => {
      setPosts(res.data);
    });
  }, []);

  const publishPost = async (id) => {
    await api.patch(`/posts/${id}/status`);
    setPosts(posts.map((p) =>
      p._id === id ? { ...p, status: "published" } : p
    ));
  };

  return (
    <section className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            My Posts
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your drafts and published posts
          </p>
        </div>

        {posts.length === 0 && (
          <p className="text-gray-500 text-sm">
            You haven’t created any posts yet.
          </p>
        )}

        {/* GRID VIEW */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-xl border shadow-sm hover:shadow-lg transition overflow-hidden flex flex-col"
            >
              {/* IMAGE */}
              {post.image && (
                <img
                  src={`http://localhost:5000${post.image}`}
                  alt={post.title}
                  className="h-44 w-full object-cover"
                />
              )}

              {/* CONTENT */}
              <div className="p-5 flex flex-col flex-1">
                <span className="text-xs font-semibold text-gray-500 uppercase">
                  {post.category}
                </span>

                <h2 className="mt-1 text-lg font-bold text-gray-900 line-clamp-2">
                  {post.title}
                </h2>

                {/* STATUS */}
                <span
                  className={`inline-block mt-2 w-fit px-2.5 py-0.5 text-xs font-semibold rounded
                    ${
                      post.status === "draft"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                >
                  {post.status}
                </span>

                {/* ACTIONS */}
                <div className="mt-auto pt-4 flex items-center gap-3">
                  <Link
                    to={`/edit/${post._id}`}
                    className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50 transition"
                  >
                    Edit
                  </Link>

                  {post.status === "draft" && (
                    <button
                      onClick={() => publishPost(post._id)}
                      className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Publish
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
