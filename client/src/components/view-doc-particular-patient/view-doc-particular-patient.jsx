import React, { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getDocs, getFirestore, collection } from "firebase/firestore";
import { app } from "../../firebase";

function View_ParticularPatient() {
     const [pdfs, setPdfs] = useState([]);
     const [loaded, setLoaded] = useState(false); 
    const navigate = useNavigate();
    const PORT =import.meta.env.VITE_PORT;
    const {patient} = useParams();
     const [tokend, setToken] = useState(null);

          useEffect(() => {
                const fetchData = async () => {
                    try {
                        const db = getFirestore(app);
                        const q = collection(db, patient); 
                        const response = await getDocs(q);
        
               
                        setPdfs(
                            response.docs.map((doc) => ({
                                id: doc.id,
                                ...doc.data(), 
                            }))
                        );
                    } catch (error) {
                        console.error("Error fetching documents:", error);
                    } finally {
                        setLoaded(true); 
                    }
                };
        
                fetchData();
            }, [patient]);




     useEffect(() => {
                 const handleStorageChange = () => {
                     const newToken = localStorage.getItem('tokend');
                     setToken(newToken);
                     if(!newToken ){
                         localStorage.removeItem('token');
                         navigate('/home')
                     }
                 };
         
                 window.addEventListener('storage', handleStorageChange);
                 handleStorageChange();
         
                 return () => {
                     window.removeEventListener('storage', handleStorageChange);
                 };
             }, []);
  return (
    <div className="bg-gray-100 min-h-screen p-6">
    <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
        Documents for {patient}
    </h1>

    {!loaded ? (
        <p className="text-center text-gray-600">Loading...</p>
    ) : pdfs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pdfs
                .filter((pdf) => pdf.id !== "#&-summary-&#") // Filter out items with id "summary"
                .map((pdf) => (
                    <div 
                        key={pdf.id}
                        className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
                    >
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">
                            Document Name: <span className="text-green-600">{pdf.id}</span>
                        </h2>
                        <p className="text-gray-600 mb-2">
                            <strong>Doctor:</strong> <span>{pdf.doctorName || "Unnamed"}</span>
                        </p>
                        <p className="text-gray-600 mb-2">
                            <strong>Illness:</strong> <span>{pdf.illness || "Unnamed"}</span>
                        </p>
                        <p className="text-gray-600 mb-2">
                            <strong>Date Uploaded:</strong> <span>{pdf.issuedOn || "Unnamed"}</span>
                        </p>
                        <p className="text-gray-600 mb-4">
                            <strong>Description:</strong>{" "}
                            {pdf.description || "No description available."}
                        </p>
                        <div>
                            <a href={pdf.fileURL} className="underline text-blue-800">
                                Click here to View
                            </a>
                        </div>
                    </div>
                ))}
        </div>
    ) : (
        <p className="text-center text-gray-600">
            No documents found for this user.
        </p>
    )}
</div>
  )
}

export default View_ParticularPatient
