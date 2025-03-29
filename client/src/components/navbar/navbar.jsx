import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar() {   
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [tokend, setTokend] = useState(localStorage.getItem('tokend'));
  const navigate = useNavigate(); // For navigation functionality
  const location = useLocation(); // Current route location

  // Logout Functionality
  const removeToken = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("tokend");
    navigate('/'); // Redirect to homepage or login page
  };

  // Navigate to Profile Functionality
  const handleProfile = () => {
    const username = localStorage.getItem("username");
    if (username) {
      navigate(`/profile/${username}`);
    }
  };

  // Track localStorage changes and update token states
  useEffect(() => {
    const handleStorageChange = () => {
      const newToken = localStorage.getItem('token');
      const newTokend = localStorage.getItem('tokend');
      setToken(newToken);
      setTokend(newTokend);
    };

    window.addEventListener('storage', handleStorageChange);
    handleStorageChange();

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [location]); // Depend on location to recheck tokens when route changes

  // Check if user is logged in
  const isLoggedIn = token || tokend;

  return (
    <nav className="bg-[#e4e5e4] text-black  sticky top-0 z-50 pb-2">
      <div className="container mx-auto flex justify-between items-center h-16 px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-6">
          <Link to="/">
            <img 
              className="w-25 h-16 object-contain" 
              src="/src/assets/med-pass-cropped.png" // Replace with the correct asset path
              alt="MedPass Logo" 
            />
          </Link>
          {isLoggedIn && (
            <Link 
              to="/aboutus" 
              className="text-2xl underline font-bold text-cyan-950 hover:text-[#386641] transition"
            >
              About Us
            </Link>
          )}
        </div>

        {/* Navigation Links Section */}
        <div className="flex items-center space-x-6">
          {!isLoggedIn ? (
            // If not logged in, display Login and Register links
            <>
              <Link to="/" className="text-sm font-medium hover:text-[#386641] transition">
                Home
              </Link>
              <Link to="/aboutus" className="text-sm font-medium hover:text-[#386641] transition">
                About Us
              </Link>
              <div className="flex space-x-3">
                <Link to="/login/patient" className="text-sm font-medium hover:text-[#386641] transition">
                  Login
                </Link>
                <span>/</span>
                <Link to="/register/patient" className="text-sm font-medium hover:text-[#386641] transition">
                  Register
                </Link>
              </div>
            </>
          ) : (
            // If logged in, display Profile and Logout options
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleProfile} 
                className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer"
                title="View Profile"
              >
                {/* Optionally, you can add a placeholder profile icon */}
                <span className="text-black font-bold text-sm">P</span>
              </button>
              <button 
                onClick={removeToken} 
                className="bg-[#BC4749] hover:bg-[#386641] text-white px-4 py-2 rounded-lg transition cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
