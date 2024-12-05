import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PeopleYouMayKnow from '../components/PeopleYouMayKnow';
import Trends from '../components/Trends';
import FeedItem from '../components/FeedItem';
import FeedForm from '../components/FeedForm';

import { useSelector, useDispatch } from 'react-redux';
import { initStore, setToken, removeToken, setUserInfo, refreshToken } from '../stores/userSlice';
import { showToast } from '../stores/toastSlice';

const ProfileView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [posts, setPosts] = useState([]);
  const [userState, setUserState] = useState({ id: '', name: '', friends_count: 0, posts_count: 0, get_avatar: '' });

  useEffect(() => {
    getFeed();
  }, [id, posts]);

  const getFeed = async () => {
    try {
      const response = await axios.get(`/api/posts/profile/${id}/`);
      setPosts(response.data.posts);
      setUserState(response.data.user);
    } catch (error) {
      console.error('Error fetching feed:', error);
    }
  };

  const deletePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));  // Update state to remove the post immediately
  };

  const sendDirectMessage = async () => {
    try {
      const response = await axios.get(`/api/chat/${id}/get-or-create/`);
      console.log(response.data);
      navigate('/chat');
    } catch (error) {
      console.error('Error sending direct message:', error);
    }
  };

  const logout = () => {
    console.log('Log out');
    dispatch(removeToken());
    navigate('/login');
  };

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-4 gap-4">
      <div className="main-left col-span-1 h-min">
        <div className="p-4 bg-white border border-gray-200 text-center rounded-lg">
          <img src={userState.get_avatar} alt="User Avatar" className="mb-6 rounded-full mx-auto" />
          <p>
            <strong>{userState.name}</strong>
          </p>

          {/* {userState.id && (
            <div className="mt-6 flex space-x-8 justify-around">
              <a href={`/friends/${userState.id}`} className="text-xs text-gray-500">
                {userState.friends_count} friends
              </a>
              <p className="text-xs text-gray-500">{userState.posts_count} posts</p>
            </div>
          )} */}

          <div className="mt-6">
            {userState.id !== user.id && (
              <button
                className="inline-block mt-4 py-4 px-3 bg-theme text-xs text-white rounded-lg"
                onClick={sendDirectMessage}
              >
                Send direct message
              </button>
            )}

            {userState.id === user.id && (
              <>
                <button
                  className="inline-block mr-2 py-4 px-6 bg-gray-600 text-white rounded-lg"
                  onClick={() => navigate('/profile/edit')}
                >
                  Edit
                </button>
                <button
                  className="inline-block py-4 px-3 bg-red-600 text-white rounded-lg"
                  onClick={logout}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="main-center col-span-2 space-y-4">
        {userState.id === user.id && (
          <div className="bg-white border border-gray-200 rounded-lg">
            <FeedForm user={user} posts={posts} />
          </div>
        )}

        {posts.map((post) => (

          <div key={post.id} className="bg-white border border-gray-200 rounded-lg">
            <FeedItem post={post} onDeletePost={deletePost} />
          </div>
        ))}
      </div>

      <div className="main-right col-span-1 space-y-4">
        <Trends />
      </div>
    </div>
  );
};

export default ProfileView;
