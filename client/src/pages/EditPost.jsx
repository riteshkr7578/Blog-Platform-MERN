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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading post...
      </div>
    );
  }

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
    <section className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border px-6 py-8">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Edit Post
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Update your article content and details
          </p>
        </div>

        {/* Title */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
          className="w-full text-2xl font-semibold border-b pb-2 mb-6 focus:outline-none focus:border-blue-500"
        />

        {/* Editor */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Content
          </label>
          <div className="rounded-lg overflow-hidden border">
            <ReactQuill value={content} onChange={setContent} />
          </div>
        </div>

        {/* Category */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-64 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Technology</option>
            <option>Lifestyle</option>
            <option>Business</option>
            <option>Health</option>
          </select>
        </div>

        {/* Image Upload */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Update Featured Image
          </label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="block text-sm text-gray-600"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 rounded-lg border text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </button>

          <button
            onClick={updatePost}
            className="px-8 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Update Post
          </button>
        </div>

      </div>
    </section>
  );
}
