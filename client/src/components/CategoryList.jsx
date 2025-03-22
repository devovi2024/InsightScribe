import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [name, setName] = useState("");
  const [levelNo, setLevelNo] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:2800/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load categories 😢");
    }
    setLoading(false);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setName(category.name);
    setLevelNo(category.level_no.toString());
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name.trim() || !levelNo.trim()) {
      toast.error("Please fill in all fields. 😢");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:2800/api/categories/${selectedCategory._id}`,
        { name, level_no: parseInt(levelNo, 10) }
      );
      setCategories((prev) =>
        prev.map((cat) => (cat._id === response.data._id ? response.data : cat))
      );
      toast.success("Category updated successfully! 🎉");
      setSelectedCategory(null);
      setName("");
      setLevelNo("");
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Something went wrong 😢");
    }
    setLoading(false);
  };

  // Handle Delete Category 
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          await axios.delete(`http://localhost:2800/api/categories/${id}`);
          setCategories((prev) => prev.filter((cat) => cat._id !== id));
          Swal.fire("Deleted!", "Category has been deleted.", "success");
        } catch (error) {
          console.error("Delete error:", error);
          Swal.fire("Error!", "Failed to delete category 😢", "error");
        }
        setLoading(false);
      }
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center my-4">Category Manager</h1>
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : selectedCategory ? (
        <div className="flex justify-center">
          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Update Category</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium">Category Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Level No</label>
                <input
                  type="number"
                  value={levelNo}
                  onChange={(e) => setLevelNo(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              <div className="flex justify-between">
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md">
                  {loading ? "Updating..." : "Update"}
                </button>
                <button
                  type="button"
                  className="bg-gray-400 text-white px-4 py-2 rounded-md"
                  onClick={() => setSelectedCategory(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <ul className="border rounded-lg p-4">
          {categories.length > 0 ? (
            categories.map((category) => (
              <li key={category._id} className="flex justify-between p-2 border-b">
                <span>{category.name} - Level {category.level_no}</span>
                <div className="space-x-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => handleEdit(category)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(category._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500 text-xl font-bold">
            No categories found 
            <span className="text-3xl animate-pulse text-red-500">😢</span>
            </p>


          )}
        </ul>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default CategoryList;
