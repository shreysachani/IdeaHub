import React, { useState } from "react";
import ThumbnailUploader from "./ThumbnailUploader";
import TagsInput from "./TagsInput";

const PostForm = () => {
  const [postTitle, setPostTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!postTitle || !description || tags.length == 0) {
      setError("Post title, tags and description are required.");
      return;
    }

    console.log({
      postTitle,
      description,
      tags,
      thumbnail,
    });

    setError("");
    alert("Post submitted successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ThumbnailUploader thumbnail={thumbnail} setThumbnail={setThumbnail} />
      
      <div>
        <label className="block text-sm font-medium mb-1">Post Title</label>
        <input
          type="text"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          placeholder="Enter post title"
          className="w-full px-4 py-2 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter post description"
          className="w-full px-4 py-2 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 h-24"
        />
      </div>

      <TagsInput tags={tags} setTags={setTags} />

      <div>
        <label className="block text-sm font-medium mb-1">
          Attach Images (optional)
        </label>
        <input
          type="file"
          multiple
          className="block w-full text-sm text-gray-300 bg-gray-700 rounded-lg border border-gray-600 cursor-pointer"
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg font-medium"
      >
        Post
      </button>
    </form>
  );
};

export default PostForm;
