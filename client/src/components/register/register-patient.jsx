import React, { useState  } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const Register = () => {
    const PORT = import.meta.env.VITE_PORT;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const validatePassword=(password)=>{
        const minlength = 8;
        const hasnumber =/\d/;
        if(username.length<6) return 'Username must contain atleast 6 character';
        if(password.length<8) return 'Password must contain atleast 8 character';
        if (!hasnumber.test(password)) return 'Password must have a number';
       
        return '';
            
        
    }


    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const errPass = validatePassword(password,username);
            if(errPass){
                setMessage(errPass);
                return;
            }
      
            const response = await axios.post(`http://localhost:${PORT}/api/auth/register/patient`, { username, password });
           
            setMessage('Registration successful!'); navigate('/login/patient');}
         catch (err) {
            setMessage('Registration failed !!! Username already used');
        }
        // history.push('/home');
    };

    return (
        <div className=' h-[100vh] w-[100vw] bg-[url(src/assets/background-login.jpg)]  bg-cover bg-top '>
            <div className='absolute mt-[10%] ml-[60%] w-[350px] h-[270px] border-2 rounded-md border-gray-500'>
              
                    <div className='flex justify-center align'> <img className="medpass-img w-16 h-16 object-conta" src="/src/assets/med-pass-cropped.png" alt="medpass" /></div>
                    <div className=' ml-4 mb-2 text-md font-medium'>Register as patient:</div>
                    <form onSubmit={handleRegister}>

                        <label htmlFor="Username" className='ml-4 text-red-900'>Username:</label>
                    <input type="text" value={username} placeholder='Username' required onChange={(e)=>{setUsername(e.target.value)}  } autoComplete='off' id="Username" className='ml-2  border text-gray-500 pl-2 '/>
                       
                        <label htmlFor="password" className='ml-4 text-red-900'>Password:</label>
                    <input type="password" value={password} placeholder='Password' required onChange={(e)=>{setPassword(e.target.value)}  } autoComplete='off' id="password" className='ml-3  border text-gray-500 pl-2 mt-4'/>
                <div className='flex justify-center'> 
                    <button type='submit' className='border text-md text-gray-600 font-bold w-[60px] h-[30px] rounded-md bg-green-100 hover:bg-green-200 mt-6'>Signup</button>
                    </div>
                   
                </form><div className='flex justify-center text-sm text-red-700'>

                {message && <p>{message}</p>}
                </div>
            </div>
        
            </div>
    );
};

export default Register;
