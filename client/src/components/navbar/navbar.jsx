import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

function Navbar() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [tokend, setTokend] = useState(localStorage.getItem('tokend'));
  const location = useLocation();
  const { username } = useParams();

  const removeToken = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("tokend");
    setToken(null);
    setTokend(null);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token'));
      setTokend(localStorage.getItem('tokend'));
    };

    window.addEventListener('storage', handleStorageChange);
    handleStorageChange();

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [location]);

  const isLoggedIn = token || tokend || username;

  return (
    <nav className="bg-[white] text-black border-b sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center h-16 px-6">
        {/* Logo and About Us */}
        <div className="flex items-center space-x-6">
          <Link to="/">
            <img 
              className="w-25  h-16 object-contain" 
              src="/src/assets/med-pass-cropped.png" 
              alt="medpass" 
            />
          </Link>

          {isLoggedIn && (
            <Link 
              to="/aboutus" 
              className="text-lg font-medium  hover:text-[#386641] transition"
            >
              About Us
            </Link>
          )}
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          {!isLoggedIn ? (
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
            <div className="flex items-center space-x-4">
              <img 
                className="h-8 w-8 rounded-full" 
                src="src/assets/profile.png" 
                alt="profile" 
              />
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
