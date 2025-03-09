import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dt_db() {
    const navigate = useNavigate();
    const [tokend, setToken] = useState(null);

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
        <div>
            doctor db
        </div>
    );
}

export default Dt_db;
