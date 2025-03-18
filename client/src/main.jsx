import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route,Link } from 'react-router-dom';
import './index.css';
import Home from './components/home/home.jsx';
import Login from './components/login/login-patient.jsx';
import LoginD from './components/login/login-doctor.jsx';
import RegisterD from './components/register/register-doctor.jsx';

import Navbar from './components/navbar/navbar.jsx'; 
import Register from './components/register/register-patient.jsx';
import Aboutus from './components/aboutus/aboutus.jsx';
import Pt_db from './components/patient-dashboard/pt_db.jsx';
import Dt_db from './components/doctor-dashboard/dt_db.jsx';
import Patient_info from './components/patient-info/patient_info.jsx';
import Upload_doc from './components/upload-doc/upload-doc.jsx';
import Viewdoc from './components/view-doc/view-doc.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar /> 
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/login/patient" element={<Login />} />
        <Route path="/login/doctor" element={<LoginD />} />
        <Route path="/register/patient" element={<Register />} />
        <Route path="/register/doctor" element={<RegisterD />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/home" element={<Home />} />
        <Route path="/pt_db/:username" element={<Pt_db />} />
        <Route path="/dt_db/:username" element={<Dt_db />} />
        <Route path="/patient_info/:username" element={<Patient_info />} />
        <Route path="/upload_doc/:username" element={<Upload_doc />} />
        <Route path="/view_doc/:username" element={<Viewdoc />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
