import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axiosInstance";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

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

      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Welcome back! loading...",
        showConfirmButton: false,
        timer: 2000,
      });

      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "❌ Login failed. Please try again.");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <motion.form
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-lg w-96"
        onSubmit={handleLogin}
      >
        <h2 className="text-3xl font-bold mb-4 text-center text-blue-600">🔑 Login</h2>
        {error && <p className="text-red-500 text-center mb-2">{error}</p>}

        <input
          className="w-full p-3 mb-3 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          type="email"
          placeholder="📧 Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
        />

        <input
          className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          type="password"
          placeholder="🔒 Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          required
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-blue-500 text-white p-3 rounded-lg font-bold hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </motion.button>
      </motion.form>
    </div>
  );
};

export default Login;
