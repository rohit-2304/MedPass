
import React, { useRef, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { getDocs, getFirestore, collection } from "firebase/firestore";
import { app } from "../../firebase";

function Viewsummary() {
   
    const navigate = useNavigate();
    const [token,setToken]=useState();
    const PORT = import.meta.env.VITE_PORT;
    const {username} = useParams();
      const [loaded, setLoaded] = useState(false);
      const [pdfs,setPdfs] = useState(null);
    
      const formatSummary = (text) => {
        if (!text) return "<p>No summary available</p>";

        // Bold headings
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // Bullet points
        text = text.replace(/\* (.*?)\n/g, '<li>$1</li>');

        // Wrap bullets in <ul> tags
        text = text.replace(/<li>.*?<\/li>/gs, (match) => `<ul>${match}</ul>`);

        // Paragraphs for plain text sections
        text = text.replace(/(?:\r\n|\r|\n){2,}/g, '</p><p>');
        text = `<p>${text}</p>`;

        return text;
    };

    
      const getti_summ = async () => {
        try {
            const db = getFirestore(app); // Initialize Firestore
            const q = collection(db, username); // Fetch the collection using the username
            const response = await getDocs(q); // Get all documents in the collection
    
            // Filter documents that have a 'summary' field
            const filteredPdfs = response.docs
                .map((doc) => ({
                    id: doc.id, // The document ID
                    ...doc.data(), // All other document fields
                }))
                .filter((doc) => doc.summary); // Keep only documents with the 'summary' field
    
            setPdfs(filteredPdfs); // Save filtered documents to state
            setLoaded(true); // Mark loading as complete
        } catch (error) {
            console.error("Error fetching documents:", error);
        }
    };
           


    useEffect(()=>{
    try{ 
        
        const get_info=async()=>{
        const response = await axios.get(`http://localhost:${PORT}/api/patients/patient_get_info/${username}`);
        
      
    
            const response2 = await axios.post("http://127.0.0.1:8001/", {
               "username": username,
               "info": response.data ? response.data : { username: username },
       
     // Send the data as i  t is (object format)
            }
           
            , {
                headers: {
                    "Content-Type": "application/json", // Ensure headers match
                },
            });
           
    
    }; 
    get_info();
    getti_summ();
           

}   catch(e){
    console.error("some error while fetching")
}   
},[])


useEffect(() => {
            const handleStorageChange = () => {
                const newToken = localStorage.getItem('token');
                setToken(newToken);
                if(!newToken){
                    localStorage.removeItem('tokend')
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
    <h1 className="text-3xl font-bold text-center text-[#386641] mt-5 mb-3">
        Summary for Patient
    </h1>

    { !loaded ? (
        <p className="text-center text-gray-600">Loading...</p>
    ) : (
        <div className="space-y-4">
            {pdfs
                .filter((pdf) => pdf.id.trim() === "#&_summary_&#") 
                .map((pdf) => (
                    <div
                        key={pdf.id}
                        onClick={() => navigate(`/view_doc_patient/${pdf.id}`)}
                        className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-200 lg:p-10 lg:mx-25 lg:my-10"
                    >
                       <div
                            dangerouslySetInnerHTML={{ __html: formatSummary(pdf.summary) }}
                            className="text-gray-700 leading-relaxed"
                                />
                        </div>
                    
                ))}
        </div>
    )}
</div>
  )
}

export default Viewsummary
