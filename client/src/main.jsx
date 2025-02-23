import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route,Link } from 'react-router-dom';
import './index.css';
import Home from './components/home/home.jsx';
import Login from './components/login/login-patient.jsx';

import Navbar from './components/navbar/navbar.jsx'; 
import Register from './components/register/register.jsx';
import Aboutus from './components/aboutus/aboutus.jsx';
import Pt_db from './components/patient-dashboard/pt_db.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar /> 
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/login/patient" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/home" element={<Home />} />
        <Route path="/pt_db" element={<Pt_db />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
