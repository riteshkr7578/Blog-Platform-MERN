import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import api from "../api/axios";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Technology");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const submitPost = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    if (image) formData.append("image", image);

    await api.post("/posts", formData);
    alert("Post saved as draft");
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <section className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border px-6 py-8">
        
        {/* Header */}
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
          Create New Post
        </h1>

        {/* Title */}
        <input
          className="w-full text-2xl font-semibold border-b focus:outline-none focus:border-blue-500 pb-2 mb-6 placeholder-gray-400"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Featured Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="block w-full text-sm text-gray-600"
          />

          {preview && (
            <img
              src={preview}
              className="mt-4 h-52 w-full object-cover rounded-lg border"
              alt="preview"
            />
          )}
        </div>

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
        <div className="mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Category
          </label>
          <select
            className="border rounded-lg px-4 py-2 w-60 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Technology</option>
            <option>Lifestyle</option>
            <option>Business</option>
            <option>Health</option>
            <option>Others</option>
          </select>
        </div>

        {/* Action */}
        <div className="flex justify-end">
          <button
            onClick={submitPost}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Save Draft
          </button>
        </div>

      </div>
    </section>
  );
}
