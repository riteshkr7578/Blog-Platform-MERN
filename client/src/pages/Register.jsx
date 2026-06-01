import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/auth/register", form);
    alert("Registration successful");
    navigate("/login");
  };

  return (
    <section className="flex items-center justify-center min-h-screen px-4 bg-gray-50">
      <form
        onSubmit={submit}
        className="w-full max-w-md p-8 bg-white border shadow-sm rounded-xl"
      >
        {/* Header */}
        <h2 className="mb-2 text-3xl font-extrabold text-center text-gray-900">
          Create Account
        </h2>
        <p className="mb-6 text-sm text-center text-gray-500">
          Sign up to start writing on BlogApp
        </p>

        {/* Name */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            Name
          </label>
          <input
            name="name"
            placeholder="Your full name"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            Email
          </label>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            Password
          </label>
          <input
            name="password"
            type="password"
            placeholder="••••••••"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Register
        </button>

        {/* Footer */}
        <p className="mt-6 text-sm text-center text-gray-500">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="font-semibold text-blue-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </section>
  );
}
