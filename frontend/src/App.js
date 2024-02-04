import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import Login from './Components/Login/Login';
import AddUser from './Components/Dashboard/Pages/Users/AddUser';
import Template from './Template/Template';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    JSON.parse(localStorage.getItem('isAuthenticated')) || false
  );
  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    // Clear local storage
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  
    // Make a request to the server to clear the token cookie
    // You may use Axios or any other HTTP client library for this
    // Example using fetch:
    fetch('http://localhost:9000/auth/logout', {
      method: 'POST',
      credentials: 'include', // Send cookies with the request
    })
      .then((response) => {
        if (response.ok) {
          console.log('Logout successful');
        } else {
          console.error('Logout failed');
        }
      })
      .catch((error) => {
        console.error('Error during logout:', error);
      });
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Template/>} />
        <Route path="/register" element={<AddUser/>} />
        <Route path="/admin" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} />
        <Route
          path="/dashboard/*"
          element={isAuthenticated ? <Dashboard onLogout={handleLogout} isAuthenticated={isAuthenticated}/> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;