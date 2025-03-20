import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PatientRegister = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (username.length < 4) {
      setMessage('Username must be at least 4 characters long.');
      return;
    }
    if (password.length < 6) {
      setMessage('Password must be at least 6 characters long.');
      return;
    }
    navigate('/patient_info/huiarehuor');
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-[#ECEAE6] bg-cover bg-top flex justify-center items-center">
      <div className="w-[400px] bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20 relative overflow-hidden">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 text-[#386641] hover:text-[#2a4a30] transition-colors"
          aria-label="Go back"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7m0 0l7-7" />
          </svg>
        </button>

        {/* Decorative Elements */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#386641]/10 rounded-full" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-[#386641]/10 rounded-full" />

        <div className="flex flex-col items-center mb-8">
          <div className="p-4 bg-white rounded-full shadow-lg mb-4">
            <img 
              className="w-20 h-20 object-contain animate-soft-bounce"
              src="/src/assets/med-pass-cropped.png" 
              alt="medpass" 
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Patient Registration</h1>
          <p className="text-gray-500 mt-1">Secure Health Access</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          {/* Username Input */}
          <div className="relative">
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-200 focus:border-[#386641] focus:ring-2 focus:ring-[#386641]/20 outline-none transition-all peer"
              placeholder="Username"
              required
            />
            
             
           
            <svg className="w-5 h-5 text-gray-400 absolute right-4 top-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-200 focus:border-[#386641] focus:ring-2 focus:ring-[#386641]/20 outline-none transition-all peer"
              placeholder="Password"
              required
            />
           
            
            <svg className="w-5 h-5 text-gray-400 absolute right-4 top-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full py-3.5 bg-[#386641] hover:bg-[#2a4a30] active:bg-[#1f3a25]
              text-white font-semibold rounded-lg shadow-md hover:shadow-lg 
              transition-all duration-300 transform hover:-translate-y-0.5 
              active:translate-y-0 active:scale-95 flex items-center justify-center"
          >
            Create Account
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

          <div className="text-center space-y-4 mt-6">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login/patient" className="text-[#386641] hover:text-[#2a4a30] font-semibold underline">
                Login here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientRegister;
