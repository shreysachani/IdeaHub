import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import Signup from "./pages/Signup";
import HomeView from "./pages/HomeView"
import LoginView from "./pages/LoginView"
import FeedView from "./pages/FeedView";
import PostView from "./pages/PostView";
import SearchView from "./pages/SearchView";
import ProfileView from "./pages/ProfileView";
import CreatePostView from "./pages/CreatePostView";
import NotificationsView from "./pages/NotificationsView";
import TrendView from "./pages/TrendView";
// Components (import lazy for code-splitting)

// const FeedView = lazy(() => import("../pages/FeedView"));
// const SignupView = lazy(() => import("../pages/SignupView"));
// const LoginView = lazy(() => import("../pages/LoginView"));
// const SearchView = lazy(() => import("../pages/SearchView"));
// const ProfileView = lazy(() => import("../pages/ProfileView"));
// const FriendsView = lazy(() => import("../pages/FriendsView"));
// const PostView = lazy(() => import("../pages/PostView"));
// const ChatView = lazy(() => import("../pages/ChatView"));
// const TrendView = lazy(() => import("../pages/TrendView"));
// const EditProfileView = lazy(() => import("../pages/EditProfileView"));
// const EditPasswordView = lazy(() => import("../pages/EditPasswordView"));
// const NotificationsView = lazy(() => import("../pages/NotificationsView"));
// const AboutView = lazy(() => import("../pages/AboutView"));

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
              <Route path="/bookmark" element={<TrendView />} />
              <Route path="*" element={<Navigate to='/' replace />} />
          </Route>
          
          {/* <Route path="/feed" element={<FeedView />} />
          <Route path="/signup" element={<SignupView />} />
          
          <Route path="/search" element={<SearchView />} />
          <Route path="/chat" element={<ChatView />} />
          <Route path="/notifications" element={<NotificationsView />} />
          <Route path="/profile/edit" element={<EditProfileView />} />
          <Route path="/profile/edit/password" element={<EditPasswordView />} />
          <Route path="/profile/:id" element={<ProfileView />} />
          <Route path="/profile/:id/friends" element={<FriendsView />} />
          <Route path="/:id" element={<PostView />} />
          <Route path="/trends/:id" element={<TrendView />} />
          <Route path="/about" element={<AboutView />} /> */}
        </Routes>
      </BrowserRouter>
  );
}

export default App;
