import React, { useEffect, useState } from 'react';
import { doc, setDoc } from "firebase/firestore";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getFirestore } from "firebase/firestore"; 
import { app } from "../../firebase.js";

function Assignpermission() {
   const [token, setToken] = useState(null);
   const [name, setName] = useState(null);
    const  usernameD  = useParams().username;
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
            
             
              
              const db = getFirestore(app);
               await setDoc(doc(db,usernameD,patientUserName),{
                name:name,
                username:patientUserName,
                expiresAt: expirationTime,
               })
               




              window.close();
            }
               
              
          
                
              
                return (
                  <div>
                  <h2>Consent Form</h2>
                  <p>Do you agree to send your data to doctor {usernameD}?</p>
                  <label htmlFor="name">ENTER UR FULL NAME</label>
                  <input type="text" id="name" onChange={handleNameChange} />
                  <button onClick={handleYes}>Yes</button>
                  <button onClick={handleNo}>No</button>
                </div>
                );
              }
            
export default Assignpermission
