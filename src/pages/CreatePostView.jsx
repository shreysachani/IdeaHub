import React, { useState } from "react";
import PostForm from "../components/PostForm";

function CreatePostView() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="w-full max-w-3xl p-6 bg-gray-800 rounded-lg shadow-md">
         <h1 className="text-2xl font-bold mb-6 text-center">Create a Post</h1>
        <PostForm />
      </div>
    </div>
  );
}

export default CreatePostView;