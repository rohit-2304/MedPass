import React, { useEffect, useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const PORT = import.meta.env.VITE_PORT;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  let userName = "";

  useEffect(() => {
    localStorage.removeItem('token');
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:${PORT}/api/auth/login/patient`, { username, password });
      localStorage.setItem('token', response.data.token);
      userName = response.data.username;
      setMessage('Login successful!');
      navigate(`/pt_db/${username}`);
    } catch (err) {
      setMessage('Login failed. Please check your username and password.');
    }
  };

  return (
    <div className='h-[100vh] w-[100vw] bg-[url(src/assets/background-login.jpg)] bg-cover bg-top'>
      <div className='absolute mt-[10%] ml-[60%] w-[350px]  h-auto border-2 rounded-md border-gray-500'>
        <div className='flex justify-center align'>
        
      <img className='medpass-img w-16 h-16 object-conta' src='/src/assets/med-pass-cropped.png' alt='medpass' />
      
        </div>
        <div className=' ml-4 mb-2 text-md font-medium'>Login as patient:</div>
        <form onSubmit={handleLogin}>
          <label htmlFor='Username' className='ml-4 text-red-900'>Username:</label>
          <input
            type='text'
            value={username}
            placeholder='Username'
            required
            onChange={(e) => setUsername(e.target.value)}
            autoComplete='off'
            id='Username'
            className='ml-2 border text-gray-500 pl-2'
          />
          <label htmlFor='password' className='ml-4 text-red-900'>Password:</label>
          <input
            type='password'
            value={password}
            placeholder='Password'
            required
            onChange={(e) => setPassword(e.target.value)}
            autoComplete='off'
            id='password'
            className='ml-3 border text-gray-500 pl-2 mt-4'
          />
          <div className='flex justify-center'>
            <button
              type='submit'
              className='border text-md text-gray-600 font-bold w-[60px] h-[30px] rounded-md bg-green-100 hover:bg-green-200 mt-6'
            >
              Login
            </button>
          </div>
        </form>
        <div className='flex justify-center text-sm text-red-700'>
          {message && <p>{message}</p>}
        </div>
        <div className='flex  mt-2 ml-4'  > 
        <div className='text-md text-gray-500'>Join us today-Create an account! </div>
      
        <div className='text-md underline ml-2'> <Link to='/register/patient' className='text-red-700'> Register</Link> </div>
        </div>
        <div className='flex  mt-2 ml-4'  > 
        <div className='text-md text-gray-500 mb-4'>For Doctors: Login here </div>
      
        <div className='text-md underline ml-2'> <Link to='/login/doctor' className='text-red-700'> Login</Link> </div>
        </div>
        
       
      </div>
    </div>
  );
};

export default Login;
