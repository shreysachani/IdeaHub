import React, { useState } from "react";

const TagsInput = ({ tags, setTags }) => {
  const [input, setInput] = useState("");

  const handleAddTag = () => {
    if (input.trim() && !tags.includes(input)) {
      setTags([...tags, input.trim()]);
      setInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-1">Tags</label>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a tag"
          className="flex-grow px-4 py-2 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="button"
          onClick={handleAddTag}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg"
        >
          Add
        </button>
      </div>
      <div className="flex space-x-2 mt-2 flex-wrap">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full flex items-center space-x-2"
          >
            <span>{tag}</span>
            <button
              type="button"
              onClick={() => handleRemoveTag(tag)}
              className="text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagsInput;
