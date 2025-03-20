import React from "react";

const UpdateDeletePost = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold">Update/Delete Post</h2>
      <ul>
        <li>
          📌 Post 1 
          <button className="bg-green-500 text-white px-2 py-1 ml-2">Edit</button>
          <button className="bg-red-500 text-white px-2 py-1 ml-2">Delete</button>
        </li>
        <li>
          📌 Post 2 
          <button className="bg-green-500 text-white px-2 py-1 ml-2">Edit</button>
          <button className="bg-red-500 text-white px-2 py-1 ml-2">Delete</button>
        </li>
      </ul>
    </div>
  );
};

export default UpdateDeletePost;
