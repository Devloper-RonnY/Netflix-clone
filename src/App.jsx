import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Player from './pages/Player/Player';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      navigate(currentUser ? '/' : '/login');
      toast[currentUser ? 'success' : 'info'](currentUser ? "Welcome back!" : 'Please log in.');
    });
    return unsubscribe;
  }, [navigate]);

  return (
    <div>
      <ToastContainer theme="dark" position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={user ? <Home /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/player/:id" element={user ? <Player /> : <Login />} />
      </Routes>
    </div>
  );
}

export default App;
