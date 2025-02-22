import React from 'react';
import {Link } from 'react-router-dom';
function Navbar() {
  return (
    <nav className='medpass-nav h-16 bg-blue-100 grid grid-cols-[200px_1fr] '>
    <div className='medpass-nav-home grid grid-cols-[75px_1fr] gap-0.5 items-center text-blue-800'>
        <Link to="/">
            <img className="medpass-img w-40 h-16 object-conta" src="/src/assets/med-pass-cropped.png" alt="medpass" />
        </Link>
    </div>
    <div className='grid grid-cols-[auto_auto_2fr] gap-8 items-center'>
        <div className='text-sm font-medium underline'><Link to="/">Home</Link></div>
        <div className='text-sm font-medium underline'><Link to="/aboutus">Aboutus</Link></div>


        <div className='grid grid-cols-[50px_50px] place-content-end mr-3'>
        <div className='text-sm font-medium underline '><Link to="/login">Login</Link> /</div>
        <div className='text-sm font-medium underline'><Link to="/register">Register</Link></div>
        </div>
    </div>
</nav>



  );
}

export default Navbar;