import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { initStore, setUserInfo, removeToken } from '../stores/userSlice';
import axios from 'axios';

const Layout = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  // Initialize store (similar to beforeCreate in Vue)
  useEffect(() => {
    dispatch(initStore());
    if (user.access) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + user.access;
    }
  }, [dispatch, user.access]);

  console.log(user)

  return (
    <>
      <nav className="py-3 px-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="menu-left">
              <Link to="#" className="text-lg">
                <span>Ideahub</span>
                {/* <img src="/ideahub.png" alt="" className='h-10'/> */}
              </Link>
            </div>

            <div className="menu-center flex space-x-12">
              {user.isAuthenticated && (
                <>
                  <Link to="/feed" className="text-purple-700">Feed</Link>
                  <Link to="/notifications">Notifications</Link>
                  <Link to="/search">Search</Link>
                </>
              )}
            </div>

            <div className="menu-right">
              {user.isAuthenticated ? (
                <Link to={`/profile/${user.id}`}>
                  <img src={user.avatar} className="w-12 rounded-full" alt="User Avatar" />
                </Link>
              ) : (
                <>
                  <Link to="/login" className="mr-4 py-4 px-6 bg-gray-600 text-white rounded-lg">Log in</Link>
                  <Link to="/signup" className="py-4 px-6 bg-purple-600 text-white rounded-lg">Sign up</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="px-8 py-6 bg-gray-100">
            <Outlet />
      </main>
    </>
  );
};

export default Layout;
