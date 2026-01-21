import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden border hover:shadow-lg transition">
      
      {post.image && (
        <img
          src={`http://localhost:5000${post.image}`}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-4">
        <span className="text-xs uppercase tracking-wide text-gray-500">
          {post.category}
        </span>

        <h2 className="mt-1 text-lg font-semibold line-clamp-2">
          {post.title}
        </h2>

        <Link
          to={`/post/${post._id}`}
          className="inline-block mt-3 text-sm text-blue-600 hover:underline"
        >
          Read article →
        </Link>
      </div>
    </div>
  );
}
