import React from "react";

const ThumbnailUploader = ({ thumbnail, setThumbnail }) => {
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setThumbnail(file);
    } else {
      alert("Please upload a valid image file.");
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-1">Thumbnail</label>
      <div className="flex items-center space-x-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleThumbnailChange}
          className="block w-full text-sm text-gray-300 bg-gray-700 rounded-lg border border-gray-600 cursor-pointer"
        />
        {thumbnail && (
          <img
            src={URL.createObjectURL(thumbnail)}
            alt="Thumbnail Preview"
            className="w-16 h-16 rounded-lg object-cover"
          />
        )}
      </div>
    </div>
  );
};

export default ThumbnailUploader;
