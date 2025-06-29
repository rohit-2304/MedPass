import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import axios from 'axios';
import { initializeApp } from "firebase/app";

function Viewsummary() {
    const navigate = useNavigate();
    const { username } = useParams(); // Username from route params
    const [loading, setLoading] = useState(false); // State for loading spinner
    const [viewButtonEnabled, setViewButtonEnabled] = useState(false); // Enable/disable "View Summary" button
    const [summaryData, setSummaryData] = useState(null); // State to store the fetched summary
    const [error, setError] = useState(null); // State for error messages
    const [question, setQuestion] = useState(''); // State for question input
    const [answer, setAnswer] = useState(null); // State for storing chatbot answer
    const PORT = import.meta.env.VITE_NODE_PORT || 3000; // Fallback port if undefined


    const formatSummary = (text) => {
        if (!text) return "<p>No summary available</p>";

        // Bold headings
        
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // Bullet points
        text = text.replace(/\* (.*?)\n/g, '<li>$1</li>');

        // Wrap bullets in <ul> tags
        text = text.replace(/\* (.*?)\n/g, '<li>$1</li>');

        // Paragraphs for plain text sections
        text = text.replace(/(?:\r\n|\r|\n){2,}/g, '</p><p>');
        return `<p>${text}</p>`;

        
    };

    // Function to generate the summary (POST request)
    const generateSummary = async () => {
        setLoading(true); // Show loading indicator
        setViewButtonEnabled(false); // Disable view button initially
        try { 
        
            const userDataResponse = await axios.get(`http://localhost:${PORT}/node_server/api/patients/patient_get_info/${username}`,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            });

            // Step 2: Generate summary via POST request
            await axios.post(
                `http://localhost:${PORT}/RAG_server/`,
                {
                    username: username,
                    info: userDataResponse.data || { username: username }, 
                    delete_doc:false// Send user info or fallback
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Summary generation request sent successfully.");
            setViewButtonEnabled(true); // Enable the "View Summary" button
        } catch (err) {
            console.error("Error during summary generation:", err.message);
            setError("Failed to generate the summary. Please try again later.");
        } finally {
            setLoading(false); // Hide loading indicator
        }
    };

    // Function to fetch the generated summary (GET request)
    const fetchSummary = async () => {
        setLoading(true); // Show loading indicator
        try {
            const response = await axios.get(`http://localhost:${PORT}/node_server/api/store_op/summary/${username}`,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            });
            const summarySnapshot = response.data.find(item=>item.id.trim()==="#&_summary_&#");

            if (summarySnapshot) {
                setSummaryData({ id: summarySnapshot.id, ...summarySnapshot });
           
            } else {
                setError("Summary document not found.");
            }
            console.log(summarySnapshot);
        } catch (err) {
            console.error("Error fetching summary:", err.message);
            setError("Failed to fetch the summary. Please try again later.");
        } finally {
            setLoading(false); // Hide loading indicator
        }
    };

    // Handle question submission
    const onAsk = async () => {
        if (!question.trim()) {
            alert("Please enter a question before submitting.");
            return;
        }

        setLoading(true); // Show loading indicator during submission
        try {
            // Step 1: Fetch user data to include in chatbot context
            const userDataResponse = await axios.get(`http://localhost:${PORT}/node_server/api/patients/patient_get_info/${username}`,{
                headers:
                {  Authorization: `Bearer ${localStorage.getItem("token")}`}
            });
    
            if (!userDataResponse.data) {
                throw new Error("No user data found."); // Handle case where user info is missing
            }
    
            // Step 2: Send chatbot question with user data
            const chatbotResponse = await axios.post(
                `http://localhost:${PORT}/RAG_server/chatbot`,
                {
                    question : question.trim(),
                    username : username,
                    info : userDataResponse.data || { username: username },
                  
                },  
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            setAnswer(chatbotResponse.data.response); // Set chatbot answer
            console.log("Chatbot answer:", chatbotResponse.data.response);
            setQuestion(''); // Clear the input field
        } catch (err) {
            console.error("Error during chatbot request:", err.message);
            setError("Failed to fetch the chatbot response. Please try again later.");
        } finally {
            setLoading(false); // Hide loading indicator
        }
    };

    // Render Component
    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <div className='flex flex-col'>
            <h1 className="text-5xl font-bold text-center text-cyan-700 mb-3 pt-7 ">
                Ai Generated summary of patient documents
            </h1>
            <div className="text-center text-red-600 mb-4">
    <p>
        <strong>Disclaimer:</strong> The generated summary is based entirely on the documents uploaded and the information provided during registration.
        This AI-generated summary should not be considered a substitute for professional medical advice, diagnosis, or treatment.
        Always consult with a qualified healthcare provider before making any medical decisions. The accuracy of the summary may vary and should be reviewed carefully.
    </p>
</div>

            </div>
            <div className="flex justify-center mb-4">
            {/* Generate Summary Button */}
            <div className="flex justify-center mb-4 px-3">
                <button
                    onClick={generateSummary}
                    disabled={loading}
                    className={`px-6 py-3 rounded-lg text-white ${
                        loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                    } transition`}
                >
                    {loading ? "Generating Summary..." : "Generate Summary"}
                </button>
            </div>

            {/* View Summary Button */}
            {viewButtonEnabled && (
                <div className="flex justify-center mb-4 px-3">
                    <button
                        onClick={fetchSummary}
                        disabled={loading}
                        className={`px-6 py-3 rounded-lg text-white ${
                            loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-800"
                        } transition`}
                    >
                        {loading ? "Fetching Summary..." : "View Summary"}
                    </button>
                </div>
            )}
            </div>

            {/* Display Summary */}
            {summaryData && (
                <div className="bg-white p-6 rounded-lg shadow mt-4">
                    
                   
                    <div
                                className="mb-4"
                                dangerouslySetInnerHTML={{
                                    __html: formatSummary(summaryData.summary|| "No summary available."),
                                }}
                            />
        </div>
                
            )}

            {/* Ask Your Question */}
            {summaryData && (
                <div className="bg-white p-6 rounded-lg shadow mt-4">
                    <h2 className="text-xl font-bold text-cyan-700 mb-4">Ask Your Questions</h2>
                    <textarea
                        placeholder="Type your question here..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value.toString())}
                        className="w-full h-20 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={onAsk}
                        className="mt-4 px-6 py-2 rounded-lg bg-green-600 hover:bg-green-800 text-white transition"
                    >
                        Submit Question
                    </button>
                </div>
            )}

            {/* Display Chatbot Answer */}
            {answer && (
                <div className="bg-white p-6 rounded-lg shadow mt-4">
                    <h2 className="text-xl font-bold text-green-600 mb-4">Chatbot Answer</h2>
                    <div
                                className="mb-4"
                                dangerouslySetInnerHTML={{
                                    __html: formatSummary(answer|| "No summary available."),
                                }}
                            />
                </div>
            )}

            {/* Error Message */}
            {error && (
                <p className="text-center text-red-500 mt-4">
                    {error}
                </p>
            )}  
        </div>
    );
}

export default Viewsummary;
