import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Category = ({ onCategoryCreated }) => {
  const [name, setName] = useState("");
  const [levelNo, setLevelNo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !levelNo.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:2800/api/categories", {
        name,
        level_no: parseInt(levelNo, 10),
      });

      toast.success("Category created successfully!");
      setName("");
      setLevelNo("");

      if (onCategoryCreated) {
        onCategoryCreated(response.data); 
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Create Category</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Category Name</label>
            <input
              type="text"
              placeholder="Enter category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
            Create Category
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};


Category.propTypes = {
  onCategoryCreated: PropTypes.func, 
};

export default Category;
