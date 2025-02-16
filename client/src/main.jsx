import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route,Link } from 'react-router-dom';
import './index.css';
import Home from './components/home/home.jsx';
import Login from './components/login/login.jsx';

import Navbar from './components/navbar/navbar.jsx'; 
import Register from './components/register/register.jsx';
import Aboutus from './components/aboutus/aboutus.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/aboutus" element={<Aboutus />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
