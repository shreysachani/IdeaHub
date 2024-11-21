// src/components/FeedView.js
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import FeedForm from '../components/FeedForm';
import FeedItem from '../components/FeedItem';
import PeopleYouMayKnow from '../components/PeopleYouMayKnow';
import Trends from '../components/Trends';

const FeedView = () => {
  const [posts, setPosts] = useState([]);
  const [body, setBody] = useState(''); // Assuming body is for some form submission

  useEffect(() => {
    getFeed();
  }, []);

  const getFeed = async () => {
    try {
      const response = await axios.get('/api/posts/');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts', error);
    }
  };

  const deletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-4 gap-4">
      <div className="main-center col-span-3 space-y-4">
        <div className="bg-white border border-gray-200 rounded-lg">
          <FeedForm user={null} posts={posts} setPosts={setPosts} />
        </div>

        {posts.map(post => (
          <div
            key={post.id}
            className="bg-white border border-gray-200 rounded-lg"
          >
            <FeedItem post={post} deletePost={deletePost} />
          </div>
        ))}
      </div>

      <div className="main-right col-span-1 space-y-4">
        {/* <PeopleYouMayKnow /> */}
        <Trends />
      </div>
    </div>
  );
};

export default FeedView;
