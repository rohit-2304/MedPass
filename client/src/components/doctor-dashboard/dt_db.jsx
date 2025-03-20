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

    const handleView=()=>{
        navigate(`/view_doc_D/${username}`);
    }


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
          !loaded ? (
            <div className="text-center text-xl font-semibold text-gray-500 p-6">Loading...</div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4 p-6 bg-gray-100">
              {/* View Documents Card */}
              <div>
                <div className="flex flex-col items-center bg-white shadow-lg rounded-lg border border-blue-400 hover:border-blue-600 hover:shadow-xl transition-transform transform hover:-translate-y-1">
                  <div className="border-b-2 border-gray-300 w-full text-center text-lg font-bold py-3">VIEW DOCUMENTS</div>
                  <div className="p-4 flex flex-col justify-between h-80">
                    <div className="flex-grow overflow-auto text-gray-600 text-center">Info</div>
                    <div className="mt-6">
                      <button onClick={handleView} className="py-2 px-4 border text-sm text-gray-700 font-semibold rounded bg-green-200 hover:bg-green-300 transition duration-200">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* QR Image Section */}
              <div className="flex flex-col items-center bg-white shadow-lg rounded-lg border border-blue-400 hover:border-blue-600 hover:shadow-xl transition-transform transform hover:-translate-y-1">
                <div className="py-3 text-lg font-bold text-gray-700">DR QR</div>
                <img src={qrImage} alt="QR Code" className="object-contain max-h-80 rounded-md shadow-md"/>
              </div>
            </div>
          )
        }
      </div>
      
    );
}

export default Dt_db;
