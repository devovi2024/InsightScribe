import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:2800/api/users/logout", {}, { withCredentials: true });
      setIsAuthenticated(false);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error.response?.data?.message);
    }
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="text-xl font-bold">
            <Link to="/">InsightScribe</Link>
          </div>

          {/* Menu Items (Desktop) */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-gray-300">Home</Link>
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="hover:text-gray-300">Login</Link>
                <Link to="/register" className="hover:text-gray-300">Register</Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
                <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md">Logout</button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 py-2">
          <Link to="/" className="block px-4 py-2 hover:bg-gray-700">Home</Link>
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="block px-4 py-2 hover:bg-gray-700">Login</Link>
              <Link to="/register" className="block px-4 py-2 hover:bg-gray-700">Register</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-700">Dashboard</Link>
              <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-700">Logout</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
