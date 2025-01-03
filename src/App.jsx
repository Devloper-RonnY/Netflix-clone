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
    const toastId = 'auth-toast'; // Unique ID for the toast
  
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
  
      if (currentUser) {
        if (!toast.isActive(toastId)) {
          toast.success('Welcome back!', { toastId });
        }
        navigate('/');
      } else {
        if (!toast.isActive(toastId)) {
          toast.info('Please log in.', { toastId });
        }
        navigate('/login');
      }
    });
  
    return () => unsubscribe(); // Cleanup the listener on component unmount
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
