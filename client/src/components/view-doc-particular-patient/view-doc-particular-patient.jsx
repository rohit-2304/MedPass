import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'

function View_ParticularPatient() {
    const [pdfs, setPdfs] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();
    const { patient } = useParams();
    const [tokend, setToken] = useState(null);
    const PORT =import.meta.env.VITE_PORT;
    const handleViewDocument = async (documentId) => {
        try {
            const response = await axios.get(`http://localhost:${PORT}/api/store_op/get-signed-url/${documentId}/${patient}`,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("tokend")}`
                }
            });
            window.open(response.data.signedUrl, "_blank");
        } catch (error) {
            console.error("Error fetching secure URL:", error);
        }
    };
    
    const formatSummary = (text) => {
        if (!text) return "<p>No summary available</p>";

        // Bold headings
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // Bullet points
        text = text.replace(/\* (.*?)\n/g, '<li>$1</li>');

        // Wrap bullets in <ul> tags
        text = text.replace(/(<li>.*?<\/li>)/gs, '<ul>$1</ul>');

        // Paragraphs for plain text sections
        text = text.replace(/(?:\r\n|\r|\n){2,}/g, '</p><p>');
        text = `<p>${text}</p>`;

        return text;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
              
                const response = await axios.get(`http://localhost:${PORT}/api/store_op/view-doc-p/${patient}`,{
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("tokend")}`
                    }
                }) ;

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
    }, [patient]);

    useEffect(() => {
        const handleStorageChange = () => {
            const newToken = localStorage.getItem('tokend');
            setToken(newToken);
            if (!newToken) {
                localStorage.removeItem('token');
                navigate('/home');
            }
        };

        window.addEventListener('storage', handleStorageChange);
        handleStorageChange();

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const filteredPdfs = pdfs.filter(pdf => pdf.id.trim() !== "#&_summary_&#" &&
        pdf.id.trim() !== "histor_vector_embedding" &&
        pdf.id.trim() !== "all_vector_embedding" &&
        pdf.id.trim() !== "#_summary");
    const summaryPdf = pdfs.find(pdf => pdf.id.trim() === "#&_summary_&#");

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <h1 className="text-2xl font-bold text-center text-[#386641] mb-6">
                Documents for {patient}
            </h1>

            {!loaded ? (
                <p className="text-center text-gray-600">Loading...</p>
            ) : (
                <>
                    {filteredPdfs.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredPdfs.map((pdf) => (
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
                                    <button  onClick={() => handleViewDocument(pdf.id)} className="w-full py-3.5 bg-[#386641] hover:bg-[#2a4a30] active:bg-[#1f3a25]
          text-white font-semibold rounded-lg shadow-md hover:shadow-lg 
          transition-all duration-300 transform hover:-translate-y-0.5 
          active:translate-y-0 active:scale-95 ">
   View
</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-600">
                            No documents found for this user.
                        </p>
                    )}

                    {summaryPdf && (
                        <div className="bg-white p-4 rounded-lg shadow mt-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">
                                Summary
                            </h2>
                            {/* Render summary in a formatted way */}
                            <div
                                className="text-gray-600 mb-4"
                                dangerouslySetInnerHTML={{
                                    __html: formatSummary(summaryPdf.summary || "No summary available."),
                                }}
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default View_ParticularPatient;
