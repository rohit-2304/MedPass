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
import Scan_qr from './components/scan-qr/scan-qr.jsx';
import Viewdoc from './components/view-doc-patient/view-doc-patient.jsx';
import Viewdoc_D from './components/view-doc-doctor/view-doc-doctor.jsx';
import Assignpermission from './components/assign-permission/assign-permission.jsx';
import View_ParticularPatient from'./components/view-doc-particular-patient/view-doc-particular-patient.jsx'

import PatientProfile from  './components/profile/patientProfile.jsx'
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
        <Route path="/view_doc_D/:username" element={<Viewdoc_D />} />
        <Route path="/scan_qr/:username" element={<Scan_qr />} />
        <Route path="/view_doc_patient/:patient" element={<View_ParticularPatient />}/>
        <Route path="/assign_permission/:username" element={<Assignpermission />} 
       
        
        
        />
        <Route path="/profile/:username" element={<PatientProfile />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
