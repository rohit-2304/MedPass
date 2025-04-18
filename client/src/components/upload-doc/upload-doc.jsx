import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Upload_doc() {
  const [selectedFile, setselectedFile] = useState(null);
  const [token, setToken] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { username } = useParams();
  const navigate = useNavigate();
  const PORT = import.meta.env.VITE_PORT;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      navigate("/login/patient");
      return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("username", username);
    formData.append("doctorName", e.target.DoctorName.value);
    formData.append("description", e.target.documentDescription.value);
    formData.append("illness", e.target.illness.value);
    formData.append("fileType", e.target.fileType.value);
    formData.append("issuedDate", e.target.issuedOn.value);
    formData.append("file", selectedFile);

    try {
      await axios.post(
        `http://localhost:${PORT}/api/store_op/patient`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("File uploaded successfully!");
      navigate(`/pt_db/${username}`);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Upload failed. Try again.");
    }

    setIsSubmitting(false);
  };

  const handleFileUpload = (event) => {
    const uploadFile = event.target.files[0];
    if (!uploadFile) {
      alert("No file selected.");
      return;
    }
    setselectedFile(uploadFile);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const newToken = localStorage.getItem("token");
      setToken(newToken);
      if (!newToken) {
        navigate("/home");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    handleStorageChange();

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#ECEAE6] flex justify-center items-center">
      <form
        className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 border-2 border-[#6A994E] transition-transform duration-300 m-10"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-[#386641] mb-6 text-center">
          Upload Medical Document
        </h2>
        {/* Medical Practitioner Name */}
        <label
          htmlFor="DoctorName"
          className="block text-[#386641] font-medium mb-1"
        >
          Medical Practitioner Name
        </label>
        <input
          type="text"
          id="DoctorName"
          name="DoctorName"
          required
          placeholder="Enter Medical Practitioner name"
          className="w-full px-3 py-2 border border-[#A7C957] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6A994E] mb-4"
        />
        {/* Description */}
        <label
          htmlFor="documentDescription"
          className="block text-[#386641] font-medium mb-1"
        >
          Description
        </label>
        <textarea
          name="documentDescription"
          id="documentDescription"
          rows={4}
          placeholder="Enter document description..."
          className="w-full px-3 py-2 border border-[#A7C957] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6A994E] mb-4"
        />
        {/* Illness */}
        <label
          htmlFor="illness"
          className="block text-[#386641] font-medium mb-1"
        >
          Illness
        </label>
        <input
          type="text"
          id="illness"
          name="illness"
          required
          placeholder="Enter Illness name"
          className="w-full px-3 py-2 border border-[#A7C957] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6A994E] mb-4"
        />
        {/* Report Type Dropdown */}
        <label
          htmlFor="fileType"
          className="block text-[#386641] font-medium mb-1"
        >
          Select Report Type
        </label>
        <select
          id="fileType"
          name="fileType"
          className="w-full px-3 py-2 border border-[#A7C957] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6A994E] mb-4"
        >
          <option value="">Select an option</option>
          <option value="table_format">Lab Report</option>
          <option value="descriptive">Prescription</option>
          <option value="table_format">Vaccine record</option>
          <option value="descriptive">Imaging</option>
          <option value="descriptive">Others (description format)</option>
        </select>
        {/* Issued Date */}
        <label
          htmlFor="issuedOn"
          className="block text-[#386641] font-medium mb-1"
        >
          Issued On
        </label>
        <input
          type="date"
          id="issuedOn"
          name="issuedOn"
          required
          className="w-full px-3 py-2 border border-[#A7C957] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6A994E] mb-4"
        />
        {/* File Upload */}
        <label
          htmlFor="file-upload"
          className="block text-[#386641] font-medium mb-1"
        >
          {" "}
          Upload Document:{" "}
          <div className="text-sm text-red-600 mt-2"> Select file having size less than 10 MB</div>
        </label>{" "}
        <div className="flex items-center space-x-4 mb-4">
          {" "}
          <label
            htmlFor="file-upload"
            className="px-4 py-2 bg-[#A7C957] text-white font-medium text-sm rounded-lg cursor-pointer hover:bg-[#6A994E] transition"
          >
            {" "}
            Choose Document{" "}
          </label>{" "}
          <span id="file-name" className="text-gray-600 text-sm">
            {" "}
            {selectedFile ? selectedFile.name : "No Document selected"}{" "}
          
          </span>{" "}
          
        </div>{" "}
        <input
  id="file-upload"
  type="file"
  className="hidden"
  onChange={(e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.size >   5 * 1024 * 1024) {
      alert("File size exceeds 10MB. Please upload a smaller file.");
      return;
    }

    if (file.type === "application/pdf") {
      handleFileUpload(e);
    } else {
      alert("Please upload a PDF document.");
    }
  }}
  required
/>

         
        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full px-4 py-2 bg-[#A7C957] text-white font-bold rounded-lg cursor-pointer hover:bg-[#6A994E] transition-transform duration-300 text-lg ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex justify-center items-center">
              <span className="mr-2">Uploading...</span>
              <div className="w-4 h-4 border-2 border-white border-dashed rounded-full animate-spin"></div>
            </div>
          ) : (
            "Upload Document"
          )}
        </button>
      </form>
    </div>
  );
}

export default Upload_doc;
