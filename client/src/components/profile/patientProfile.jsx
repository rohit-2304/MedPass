import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import userImage from "../../assets/user1.jpg"; // Ensure the image path is correct

const PatientProfile = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const { username } = useParams(); // Dynamic route parameter
  const [info, setInfo] = useState(null); // State for patient information
  const [error, setError] = useState(false); // Error state
  const PORT = import.meta.env.VITE_NODE_PORT; // Port from environment variables

  const handleUpdate=()=>{
    navigate(`/updateProfile/${username}`,{
      state:{
        info
      }
    })
  }

  // Fetch patient information
  useEffect(() => {
    const get_info = async () => {
      try {
        const response = await axios.get(`http://localhost:${PORT}/node_server/api/patients/patient_get_info/${username}`,{
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
  }, [PORT, username]);

  
  // Token handling for session management
  useEffect(() => {
    const handleStorageChange = () => {
      const newToken = localStorage.getItem("token");
      setToken(newToken);

      if (!newToken) {
        localStorage.removeItem("token"); // Correct the token key
        navigate("/home");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    handleStorageChange();

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [navigate]);

  // Render error message if fetching fails
  if (error) {
    return (
      <div className="min-h-screen bg-[#ECEAE6] flex justify-center items-center">
        <p className="text-red-500">Failed to load patient information. Please try again later.</p>
      </div>
    );
  }

  // Render the profile UI
  return (
    <div className="min-h-screen bg-[#ECEAE6] flex justify-center items-center">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-3xl w-full">
        <div className="flex flex-col items-center">
          <img
            src={userImage}
            alt={`Profile picture of ${info?.patient_name || "patient"}`}
            className="w-40 h-40 rounded-full border-4 object-cover border-[#386641]"
          />
          <h1 className="text-3xl font-bold text-[#386641] mt-4">{info?.patient_name || "Loading..."}</h1>
        </div>
  
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-60 gap-y-4 ml-4 mr-4">
          {[
            { label: "Patient Name", value: info?.patient_name || "Unknown" },
            { label: "Date of Birth", value: info?.date_of_birth || "Unknown" },
            { label: "Gender", value: info?.gender || "Unknown" },
            { label: "Contact Info", value: info?.contact_info || "Unknown" },
            { label: "Medical History", value: info?.medical_history || "No major issues" },
            { label: "Current Medications", value: info?.current_medications || "None" },
            { label: "Allergies", value: info?.allergies || "Unknown" },
            { label: "Weight", value: info?.weight || "Unknown" },
            { label: "Height", value: info?.height || "Unknown" },
            { label: "Blood Group", value: info?.blood_group || "Unknown" }
          ].map((item, index) => (
            <div key={index} className="flex flex-col text-left">
              <p className="text-[#386641] font-semibold">{item.label}:</p>
              <p className="text-black">{item.value}</p>
            </div>
          ))}
        </div>
  
        <button
          onClick={handleUpdate}
          className="mt-6 w-full bg-[#386641] text-white font-semibold py-2 rounded-lg hover:bg-[#6A994E] text-center focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
        >
          Update Information
        </button>
      </div>
    </div>
  );
  
};

export default PatientProfile;
  