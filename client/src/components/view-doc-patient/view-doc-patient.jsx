import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDocs, getFirestore, collection } from "firebase/firestore";
import { app } from "../../firebase";


function Viewdoc() {
    const [pdfs, setPdfs] = useState([]);
    const [loaded, setLoaded] = useState(false); 
    const { username } = useParams();
    const [token,setToken]= useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const db = getFirestore(app);
                const q = collection(db, username); 
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
                                    <a 
                                        href={pdf.fileURL} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-block bg-[#386641] text-white px-5 py-2 rounded-md hover:bg-[#6A994E] transition"
                                    >
                                         View Document
                                    </a>
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
