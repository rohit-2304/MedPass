import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate,useLocation, useParams } from 'react-router-dom';

const PatientForm = () => {
    const navigate =useNavigate();
    const PORT = import.meta.env.VITE_PORT;
    const {username}=useParams();
    const location = useLocation();
  const [formData, setFormData] = useState({
    username:`${username}`,
    patient_name: '',
    date_of_birth: '',
    gender: '',
    contact_info: '',
    medical_history: '',
    current_medications: '',
    allergies: '',
    weight: '',
    height: '',
    blood_group: '',
   
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};

    // Full Name
    if (!formData.patient_name.trim()) {
      newErrors.patient_name = 'Full name is required.';
    }

    // Date of Birth
    if (!formData.date_of_birth) {
      newErrors.date_of_birth = 'Date of birth is required.';
    }

    // Gender
    if (!formData.gender) {
      newErrors.gender = 'Gender selection is required.';
    }

    // Contact Information
    const contactRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email regex
    if (!formData.contact_info.trim()) {
      newErrors.contact_info = 'Contact information is required.';
    } else if (!contactRegex.test(formData.contact_info.trim())) {
      newErrors.contact_info = 'Enter a valid email address.';
    }

    // Weight
    if (!formData.weight) {
      newErrors.weight = 'Weight is required.';
    } else if (isNaN(formData.weight) || formData.weight <= 0) {
      newErrors.weight = 'Weight must be a positive number.';
    }

    // Height
    if (!formData.height) {
      newErrors.height = 'Height is required.';
    } else if (isNaN(formData.height) || formData.height <= 0) {
      newErrors.height = 'Height must be a positive number.';
    }

    // Blood Group
    if (!formData.blood_group) {
      newErrors.blood_group = 'Blood group selection is required.';
    }

    // Blood Pressure
   

    // Medical History
    if (formData.medical_history.length > 200) {
      newErrors.medical_history = 'Medical history must not exceed 200 characters.';
    }

    // Current Medications
    if (formData.current_medications.length > 200) {
      newErrors.current_medications = 'Current medications must not exceed 200 characters.';
    }

    // Allergies
    if (formData.allergies.length > 200) {
      newErrors.allergies = 'Allergies must not exceed 200 characters.';
    }

    setErrors(newErrors);

 
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const password = location.state.password;
  
  
    
    if (validate()) {
      console.log('Form submitted:', formData);
      
      const response = await axios.post(
        `http://localhost:${PORT}/api/auth/patient_info/${username}`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      const response2 = await axios.post(
        `http://localhost:${PORT}/api/auth/register/patient`,
        {username,password},
        { headers: { "Content-Type": "application/json" } }
      );
     navigate('/login/patient');

    } else {
      console.log('Validation failed. Fix errors before submitting.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-green-50 to-blue-50 px-4 ">
      
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-lg w-full max-w-lg p-6 space-y-4 sm:space-y-6  m-5 ">
        <h2 className="text-3xl font-extrabold text-[#386641] text-center">Patient Information</h2>

        {/* Full Name */}
        <div>
          <label htmlFor="patient_name" className="block font-semibold text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            id="patient_name"
            name="patient_name"
            value={formData.patient_name}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded-lg ${errors.patient_name ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-400 focus:outline-none`}
            placeholder="Enter your full name"
            required
          />
          {errors.patient_name && <p className="text-red-500 text-sm mt-1">{errors.patient_name}</p>}
        </div>

        {/* Date of Birth */}
        <div>
          <label htmlFor="date_of_birth" className="block font-semibold text-gray-700 mb-1">Date of Birth</label>
          <input
            type="date"
            id="date_of_birth"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded-lg ${errors.date_of_birth ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-400 focus:outline-none`}
            required
          />
          {errors.date_of_birth && <p className="text-red-500 text-sm mt-1">{errors.date_of_birth}</p>}
        </div>

        {/* Gender */}
        <div>
          <label htmlFor="gender" className="block font-semibold text-gray-700 mb-1">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded-lg ${errors.gender ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-400 focus:outline-none`}
            required
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
        </div>

             {/* Contact Information */}
             <div>
          <label htmlFor="contact_info" className="block font-semibold text-gray-700 mb-1">Contact Information</label>
          <input
            type="text"
            id="contact_info"
            name="contact_info"
            value={formData.contact_info}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded-lg ${errors.contact_info ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-400 focus:outline-none`}
            placeholder="Enter email"
            required
          />
          {errors.contact_info && <p className="text-red-500 text-sm mt-1">{errors.contact_info}</p>}
        </div>

        {/* Weight */}
        <div>
          <label htmlFor="weight" className="block font-semibold text-gray-700 mb-1">Weight (kg)</label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded-lg ${errors.weight ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-400 focus:outline-none`}
            placeholder="Enter your weight"
            required
          />
          {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight}</p>}
        </div>

        {/* Height */}
        <div>
          <label htmlFor="height" className="block font-semibold text-gray-700 mb-1">Height (cm)</label>
          <input
            type="number"
            id="height"
            name="height"
            value={formData.height}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded-lg ${errors.height ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-400 focus:outline-none`}
            placeholder="Enter your height"
            required
          />
          {errors.height && <p className="text-red-500 text-sm mt-1">{errors.height}</p>}
        </div>

        {/* Blood Group */}
        <div>
          <label htmlFor="blood_group" className="block font-semibold text-gray-700 mb-1">Blood Group</label>
          <select
            id="blood_group"
            name="blood_group"
            value={formData.blood_group}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded-lg ${errors.blood_group ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-400 focus:outline-none`}
            required
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
          {errors.blood_group && <p className="text-red-500 text-sm mt-1">{errors.blood_group}</p>}
        </div>

       
       

        {/* Medical History */}
        <div>
          <label htmlFor="medical_history" className="block font-semibold text-gray-700 mb-1">Medical History</label>
          <textarea
            id="medical_history"
            name="medical_history"
            value={formData.medical_history}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded-lg ${errors.medical_history ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-400 focus:outline-none`}
            placeholder="Brief medical history (max 200 characters)"
            maxLength={200}
          ></textarea>
          {errors.medical_history && <p className="text-red-500 text-sm mt-1">{errors.medical_history}</p>}
        </div>

        {/* Current Medications */}
        <div>
          <label htmlFor="current_medications" className="block font-semibold text-gray-700 mb-1">Current Medications</label>
          <textarea
            id="current_medications"
            name="current_medications"
            value={formData.current_medications}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded-lg ${errors.current_medications ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-400 focus:outline-none`}
            placeholder="List current medications (max 200 characters)"
            maxLength={200}
          ></textarea>
          {errors.current_medications && <p className="text-red-500 text-sm mt-1">{errors.current_medications}</p>}
        </div>

        {/* Allergies */}
        <div>
          <label htmlFor="allergies" className="block font-semibold text-gray-700 mb-1">Allergies</label>
          <textarea
            id="allergies"
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded-lg ${errors.allergies ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-400 focus:outline-none`}
            placeholder="List allergies (max 200 characters)"
            maxLength={200}
          ></textarea>
          {errors.allergies && <p className="text-red-500 text-sm mt-1">{errors.allergies}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-[#386641] text-white font-semibold py-2 rounded-lg hover:[#6A994E] cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PatientForm;
