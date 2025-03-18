import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Dt_db() {
    const navigate = useNavigate();
    const PORT =import.meta.env.VITE_PORT;
    const {username} = useParams();
    const [tokend, setToken] = useState(null);
    const [qrImage, setqrImage] = useState(null);
    const [loaded,setLoaded] = useState("false");
        useEffect(()=>{


            const getQrImage=async()=>{
                const response = await axios.get(`http://localhost:${PORT}/api/authd/getQr/${username}`);
            
              setqrImage(response.data.doctorUrl);
            }

            getQrImage();
            setLoaded("true")
        },[]);


    useEffect(() => {
            const handleStorageChange = () => {
                const newToken = localStorage.getItem('tokend');
                setToken(newToken);
                if(!newToken ){
                    localStorage.removeItem('token');
                    navigate('/home')
                }
            };
    
            window.addEventListener('storage', handleStorageChange);
            handleStorageChange();
    
            return () => {
                window.removeEventListener('storage', handleStorageChange);
            };
        }, []);

    return (
        <div>
            {
                !loaded?<div>NOTLOADED</div>:<div>
                    
                    <img src={qrImage} alt="" />
                    
                    </div>
            }
        </div>
    );
}

export default Dt_db;
