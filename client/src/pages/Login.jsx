import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axiosInstance";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data } = await API.post("/users/login", user);

      // Store token and user ID
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);

      alert("✅ Login successful!");
      navigate("/");

      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (err) {
      setError(err.response?.data?.message || "❌ Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white p-6 rounded-lg shadow-md w-96" onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold mb-4 text-center">🔑 Login</h2>
        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
        
        <input
          className="w-full p-2 mb-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          type="email"
          placeholder="📧 Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
        />
        
        <input
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          type="password"
          placeholder="🔒 Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          required
        />
        
        <button
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
