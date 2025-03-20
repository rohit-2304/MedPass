import React, { useState  } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const RegisterD = () => {
    const PORT = import.meta.env.VITE_PORT;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [council, setCouncil] = useState('');
    const [year, setYear] = useState('');
    const [registration_no, setRegistration_no] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const validatePassword=(password,username)=>{
    
        const hasnumber =/\d/;
        if(username.length<6) return 'Username must contain atleast 6 character';
        if(password.length<8) return 'Password must contain atleast 8 character';
        if (!hasnumber.test(password)) return 'Password must have a number';
       
        return '';
            
        
    }
 
    
//     const doctorFinder=(registration_no,council,year)=>{
//     if(){  return true;}

// else{
//       return false}
//     }

const handleRegister = async (e) => {
  e.preventDefault();
  try {
      const errPass = validatePassword(password,username);
      if (errPass) {
          setMessage(errPass);
          return;
      }

      const options = {
        method: 'POST',
        url: 'https://doctor-verification.p.rapidapi.com/',
        headers: {
          'x-rapidapi-key': '489060673amshdab6cd553fa8234p1ea529jsn0b4b5089ba58',
          'x-rapidapi-host': 'doctor-verification.p.rapidapi.com',
          'Content-Type': 'application/json'
        },
        data: {
          registrationNo: registration_no
        }
      };

      const doctorResponse = await axios.request(options);
      

     
      const Doctor = doctorResponse.data.filter(item => 
          item.smcName.toLowerCase() === council.toLowerCase() && 
          item.registrationNo === registration_no.toString() && 
          item.yearOfPassing === year.toString()
      );
      
      console.log('Filtered Doctor:', Doctor);

      if (Doctor.length !== 0) {
          const response = await axios.post('http://localhost:5000/api/authd/register/doctor',{username,password,registration_no,year,council});
        
          setMessage('Registration successful!$');
          navigate('/login/doctor');
      } else {
          setMessage('Doctor verification failed. Please check your details.');
      }
  } catch (err) {
      console.error(err);
      setMessage('Registration failed! Username may already be used.');
  }
};


    return (
      <div className="h-screen w-full  bg-gradient-to-b from-white to-[#ECEAE6] bg-top flex justify-center items-center ">
      <div className="w-[400px] bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20 relative overflow-hidden  m-10">
        
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="absolute top-6 left-6 text-[#386641] hover:text-[#2a4a30] transition-colors"
          aria-label="Go back"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
    
        {/* Decorative elements */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#386641]/10 rounded-full" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-[#386641]/10 rounded-full" />
        
        <div className="flex flex-col items-center mb-8">
          <div className="p-4 bg-white rounded-full shadow-lg mb-4">
            <img 
              className="w-20 h-20 object-contain animate-soft-bounce"
              src='/src/assets/med-pass-cropped.png' 
              alt='medpass' 
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Register as Doctor</h1>
          <p className="text-gray-500 mt-1">Secure Health Access</p>
        </div>
    
        <form onSubmit={handleRegister} className="space-y-6">
          {/* Username Input */}
          <div className="relative">
            <input
              type="text"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-200 focus:border-[#386641] focus:ring-2 focus:ring-[#386641]/20 outline-none transition-all peer"
              placeholder="Username"
            />
           
            <svg className="w-5 h-5 text-gray-400 absolute right-4 top-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
    
          {/* Password Input */}
          <div className="relative">
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-200 focus:border-[#386641] focus:ring-2 focus:ring-[#386641]/20 outline-none transition-all peer"
              placeholder="Password"
            />
           
            <svg className="w-5 h-5 text-gray-400 absolute right-4 top-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
    
          {/* Council Name Input */}
          <div className="relative">
            <input
              type="text"
              value={council}
              required
              onChange={(e) => setCouncil(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-200 focus:border-[#386641] focus:ring-2 focus:ring-[#386641]/20 outline-none transition-all peer"
              placeholder="Council Name"
            />
          
            <svg className="w-5 h-5 text-gray-400 absolute right-4 top-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
    
          {/* Year of Passing Input */}
          <div className="relative">
            <input
              type="number"
              value={year}
              required
              onChange={(e) => setYear(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-200 focus:border-[#386641] focus:ring-2 focus:ring-[#386641]/20 outline-none transition-all peer"
              placeholder="Year of Passing"
            />
           
            <svg className="w-5 h-5 text-gray-400 absolute right-4 top-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
    
          {/* Registration Number Input */}
          <div className="relative">
            <input
              type="text"
              value={registration_no}
              required
              onChange={(e) => setRegistration_no(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-200 focus:border-[#386641] focus:ring-2 focus:ring-[#386641]/20 outline-none transition-all peer"
              placeholder="Registration Number
"
            />
          
            <svg className="w-5 h-5 text-gray-400 absolute right-4 top-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
    
          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full py-3.5 bg-[#386641] hover:bg-[#2a4a30] active:bg-[#1f3a25]
              text-white font-semibold rounded-lg shadow-md hover:shadow-lg 
              transition-all duration-300 transform hover:-translate-y-0.5 
              active:translate-y-0 active:scale-95 flex items-center justify-center"
          >
            Sign Up
            <span className="ml-2">→</span>
          </button>
    
          {/* Error Message */}
          {message && (
            <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg text-red-600">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
    );
};

export default RegisterD;
