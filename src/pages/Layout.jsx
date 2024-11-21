import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation } from "react-router-dom";
import { initStore } from "../stores/userSlice";
import axios from "axios";
import { FiMenu, FiX } from "react-icons/fi";

const Layout = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Initialize store and set authorization header
  useEffect(() => {
    dispatch(initStore());
    if (user.access) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + user.access;
    }
  }, [dispatch, user.access]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const isActiveLink = (path) => location.pathname === path;

  return (
    <>
      <nav className="bg-white shadow-md border-b border-gray-200 sticky">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Left Section: Logo */}
            <Link to="/" className="text-xl font-bold text-gray-800 ">
              <img src="/ideahub.png" alt="IdeaHub" className="h-10 mr-2" />
            </Link>

            {/* Center Section: Navigation Links */}
            <div className="hidden lg:flex space-x-8">
              {user.isAuthenticated && (
                <>
                  <Link
                    to="/"
                    className={`font-medium transition ${
                      isActiveLink("/") ? "text-theme" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Feed
                  </Link>
                  <Link
                    to="/notifications"
                    className={`font-medium transition ${
                      isActiveLink("/notifications")
                        ? "text-theme"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Notifications
                  </Link>
                  <Link
                    to="/search"
                    className={`font-medium transition ${
                      isActiveLink("/search") ? "text-theme" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Search
                  </Link>
                </>
              )}
            </div>

            {/* Right Section: User Actions */}
            <div className="flex items-center space-x-4">
              {user.isAuthenticated ? (
                <Link to={`/profile/${user.id}`} className="flex items-center">
                  <img
                    src={user.avatar || "/default-avatar.png"}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-purple-500"
                  />
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="hidden md:inline-block px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    className="hidden md:inline-block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                  >
                    Sign up
                  </Link>
                </>
              )}

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden text-gray-600 hover:text-gray-900 transition"
                onClick={toggleMobileMenu}
              >
                {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-gray-50 border-t border-gray-200 shadow-md">
            <div className="px-6 py-4">
              {user.isAuthenticated ? (
                <>
                  <Link
                    to="/feed"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-2 ${
                      isActiveLink("/feed") ? "text-purple-700 font-semibold" : "text-gray-600"
                    }`}
                  >
                    Feed
                  </Link>
                  <Link
                    to="/notifications"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-2 ${
                      isActiveLink("/notifications")
                        ? "text-purple-700 font-semibold"
                        : "text-gray-600"
                    }`}
                  >
                    Notifications
                  </Link>
                  <Link
                    to="/search"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-2 ${
                      isActiveLink("/search") ? "text-purple-700 font-semibold" : "text-gray-600"
                    }`}
                  >
                    Search
                  </Link>
                  <Link
                    to={`/profile/${user.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 text-gray-600"
                  >
                    Profile
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 bg-gray-600 text-white rounded-lg text-center hover:bg-gray-700 transition"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 bg-purple-600 text-white rounded-lg text-center hover:bg-purple-700 transition"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="px-6 lg:px-8 py-8 bg-gray-100">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
