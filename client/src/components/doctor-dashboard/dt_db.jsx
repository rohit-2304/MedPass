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
      <div className="min-h-screen bg-[#ECEAE6] flex justify-center items-center p-8">
      {!loaded ? (
        <div className="text-2xl font-medium text-[#6A994E] animate-pulse">Loading...</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl w-full">
    
          {/* View Documents Card */}
          <div className="bg-white rounded-xl shadow-md border border-[#386641] hover:shadow-lg transition-all duration-300 ">
            <div className="border-b-4 border-[#386641] p-4">
              <h2 className="text-xl font-semibold text-[#386641]">DOCUMENTS</h2>
            </div>
            <div className="p-6 flex flex-col justify-between h-80">
              <p className="text-[#6A994E] text-md leading-relaxed">
               View Patients documents.
              </p>
              <div className="mt-6">
                <button 
                  onClick={handleView}
                  className="w-full py-3 text-white bg-[#6A994E] rounded-lg text-md font-medium hover:bg-[#386641] transition-all duration-300 cursor-pointer">
                  View
                </button>
              </div>
            </div>
          </div>
    
          {/* QR Image Section */}
          <div className="bg-white rounded-xl shadow-md border border-[#386641] hover:shadow-lg transition-all duration-300 flex flex-col justify-center items-center ">
            <div className="border-b-4 border-[#386641] w-full p-4">
              <h2 className="text-xl font-semibold text-[#386641]"> QR</h2>
            </div>
            <div className="flex justify-center items-center w-full h-full">
              <img 
                src={qrImage} 
                alt="QR Code" 
                className="max-h-60 rounded-lg shadow-sm border border-[#6A994E] transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>

        </div>
      )}
    </div>
    
    
      
    );
}

export default Dt_db;
