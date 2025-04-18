import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import userImage from "../../assets/user1.jpg";  // Correct image import
import { UploadCloud, FileText, Scan, BrainCircuit  } from "lucide-react";
import axios from "axios" 
import {jwtDecode} from 'jwt-decode';


function Pt_db() {
    const navigate = useNavigate();
    const location = useLocation();
    const [error,setError]= useState(false);
    const [token, setToken] = useState(null);
    const { username } = useParams();
    const [info,setInfo]=useState(null);
    const PORT = import.meta.env.VITE_PORT; // Port from environment variables


    const handleUpload = () => navigate(`/upload_doc/${username}`);
    const handleView = () => navigate(`/view_doc/${username}`);
    const handleScan = () => navigate(`/scan_qr/${username}`);
    const handleSummary = () => navigate(`/view_summary/${username}`);


const checkAndRefreshToken = async () => {
        const accessToken = localStorage.getItem('token');
        const decodedToken = jwtDecode(accessToken);
        if(!accessToken){
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            navigate("/");
          }

        if (decodedToken.exp * 1000 < Date.now()) { 
            try {
                console.log("hi");
                const res = await axios.get(`http://localhost:${PORT}/api/auth/refresh-token/${username}`);
                const data =  res.data;
                localStorage.setItem('token', data.token);
            } catch (error) {
                console.error("Token refresh failed. Redirecting to login.");
            }
        }
    };
 

    

    useEffect(() => {
     
        const handleStorageChange = () => {
            const newToken = localStorage.getItem('token');
            setToken(newToken);
            if (!newToken) {
                localStorage.removeItem("tokend");
                
                navigate('/home');
            }
        };

        window.addEventListener('storage', handleStorageChange);
        handleStorageChange();

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    useEffect(()=>{ 
        const get_info = async () => {
            await checkAndRefreshToken();
            try {
              
              const response = await axios.get(`http://localhost:${PORT}/api/patients/patient_get_info/${username}`,{

                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
    
            });
              setInfo(response.data); // Save the response data to state
            } catch (err) {
              console.error("Error fetching patient info:", err);
              setError(true); // Set error state
            }
          };
    
          get_info();

    },[username])
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-[#ECEAE6] p-8 ">
            
            {/* Header Section */}
            {/* Header Section */}
<div className="bg-[#efefef] p-6 md:p-8 rounded-lg shadow-md flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-10">
    
    {/* Left - Image */}
    <div className="w-full md:w-1/3">
        <img 
            src={userImage} 
            alt="Medical Illustration" 
            className="w-full h-auto max-h-64 object-cover rounded-lg shadow-md"
        />
    </div>

    {/* Middle - Info */}
    <div className="w-full md:w-2/3 px-4 sm:px-6">
        <ul className="text-lg md:text-xl">
            <li className="flex flex-col md:flex-row py-1">
                <span className="text-[#386641] text-2xl md:text-4xl font-bold">Name:</span>
                <div className="text-[#040704] text-2xl md:text-4xl ml-0 md:ml-2">{info?.patient_name || "Loading..."}</div>
            </li>

            <li className="flex flex-col md:flex-row py-1">
                <span className="text-[#386641] text-2xl md:text-4xl font-bold">Date of Birth:</span>
                <div className="text-[#040704] text-2xl md:text-4xl ml-0 md:ml-2">{info?.date_of_birth || "Unknown"}</div>
            </li>

            <li className="flex flex-col md:flex-row py-1">
                <span className="text-[#386641] text-2xl md:text-4xl font-bold">Gender:</span>
                <div className="text-[#040704] text-2xl md:text-4xl ml-0 md:ml-2">{info?.gender || "Unknown"}</div>
            </li>
        </ul>
    </div>

    {/* Right - QR Scanner */}
    <div className="w-full md:w-1/3 flex justify-center">
        <div className="bg-white shadow-lg rounded-lg border border-[#6A994E] p-4 sm:p-6 text-center hover:scale-105 transition-transform duration-300">
            <h3 className="font-bold text-[#386641] mb-3 sm:mb-4 text-xl sm:text-2xl">QR SCANNER</h3>
            <p className="text-[#6A994E] text-sm sm:text-lg">Scan QR to grant the doctor access to your medical data.</p>
            <button
                className="mt-4 bg-[#70c957] hover:bg-[#6A994E] text-white font-bold py-2 px-4 sm:px-6 rounded transition duration-300 text-lg sm:text-xl"
                onClick={handleScan}
            >
                Scan QR
            </button>
        </div>
    </div>
</div>

           
            <div className='grid lg:grid-cols-4 gap-10  sm:grid-cols-2 p-10'>
                <button
                        className="mt-4 bg-cyan-950 hover:bg-cyan-700 cursor-pointer text-[#6ff583] font-bold py-2 px-6 rounded transition duration-300 text-2xl"
                        onClick={handleUpload}
                    >
                        Upload
                </button>

                <button
                        className="mt-4 bg-cyan-950 hover:bg-cyan-700 cursor-pointer text-[#6ff583] font-bold py-2 px-6 rounded transition duration-300 text-2xl"
                        onClick={handleView}
                    >
                        View
                    </button>

                    <button
                        className="mt-4 bg-cyan-950 hover:bg-cyan-700 cursor-pointer text-[#6ff583] font-bold py-2 px-6 rounded transition duration-300 text-2xl"
                        onClick={handleScan}
                    >
                        Scan
                    </button>

                    <button
                        className="mt-4 bg-cyan-950 hover:bg-cyan-700 cursor-pointer text-[#6ff583] font-bold py-2 px-6 rounded transition duration-300 text-2xl"
                        onClick={handleSummary}
                    >   Summary
                        </button>

            </div>
           {/* Cards Section */}
           

           <h2 className=' font-bold text-5xl  text-center p-5 text-cyan-900 underline decoration-4 rounded-lg'>Powerful features for your Health </h2>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mt-12">

{/* Card 1 - Upload */}
<div 
    className="bg-cyan-950 shadow-lg rounded-lg p-8 border-3 border-[#000000] hover:scale-105 transition-transform duration-300"
    onClick={handleUpload}
>
    <div className="flex items-center justify-center w-16 h-16 bg-[#64ba75] rounded-full mb-4">
        <UploadCloud className="text-white w-10 h-10" />
    </div>
    <h3 className="text-2xl font-bold text-[#64ba75] mb-4">ADD DOCUMENTS</h3>
    <p className="text-m text-white mb-2">
        Securely upload your medical documents to keep them accessible anytime, anywhere. 
    </p>
    <p className="text-m text-white mb-2">
        Supported formats: PDF, JPG, PNG. Organize and retrieve your records efficiently.
    </p>
    <p className="text-m text-white">
        Your files are encrypted and stored safely to ensure confidentiality.
    </p>
</div>

{/* Card 2 - View */}
<div 
    className="bg-cyan-950 shadow-lg rounded-lg p-8 border-3 border-[#000000] hover:scale-105 transition-transform duration-300"
    onClick={handleView}
>
    <div className="flex items-center justify-center w-16 h-16 bg-[#64ba75] rounded-full mb-4">
        <FileText className="text-white w-10 h-10" />
    </div>
    <h3 className="text-2xl font-bold text-[#64ba75] mb-4">VIEW DOCUMENTS</h3>
    <p className="text-m text-white mb-2">
        Easily access and review all your previously uploaded medical files in one place. 
    </p>
    <p className="text-m text-white mb-2">
        Sort by date, category, or file type to quickly find the records you need.
    </p>
    <p className="text-m text-white">
        Preview files directly in the app without downloading.
    </p>
</div>

{/* Card 3 - QR Scanner */}
<div 
    className="bg-cyan-950 shadow-lg rounded-lg p-8 border-3 border-[#000000] hover:scale-105 transition-transform duration-300"
    onClick={handleScan}
>
    <div className="flex items-center justify-center w-16 h-16 bg-[#64ba75] rounded-full mb-4">
        <Scan className="text-white w-10 h-10" />
    </div>
    <h3 className="text-2xl font-bold text-[#64ba75] mb-4">QR SCANNER</h3>
    <p className="text-m text-white mb-2">
        Instantly scan the doctor's QR code to share your medical history securely.
    </p>
    <p className="text-m text-white mb-2">
        Ensure doctors have real-time access to your upated medical records.
    </p>
    <p className="text-m text-white">
        Fast and efficient, saving time during consultations.
    </p>
</div>

{/* Card 4 - History */}
<div 
    className="bg-cyan-950 shadow-lg rounded-lg p-8 border-3 border-[#000000] hover:scale-105 transition-transform duration-300"
    onClick={handleSummary}
>
    <div className="flex items-center justify-center w-16 h-16 bg-[#64ba75] rounded-full mb-4">
        <BrainCircuit className="text-white w-10 h-10" />
    </div>
    <h3 className="text-xl font-bold text-[#64ba75] mb-4">VIEW AI SUMMARY</h3>
    <p className="text-m text-white mb-2">
        View and track all your previously uploaded document's Summary.
    </p>
    <p className="text-m text-white mb-2">
        Keep a chronological record of your medical data for easy reference.
    </p>
    <p className="text-m text-white">
        Get Important information in just one click.
    </p>
</div>

</div>



        </div>
    );
}

export default Pt_db;
