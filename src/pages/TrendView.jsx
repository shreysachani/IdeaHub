import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Trends from '../components/Trends';
import FeedItem from '../components/FeedItem';

const TrendView = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getFeed = async () => {
      try {
        const response = await axios.get(`/api/posts?trend=${id}`);
        console.log('data', response.data);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    getFeed();
  }, [id]);

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-4 gap-4">
      {/* Main Center Section */}
      <div className="main-center col-span-3 space-y-4">
        {/* Trend Title */}
        <div className="p-4 bg-white border border-gray-200 rounded-lg">
          <h2 className="text-xl">Trend: #{id}</h2>
        </div>

        {posts.length === 0 
          &&
          <div className="flex justify-center items-center p-4 bg-white border border-gray-200 rounded-lg h-96">
            <div className="text-center">
              {/* <h2 className="text-xl"> Oops !!! </h2> */}
              <div className='text-lg'> No Bookmarks added </div>
            </div>
          </div>
        }

        {/* Feed Items */}
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white border border-gray-200 rounded-lg"
          >
            <FeedItem post={post} />
          </div>
        ))}
      </div>

      {/* Right Sidebar Section */}
      <div className="main-right col-span-1 space-y-4">
        <Trends />
      </div>
    </div>
  );
};

export default TrendView;
