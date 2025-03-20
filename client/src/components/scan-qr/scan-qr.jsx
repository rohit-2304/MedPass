import React, { useRef, useEffect, useState } from 'react';
import QrScanner from 'qr-scanner'; // Import the QR scanner library
import { useNavigate, useParams } from 'react-router-dom';

function Scan_Qr() {
  const videoRef = useRef(null); // Ref for the video element
  const [scanResult, setScanResult] = useState(null); // State to store QR scan result
  const navigate = useNavigate();
  const username = useParams().username;
  const [token,setToken]=useState();

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


  const handleClick=()=>{
    navigate(`/pt_db/${username}`);
  }
  useEffect(() => {
   
    if (!videoRef.current) return;


    const qrScanner = new QrScanner(
      videoRef.current,
      (result) => {
      // Log the result
        setScanResult(result.data); 
        navigate(`/${result.data}`);
        qrScanner.stop(); 
      },
      {
        highlightScanRegion: true,
        highlightCodeOutline: true,
      }
    );

    qrScanner.start().catch(console.error); 

    return () => {
      qrScanner.stop();
      qrScanner.destroy();
     
    };
   
  }, []); 

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ECEAE6] to-[fff] flex items-center justify-center p-6">
      
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg transition-transform duration-300 hover:scale-105">
        
        <h1 className="text-4xl font-bold text-[#386641] text-center mb-6">
          QR Scanner
        </h1>

        {scanResult ? (
          <div className="text-center">
            <p className="text-lg text-[#6A994E] font-semibold">Success! Scanned QR Code:</p>
            
            <a 
              href={scanResult} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block text-[#BC4749] font-medium underline mt-2 hover:text-[#6A994E] transition duration-300"
              onClick={handleClick}
            >
              {scanResult}
            </a>

            <button 
              className="mt-4 px-6 py-2 bg-[#6A994E] text-white rounded-lg hover:bg-[#386641] transition duration-300"
              onClick={handleClick}
            >
              Go to Patient DB
            </button>
          </div>
        ) : (
          <div className="border-2 border-[#A7C957] rounded-lg overflow-hidden shadow-md">
            <video 
              ref={videoRef} 
              className="w-full h-80 rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Scan_Qr;










