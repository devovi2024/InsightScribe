import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SubCategories = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loadingSubcategories, setLoadingSubcategories] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [error, setError] = useState(null);
  const [postError, setPostError] = useState(null);

  // Fetch subcategories
  useEffect(() => {
    axios.get("http://localhost:2800/api/subcategories")
      .then((response) => {
        setSubcategories(response.data);
        setLoadingSubcategories(false);

        // Set the first subcategory as the default selected one
        if (response.data.length > 0) {
          setSelectedSubcategory(response.data[0]._id);
        }
      })
      .catch((error) => {
        console.error("Error fetching subcategories:", error);
        setError("Failed to load subcategories.");
        setLoadingSubcategories(false);
      });
  }, []);

  // Fetch posts when a subcategory is selected
  useEffect(() => {
    if (!selectedSubcategory) return;

    setLoadingPosts(true);
    setPostError(null);

    // Correct API URL for fetching posts by subcategory ID
    axios.get(`http://localhost:2800/api/posts/subcategory/${selectedSubcategory}/posts`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setPostError("Failed to load posts.");
      })
      .finally(() => setLoadingPosts(false));
  }, [selectedSubcategory]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-100 p-4 h-screen overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Subcategories</h2>

        {loadingSubcategories ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <ul>
            {subcategories.map((sub) => (
              <li
                key={sub._id}
                className={`cursor-pointer p-2 rounded ${selectedSubcategory === sub._id ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`}
                onClick={() => setSelectedSubcategory(sub._id)}
              >
                {sub.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Main Section */}
      <div className="w-3/4 p-4">
        <h2 className="text-xl font-semibold mb-4">
          {selectedSubcategory ? "Posts for Selected Subcategory" : "Select a Subcategory"}
        </h2>

        {loadingPosts ? (
          <p className="text-gray-600">Loading posts...</p>
        ) : postError ? (
          <p className="text-red-500">{postError}</p>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <div key={post._id} className="border p-4 rounded shadow">
                <h3 className="text-lg font-bold mt-2">{post.title}</h3>
                <p className="text-sm text-gray-700 mt-1 truncate">{post.content}</p>
                <p className="text-sm text-gray-700 mt-1 truncate">
                  {post.user?.name || "Unknown Author"}
                </p>
                <Link
                  to={`/post/${post._id}`}
                  className="text-blue-500 hover:underline mt-2 block"
                >
                  Read more
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default SubCategories;
