import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ladenImage from "../../assets/laden.jpg";  // Correct image import
import { UploadCloud, FileText, Scan, BrainCircuit  } from "lucide-react";

function Pt_db() {
    const navigate = useNavigate();
    const location = useLocation();
    const [token, setToken] = useState(null);
    const { username } = useParams();

    const handleUpload = () => navigate(`/upload_doc/${username}`);
    const handleView = () => navigate(`/view_doc/${username}`);
    const handleScan = () => navigate(`/scan_qr/${username}`);

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

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-[#ECEAE6] p-8 ">
            
            {/* Header Section */}
            <div className="bg-[#ECEAE6] p-8 rounded-lg shadow-md flex flex-col lg:flex-row items-center justify-between gap-10">
                
                {/* Left - Image */}
                <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
                    <img 
                        src={ladenImage} 
                        alt="Medical Illustration" 
                        className="w-full h-64 object-cover rounded-lg shadow-md"
                    />
                </div>

                {/* Middle - Info */}
                <div className="w-full lg:w-2/3 text-left lg:text-left px-6 ">
                <ul className='text-xl'>
                    <li><span className="text-[#386641] font-bold">Name :</span> Abdul Sheikh </li>
                    <li><span  className="text-[#386641] font-bold">Age :</span> 31 </li>
                    <li><span  className="text-[#386641] font-bold">Sex :</span> Male </li>
                </ul>
                  
                </div>
               
                {/* Right - QR Scanner */}
                <div className="w-full lg:w-1/3 flex justify-center">
                    <div className="bg-white shadow-lg rounded-lg border border-[#6A994E] p-6 text-center hover:scale-105 transition-transform duration-300">
                        <h3 className="text-lg font-bold text-[#386641] mb-4 ">QR SCANNER</h3>
                        <p className="text-[#6A994E]">Scan QR to grant the doctor access to your medical data.</p>
                        <button
                            className="mt-4 bg-[#A7C957] hover:bg-[#6A994E] text-white font-bold py-2 px-6 rounded transition duration-300"
                            onClick={handleScan}
                        >
                            Scan QR
                        </button>
                    </div>
                </div>
            </div>
           
            <div className='grid lg:grid-cols-4 gap-10  sm:grid-cols-2 p-10'>
                <button
                        className="mt-4 bg-[#A7C957] hover:bg-[#6A994E] cursor-pointer text-white font-bold py-2 px-6 rounded transition duration-300"
                        onClick={handleUpload}
                    >
                        Upload
                </button>

                <button
                        className="mt-4 bg-[#A7C957] hover:bg-[#6A994E] cursor-pointer text-white font-bold py-2 px-6 rounded transition duration-300"
                        onClick={handleView}
                    >
                        View
                    </button>

                    <button
                        className="mt-4 bg-[#A7C957] hover:bg-[#6A994E] cursor-pointer text-white font-bold py-2 px-6 rounded transition duration-300"
                        onClick={handleScan}
                    >
                        Scan
                    </button>

                    <button
                        className="mt-4 bg-[#A7C957] hover:bg-[#6A994E] cursor-pointer text-white font-bold py-2 px-6 rounded transition duration-300"
                        onClick={handleView}
                    >
                        Summary
                    </button>

            </div>
           {/* Cards Section */}
           

           <h2 className='font-bold text-4xl  text-center p-5'>Powerful features for your Health </h2>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mt-12">

{/* Card 1 - Upload */}
<div 
    className="bg-white shadow-lg rounded-lg p-8 border border-[#6A994E] hover:scale-105 transition-transform duration-300"
    onClick={handleUpload}
>
    <div className="flex items-center justify-center w-16 h-16 bg-[#A7C957] rounded-full mb-4">
        <UploadCloud className="text-white w-10 h-10" />
    </div>
    <h3 className="text-lg font-bold text-[#386641] mb-4">ADD DOCUMENTS</h3>
    <p className="text-sm  mb-2">
        Securely upload your medical documents to keep them accessible anytime, anywhere. 
    </p>
    <p className="text-sm  mb-2">
        Supported formats: PDF, JPG, PNG. Organize and retrieve your records efficiently.
    </p>
    <p className="text-sm ">
        Your files are encrypted and stored safely to ensure confidentiality.
    </p>
</div>

{/* Card 2 - View */}
<div 
    className="bg-white shadow-lg rounded-lg p-8 border border-[#6A994E] hover:scale-105 transition-transform duration-300"
    onClick={handleView}
>
    <div className="flex items-center justify-center w-16 h-16 bg-[#A7C957] rounded-full mb-4">
        <FileText className="text-white w-10 h-10" />
    </div>
    <h3 className="text-lg font-bold text-[#386641] mb-4">VIEW DOCUMENTS</h3>
    <p className="text-sm  mb-2">
        Easily access and review all your previously uploaded medical files in one place. 
    </p>
    <p className="text-sm  mb-2">
        Sort by date, category, or file type to quickly find the records you need.
    </p>
    <p className="text-sm ">
        Preview files directly in the app without downloading.
    </p>
</div>

{/* Card 3 - QR Scanner */}
<div 
    className="bg-white shadow-lg rounded-lg p-8 border border-[#6A994E] hover:scale-105 transition-transform duration-300"
    onClick={handleScan}
>
    <div className="flex items-center justify-center w-16 h-16 bg-[#A7C957] rounded-full mb-4">
        <Scan className="text-white w-10 h-10" />
    </div>
    <h3 className="text-lg font-bold text-[#386641] mb-4">QR SCANNER</h3>
    <p className="text-sm  mb-2">
        Instantly scan the doctor's QR code to share your medical history securely.
    </p>
    <p className="text-sm  mb-2">
        Ensure doctors have real-time access to your upated medical records.
    </p>
    <p className="text-sm ">
        Fast and efficient, saving time during consultations.
    </p>
</div>

{/* Card 4 - History */}
<div 
    className="bg-white shadow-lg rounded-lg p-8 border border-[#6A994E] hover:scale-105 transition-transform duration-300"
    onClick={handleView}
>
    <div className="flex items-center justify-center w-16 h-16 bg-[#a7c957] rounded-full mb-4">
        <BrainCircuit className="text-white w-10 h-10" />
    </div>
    <h3 className="text-lg font-bold text-[#386641] mb-4">VIEW AI SUMMARY</h3>
    <p className="text-sm  mb-2">
        View and track all your previously uploaded document's Summary.
    </p>
    <p className="text-sm  mb-2">
        Keep a chronological record of your medical data for easy reference.
    </p>
    <p className="text-sm ">
        Get Important information in just one click.
    </p>
</div>

</div>



        </div>
    );
}

export default Pt_db;
