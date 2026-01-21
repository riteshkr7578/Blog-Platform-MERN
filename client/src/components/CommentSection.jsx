import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function CommentSection({ postId }) {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch comments
  useEffect(() => {
    api.get(`/comments/${postId}`).then(res => {
      setComments(res.data);
    });
  }, [postId]);

  // Add comment
  const addComment = async () => {
    if (!text.trim()) return;

    setLoading(true);
    const res = await api.post(`/comments/${postId}`, {
      content: text
    });

    setComments([...comments, res.data]);
    setText("");
    setLoading(false);
  };

  // Delete comment
  const deleteComment = async (id) => {
    await api.delete(`/comments/${id}`);
    setComments(comments.filter(c => c._id !== id));
  };

  return (
    <div className="mt-8">
      <h3 className="font-semibold mb-3">Comments</h3>

      {/* ADD COMMENT */}
      {user ? (
        <div className="mb-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a comment..."
            className="w-full border rounded p-2 text-sm"
            rows={3}
          />

          <button
            onClick={addComment}
            disabled={loading}
            className="mt-2 bg-black text-white px-4 py-1 rounded text-sm hover:opacity-90"
          >
            {loading ? "Posting..." : "Post Comment"}
          </button>
        </div>
      ) : (
        <p className="text-sm text-gray-500">
          Login to add a comment.
        </p>
      )}

      {/* COMMENTS LIST */}
      {comments.length === 0 && (
        <p className="text-sm text-gray-500">No comments yet.</p>
      )}

      <div className="space-y-3">
        {comments.map(comment => (
          <div
            key={comment._id}
            className="border rounded p-2"
          >
            <p className="text-sm">{comment.content}</p>

            {user && user.id === comment.author && (
              <button
                onClick={() => deleteComment(comment._id)}
                className="text-xs text-red-500 mt-1"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
