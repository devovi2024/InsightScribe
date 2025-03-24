import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SubCategory = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [levelNo, setLevelNo] = useState("");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("http://localhost:2800/api/categories");
        console.log("Categories:", data); 
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to fetch categories.");
      }
    };
    fetchCategories();
  }, []);

  // Fetch subcategories
  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const { data } = await axios.get("http://localhost:2800/api/subcategories");
        console.log("Subcategories:", data);
        setSubcategories(data);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
        toast.error("Failed to fetch subcategories.");
      }
    };
    fetchSubcategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !category.trim() || !levelNo.trim()) {
      toast.error("All fields are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:2800/api/subcategories", {
        name,
        category,
        level_no: parseInt(levelNo, 10),
      });

      toast.success("Subcategory created successfully!");
      setSubcategories([...subcategories, response.data]); 
      setName("");
      setCategory("");
      setLevelNo("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-100 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Create Subcategory</h2>
      
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Subcategory Name</label>
          <input
            type="text"
            placeholder="Enter subcategory name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Level No</label>
          <input
            type="number"
            placeholder="Enter level number"
            value={levelNo}
            onChange={(e) => setLevelNo(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Create Subcategory
        </button>
      </form>

      {/* Subcategory List */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Existing Subcategories</h3>
        {subcategories.length > 0 ? (
          <ul className="space-y-2">
            {subcategories.map((sub) => (
              <li key={sub._id} className="bg-white p-3 rounded-md flex justify-between shadow">
                <span>{sub.name} (Level {sub.level_no})</span>
                <span className="text-gray-500 text-sm">{sub.category?.name || "No Category"}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No subcategories available.</p>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default SubCategory;
