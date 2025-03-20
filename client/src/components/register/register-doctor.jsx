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
          registrationNo: registration_no
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
          const response = await axios.post(`http://localhost:${PORT}/api/authd/register/doctor`,{username,password,registration_no,year,council});
        
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
        <div className='h-[100vh] w-[100vw] bg-[url(src/assets/background-login.jpg)] bg-cover bg-top'>
        <div className='absolute mt-8  top-[10%] left-[60%] w-[375px] h-auto border-2 rounded-md border-gray-500 shadow-lg bg-white bg-opacity-90'>
          <div className='flex justify-center mt-4'>
            <img className="medpass-img w-16 h-16 object-contain" src="/src/assets/med-pass-cropped.png" alt="medpass" />
          </div>
          <div className='ml-4 mb-2 text-lg font-semibold text-gray-800 '>Register as Doctor:</div>
          <form onSubmit={handleRegister} className='space-y-4'>
            <div className='ml-4 mr-4'>
              <label htmlFor="Username" className='block text-red-900'>Username:</label>
              <input type="text" value={username} placeholder='Username' required onChange={(e) => { setUsername(e.target.value) }} autoComplete='off' id="Username" className='mt-1 border w-full px-3 py-2 text-gray-700 rounded-md focus:outline-none focus:border-blue-500' />
            </div>
      
            <div className='ml-4 mr-4'>
              <label htmlFor="password" className='block text-red-900'>Password:</label>
              <input type="password" value={password} placeholder='Password' required onChange={(e) => { setPassword(e.target.value) }} autoComplete='off' id="password" className='mt-1 border w-full px-3 py-2 text-gray-700 rounded-md focus:outline-none focus:border-blue-500' />
            </div>
      
            <div className='ml-4 mr-4'>
              <label htmlFor="council" className='block text-red-900'>Council Name:</label>
              <input type="text" value={council} placeholder='Council Name' required onChange={(e) => { setCouncil(e.target.value) }} autoComplete='off' id="council" className='mt-1 border w-full px-3 py-2 text-gray-700 rounded-md focus:outline-none focus:border-blue-500' />
            </div>
      
            <div className='ml-4 mr-4'>
              <label htmlFor="year" className='block text-red-900'>Year of Passing:</label>
              <input type="number" value={year} placeholder='Year of Passing' required onChange={(e) => { setYear(e.target.value) }} autoComplete='off' id="year" className='mt-1 border w-full px-3 py-2 text-gray-700 rounded-md focus:outline-none focus:border-blue-500' />
            </div>
      
            <div className='ml-4 mr-4'>
              <label htmlFor="registration_no" className='block text-red-900'>Registration Number:</label>
              <input type="text" value={registration_no} placeholder='Registration Number' required onChange={(e) => { setRegistration_no(e.target.value) }} autoComplete='off' id="registration_no" className='mt-1 border w-full px-3 py-2 text-gray-700 rounded-md focus:outline-none focus:border-blue-500' />
            </div>
      
            <div className='flex justify-center'>
              <button type='submit' className='border text-md text-white font-bold w-[80px] h-[35px] rounded-md bg-blue-500 hover:bg-blue-600 focus:outline-none mt-6'>Signup</button>
            </div>
          </form>
          <div className='flex justify-center text-sm text-red-700 mt-4'>
            {message && <p>{message}</p>}
          </div>
        </div>
      </div>
      
    );
};

export default RegisterD;
