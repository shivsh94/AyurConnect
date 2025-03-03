import React, { useState } from "react";

const BlogPopup = ({ onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (title.trim() && content.trim()) {
      const newBlog = {
        id: Date.now(), // Unique ID based on timestamp
        title,
        snippet: content,
        image: "https://via.placeholder.com/150", // Placeholder image
      };
      onSubmit(newBlog); // Pass the new blog to the parent
      onClose(); // Close the popup
      setTitle(""); // Clear title
      setContent(""); // Clear content
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-black p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl mb-4">Write a New Blog</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Blog Title"
          className="w-full p-2 border border-gray-300 rounded-md mb-2"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your blog content here..."
          className="w-full h-32 p-2 border border-gray-300 rounded-md mb-4"
        />
        <div className="flex justify-between">
          <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded-md">
            Cancel
          </button>
          <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPopup;
