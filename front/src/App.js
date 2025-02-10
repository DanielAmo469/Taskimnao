import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Tasks from './components/Tasks';
import Friends from './components/Friends';
import MyAccound from './components/MyAccount'
import CreateTask from './components/CreateTask';
import TaskDetails from './components/Tasks/TaskDetails';
import PrivateRoute from './components/PrivateRoute';
import NotificationPage from './components/NotificationPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (token) => {
    setIsLoggedIn(true);
    localStorage.setItem('token', token);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<PrivateRoute isLoggedIn={isLoggedIn}><Home /></PrivateRoute>} />
        <Route path="/tasks" element={<PrivateRoute isLoggedIn={isLoggedIn}><Tasks /></PrivateRoute>} />
        <Route path="/task/:id" element={<PrivateRoute isLoggedIn={isLoggedIn}><TaskDetails /></PrivateRoute>} />
        <Route path="/friends" element={<PrivateRoute isLoggedIn={isLoggedIn}><Friends /></PrivateRoute>} />
        <Route path='/my-account' element={<PrivateRoute isLoggedIn={isLoggedIn}><MyAccound /></PrivateRoute>} />
        <Route path="/create-task" element={<PrivateRoute isLoggedIn={isLoggedIn}><CreateTask /></PrivateRoute>} />
        <Route path="/notifications" element={<PrivateRoute isLoggedIn={isLoggedIn}><NotificationPage /></PrivateRoute>} />
        <Route path="*" element={<Navigate to={isLoggedIn ? "/home" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;