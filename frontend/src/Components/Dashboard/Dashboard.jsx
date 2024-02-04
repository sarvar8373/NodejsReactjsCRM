// Dashboard.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar_Section/Sidebar';
import Navbar from './Navbar/Navbar';
import '../../App.css'
import Home from './Pages/Home';
import AllPosts from './Pages/Posts/AllPosts';
import AddPosts from './Pages/Posts/AddPosts';
import AddCategories from './Pages/Categories/AddCategories';
import AllCategories from './Pages/Categories/AllCategories';
import PostDetails from './Pages/Posts/PostDetails';
import AllUsers from './Pages/Users/All Users';
import Profile from './Pages/Profile/Profile';
import AddUser from './Pages/Users/AddUser';
import ProfileDetails from './Pages/Profile/ProfileDetails';
import AddPages from './Pages/Pages/AddPages';
import AllPages from './Pages/Pages/AllPages';
import PageDetails from './Pages/Pages/PageDetails';

const Dashboard = ({ onLogout, isAuthenticated }) => {
  if (!isAuthenticated) {
    // If not authenticated, you might want to redirect or handle it differently
    return <div>Not authenticated</div>;
  }

  return (
      <div className="bodi">
        <div className="sb-nav-fixed">
          <Navbar />
          <div id="layoutSidenav">
            <Sidebar onLogout={onLogout} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add-categories" element={<AddCategories />} />
              <Route path="/all-categories" element={<AllCategories />} />
              <Route path="/add-posts" element={<AddPosts />} />
              <Route path="/all-posts" element={<AllPosts />} />
              <Route path="/posts/:postId" element={<PostDetails />} />
              <Route path="/add-users" element={<AddUser />} />
              <Route path="/all-users" element={<AllUsers />} />
              <Route path="/add-page" element={<AddPages />} />
              <Route path="/all-page" element={<AllPages />} />
              <Route path="/page/:pageID" element={<PageDetails />} />
              <Route path="/profile" element={<Profile />}/>
              <Route path="/edit-profile/:id" element={<ProfileDetails />} />
            </Routes>
          </div>
        </div>
      </div>
  );
}

export default Dashboard;
