import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Ensure axios is imported
import Swal from "sweetalert2"; 

const Register = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:2800/api/users/register", user, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          text: "Please log in to continue.",
          confirmButtonColor: "#3085d6",
        });
        navigate("/login");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Registration failed.";
      setError(errorMessage);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white p-6 rounded-lg shadow-md w-96" onSubmit={handleRegister}>
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          className="w-full p-2 mb-2 border rounded"
          type="text"
          placeholder="Name"
          value={user.name}
          onChange={(e) => setUser((prev) => ({ ...prev, name: e.target.value }))}
          required
        />
        <input
          className="w-full p-2 mb-2 border rounded"
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))}
          required
        />
        <input
          className="w-full p-2 mb-4 border rounded"
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser((prev) => ({ ...prev, password: e.target.value }))}
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
