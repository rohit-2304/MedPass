import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from './hero'; // Importing the Hero component

function Home() {
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [tokend, setTokend] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedTokend = localStorage.getItem('tokend');
        const username = localStorage.getItem("username");
       

        setToken(storedToken);
        setTokend(storedTokend);

        if (storedToken) {
            navigate(`/pt_db/${username}`);
        } else if (storedTokend) {
            navigate(`/dt_db/${username}`);
        }
    }, [navigate]);

    const handleClick = () => {
        navigate('/login/patient');
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-white to-[#ebe5db]">
            
            <div className="h-full w-full grid grid-cols-1 lg:grid-cols-2  ">
                
                {/* Left Side: Hero Animation */}
                <div className="flex justify-center items-center">
                    <Hero />
                </div>

                {/* Right Side: Text & Button */}
                <div className="flex flex-col justify-center items-start px-12">
                    <h1 className="text-5xl font-bold text-[#000] mb-4">
                        <span className='text-[#6A994E]'>Join us for a Smarter</span><br/>Healthcare Future
                    </h1>
                    <p className="text-lg text-gray-600 leading-relaxed mb-8">
                        Get verified access to trusted doctors and manage your health history effortlessly.
                        Your data, your control – experience seamless healthcare with us.
                    </p>
                    <button 
                        className="bg-[#6A994E] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#A7C957] hover:text-black transition duration-300 cursor-pointer"
                        onClick={handleClick}
                    >
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;
