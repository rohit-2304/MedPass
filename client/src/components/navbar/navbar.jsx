import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';


function Navbar() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [tokend, setTokend] = useState(localStorage.getItem('tokend'));
  const location = useLocation(); // Get the current location
  const {username} = useParams();
  const removeToken=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("tokend");
  }
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
  }, [location]);

  return (
    <nav className='medpass-nav h-16 bg-blue-100 grid grid-cols-[200px_1fr] sticky'>
      <div className='medpass-nav-home grid grid-cols-[75px_1fr] gap-0.5 items-center text-blue-800'>
        <Link to="/">
          <img className="medpass-img w-40 h-16 object-conta" src="/src/assets/med-pass-cropped.png" alt="medpass" />
        </Link>
        {token||tokend||{username} ? (
          <div className='text-sm font-medium underline ml-10 mt-5'><Link to="/aboutus">About Us</Link></div>
        ) : null}
          {token||tokend?  <div className='absolute ml-[95%] text-sm font-medium underline flex'>
            <img  className="h-[20px] w-[20px]" src="src/assets/profile.png" alt=" " />
         <a href="/" onClick={removeToken} className='no-underline'>logout</a>
</div>:null}
      </div>
      {token||tokend||{username}? null : (
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
