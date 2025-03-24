import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch post details
  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get(`http://localhost:2800/api/posts/${postId}`)
      .then((response) => {
        if (response.data) {
          setPost(response.data);
          // Fetch related posts
          fetchRelatedPosts(response.data.category); 
        } else {
          setError("Post not found.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching post details:", error);
        setError("Failed to load post details.");
        setLoading(false);
      });
  }, [postId]);

  // Fetch related posts based on a category or tags
  const fetchRelatedPosts = (category) => {
    axios
      .get(`http://localhost:2800/api/posts?category=${category}`)
      .then((response) => {
        setRelatedPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching related posts:", error);
      });
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading post...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!post) {
    return <p className="text-center text-gray-500">Post not found.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold">{post.title}</h2>
      <p className="text-sm text-gray-700 mt-2">{post.user?.name || "Unknown Author"}</p>

      <div className="mt-4">
        <h3 className="text-xl font-semibold">Content:</h3>
        <p className="text-gray-800 mt-2">{post.content}</p>
        <p className="text-sm text-gray-700 mt-1 truncate">
          {post.user?.name || "Unknown Author"}
        </p>
      </div>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold">Related Posts:</h3>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedPosts.map((relatedPost) => (
              <div key={relatedPost._id} className="border p-4 rounded-lg shadow-lg">
                <h4 className="text-lg font-semibold">{relatedPost.title}</h4>
                <p className="text-sm text-gray-500 mt-2">
                  {relatedPost.user?.name || "Unknown Author"}
                </p>
                <p className="text-gray-700 mt-2 truncate">{relatedPost.content}</p>
                <button
                  className="mt-3 text-blue-500 hover:underline"
                  onClick={() => window.location.href = `/post/${relatedPost._id}`}
                >
                  Read More
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
