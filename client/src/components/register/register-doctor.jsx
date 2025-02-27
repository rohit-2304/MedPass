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

    const validatePassword=(password)=>{
        const minlength = 8;
        const hasnumber =/\d/;
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
      const errPass = validatePassword(password);
      if (errPass) {
          setMessage(errPass);
          return;
      }

      const options = {
        method: 'POST',
        url: 'https://doctor-verification.p.rapidapi.com/',
        headers: {
          'x-rapidapi-key': 'd9b9014465msha6e8729c4541274p173b9cjsn1c824a30ca3e',
          'x-rapidapi-host': 'doctor-verification.p.rapidapi.com',
          'Content-Type': 'application/json'
        },
        data: {
          registrationNo: registration_no
        }
      };

      const doctorResponse = await axios.request(options);
      console.log('Doctor verification response:', doctorResponse.data);

      // Adjust the filter to match the correct data structure and types
      const Doctor = doctorResponse.data.filter(item => 
          item.smcName === council && 
          item.registrationNo === registration_no.toString() && 
          item.yearOfPassing === year.toString()
      );
      
      console.log('Filtered Doctor:', Doctor);

      if (Doctor.length !== 0) {
          const response = await axios.post(`http://localhost:5001/api/authd/register/doctor`,{username,password,registration_no,year,council});
          console.log('Registration response:', response.data);
          setMessage('Registration successful!');
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
      <div className='absolute mt-[10%] ml-[60%] w-[350px] h-[450px] border-2 rounded-md border-gray-500'>
          <div className='flex justify-center align'>
              <img className="medpass-img w-16 h-16 object-contain" src="/src/assets/med-pass-cropped.png" alt="medpass" />
          </div>
          <div className='ml-4 mb-2 text-md font-medium'>Register as Doctor:</div>
          <form onSubmit={handleRegister}>
              <label htmlFor="Username" className='ml-4 text-red-900'>Username:</label>
              <input type="text" value={username} placeholder='Username' required onChange={(e) => { setUsername(e.target.value) }} autoComplete='off' id="Username" className='ml-2 border text-gray-500 pl-2' />

              <label htmlFor="password" className='ml-4 text-red-900'>Password:</label>
              <input type="password" value={password} placeholder='Password' required onChange={(e) => { setPassword(e.target.value) }} autoComplete='off' id="password" className='ml-3 border text-gray-500 pl-2 mt-4' />

              <label htmlFor="council" className='ml-4 text-red-900'>Council Name:</label>
              <input type="text" value={council} placeholder='Council Name' required onChange={(e) => { setCouncil(e.target.value) }} autoComplete='off' id="council" className='ml-2 border text-gray-500 pl-2 mt-4' />

              <label htmlFor="year" className='ml-4 text-red-900'>Year of Passing:</label>
              <input type="number" value={year} placeholder='Year of Passing' required onChange={(e) => { setYear(e.target.value) }} autoComplete='off' id="year" className='ml-3 border text-gray-500 pl-2 mt-4' />

              <label htmlFor="registration_no" className='ml-4 text-red-900'>Registration Number:</label>
              <input type="text" value={registration_no} placeholder='Registration Number' required onChange={(e) => { setRegistration_no(e.target.value) }} autoComplete='off' id="registration_no" className='ml-3 border text-gray-500 pl-2 mt-4' />

              <div className='flex justify-center'>
                  <button type='submit' className='border text-md text-gray-600 font-bold w-[60px] h-[30px] rounded-md bg-green-100 hover:bg-green-200 mt-6'>Signup</button>
              </div>
          </form>
          <div className='flex justify-center text-sm text-red-700'>
              {message && <p>{message}</p>}
          </div>
      </div>
  </div>
    );
};

export default RegisterD;
