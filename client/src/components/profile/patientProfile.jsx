import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ladenImage from "../../assets/laden.png"; // Ensure the image path is correct

const PatientProfile = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const { username } = useParams(); // Dynamic route parameter
  const [info, setInfo] = useState(null); // State for patient information
  const [error, setError] = useState(false); // Error state
  const PORT = import.meta.env.VITE_PORT; // Port from environment variables

  // Fetch patient information
  useEffect(() => {
    const get_info = async () => {
      try {
        const response = await axios.get(`http://localhost:${PORT}/api/patients/patient_get_info/${username}`);
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
      <div className="bg-[#FFFFFF] shadow-2xl rounded-2xl p-10 max-w-3xl w-full">
        <div className="flex flex-col items-center">
          <img
            src={ladenImage}
            alt={`Profile picture of ${info?.patient_name || "patient"}`}
            className="w-40 h-40 rounded-full border-4 object-cover border-[#386641]"
          />
          <h1 className="text-3xl font-bold text-[#386641] mt-4">{info?.patient_name || "Loading..."}</h1>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-[#386641] font-semibold">Patient Name:</p>
            <p className="text-black">{info?.patient_name || "Unknown"}</p>
          </div>

          <div>
            <p className="text-[#386641] font-semibold">Date of Birth:</p>
            <p className="text-black">{info?.date_of_birth || "Unknown"}</p>
          </div>

          <div>
            <p className="text-[#386641] font-semibold">Gender:</p>
            <p className="text-black">{info?.gender || "Unknown"}</p>
          </div>

          <div>
            <p className="text-[#386641] font-semibold">Contact Info:</p>
            <p className="text-black">{info?.contact_info || "Unknown"}</p>
          </div>

          <div>
            <p className="text-[#386641] font-semibold">Medical History:</p>
            <p className="text-black">{info?.medical_history || "No major issues"}</p>
          </div>

          <div>
            <p className="text-[#386641] font-semibold">Current Medications:</p>
            <p className="text-black">{info?.current_medications || "None"}</p>
          </div>

          <div>
            <p className="text-[#386641] font-semibold">Allergies:</p>
            <p className="text-black">{info?.allergies || "Unknown"}</p>
          </div>

          <div>
            <p className="text-[#386641] font-semibold">Weight:</p>
            <p className="text-black">{info?.weight || "Unknown"}</p>
          </div>

          <div>
            <p className="text-[#386641] font-semibold">Height:</p>
            <p className="text-black">{info?.height || "Unknown"}</p>
          </div>

          <div>
            <p className="text-[#386641] font-semibold">Blood Group:</p>
            <p className="text-black">{info?.blood_group || "Unknown"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
  