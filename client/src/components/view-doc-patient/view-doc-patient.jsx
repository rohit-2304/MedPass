import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDocs, getFirestore, collection } from "firebase/firestore";
import { app } from "../../firebase";
import axios from 'axios'


function Viewdoc() {
    const [pdfs, setPdfs] = useState([]);
    const [loaded, setLoaded] = useState(false); 
    const { username } = useParams();
    const [token,setToken]= useState(null);
    const navigate = useNavigate();
    const PORT = import.meta.env.VITE_PORT;
    const handleViewDocument = async (documentId) => {
        try {
            const response = await axios.get(`http://localhost:${PORT}/api/store_op/get-signed-url/${documentId}/${username}`,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            });
            window.open(response.data.signedUrl, "_blank");
        } catch (error) {
            console.error("Error fetching secure URL:", error);
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
              /*  const db = getFirestore(app);
                const q = collection(db, username); */
                const response = await axios.get(`http://localhost:${PORT}/api/store_op/view-doc-p/${username}`,{
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("token")}`
                    }
                });

                setPdfs(
                    response.data
                );
            } catch (error) {
                console.error("Error fetching documents:", error);
            } finally {
                setLoaded(true); 
            }
        };
       
        fetchData();
    }, [username]);
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
        <div className="min-h-screen bg-[#ECEAE6] p-8">

            {/* Header */}
            <h1 className="text-3xl font-bold text-center text-[#386641] mb-8">
                Documents for <span className="text-[#BC4749]">{username}</span>
            </h1>

            {/* Loader or Documents */}
            {!loaded ? (
                <p className="text-center text-[#6A994E]">Loading...</p>
            ) : pdfs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pdfs
                        .filter((pdf) => pdf.id.trim() !== "#&_summary_&#" &&  pdf.id.trim() !== "histor_vector_embedding" && pdf.id.trim() !== "all_vector_embedding"  )
                        .map((pdf) => (
                            <div 
                                key={pdf.id}
                                className="bg-white p-6 rounded-xl shadow-lg border border-[#A7C957] transition-all transform hover:scale-105  hover:shadow-2xl"
                            >
                                <h2 className="text-xl font-semibold text-[#386641] mb-3">
                                    {pdf.id}
                                </h2>

                                <p className="text-[#000] mb-2">
                                    <strong>Doctor:</strong> <span>{pdf.doctorName || "Unnamed"}</span>
                                </p>

                                <p className="text-[#000] mb-2">
                                    <strong>Illness:</strong> <span>{pdf.illness || "Unnamed"}</span>
                                </p>

                                <p className="text-[#000] mb-2">
                                    <strong>Date Uploaded:</strong> <span>{pdf.issuedOn || "Unknown"}</span>
                                </p>

                                <p className="text-[#000] mb-4">
                                    <strong>Description:</strong> {pdf.description || "No description available."}
                                </p>

                                <div className="text-left">
                                <button onClick={() => handleViewDocument(pdf.id)} className="w-full py-3.5 bg-[#386641] hover:bg-[#2a4a30] active:bg-[#1f3a25]
          text-white font-semibold rounded-lg shadow-md hover:shadow-lg 
          transition-all duration-300 transform hover:-translate-y-0.5 
          active:translate-y-0 active:scale-95">
   View
</button>
                                </div>
                            </div>
                        ))}
                </div>
            ) : (
                <p className="text-center text-[#BC4749] text-lg">
                    No documents found for this user.
                </p>
            )}
        </div>
    );
}

export default Viewdoc;
