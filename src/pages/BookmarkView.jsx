import React, { useEffect, useState } from 'react'
import FeedItem from '../components/FeedItem';
import axios from 'axios';

const BookmarkView = () => {

  const [bookmarkedpPosts, setBookmarkedpPosts] = useState([]);

  // Fetch posts when the component mounts or the trend ID changes
  useEffect(() => {
    const getFeed = async () => {
      try {
        const response = await axios.get("/api/posts/bookmarks");
        console.log('data', response.data);
        setBookmarkedpPosts(response.data); // Set the fetched posts to the state
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    getFeed(); // Call the function
  }, []); 


  return (

    <div className="max-w-7xl mx-auto grid grid-cols-4 gap-4">
    {/* Main Center Section */}
    <div className="main-center col-span-3 space-y-4">

            <div className="p-4 bg-white border border-gray-200 rounded-lg">
          <h2 className="text-xl">Bookmarks</h2>
    </div>
    <div>
      {bookmarkedpPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white border border-gray-200 rounded-lg my-4 first:mt-0"
          >
            <FeedItem post={post} />
          </div>
        ))}
    </div>
    </div>
    </div>
  )
}

export default BookmarkView