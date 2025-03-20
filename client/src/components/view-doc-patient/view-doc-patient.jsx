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
        <div className="bg-gray-100 min-h-screen p-6">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
            Documents for {username}
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
    );
}

export default Viewdoc;
