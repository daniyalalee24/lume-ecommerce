import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API_URL from "../config/api";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      login(data.user, data.token);

      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-[80vh] items-center justify-center px-6 py-12 bg-white">
      <div className="w-full max-w-md">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">
            LUMÉ
          </p>

          <h1 className="mt-3 text-3xl font-light tracking-tight text-gray-900">
            Welcome back
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="name@example.com"
              className="mt-2 w-full appearance-none border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all duration-200 ease-in-out hover:border-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="mt-2 w-full appearance-none border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all duration-200 ease-in-out hover:border-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
            />
          </div>

          {error && (
            <div className="rounded-sm bg-red-50 p-3 border border-red-100">
              <p className="text-sm text-red-600 text-center font-medium">
                {error}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black px-6 py-4 text-sm font-medium uppercase tracking-widest text-white transition-all duration-200 ease-in-out hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-black underline decoration-gray-300 underline-offset-4 transition-colors hover:decoration-black"
          >
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Login;
