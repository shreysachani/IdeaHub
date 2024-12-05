import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsHandThumbsUp, BsHandThumbsDown, BsThreeDotsVertical } from "react-icons/bs";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa6";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
 
// Utility function to parse hashtags and return HTML string
const parseHashtags = (text) => {
  const regex = /#(\w+)/g;
  // Replace hashtags with <a> tags
  let parsedText = text.replace(regex, (match, hashtag) => {
    return `<a href="/trends/${hashtag}" class="text-blue-500 hover:underline">#${hashtag}</a>`;
  });
 
  // Ensure proper list formatting is preserved (ul, ol, li)
  parsedText = parsedText.replace(/<ul>/g, '<ul class="list-disc pl-6">');  // Add custom class for unordered lists
  parsedText = parsedText.replace(/<ol>/g, '<ol class="list-decimal pl-6">');  // Add custom class for ordered lists
  parsedText = parsedText.replace(/<li>/g, '<li class="">');  // Add margin to list items
 
  return parsedText;
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
 
const FeedItem = ({ post, onDeletePost }) => {
  const [showExtraModal, setShowExtraModal] = useState(false);
  const [localPost, setLocalPost] = useState(post); // Local state for the post
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

 
  const showToast = (message, type = "success") => {
    dispatch({
      type: "toast/showToast",
      payload: { ms: 3000, message, classes: `toast-${type}` },
    });
  };
 
  const likePost = async (id) => {
    try {
      const response = await axios.post(`/api/posts/${id}/like/`);
      if (response.data.message === "like created") {
        if (localPost.dislikes_count > 0) {
          setLocalPost((prevPost) => ({
            ...prevPost,
            dislikes_count: prevPost.dislikes_count - 1,
            likes_count: prevPost.likes_count + 1,
          }));
        } else {
          setLocalPost((prevPost) => ({
            ...prevPost,
            likes_count: prevPost.likes_count + 1,
          }));
        }
      } else {
        showToast(response.data.message, "info");
      }
    } catch (error) {
      showToast("Error liking post.", "error");
    }
  };
 
  const dislikePost = async (id) => {
    try {
      const response = await axios.post(`/api/posts/${id}/dislike/`);
      if (response.data.message === "Post Dislike") {
        if (localPost.likes_count > 0) {
          setLocalPost((prevPost) => ({
            ...prevPost,
            likes_count: prevPost.likes_count - 1,
            dislikes_count: prevPost.dislikes_count + 1,
          }));
        } else {
          setLocalPost((prevPost) => ({
            ...prevPost,
            dislikes_count: prevPost.dislikes_count + 1,
          }));
        }
        showToast("You disliked the post!", "success");
      }
    } catch (error) {
      showToast("Error disliking post.", "error");
    }
  };
 
  const bookmarkPost = async (id) => {
    try {
      const response = await axios.post(`/api/posts/bookmark/${id}/`);
      if (response.data.message === "Bookmark created") {
        setLocalPost((prevPost) => ({
          ...prevPost,
          is_bookmarked: true,
        }));
      } else if (response.data.message === "Bookmark removed") {
        setLocalPost((prevPost) => ({
          ...prevPost,
          is_bookmarked: false,
        }));
      }
    } catch (error) {
      showToast("Error bookmarking post.", "error");
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
      onDeletePost(post.id);
    } catch (error) {
      showToast("Error deleting post.", "error");
    }
  };
 
  const toggleExtraModal = () => {
    setShowExtraModal((prev) => !prev);
  };
 
  return (
    <div className="bg-white rounded-lg shadow-md p-6 relative">
      {/* Header */}
      <div className="flex justify-between mb-4">
        <div className="flex items-center space-x-4">
          <img
            src={localPost.created_by.get_avatar}
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <Link
              to={`/profile/${localPost.created_by.id}`}
              className="font-semibold text-gray-800"
            >
              {localPost.created_by.name}
            </Link>
            <p className="text-sm text-gray-500">{localPost.created_at_formatted} ago</p>
          </div>
        </div>
        {user?.id === post.created_by.id && (
          <button
            onClick={toggleExtraModal}
            className="text-gray-600 hover:text-blue-500 flex items-start"
          >
            <BsThreeDotsVertical />
          </button>
        )}
      </div>
      

       {/* Body with parsed hashtags */}
      <div
        className="formatted-content text-gray-700 mb-4"
        dangerouslySetInnerHTML={{ __html: parseHashtags(localPost.body) }}
      ></div>
 
      {/* Attachments */}
      {localPost.attachments.length > 0 && (
        <div className="mb-4">
          {localPost.attachments.map((image) => (
            <img
              key={image.id}
              src={image.get_image}
              alt="attachment"
              className="rounded-lg mb-4"
            />
          ))}
        </div>
      )}
 
      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          {/* Like */}
          <button
            onClick={() => likePost(localPost.id)}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-500"
          >
            <BsHandThumbsUp className="w-6 h-6" />
            <span>{localPost.likes_count} likes</span>
          </button>
 
          {/* Dislike */}
          <button
            onClick={() => dislikePost(localPost.id)}
            className="flex items-center space-x-2 text-gray-600 hover:text-red-500"
          >
            <BsHandThumbsDown className="w-6 h-6" />
            <span>{localPost.dislikes_count} dislikes</span>
          </button>
 
          {/* Comments */}
          <Link
            to={`/postview/${localPost.id}`}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-500"
          >
            <span>{localPost.comments_count} comments</span>
          </Link>
        </div>
 
        {/* Bookmark */}
        <button
          onClick={() => bookmarkPost(localPost.id)}
          className={`flex items-center space-x-2`}
        >
          {localPost.is_bookmarked ? (
            <FaBookmark className="w-6 h-6 text-theme" />
          ) : (
            <CiBookmark className="w-6 h-6" />
          )}
        </button>
      </div>
 
      {showExtraModal && (
        <div className="absolute right-[-75px] top-5 z-10 bg-white shadow-lg rounded-lg flex flex-col border">
          <Link to="/edit/id" onClick={handleOpen} className="text-green-500 py-3 px-6 border-b-2">
            Edit
          </Link>
          <button onClick={deletePost} className="text-red-500 py-3 px-6 border-b-2">
            Delete
          </button>
          {/* <button onClick={reportPost} className="text-blue-500 px-6 py-3">
            Report
          </button> */}
        </div>
      )}
    </div>
  );
};
 
export default FeedItem;