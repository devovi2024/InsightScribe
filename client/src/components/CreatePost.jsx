import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Unauthorized!",
        text: "Please login first!",
        confirmButtonText: "OK"
      }).then(() => {
        navigate("/login");
      });
    }
  }, [token, navigate]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:2800/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch subcategories when category changes
  useEffect(() => {
    if (category) {
      const fetchSubcategories = async () => {
        try {
          const response = await axios.get(`http://localhost:2800/api/subcategories?category=${category}`);
          setSubcategories(response.data);
        } catch (error) {
          console.error("Error fetching subcategories:", error);
        }
      };
      fetchSubcategories();
    }
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userId) {
      Swal.fire({
        icon: "error",
        title: "Authentication Error",
        text: "User not authenticated!",
      });
      return;
    }

    try {
      const newPost = { title, content, category, subcategory, user: userId };
      const response = await axios.post("http://localhost:2800/api/posts", newPost, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Post Created Successfully!",
        });
        setTitle("");
        setContent("");
        setCategory("");
        setSubcategory("");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to create post",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">📝 Create a New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-2 border border-gray-300 rounded"
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Post Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <select
          className="w-full p-2 border border-gray-300 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
        <select
          className="w-full p-2 border border-gray-300 rounded"
          value={subcategory}
          onChange={(e) => setSubcategory(e.target.value)}
          required
          disabled={!category} 
        >
          <option value="">Select Subcategory</option>
          {subcategories.map((sub) => (
            <option key={sub._id} value={sub._id}>{sub.name}</option>
          ))}
        </select>
        <button
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600"
          type="submit"
        >
          🚀 Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
