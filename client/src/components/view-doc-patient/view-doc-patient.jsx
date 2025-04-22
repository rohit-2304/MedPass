import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Viewdoc() {
    const [pdfs, setPdfs] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const { username } = useParams();
    const [token, setToken] = useState(null);
    const [pdfLength, setpdfLength] = useState(0);
    const navigate = useNavigate();
    const PORT = import.meta.env.VITE_NODE_PORT;
    
    const [disabledButtons, setDisabledButtons] = useState({});

    // Filter documents early in the component
    const filteredPdfs = pdfs.filter(
        (pdf) =>
            pdf.id.trim() !== "#&_summary_&#" &&
            pdf.id.trim() !== "histor_vector_embedding" &&
            pdf.id.trim() !== "all_vector_embedding"
    );

    const handleViewDocument = async (documentId) => {
        try {
            const response = await axios.get(
                `http://localhost:${PORT}/node_server/api/store_op/get-signed-url/${documentId}/${username}`,
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            window.open(response.data.signedUrl, "_blank");
        } catch (error) {
            console.error("Error fetching secure URL:", error);
        }
    };

    const handleRemove = async (documentId) => {
        if (disabledButtons[documentId]) return; // Prevent multiple clicks

        setDisabledButtons((prev) => ({ ...prev, [documentId]: true }));

        try {
            await axios.post(
                `http://localhost:${PORT}/node_server/api/store_op/remove_doc/${documentId}/${username}`,{delete_doc:false},
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            setpdfLength((prev) => prev - 1);

            try{
            const userDataResponse = await axios.get(`http://localhost:${PORT}/node_server/api/patients/patient_get_info/${username}`,
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }}    
            );

            //
            await axios.post(
               `http://localhost:${PORT}/RAG_server/`,
                {
                    username: username,
                    info: userDataResponse.data || { username: username }, 
                    delete_doc:true// Send user info or fallback
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );}catch (error) {
                console.error("Error:", error);
               
            }

        } catch (error) {
            console.error("Error removing document:", error);
            setDisabledButtons((prev) => ({ ...prev, [documentId]: false })); // Re-enable on error
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:${PORT}/node_server/api/store_op/view-doc-p/${username}`,
                    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
                );
                setpdfLength(response.data.length);
                setPdfs(response.data);
            } catch (error) {
                console.error("Error fetching documents:", error);
            } finally {
                setLoaded(true);
            }
        };
        fetchData();
    }, [username, pdfLength]);

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
        return () => window.removeEventListener("storage", handleStorageChange);
    }, [navigate]);

    return (
        <div className="min-h-screen bg-[#ECEAE6] p-8">
            <h1 className="text-3xl font-bold text-center text-[#386641] mb-8">
                Documents for <span className="text-[#BC4749]">{username}</span>
            </h1>

            {!loaded ? (
                <p className="text-center text-[#6A994E]">Loading...</p>
            ) : filteredPdfs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPdfs.map((pdf) => (
                        <div
                            key={pdf.id}
                            className="bg-white p-6 rounded-xl shadow-lg border border-[#A7C957] transition-all transform hover:scale-105 hover:shadow-2xl"
                        >
                            <h2 className="text-xl font-semibold text-[#386641] mb-3">
                                {pdf.id}
                            </h2>
                            <p className="text-[#000] mb-2">
                                <strong>Doctor:</strong> {pdf.doctorName || "Unnamed"}
                            </p>
                            <p className="text-[#000] mb-2">
                                <strong>Illness:</strong> {pdf.illness || "Unnamed"}
                            </p>
                            <p className="text-[#000] mb-2">
                                <strong>Date Uploaded:</strong> {pdf.issuedOn || "Unknown"}
                            </p>
                            <p className="text-[#000] mb-4">
                                <strong>Description:</strong> {pdf.description || "No description available."}
                            </p>
                            <div className="text-left flex">
                                <button
                                    onClick={() => handleViewDocument(pdf.id)}
                                    className="w-full py-3.5 bg-[#386641] hover:bg-[#2a4a30] text-white font-semibold rounded-lg transition-all"
                                >
                                    View
                                </button>
                                <button
                                    onClick={() => handleRemove(pdf.id)}
                                    disabled={disabledButtons[pdf.id]}
                                    className={`w-full py-3.5 bg-[#386641] text-white font-semibold rounded-lg ml-2 transition-all ${
                                        disabledButtons[pdf.id]
                                            ? "opacity-50 cursor-not-allowed"
                                            : "hover:bg-[#2a4a30]"
                                    }`}
                                >
                                    Remove
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
