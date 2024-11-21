import React from "react";
import { Link } from "react-router-dom"; // React Router's equivalent for RouterLink

const CommentItem = ({ comment }) => {
  return (
    <div>
      {/* Header: Avatar, User Info, and Timestamp */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          {/* User Avatar */}
          <img
            src={comment.created_by.get_avatar}
            alt={`${comment.created_by.name}'s avatar`}
            className="w-[40px] rounded-full"
          />
          {/* User Name */}
          <p>
            <strong>
              <Link
                to={`/profile/${comment.created_by.id}`} // Dynamically generate the profile link
                className="text-purple-600 hover:underline"
              >
                {comment.created_by.name}
              </Link>
            </strong>
          </p>
        </div>

        {/* Comment Timestamp */}
        <p className="text-gray-600">{comment.created_at_formatted} ago</p>
      </div>

      {/* Comment Body */}
      <p>{comment.body}</p>
    </div>
  );
};

export default CommentItem;
