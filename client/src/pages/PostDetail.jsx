import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";
import CommentSection from "../components/CommentSection";
import { useAuth } from "../context/AuthContext";

export default function PostDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState(null);

  useEffect(() => {
    api.get(`/posts/${id}`).then(res => setPost(res.data));
  }, [id]);

  const toggleLike = async () => {
    const res = await api.post(`/posts/${id}/like`);
    setPost({ ...post, likes: Array(res.data.likesCount).fill(1) });
  };

  if (!post) return <p className="p-4">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">

      {/* ✅ IMAGE */}
      {post.image && (
        <img
          src={`http://localhost:5000${post.image}`}
          className="w-full h-60 object-cover rounded mb-4"
          alt={post.title}
        />
      )}

      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>

      <div className="flex justify-between items-center mb-4">
        <span className="text-sm bg-gray-100 px-2 py-1 rounded">
          {post.category}
        </span>

        {user && user.id === post.author?._id && (
          <Link
            to={`/edit/${post._id}`}
            className="text-sm border px-3 py-1 rounded"
          >
            Edit
          </Link>
        )}
      </div>

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {user && (
        <button
          onClick={toggleLike}
          className="mt-4 border px-4 py-1 rounded"
        >
          ❤️ {post.likes?.length || 0}
        </button>
      )}

      <CommentSection postId={id} />
    </div>
  );
}
