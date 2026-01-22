import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); 
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", form);
      login(res.data);
      navigate("/");
    } catch (err) {
     
      setError(
        err.response?.data?.message || "Invalid email or password"
      );
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm border"
      >
        <h2 className="text-3xl font-extrabold mb-2 text-center text-gray-900">
          Welcome Back
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Login to continue to BlogApp
        </p>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-2 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Email
          </label>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Password
          </label>
          <input
            name="password"
            type="password"
            placeholder="••••••••"
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </section>
  );
}
