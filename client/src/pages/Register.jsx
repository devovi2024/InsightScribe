import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axiosInstance";

const Register = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/users/register", user);
      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white p-6 rounded-lg shadow-md w-96" onSubmit={handleRegister}>
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input className="w-full p-2 mb-2 border rounded" type="text" placeholder="Name" 
               onChange={(e) => setUser({ ...user, name: e.target.value })} required />
        <input className="w-full p-2 mb-2 border rounded" type="email" placeholder="Email" 
               onChange={(e) => setUser({ ...user, email: e.target.value })} required />
        <input className="w-full p-2 mb-4 border rounded" type="password" placeholder="Password" 
               onChange={(e) => setUser({ ...user, password: e.target.value })} required />
        <button className="w-full bg-blue-500 text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
};

export default Register;
