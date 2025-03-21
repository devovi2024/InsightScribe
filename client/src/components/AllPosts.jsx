import React, { useEffect, useState } from "react";
import axios from "axios";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:2800/api/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📌 All Posts</h1>
      {posts.length > 0 ? (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post._id} className="p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-900">{post.title}</h2>
              <p className="text-gray-600 mt-1">
                <span className="font-medium text-blue-500">{post.category?.name}</span> 
                {" "} &gt; <span className="font-medium text-green-500">{post.subcategory?.name}</span>
              </p>
              <p className="text-sm text-gray-500 mt-2">
                <i>Posted on {new Date(post.createdAt).toLocaleDateString()}</i>
              </p>
              <p className="text-gray-700 font-medium mt-2">
                ✍️ Author: <span className="text-purple-600">{post.user?.name || "Unknown"}</span>
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center">No posts available</p>
      )}
    </div>
  );
};

export default AllPosts;
