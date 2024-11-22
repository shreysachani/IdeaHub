import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PeopleYouMayKnow from "../components/PeopleYouMayKnow";
import Trends from "../components/Trends";
import FeedItem from "../components/FeedItem";
import CommentItem from "../components/CommentItem";
import { useDispatch } from "react-redux";
import { showToast } from "../stores/toastSlice";

const PostView = () => {
  const { id } = useParams(); // Access dynamic route parameter
  const dispatch = useDispatch();

  const [post, setPost] = useState({
    id: null,
    comments: [],
  });
  const [body, setBody] = useState("");

  useEffect(() => {
    getPost();
  }, [id]); // Fetch the post whenever the route `id` changes

  const getPost = async () => {
    try {
      const response = await axios.get(`/api/posts/${id}/`);
      setPost(response.data.post);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  const submitForm = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await axios.post(`/api/posts/${id}/comment/`, {
        body: body,
      });

      // Update the post's comments and reset the input field
      setPost((prevPost) => ({
        ...prevPost,
        comments: [...prevPost.comments, response.data],
      }));
      setBody("");

      // Optional: Show a success toast
      dispatch(
        showToast({
          ms: 3000,
          message: "Comment added successfully!",
          classes: "bg-emerald-300",
        })
      );
    } catch (error) {
      console.error("Error submitting comment:", error);

      // Optional: Show an error toast
      dispatch(
        showToast({
          ms: 3000,
          message: "Failed to add comment.",
          classes: "bg-red-300",
        })
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-4 gap-4">
      {/* Main Center */}
      <div className="main-center col-span-3 space-y-4">
        {post.id && (
          <div className="bg-white border border-gray-200 rounded-lg">
            <FeedItem post={post} />
          </div>
        )}

        {post.comments.map((comment) => (
          <div
            key={comment.id}
            className="p-4 ml-6 bg-white border border-gray-200 rounded-lg"
          >
            <CommentItem comment={comment} />
          </div>
        ))}

        {/* Comment Form */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <form onSubmit={submitForm}>
            <div className="p-4">
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="p-4 w-full bg-gray-100 rounded-lg"
                placeholder="What do you think?"
              ></textarea>
            </div>

            <div className="p-4 border-t border-gray-100">
              <button
                type="submit"
                className="inline-block py-4 px-6 bg-theme text-white rounded-lg"
              >
                Comment
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Main Right */}
      <div className="main-right col-span-1 space-y-4">
        <PeopleYouMayKnow />
        <Trends />
      </div>
    </div>
  );
};

export default PostView;
