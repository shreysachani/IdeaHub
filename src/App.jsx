import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import Layout from "./pages/Layout";
import Signup from "./pages/Signup";
import FeedView from "./pages/FeedView";
import PostView from "./pages/PostView";
import LoginView from "./pages/LoginView"
import TrendView from "./pages/TrendView";
import SearchView from "./pages/SearchView";
import ProfileView from "./pages/ProfileView";
import BookmarkView from "./pages/BookmarkView";
import CreatePostView from "./pages/CreatePostView";
import NotificationsView from "./pages/NotificationsView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<FeedView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/feed" element={<FeedView />} />
          <Route path="/search" element={<SearchView />} />
          <Route path="/notifications" element={<NotificationsView />} />
          <Route path="/createpost" element={<CreatePostView />} />
          <Route path="/profile/:id" element={<ProfileView />} />
          <Route path="/postview/:id" element={<PostView />} />
          <Route path="/trends/:id" element={<TrendView />} />
          <Route path="/bookmark" element={<BookmarkView />} />
          <Route path="*" element={<Navigate to='/' replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
