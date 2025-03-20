import React, { useState, useEffect } from "react";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import { getFirestore,doc, setDoc } from "firebase/firestore"; 
import { app } from "../../firebase.js";
import { useParams, useNavigate } from "react-router-dom";

function Upload_doc() {
  const [selectedFile, setselectedFile] = useState(null);
  const [token, setToken] = useState(null);
  const { username } = useParams();
  const navigate = useNavigate();


 const handleSubmit=async(e)=>{
  
  if(token){
  e.preventDefault();
  const db = getFirestore(app);
  const storage = getStorage(app);
  const myref = storageRef(storage, `${username}/${selectedFile.name}`);
  const doctorName = e.target.DoctorName.value; // Replace with the name or id of the input
  const description = e.target.documentDescription.value; // Textarea field
  const illness = e.target.illness.value; // Input field
  const fileType = e.target.fileType.value;
  const issuedDate = e.target.issuedOn.value;
  try {
    // Wait for the file upload to complete
    await uploadBytes(myref, selectedFile);
    const pdfURL = await getDownloadURL(myref);
  

    await setDoc(doc(db,username, selectedFile.name),{
      doctorName:doctorName,
      description:description,
      illness:illness,
      fileName:selectedFile.name,
      fileURL: pdfURL,
      issuedOn:issuedDate,
      fileType:fileType
    });
    alert("file uploaded succesfully");
    navigate(`/pt_db/${username}`);
  } catch (error) {
    console.error("Error uploading file:", error);
  }

  console.log(selectedFile);}
  else{
    navigate("/login/patient");
  }

   
  
 }

  const handleFileUpload = (event) => {
    const uploadFile = event.target.files[0];
    if (!uploadFile ) {
      console.error("No file selected ");
      return;
    }
    setselectedFile(uploadFile);
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
    <div className="bg-white">
    <div className="flex mt-[10%] ml-[35%] bg-white">

        <form className="p-6 bg-white shadow-md rounded-lg flex flex-col transition-transform duration-300 hover:scale-110 " onSubmit={handleSubmit}>

    <label htmlFor="DoctorName" className="">Medical Practioner Name</label>

    <input type="text" id="patientName" required placeholder="Enter  Medical Practitioner name"  className="mb-2 pl-1 border-[0.1px] text-sm hover:bg-blue-50  "name="DoctorName"/>

   <label htmlFor="documentDescription" className="">Description</label>
        <textarea 
      name="documentDescription" 
      id="documentDescription" 
       rows={5} 
      cols={24} 
      className="hover:bg-blue-50 resize-none w-full overflow-auto border-[0.1px] mb-2 pl-1"
      placeholder="Enter document description..."
></textarea>

<label htmlFor="illness" className="" name="illness">Illness</label>
<input type="text" id="illness" required placeholder="Enter Illness name"  className="mb-2 pl-1 border-[0.1px] text-sm hover:bg-blue-50"/>

<div>
      <label htmlFor="dropdown">Select report type:</label>
      <select id="dropdown"  className="mt-2 mb-2 border-1" name="fileType">
        <option value="">Select an option</option>
        <option value="table_format">Lab Report</option>
        <option value="descriptive">Prescription</option>
        <option value="table_format">Vaccine record</option>
        <option value="descriptive">Imaging</option>
        <option value="descriptive">Others(description format)</option>
      </select>
 
    </div>
      <label htmlFor="date_submission">ISSUED ON</label>
      <input type="date" id="date_submission" name="issuedOn" className="mb-2 border-1" required/>
        <label
          htmlFor="file-upload"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Upload Document:
        </label>
        <div className="flex items-center space-x-4">
          <label
            htmlFor="file-upload"
            className="px-4 py-2 bg-blue-500 text-white font-medium text-sm rounded-lg cursor-pointer hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Choose Document
          </label>
          <span id="file-name" className="text-gray-500 text-sm ">
            No Document selected <span className="text-sm">(Enter proper document names)</span>
          </span>
        </div>
        <input
          id="file-upload" required
          type="file"
          className="hidden"
          onChange={(e) => {
            if(e.target.files[0].type === "application/pdf"){
            let fileName = e.target.files[0]?.name || "No Document selected";
            document.getElementById("file-name").textContent = fileName;
            handleFileUpload(e);}
            else{
              let fileName = "Select Proper  Document(pdf-format)";
              document.getElementById("file-name").textContent = fileName;
            }
           
          }}
        />
     <button className=' relative ml-[40%] border text-md text-gray-600 font-bold w-[60px] h-[30px] rounded-md bg-green-100 hover:bg-green-200 mt-6' type="submit"> Submit</button>
      </form>

       
    </div></div>
  );
}

export default Upload_doc;
