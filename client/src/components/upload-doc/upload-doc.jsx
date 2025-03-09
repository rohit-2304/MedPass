import React, { useState, useEffect } from "react";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../firebase.js";
import { useParams, useNavigate } from "react-router-dom";

function Upload_doc() {
  const [selectedFile, setselectedFile] = useState(null);
  const [token, setToken] = useState(null);
  const { username } = useParams();
  const navigate = useNavigate();

  const handleUpload = async (event) => {
    const uploadFile = event.target.files[0];
    if (!uploadFile) {
      console.error("No file selected.");
      return;
    }
    setselectedFile(uploadFile);

    const storage = getStorage(app);
    const myref = storageRef(storage, `${username}/${uploadFile.name}`+'pdf');

    try {
      // Wait for the file upload to complete
      await uploadBytes(myref, uploadFile);

      // Get the file URL
      const imageURL = await getDownloadURL(myref);
      console.log("File uploaded successfully. URL:", imageURL);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const newToken = localStorage.getItem("token");
      setToken(newToken);
      if (!newToken) {
        localStorage.removeItem("token");
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="p-6 bg-white shadow-md rounded-lg">
        <label
          htmlFor="file-upload"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Upload File:
        </label>
        <div className="flex items-center space-x-4">
          <label
            htmlFor="file-upload"
            className="px-4 py-2 bg-blue-500 text-white font-medium text-sm rounded-lg cursor-pointer hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Choose File
          </label>
          <span id="file-name" className="text-gray-500 text-sm">
            No file selected
          </span>
        </div>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          onChange={(e) => {
            const fileName = e.target.files[0]?.name || "No file selected";
            document.getElementById("file-name").textContent = fileName;
            handleUpload(e); // Pass event to handleUpload
          }}
        />
      </form>
    </div>
  );
}

export default Upload_doc;
