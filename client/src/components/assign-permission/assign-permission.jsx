import React, { useEffect, useState } from 'react';
import { doc, setDoc } from "firebase/firestore";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'

function Assignpermission() {
   const [token, setToken] = useState(null);
   const [name, setName] = useState("");
    const  usernameD  = useParams().username; 
    const PORT = import.meta.env.VITE_PORT;
    const  patientUserName = localStorage.getItem("username")
      const navigate = useNavigate();
      const handleNameChange=(e)=>{
        setName(e.target.value);
        
      }

       useEffect(() => {
                  const handleStorageChange = () => {
                      const newToken = localStorage.getItem('token');
                      setToken(newToken);
                      if(!newToken){
                          localStorage.removeItem('tokend')
                          navigate('/home')
                      }
                  };
          
                  window.addEventListener('storage', handleStorageChange);
                  handleStorageChange();
                 
          
                  return () => {
                      window.removeEventListener('storage', handleStorageChange);
                  };
              }, []);


            const handleNo=()=>{
             window.close();
            }
            const handleYes= async ()=>{
              const expirationTime = 
                Date.now() + 2*60*60*1000 ;
            
              const response = await axios.post(`http://localhost:${PORT}/api/store_op/set_permission/${usernameD}`,
              {
                name:name,
                username:patientUserName,
                expiresAt: expirationTime,
               },{
                headers:{
                  Authorization:`Bearer ${localStorage.getItem("token")}`
                }
               })
               
              navigate(`/pt_db/${patientUserName}`)
            }
               

          
                
              
            return (
              <div className="min-h-screen bg-gradient-to-br from-[#ECEAE6] to-[#fff] flex items-center justify-center p-6">
                <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md transition-transform duration-300 hover:scale-105">
          
                  {/* Header */}
                  <h2 className="text-3xl font-bold text-[#386641] text-center mb-6">
                    Consent Form
                  </h2>
          
                  <p className="text-lg text-gray-700 text-center mb-4">
                    Do you agree to send your data to <span className="font-bold">{usernameD}</span>?
                  </p>
          
                  {/* Name Input */}
                  <div className="flex flex-col items-center">
                    <label htmlFor="name" className="text-md text-gray-700 mb-2">
                      Enter Your Full Name:
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={handleNameChange}
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A994E] transition-shadow shadow-md"
                      placeholder="John Doe"
                    />
                  </div>
          
                  {/* Buttons */}
                  <div className="flex justify-center gap-4 mt-6">
                    <button
                      onClick={handleYes}
                      className="px-6 py-3 bg-[#6A994E] text-white rounded-lg hover:bg-[#386641] transition duration-300 shadow-md"
                    >
                      Yes
                    </button>
                    <button
                      onClick={handleNo}
                      className="px-6 py-3 bg-[#BC4749] text-white rounded-lg hover:bg-[#A7C957] transition duration-300 shadow-md"
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            );
          }
          
export default Assignpermission;
          