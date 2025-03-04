import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';


function Navbar() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const location = useLocation(); // Get the current location

  const removeToken=()=>{
    localStorage.removeItem("token");
  }
  useEffect(() => {
    const handleStorageChange = () => {
      const newToken = localStorage.getItem('token');
      setToken(newToken);
    };

    window.addEventListener('storage', handleStorageChange);
    setToken(localStorage.getItem('token')); // Update token on component mount and location change

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [location]);

  return (
    <nav className='medpass-nav h-16 bg-blue-100 grid grid-cols-[200px_1fr]'>
      <div className='medpass-nav-home grid grid-cols-[75px_1fr] gap-0.5 items-center text-blue-800'>
        <Link to="/">
          <img className="medpass-img w-40 h-16 object-conta" src="/src/assets/med-pass-cropped.png" alt="medpass" />
        </Link>
        {token ? (
          <div className='text-sm font-medium underline ml-10 mt-5'><Link to="/aboutus">About Us</Link></div>
        ) : null}
          {token?  <div className='absolute ml-[95%] text-sm font-medium underline flex'>
            <img  className="h-[20px] w-[20px]" src="src/assets/profile.png" alt=" " />
         <a href="/" onClick={removeToken} className='no-underline'>logout</a>
</div>:null}
      </div>
      {token ? null : (
        <div className='grid grid-cols-[auto_auto_2fr] gap-8 items-center'>
          <div className='text-sm font-medium underline'><Link to="/">Home</Link></div>
          <div className='text-sm font-medium underline'><Link to="/aboutus">About Us</Link></div>
          <div className='grid grid-cols-[50px_50px] place-content-end mr-3'>
            <div className='text-sm font-medium underline'><Link to="/login/patient">Login</Link> /</div>
            <div className='text-sm font-medium underline'><Link to="/register/patient">Register</Link></div>
          </div>
        </div>
      )}
    
    
    </nav>
  );
}

export default Navbar;
