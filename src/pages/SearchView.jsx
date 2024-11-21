import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PeopleYouMayKnow from "../components/PeopleYouMayKnow";
import Trends from "../components/Trends";
import FeedItem from "../components/FeedItem";

const SearchView = () => {
  const [query, setQuery] = useState(""); // For search input
  const [users, setUsers] = useState([]); // To store user results
  const [posts, setPosts] = useState([]); // To store post results

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("submitForm", query);

    try {
      const response = await axios.post("/api/search/", { query });
      console.log("response:", response.data);
      setUsers(response.data.users);
      setPosts(response.data.posts);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-4 gap-4">
      {/* Main Left Section */}
      <div className="main-left col-span-3 space-y-4">
        {/* Search Bar */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <form onSubmit={handleFormSubmit} className="p-4 flex space-x-4">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="p-4 w-full bg-gray-100 rounded-lg"
              placeholder="What are you looking for?"
            />
            <button
              type="submit"
              className="inline-block py-4 px-6 bg-purple-600 text-white rounded-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </form>
        </div>

        {/* Users Section */}
        {users.length > 0 && (
          <div className="p-4 bg-white border border-gray-200 rounded-lg grid grid-cols-4 gap-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="p-4 text-center bg-gray-100 rounded-lg"
              >
                <img
                  src={user.get_avatar}
                  alt={`${user.name}'s avatar`}
                  className="mb-6 rounded-full"
                />
                <p>
                  <strong>
                    <Link to={`/profile/${user.id}`}>{user.name}</Link>
                  </strong>
                </p>
                <div className="mt-6 flex space-x-8 justify-around">
                  <p className="text-xs text-gray-500">{user.friends_count} friends</p>
                  <p className="text-xs text-gray-500">{user.posts_count} posts</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Posts Section */}
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-4 bg-white border border-gray-200 rounded-lg"
          >
            <FeedItem post={post} />
          </div>
        ))}
      </div>

      {/* Sidebar */}
      <div className="main-right col-span-1 space-y-4">
        <PeopleYouMayKnow />
        <Trends />
      </div>
    </div>
  );
};

export default SearchView;
