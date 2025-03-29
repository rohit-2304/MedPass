import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDocs, getFirestore, collection } from "firebase/firestore";
import { app } from "../../firebase";

function ViewDOC_d() {
    const navigate = useNavigate();
    const { username } = useParams();
    const [tokend, setToken] = useState(null);
    const [loaded, setLoaded] = useState(false); // Fixed initial state
    const [pdfs, setPdfs] = useState([]); // Fixed initial state

    // Fetch documents from Firestore
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

    // Handle token validation
    useEffect(() => {
        const handleStorageChange = () => {
            const newToken = localStorage.getItem("tokend");
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
            <h1 className="text-2xl font-bold text-center text-[#386641] mb-6">
                Documents for Patients
            </h1>

            {!loaded ? (
                <p className="text-center text-gray-600">Loading...</p>
            ) : pdfs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pdfs
                        .filter((pdf) => Date.now() <= pdf.expiresAt) // Fixed filter logic
                        .map((pdf) => (
                            <div
                                key={pdf.id} // Added key to avoid React warnings
                                onClick={() => navigate(`/view_doc_patient/${pdf.id}`)} 
                                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
                            >
                                {pdf.name || "Unnamed Document"}
                            </div>
                        ))}
                </div>
            ) : (
                <p className="text-center text-gray-600">
                    No patients registered yet
                </p>
            )}
        </div>
    );
}

export default ViewDOC_d;
