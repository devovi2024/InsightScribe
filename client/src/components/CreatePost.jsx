import React, { useState } from "react";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Creating post:", { title, content });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Create Post</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <input
          className="block w-full p-2 border"
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="block w-full p-2 border mt-2"
          placeholder="Post Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2 mt-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
