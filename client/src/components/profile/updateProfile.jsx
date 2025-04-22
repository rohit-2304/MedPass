import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

const UpdateProfile = () => {
  const { info } = useLocation().state;
  const [formData, setFormData] = useState(info);
  const [errors, setErrors] = useState({});
  const PORT = import.meta.env.VITE_NODE_PORT;
  const RAG_PORT = import.meta.env.VITE_RAG_PORT;
  const { username } = useParams();
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'patient_name':
        if (!value.trim()) error = 'Full name is required.';
        break;
      case 'date_of_birth':
        if (!value) error = 'Date of birth is required.';
        break;
      case 'gender':
        if (!value) error = 'Gender selection is required.';
        break;
      case 'contact_info': {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          error = 'Email is required.';
        } else if (!emailRegex.test(value)) {
          error = 'Enter a valid email address.';
        }
        break;
      }
      case 'weight':
        if (!value) {
          error = 'Weight is required.';
        } else if (isNaN(value) || value <= 0) {
          error = 'Weight must be a positive number.';
        }
        break;
      case 'height':
        if (!value) {
          error = 'Height is required.';
        } else if (isNaN(value) || value <= 0) {
          error = 'Height must be a positive number.';
        }
        break;
      case 'blood_group':
        if (!value) error = 'Blood group selection is required.';
        break;
      case 'medical_history':
        if (value.length > 200) error = 'Must not exceed 200 characters.';
        break;
      case 'current_medications':
        if (value.length > 200) error = 'Must not exceed 200 characters.';
        break;
      case 'allergies':
        if (value.length > 200) error = 'Must not exceed 200 characters.';
        break;
      default:
        break;
    }
    
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:${PORT}/node_server/api/patients/updateProfile/${username}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}` // Changed to token
          }
        }


      );
      try{
        const userDataResponse = await axios.get(`http://localhost:${PORT}/node_server/api/patients/patient_get_info/${username}`);

        //
        await axios.post(
            `http://localhost:${PORT}/RAG_server/`,
            {
                username: username,
                info: userDataResponse.data || { username: username }, 
                delete_doc:false// Send user info or fallback
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );}catch (error) {
            console.error("Error:", error);
           
        }
      navigate(`/pt_db/${username}`); // Added leading slash
    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message);
    }
  };

  // Helper component for error messages
  const ErrorMessage = ({ error }) => (
    error && <p className="text-red-500 text-sm mt-1">{error}</p>
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-green-50 to-blue-50 px-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-lg w-full max-w-lg p-6 space-y-6 m-5">
        <h2 className="text-3xl font-extrabold text-[#386641] text-center">
          Update Patient Information
        </h2>

        {/* Full Name */}
        <div>
          <label htmlFor="patient_name" className="block font-semibold text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="patient_name"
            name="patient_name"
            value={formData.patient_name}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded-lg focus:outline-none ${
              errors.patient_name ? 'border-red-500' : 'border-gray-300 focus:ring-2 focus:ring-blue-400'
            }`}
          />
          <ErrorMessage error={errors.patient_name} />
        </div>

        {/* Date of Birth */}
        <div>
          <label htmlFor="date_of_birth" className="block font-semibold text-gray-700 mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            id="date_of_birth"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded-lg focus:outline-none ${
              errors.date_of_birth ? 'border-red-500' : 'border-gray-300 focus:ring-2 focus:ring-blue-400'
            }`}
          />
          <ErrorMessage error={errors.date_of_birth} />
        </div>

        {/* Gender */}
        <div>
          <label htmlFor="gender" className="block font-semibold text-gray-700 mb-1">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded-lg focus:outline-none ${
              errors.gender ? 'border-red-500' : 'border-gray-300 focus:ring-2 focus:ring-blue-400'
            }`}
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <ErrorMessage error={errors.gender} />
        </div>

        {/* Contact Information */}
        <div>
          <label htmlFor="contact_info" className="block font-semibold text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="contact_info"
            name="contact_info"
            value={formData.contact_info}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded-lg focus:outline-none ${
              errors.contact_info ? 'border-red-500' : 'border-gray-300 focus:ring-2 focus:ring-blue-400'
            }`}
            placeholder="example@email.com"
          />
          <ErrorMessage error={errors.contact_info} />
        </div>

        {/* Weight */}
        <div>
          <label htmlFor="weight" className="block font-semibold text-gray-700 mb-1">
            Weight (kg)
          </label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded-lg focus:outline-none ${
              errors.weight ? 'border-red-500' : 'border-gray-300 focus:ring-2 focus:ring-blue-400'
            }`}
          />
          <ErrorMessage error={errors.weight} />
        </div>

        {/* Height */}
        <div>
          <label htmlFor="height" className="block font-semibold text-gray-700 mb-1">
            Height (cm)
          </label>
          <input
            type="number"
            id="height"
            name="height"
            value={formData.height}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded-lg focus:outline-none ${
              errors.height ? 'border-red-500' : 'border-gray-300 focus:ring-2 focus:ring-blue-400'
            }`}
          />
          <ErrorMessage error={errors.height} />
        </div>

        {/* Blood Group */}
        <div>
          <label htmlFor="blood_group" className="block font-semibold text-gray-700 mb-1">
            Blood Group
          </label>
          <select
            id="blood_group"
            name="blood_group"
            value={formData.blood_group}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded-lg focus:outline-none ${
              errors.blood_group ? 'border-red-500' : 'border-gray-300 focus:ring-2 focus:ring-blue-400'
            }`}
          >
            <option value="">Select</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
          <ErrorMessage error={errors.blood_group} />
        </div>

        {/* Medical History */}
        <div>
          <label htmlFor="medical_history" className="block font-semibold text-gray-700 mb-1">
            Medical History
          </label>
          <textarea
            id="medical_history"
            name="medical_history"
            value={formData.medical_history}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded-lg focus:outline-none ${
              errors.medical_history ? 'border-red-500' : 'border-gray-300 focus:ring-2 focus:ring-blue-400'
            }`}
            rows="3"
            maxLength={200}
          />
          <ErrorMessage error={errors.medical_history} />
        </div>

        {/* Current Medications */}
        <div>
          <label htmlFor="current_medications" className="block font-semibold text-gray-700 mb-1">
            Current Medications
          </label>
          <textarea
            id="current_medications"
            name="current_medications"
            value={formData.current_medications}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded-lg focus:outline-none ${
              errors.current_medications ? 'border-red-500' : 'border-gray-300 focus:ring-2 focus:ring-blue-400'
            }`}
            rows="3"
            maxLength={200}
          />
          <ErrorMessage error={errors.current_medications} />
        </div>

        {/* Allergies */}
        <div>
          <label htmlFor="allergies" className="block font-semibold text-gray-700 mb-1">
            Allergies
          </label>
          <textarea
            id="allergies"
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded-lg focus:outline-none ${
              errors.allergies ? 'border-red-500' : 'border-gray-300 focus:ring-2 focus:ring-blue-400'
            }`}
            rows="3"
            maxLength={200}
          />
          <ErrorMessage error={errors.allergies} />
        </div>

        <button
          type="submit"
          className="w-full bg-[#386641] text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
