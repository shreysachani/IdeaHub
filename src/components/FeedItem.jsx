import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
 // Toast component to show messages

const FeedItem = ({ post, userStore, onDeletePost }) => {
  const [showExtraModal, setShowExtraModal] = useState(false);

  // Helper to show toast
  const showToast = (message, type = "success") => {
    Toast.show({ message, type });
  };

  const likePost = async (id) => {
    try {
      const response = await axios.post(`/api/posts/${id}/like/`);
      if (response.data.message === "like created") {
        post.likes_count += 1;
        showToast("You liked the post!", "success");
      }
    } catch (error) {
      showToast("Error liking post.", "error");
    }
  };  

  const reportPost = async () => {
    try {
      const response = await axios.post(`/api/posts/${post.id}/report/`);
      showToast("The post was reported.", "success");
    } catch (error) {
      showToast("Error reporting post.", "error");
    }
  };

  const deletePost = async () => {
    try {
      await axios.delete(`/api/posts/${post.id}/delete/`);
      showToast("The post was deleted.", "success");
      onDeletePost(post.id); // Notify parent about deletion
    } catch (error) {
      showToast("Error deleting post.", "error");
    }
  };

  const toggleExtraModal = () => {
    setShowExtraModal(!showExtraModal);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <img
            src={post.created_by.get_avatar}
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <Link
              to={`/profile/${post.created_by.id}`}
              className="font-semibold text-gray-800"
            >
              {post.created_by.name}
            </Link>
            <p className="text-sm text-gray-500">{post.created_at_formatted} ago</p>
          </div>
        </div>
      </div>

      {/* Attachments */}
      {post.attachments.length > 0 && (
        <div className="mb-4">
          {post.attachments.map((image) => (
            <img
              key={image.id}
              src={image.get_image}
              alt="attachment"
              className="rounded-lg mb-4"
            />
          ))}
        </div>
      )}

      {/* Body */}
      <p className="text-gray-700 mb-4">{post.body}</p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        {/* Actions */}
        <div className="flex items-center space-x-6">
          {/* Like */}
          <button
            onClick={() => likePost(post.id)}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
            <span>{post.likes_count} likes</span>
          </button>

          {/* Comments */}
          <Link
            to={`/postview/${post.id}`}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
              />
            </svg>
            <span>{post.comments_count} comments</span>
          </Link>

          {/* Private Indicator */}
          {post.is_private && (
            <div className="flex items-center space-x-2 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
              <span>Private</span>
            </div>
          )}
        </div>

        {/* Extra Modal */}
        <div className="relative">
          <button onClick={toggleExtraModal} className="text-gray-600 hover:text-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
              />
            </svg>
          </button>

          {showExtraModal && (
            <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg">
              <button
                onClick={reportPost}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Report
              </button>
              {userStore.user.id === post.created_by.id && (
                <button
                  onClick={deletePost}
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                >
                  Delete
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedItem;
