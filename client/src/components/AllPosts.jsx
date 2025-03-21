import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
        setError("Failed to load posts");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <div>
        <div className="mt-8 border-2 border-gray-400 rounded-lg p-4 text-lg font-bold text-gray-700 italic text-center shadow-sm">
          📊 Total Posts: {posts.length}
        </div>
      </div>

      <h1 className="mt-10 text-3xl font-bold text-gray-800 mb-6">📌 All Posts</h1>

      {posts.length ? (
        <Slider {...settings}>
          {posts.map(({ _id, title, category, subcategory, createdAt, user }) => (
            <div key={_id} className="p-4 bg-white rounded-lg shadow-md mx-2">
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="text-gray-600 mt-1">
                {category?.name || "Uncategorized"} &gt; {subcategory?.name || "N/A"}
              </p>
              <p className="text-sm text-gray-500">📅 {new Date(createdAt).toLocaleString()}</p>
              <p className="text-gray-700 font-medium">✍️ {user?.name || "Unknown"}</p>
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-gray-500 text-center">No posts available</p>
      )}
    </div>
  );
};

export default AllPosts;
