import React from 'react';
import { useParams } from 'react-router-dom';
import ladenImage from "../../assets/laden.jpg";  // Correct image import

const PatientProfile = () => {
  const { id } = useParams();  // Route parameter (for patient ID)

  return (
    <div className="min-h-screen bg-[#ECEAE6] flex justify-center items-center">
      <div className="bg-[#FFFFFF] shadow-2xl rounded-2xl p-10 max-w-3xl w-full">
        
        {/* Centered Profile Image */}
        <div className="flex flex-col items-center">
          <img 
             src={ladenImage} 
            alt="Profile" 
            className="w-40 h-40 rounded-full border-4 object-cover border-[#386641]"
          />
          <h1 className="text-3xl font-bold text-[#386641] mt-4">John Doe</h1>
         
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
            <p className="text-[#386641] font-semibold">Date of Birth:</p>
            <p className="text-black"> 12-05-1985</p>
          </div>
          <div>
            <p className="text-[#386641] font-semibold">Gender:</p>
            <p className="text-black"> Male</p>
          </div>
       
          <div>
            <p className="text-[#386641] font-semibold">Email:</p>
            <p className="text-black">john.doe@example.com</p>
          </div>
          <div>
            <p className="text-[#386641] font-semibold">Phone:</p>
            <p className="text-black">+1234567890</p>
          </div>

          <div>
            <p className="text-[#386641] font-semibold">Weight:</p>
            <p className="text-black">70 kg</p>
          </div>
          <div>
            <p className="text-[#386641] font-semibold">Height:</p>
            <p className="text-black">180 cm</p>
          </div>

          <div>
            <p className="text-[#386641] font-semibold">Blood Group:</p>
            <p className="text-black">O+</p>
          </div>
          <div>
            <p className="text-[#386641] font-semibold">Medical History:</p>
            <p className="text-black">No major issues</p>
          </div>

          <div>
            <p className="text-[#386641] font-semibold">Current Medications:</p>
            <p className="text-black">None</p>
          </div>
          <div>
            <p className="text-[#386641] font-semibold">Allergies:</p>
            <p className="text-black">Peanuts</p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <button className="bg-[#6A994E] hover:bg-[#386641] text-white font-bold py-2 px-6 rounded-full transition duration-300">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
