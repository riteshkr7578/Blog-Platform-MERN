import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import api from "../api/axios";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Technology");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/posts/${id}`)
      .then(res => {
        if (!res.data) return;
        setTitle(res.data.title || "");
        setContent(res.data.content || "");
        setCategory(res.data.category || "Technology");
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-4">Loading...</p>;

  const updatePost = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    if (image) formData.append("image", image);

    await api.put(`/posts/${id}`, formData);
    navigate(`/post/${id}`);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Edit Post</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 mb-4"
      />

      <ReactQuill value={content} onChange={setContent} />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="mt-4 border p-2 w-full"
      >
        <option>Technology</option>
        <option>Lifestyle</option>
        <option>Business</option>
        <option>Health</option>
      </select>

      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        className="mt-4"
      />

      <button
        onClick={updatePost}
        className="mt-4 bg-black text-white px-4 py-2 rounded"
      >
        Update Post
      </button>
    </div>
  );
}
