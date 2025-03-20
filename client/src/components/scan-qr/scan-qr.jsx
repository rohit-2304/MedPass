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
    <div>
      <div className="text-3xl">YOUR QR SCANNER</div>
      {scanResult ? (
        <div>
          <p>Success! Scanned QR Code:</p>
          <a href={scanResult} target="_blank" rel="noopener noreferrer " onClick={handleClick}>
            {scanResult}
          </a>
        </div>
      ) : (
        // Video feed container for QR scanner
        <video ref={videoRef} style={{ width: '100%', height: '300px' }} />
      )}
    </div>
  );
}

export default Scan_Qr;
