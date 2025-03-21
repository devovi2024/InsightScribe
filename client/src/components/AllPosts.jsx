import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Function to calculate read time (Assuming 200 words per minute)
const calculateReadTime = (text) => {
  const wordsPerMinute = 200;
  const words = text ? text.split(/\s+/).length : 0;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes > 1 ? `${minutes} min read` : "1 min read";
};

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:2800/api/posts")
      .then((res) => setPosts(Array.isArray(res.data) ? res.data : []))
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading posts...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: posts.length < 3 ? posts.length : 3, // Avoid empty slides
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, slidesToScroll: 1, centerMode: false },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, slidesToScroll: 1, centerMode: false },
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <div className="mt-8 border-2 border-gray-400 rounded-lg p-4 text-lg font-bold text-gray-700 italic text-center shadow-sm">
        📊 Total Posts: {posts.length}
      </div>

      <h1 className="mt-10 text-3xl font-bold text-gray-800 mb-6 text-center">📌 All Posts</h1>

      {posts.length > 0 ? (
        <div className="relative">
          <Slider {...settings}>
            {posts.map(({ _id, title, category, subcategory, createdAt, user, content }) => (
              <div key={_id} className="p-6">
                <div className="bg-white rounded-lg shadow-md p-6 text-center h-64 flex flex-col justify-between">
                  <h2 className="text-xl font-semibold">{title}</h2>
                  <p className="text-gray-600 mt-1">
                    {category?.name || "Uncategorized"} &gt; {subcategory?.name || "N/A"}
                  </p>
                  <p className="text-sm text-gray-500">📅 {new Date(createdAt).toLocaleString()}</p>
                  <p className="text-gray-700 font-medium">✍️ {user?.name || "Unknown"}</p>
                  <p className="text-sm text-blue-500 font-medium mt-2">⏳ {calculateReadTime(content)}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-4">No posts available</p>
      )}
    </div>
  );
};

export default AllPosts;
