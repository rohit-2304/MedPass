import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

function Pt_db() {
    const navigate = useNavigate();
    const location = useLocation();
    const [token, setToken] = useState(null);
    const {username} = useParams();
    const handleUpload=()=>{
            navigate(`/upload_doc/${username}`)
    }
    const handleView=()=>{
            navigate(`/view_doc/${username}`)
    }
    const handleScan=()=>{
            navigate(`/scan_qr/${username}`)}

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

    return (
        
            
        <div className="min-h-screen bg-gradient-to-br from-blue-200 via-green-100 to-blue-50">
        <div className="grid grid-cols-4 gap-4 p-4">
          <div className="break-all grid grid-rows-[auto_400px] justify-items-center bg-white shadow-md rounded-lg transition-transform duration-300 hover:scale-110 hover:shadow-lg border border-blue-300 hover:border-blue-500">
            <div className="border-b-2 border-gray-300 min-w-full text-center font-bold">ADD DOCUMENTS</div>
            <div className="border-b border-gray-300 min-w-full">
                <div className='h-[80%]'>Info</div>
                <div className='flex justify-center align-bottom '><button className='border text-md text-gray-600 font-bold w-[60px] h-[30px] rounded-md bg-green-100 hover:bg-green-200 mt-6'onClick={handleUpload}> Upload</button></div>
            </div>


          </div>
          <div className="break-all grid grid-rows-[auto_400px] justify-items-center bg-white shadow-md rounded-lg transition-transform duration-300 hover:scale-110 hover:shadow-lg border border-blue-300 hover:border-blue-500">
            <div className="border-b-2 border-gray-300 min-w-full text-center font-bold">VIEW DOCUMENTS</div>
            <div className="border-b border-gray-300 min-w-full">
                <div className='h-[80%]'>Info</div>
                <div className='flex justify-center align-bottom '><button className='border text-md text-gray-600 font-bold w-[60px] h-[30px] rounded-md bg-green-100 hover:bg-green-200 mt-6'onClick={handleView}> View</button></div>
            </div>
          </div>
          <div className="break-all grid grid-rows-[auto_400px] justify-items-center bg-white shadow-md rounded-lg transition-transform duration-300 hover:scale-110 hover:shadow-lg border border-blue-300 hover:border-blue-500">
            <div className="border-b-2 border-gray-300 min-w-full text-center font-bold">QR Scanner</div>
            <div className="border-b border-gray-300 min-w-full">
                <div className='h-[80%]'>sdasda</div>
                <div className='flex justify-center align-bottom '><button className='border text-md text-gray-600 font-bold w-[60px] h-[30px] rounded-md bg-green-100 hover:bg-green-200 mt-6'onClick={handleScan}> Scan</button></div>
            </div>
          </div>
          <div className="break-all grid grid-rows-[auto_400px] justify-items-center bg-white shadow-md rounded-lg transition-transform duration-300 hover:scale-110 hover:shadow-lg border border-blue-300 hover:border-blue-500">
            <div className="border-b-2 border-gray-300 min-w-full text-center font-bold">VIEW DOCUMENTS</div>
            <div className="border-b border-gray-300 min-w-full">
                <div className='h-[80%]'>Info</div>
                <div className='flex justify-center align-bottom '><button className='border text-md text-gray-600 font-bold w-[60px] h-[30px] rounded-md bg-green-100 hover:bg-green-200 mt-6'onClick={handleView}> View</button></div>
            </div>
          </div>
         
          

       
      
        
        </div>
     
      </div>
      
     


    );
}

export default Pt_db;
